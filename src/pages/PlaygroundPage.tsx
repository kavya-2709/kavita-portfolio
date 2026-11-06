import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, EASE } from "../components/ui";
import { TYPE } from "../lib/type";
import { sketchwall as copy } from "../lib/content";
import {
  listDrawings,
  postDrawing,
  type Drawing,
} from "../lib/playground";
import DrawCanvas from "../components/playground/DrawCanvas";
import Explorations from "../components/playground/Explorations";
import Reel from "../sections/Playground";
import Contact from "../sections/Contact";

/**
 * `/playground` — the drawable page.
 *
 * Deliberately not part of `/work`: the motion reel in there is work Kavita
 * made, and this is a thing visitors make. Keeping them apart means the work
 * index stays a portfolio rather than half portfolio and half toy.
 *
 * The wall loads independently of the pad. If the API is unreachable, or the
 * Blob store has not been connected yet, the pad still works and only the
 * wall reports the problem, because being unable to show other people's
 * drawings is no reason to stop you making one.
 */
export default function PlaygroundPage() {
  const [drawings, setDrawings] = useState<Drawing[] | null>(null);
  /**
   * Whether the wall has somewhere to live.
   *
   * Until a Blob store is connected in Vercel the API answers 503, and a
   * visitor should not be shown an error about infrastructure they do not
   * have. The wall simply does not appear: the pad takes the full width and
   * the page reads as a sketch pad that happens to have no gallery yet.
   * Connect the store and the wall returns on its own.
   */
  const [wallUp, setWallUp] = useState(true);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  // The fetch lives in the effect and every write is guarded, so a visitor
  // who opens the page and leaves before the wall arrives does not get a
  // state update on an unmounted component.
  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const list = await listDrawings();
        if (alive) setDrawings(list);
      } catch {
        if (!alive) return;
        setWallUp(false);
        setDrawings([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function handlePost(png: Blob, name: string) {
    setPosting(true);
    setPostError(null);
    try {
      const made = await postDrawing(png, name);
      // Put it straight on the wall rather than refetching: the visitor
      // should see their own drawing land the instant it is accepted.
      setDrawings((prev) => (prev ? [made, ...prev] : [made]));
    } catch {
      setPostError(copy.postError);
    } finally {
      setPosting(false);
    }
  }

  return (
    <>
      <main className="pt-28 md:pt-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="bg-ink text-paper-white font-geist text-caption inline-flex rounded-full px-3.5 py-1.5 tracking-[0.11em] uppercase">
              {copy.badge}
            </span>
          </motion.div>
        </Container>

        {/* One opening, then two quiet sections.

            The page had four headings competing: a page title, then a serif
            heading for the explorations, the reel and the wall, each with
            its own badge. The explorations statement is the only large type
            on the page now and doubles as its title; everything below is a
            label and a line. */}
        <div className="mt-8">
          <Explorations />
        </div>

        {/* The motion reel, moved here from the foot of Work. It is the same
            kind of thing as the explorations, self-directed and curious, and
            Work is stronger as case studies plus shipped products alone. */}
        <Reel />

        <Container>
          <div className="border-ink/[0.08] border-t pt-10">
            <h2 className={TYPE.h3}>
              {copy.title}{" "}
              <span className="font-serif-display text-[color:#ef5a22] italic">
                {copy.titleAccent}
              </span>
            </h2>
            <p className={`${TYPE.small} mt-3 max-w-md`}>{copy.lead}</p>
          </div>

          {/* Pad on the left, wall on the right, side by side from lg up.
              Stacked below that, because a 500px-wide pad on a phone is not
              a pad. The wall scrolls inside its own column rather than
              running the page on forever, so the pad stays on screen while
              you look through what other people left. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className={`mt-12 grid gap-10 lg:gap-14 ${
              wallUp ? "lg:grid-cols-2" : ""
            }`}
          >
            <div>
              <DrawCanvas onPost={handlePost} posting={posting} />
              {postError ? (
                <p
                  role="status"
                  className="font-geist text-body-sm mt-4 text-[color:#98002e]"
                >
                  {postError}
                </p>
              ) : null}
            </div>

            {wallUp ? (
            <div className="flex min-w-0 flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className={TYPE.h3}>{copy.wallTitle}</h2>
                {drawings && drawings.length > 0 ? (
                  <span className="font-geist text-body-sm text-fog">
                    {drawings.length}
                  </span>
                ) : null}
              </div>

              {drawings === null ? (
                <p className={`${TYPE.small} mt-6`}>{copy.wallLoading}</p>
              ) : drawings.length === 0 ? (
                <p className={`${TYPE.small} mt-6`}>{copy.wallEmpty}</p>
              ) : (
                <ul className="mt-5 grid grid-cols-2 gap-4 lg:max-h-[34rem] lg:overflow-y-auto lg:pr-2">
                  {drawings.map((d) => (
                    <li key={d.id}>
                      <figure className="m-0">
                        <img
                          src={d.url}
                          alt={`Drawing by ${d.name}`}
                          loading="lazy"
                          className="rounded-cards-sm border-ink/[0.08] w-full border bg-white"
                        />
                        <figcaption className="font-geist text-body-sm text-graphite mt-2 flex items-baseline justify-between gap-2">
                          <span className="text-ink truncate">{d.name}</span>
                          <time
                            dateTime={new Date(d.at).toISOString()}
                            className="text-fog shrink-0"
                          >
                            {new Date(d.at).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                            })}
                          </time>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            ) : null}
          </motion.div>
        </Container>

        <div className="h-14 md:h-20" />
      </main>
      <Contact />
    </>
  );
}
