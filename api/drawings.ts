import type { IncomingMessage, ServerResponse } from "node:http";
import { put, list, del } from "@vercel/blob";

/**
 * The visitor wall.
 *
 *   GET    /api/drawings        public, lists the wall newest first
 *   POST   /api/drawings        public, accepts one PNG (multipart)
 *   DELETE /api/drawings?id=    admin only, removes one
 *
 * Storage is Vercel Blob with no database. Everything needed to render the
 * wall is encoded in the pathname:
 *
 *   playground/<epoch-ms>__<id>__<name>.png
 *
 * **Node runtime, Node signature.** This was first written as a Web-standard
 * handler (`(req: Request) => Response`) with `export const config = {
 * runtime: "edge" }`. That failed the Vercel build outright, and with the
 * config removed the Node runtime invoked it as `(req, res)`, ignored the
 * returned Response and never ended the reply, so every call hung until it
 * timed out. Hence `IncomingMessage`/`ServerResponse` and an explicit
 * `res.end()` on every path. The types come from @types/node, which is
 * already a devDependency, so this costs no new package.
 *
 * Uploads are public the moment they land, which is what Kavita chose, so
 * everything below treats the request as hostile: the PNG is checked by its
 * magic bytes rather than its declared type, the name is stripped to a safe
 * character set before it is ever put in a pathname, and both are capped.
 */

const PREFIX = "playground/";
const MAX_PNG_BYTES = 400_000;
const MAX_NAME_LEN = 24;
/** Nothing on the wall should ever be executed or framed, only displayed. */
const CONTENT_TYPE = "image/png";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

/**
 * Names go into a blob pathname, so anything that could change how that
 * pathname parses has to go: `__` is the field separator, `/` would invent a
 * folder, and `.` could rewrite the extension. Letters, digits, spaces,
 * hyphens and apostrophes are enough to sign a drawing with.
 */
function safeName(raw: string | undefined): string {
  if (typeof raw !== "string") return "Anonymous";
  const cleaned = raw
    .normalize("NFC")
    .replace(/[^\p{L}\p{N} '-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME_LEN);
  return cleaned || "Anonymous";
}

type Parsed = { id: string; url: string; name: string; at: number };

/** `playground/<at>__<id>__<name>.png` back into fields. */
function parse(pathname: string, url: string): Parsed | null {
  const stem = pathname.slice(PREFIX.length).replace(/\.png$/, "");
  const [at, id, ...rest] = stem.split("__");
  const ms = Number(at);
  if (!id || !Number.isFinite(ms)) return null;
  return { id: pathname, url, name: rest.join("__") || "Anonymous", at: ms };
}

/** The whole request body. Vercel hands multipart through unparsed. */
function readBody(req: IncomingMessage): Promise<Buffer> {
  const existing = (req as IncomingMessage & { body?: unknown }).body;
  if (Buffer.isBuffer(existing)) return Promise.resolve(existing);
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (c: Buffer) => {
      size += c.length;
      // Stop reading a body already past the cap rather than buffering an
      // arbitrary amount of someone else's upload.
      if (size > MAX_PNG_BYTES * 2) {
        req.destroy();
        reject(new Error("body too large"));
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

/**
 * Pull the PNG and the name out of a multipart body.
 *
 * Deliberately not a multipart library: this endpoint accepts exactly two
 * fields from our own form, and the PNG is located by its signature and
 * verified again below, which is both simpler and stricter than trusting
 * the part headers a caller sends.
 */
function readParts(body: Buffer): { png: Buffer | null; name: string } {
  const text = body.toString("latin1");
  const nameMatch = /name="name"\r\n\r\n([^\r]*)\r\n/.exec(text);
  const name = safeName(nameMatch?.[1]);

  const start = body.indexOf(PNG_MAGIC);
  if (start < 0) return { png: null, name };

  // The trailing boundary that closes the file part.
  const tail = body.lastIndexOf(Buffer.from("\r\n------"));
  return { png: body.subarray(start, tail > start ? tail : undefined), name };
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return send(res, 503, {
      error:
        "The wall is not connected to storage yet. Create a Blob store in the Vercel dashboard and redeploy.",
    });
  }

  try {
    const url = new URL(req.url ?? "/", "http://localhost");

    if (req.method === "GET") {
      const { blobs } = await list({ prefix: PREFIX });
      const drawings = blobs
        .map((b) => parse(b.pathname, b.url))
        .filter((d): d is Parsed => d !== null)
        .sort((a, b) => b.at - a.at);
      return send(res, 200, { drawings });
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      const { png, name } = readParts(body);
      if (!png) return send(res, 400, { error: "No image sent." });
      if (png.length > MAX_PNG_BYTES)
        return send(res, 413, { error: "That drawing is too large to post." });
      if (!png.subarray(0, 8).equals(PNG_MAGIC))
        return send(res, 415, { error: "Only PNG drawings." });

      // Not security-critical: it only has to not collide.
      const id = Math.random().toString(36).slice(2, 10);
      const pathname = `${PREFIX}${Date.now()}__${id}__${name}.png`;

      const blob = await put(pathname, png, {
        access: "public",
        contentType: CONTENT_TYPE,
        // The pathname is already unique and we parse it back out, so Vercel
        // must not append its own random suffix.
        addRandomSuffix: false,
      });

      const drawing = parse(blob.pathname, blob.url);
      if (!drawing)
        return send(res, 500, { error: "Could not store that drawing." });
      return send(res, 201, { drawing });
    }

    if (req.method === "DELETE") {
      const key = (req.headers["x-admin-key"] as string | undefined) ?? "";
      const expected = process.env.PLAYGROUND_ADMIN_KEY ?? "";
      if (!expected)
        return send(res, 503, { error: "Moderation is not configured." });
      if (key.length !== expected.length || key !== expected)
        return send(res, 401, { error: "Not authorised." });

      const id = url.searchParams.get("id") ?? "";
      // Confine deletes to the wall's own prefix, whatever the caller sends.
      if (!id.startsWith(PREFIX) || id.includes(".."))
        return send(res, 400, { error: "Not a wall drawing." });

      // Resolve the pathname against what is actually stored and delete by
      // the URL the store itself reports, rather than trusting the caller's
      // string to address a blob.
      const { blobs } = await list({ prefix: PREFIX });
      const target = blobs.find((b) => b.pathname === id);
      if (!target) return send(res, 404, { error: "Already gone." });

      await del(target.url);
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: "Method not allowed." });
  } catch (err) {
    console.error("[drawings]", err);
    return send(res, 500, { error: "Something went wrong handling that." });
  }
}
