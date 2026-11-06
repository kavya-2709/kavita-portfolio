/**
 * The visitor wall: types and the small client that talks to `/api/drawings`.
 *
 * Drawings live in Vercel Blob, not in a database. Each one is a PNG whose
 * pathname carries everything we need to list it, so reading the wall is one
 * `list()` call with no second lookup:
 *
 *     playground/<epoch-ms>__<id>__<name>.png
 *
 * Sorting by pathname therefore sorts by time, and the artist's name survives
 * a round trip without a metadata store.
 */

export type Drawing = {
  /** Blob pathname. Also the delete key. */
  id: string;
  /** Public blob URL of the PNG. */
  url: string;
  /** What the visitor signed it with, or "Anonymous". */
  name: string;
  /** Epoch milliseconds, parsed out of the pathname. */
  at: number;
};

/** Canvas is fixed-size so every drawing on the wall has the same aspect. */
export const CANVAS_W = 1000;
export const CANVAS_H = 700;

/**
 * Refused above this. A 1000x700 PNG of pen strokes is comfortably under
 * 200KB; the cap is a backstop against someone posting a photograph through
 * the endpoint by hand, not a limit real drawings will meet.
 */
export const MAX_PNG_BYTES = 400_000;

export const MAX_NAME_LEN = 24;

/** Shared so the client rejects before uploading what the server would refuse. */
export function nameIsAllowed(name: string) {
  return name.length <= MAX_NAME_LEN;
}

async function readError(res: Response) {
  try {
    const body = (await res.json()) as { error?: string };
    if (body?.error) return body.error;
  } catch {
    /* non-JSON error body: fall through to the status text */
  }
  return `${res.status} ${res.statusText}`;
}

/** The wall, newest first. */
export async function listDrawings(): Promise<Drawing[]> {
  const res = await fetch("/api/drawings");
  if (!res.ok) throw new Error(await readError(res));
  const body = (await res.json()) as { drawings: Drawing[] };
  return body.drawings;
}

export async function postDrawing(png: Blob, name: string): Promise<Drawing> {
  const form = new FormData();
  form.append("png", png, "drawing.png");
  form.append("name", name);
  const res = await fetch("/api/drawings", { method: "POST", body: form });
  if (!res.ok) throw new Error(await readError(res));
  const body = (await res.json()) as { drawing: Drawing };
  return body.drawing;
}

/** Moderation. The key is held by the admin page, never by the wall. */
export async function deleteDrawing(id: string, key: string) {
  const res = await fetch(`/api/drawings?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { "x-admin-key": key },
  });
  if (!res.ok) throw new Error(await readError(res));
}
