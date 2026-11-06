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
 * Uploads are public the moment they land, which is what Kavita chose, so
 * everything below treats the request body as hostile: the PNG is checked by
 * its magic bytes rather than its declared type, the name is stripped to a
 * safe character set before it is ever put in a pathname, and both are capped.
 */

/** Web-standard Request/Response, which is what the edge runtime speaks. */
export const config = { runtime: "edge" };

const PREFIX = "playground/";
const MAX_PNG_BYTES = 400_000;
const MAX_NAME_LEN = 24;
/** Nothing on the wall should ever be executed or framed, only displayed. */
const CONTENT_TYPE = "image/png";

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

/**
 * Names go into a blob pathname, so anything that could change how that
 * pathname parses has to go: `__` is the field separator, `/` would invent a
 * folder, and `.` could rewrite the extension. Letters, digits, spaces,
 * hyphens and apostrophes are enough to sign a drawing with.
 */
function safeName(raw: unknown): string {
  if (typeof raw !== "string") return "Anonymous";
  const cleaned = raw
    .normalize("NFC")
    .replace(/[^\p{L}\p{N} '-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME_LEN);
  return cleaned || "Anonymous";
}

/** PNG magic number. A declared content-type is just a claim by the caller. */
function isPng(bytes: Uint8Array) {
  return (
    bytes.length > 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  );
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

export default async function handler(req: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN)
    return json(503, {
      error:
        "The wall is not connected to storage yet. Create a Blob store in the Vercel dashboard and redeploy.",
    });

  try {
    if (req.method === "GET") {
      const { blobs } = await list({ prefix: PREFIX });
      const drawings = blobs
        .map((b) => parse(b.pathname, b.url))
        .filter((d): d is Parsed => d !== null)
        .sort((a, b) => b.at - a.at);
      return json(200, { drawings });
    }

    if (req.method === "POST") {
      const form = await req.formData();
      const file = form.get("png");
      if (!(file instanceof File)) return json(400, { error: "No image sent." });
      if (file.size > MAX_PNG_BYTES)
        return json(413, { error: "That drawing is too large to post." });

      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!isPng(bytes)) return json(415, { error: "Only PNG drawings." });

      const name = safeName(form.get("name"));
      // Not security-critical: it only has to not collide.
      const id = Math.random().toString(36).slice(2, 10);
      const pathname = `${PREFIX}${Date.now()}__${id}__${name}.png`;

      // The File itself, not the bytes we sniffed: same content, but the SDK
      // can stream it rather than hold a second copy in memory.
      const blob = await put(pathname, file, {
        access: "public",
        contentType: CONTENT_TYPE,
        // The pathname is already unique and we parse it back out, so Vercel
        // must not append its own random suffix.
        addRandomSuffix: false,
      });

      const drawing = parse(blob.pathname, blob.url);
      if (!drawing) return json(500, { error: "Could not store that drawing." });
      return json(201, { drawing });
    }

    if (req.method === "DELETE") {
      const key = req.headers.get("x-admin-key") ?? "";
      const expected = process.env.PLAYGROUND_ADMIN_KEY ?? "";
      if (!expected)
        return json(503, { error: "Moderation is not configured." });
      if (key.length !== expected.length || key !== expected)
        return json(401, { error: "Not authorised." });

      const id = new URL(req.url).searchParams.get("id") ?? "";
      // Confine deletes to the wall's own prefix, whatever the caller sends.
      if (!id.startsWith(PREFIX) || id.includes(".."))
        return json(400, { error: "Not a wall drawing." });

      // Resolve the pathname against what is actually stored and delete by
      // the URL the store itself reports, rather than trusting the caller's
      // string to address a blob.
      const { blobs } = await list({ prefix: PREFIX });
      const target = blobs.find((b) => b.pathname === id);
      if (!target) return json(404, { error: "Already gone." });

      await del(target.url);
      return json(200, { ok: true });
    }

    return json(405, { error: "Method not allowed." });
  } catch (err) {
    console.error("[drawings]", err);
    return json(500, { error: "Something went wrong handling that." });
  }
}
