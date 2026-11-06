import { useEffect, useState } from "react";
import { Container } from "../components/ui";
import { LiquidButton } from "../components/LiquidButton";
import { TYPE } from "../lib/type";
import { sketchwall as copy } from "../lib/content";
import {
  listDrawings,
  deleteDrawing,
  type Drawing,
} from "../lib/playground";

/**
 * `/playground/admin` — Kavita's moderation view.
 *
 * Drawings go public the moment they are posted, so the one thing this page
 * has to be is fast to act in: every drawing carries its own delete, there is
 * no confirm step, and the item disappears from the list immediately.
 *
 * The key is typed in here and held in `sessionStorage`, so it survives a
 * refresh while she is working but not the browser closing. It is never
 * written into the URL, where it would end up in history and in any shared
 * link. The route is deliberately not linked from anywhere in the site.
 */
const KEY_STORE = "kv-playground-key";

export default function PlaygroundAdmin() {
  const [key, setKey] = useState(
    () => sessionStorage.getItem(KEY_STORE) ?? "",
  );
  const [unlocked, setUnlocked] = useState(false);
  const [drawings, setDrawings] = useState<Drawing[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!unlocked) return;
    let alive = true;
    void (async () => {
      try {
        const list = await listDrawings();
        if (alive) setDrawings(list);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      alive = false;
    };
  }, [unlocked]);

  function unlock() {
    if (!key.trim()) return;
    sessionStorage.setItem(KEY_STORE, key.trim());
    setUnlocked(true);
  }

  async function remove(d: Drawing) {
    setBusy(d.id);
    setError(null);
    try {
      await deleteDrawing(d.id, key.trim());
      setDrawings((prev) => prev?.filter((x) => x.id !== d.id) ?? null);
    } catch {
      setError(copy.adminWrongKey);
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="pt-28 md:pt-32">
      <Container>
        <h1 className={TYPE.h2}>{copy.adminTitle}</h1>
        <p className={`${TYPE.lead} mt-4 max-w-2xl`}>{copy.adminLead}</p>

        {!unlocked ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <label className="font-geist text-body-sm text-graphite flex items-center gap-3">
              {copy.adminKeyLabel}
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") unlock();
                }}
                className="font-geist text-body-sm text-ink border-ink/15 focus:border-ink/40 w-64 rounded-full border px-4 py-2 outline-none transition-colors"
              />
            </label>
            <LiquidButton onClick={unlock} tone="solid" size="sm">
              {copy.adminUnlock}
            </LiquidButton>
          </div>
        ) : (
          <>
            {error ? (
              <p
                role="status"
                className="font-geist text-body-sm mt-6 text-[color:#98002e]"
              >
                {error}
              </p>
            ) : null}

            {drawings === null ? (
              <p className={`${TYPE.small} mt-8`}>{copy.wallLoading}</p>
            ) : drawings.length === 0 ? (
              <p className={`${TYPE.small} mt-8`}>{copy.adminEmpty}</p>
            ) : (
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {drawings.map((d) => (
                  <li key={d.id}>
                    <img
                      src={d.url}
                      alt={`Drawing by ${d.name}`}
                      loading="lazy"
                      className="rounded-cards-sm border-ink/[0.08] w-full border bg-white"
                    />
                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      <span className="font-geist text-body-sm text-ink">
                        {d.name}
                        <span className="text-fog">
                          {" · "}
                          {new Date(d.at).toLocaleString()}
                        </span>
                      </span>
                      <LiquidButton
                        onClick={() => void remove(d)}
                        disabled={busy === d.id}
                        size="sm"
                      >
                        {busy === d.id ? copy.adminDeleting : copy.adminDelete}
                      </LiquidButton>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Container>
    </main>
  );
}
