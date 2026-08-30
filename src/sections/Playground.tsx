import { useEffect, useRef, useState } from "react";
import { playground as p } from "../lib/content";
import { Container } from "../components/ui";
import { TYPE } from "../lib/type";

/**
 * Playground — the motion reel.
 *
 * One rail rather than a strip of tiles. The reel already carries its own
 * pacing and cuts, so slicing it into captioned cards was describing motion
 * the viewer can watch happen. Nothing here is labelled for the same reason.
 *
 * Sits on the page's own white, with no tinted band behind it: the reel
 * brings its own colour and a ground fought with it.
 */
export default function Playground() {
  return (
    <section id="playground" className="relative py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <span className="bg-ink text-paper-white font-geist text-caption inline-flex rounded-full px-4 py-1.5 tracking-[0.11em] uppercase">
              {p.badge}
            </span>

            <h2 className={`${TYPE.h2} mt-7`}>
              {p.title}
              <br />
              <span className="text-clay italic">{p.titleAccent}</span>
            </h2>
          </div>

          <div className="flex items-start gap-5 lg:pt-3">
            <img
              src={p.sticker}
              alt=""
              aria-hidden
              width={96}
              height={96}
              className="h-[72px] w-auto shrink-0 -rotate-6 md:h-[88px]"
            />
            <p className={`${TYPE.body} max-w-sm`}>
              {p.blurbBefore}
              <em className="font-serif-display text-ink text-body-lg not-italic">
                <span className="italic">{p.blurbEmphasis}</span>
              </em>
              {p.blurbAfter}
            </p>
          </div>
        </div>

        <Reel />
      </Container>
    </section>
  );
}

/**
 * The reel, open on the page.
 *
 * No card, no border, no rounded corners: the clip sits directly on the page
 * and its edges are feathered into the white, the same treatment the footer
 * panorama gets. A framed box made it read as an embed rather than as part
 * of the page.
 *
 * The file is the full-quality export and it is heavy, so the `src` is only
 * attached once the section is near the viewport. Someone who reads the case
 * studies and leaves never pays for it. The poster holds the frame in the
 * meantime, so there is no empty gap while it arrives.
 */
function Reel() {
  const ref = useRef<HTMLDivElement>(null);
  // Without IntersectionObserver there is nothing to wait for, so start
  // loaded. Decided at init rather than in the effect, which would set state
  // synchronously during render and cost an extra pass.
  const [load, setLoad] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || load) return;

    const MARGIN = 600;

    // Geometry check first, as a backstop. An observer that reports a false
    // negative would leave the poster up forever, and this reads the position
    // directly rather than trusting the callback.
    const near = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + MARGIN && r.bottom > -MARGIN;
    };
    if (near()) {
      setLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || near()) {
          setLoad(true);
          io.disconnect();
        }
      },
      // Start fetching a screen early, so it is playing by the time it lands.
      { rootMargin: `${MARGIN}px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref} className="relative mt-12 md:mt-16">
      <video
        // `src` only once near view; `poster` renders immediately either way.
        {...(load ? { src: p.reel } : {})}
        poster={p.reelPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-label={p.reelLabel}
        className="block aspect-video w-full object-cover"
      />

      {/* Feathered into the page on all four edges, so the clip has no seam.
          Pointer-events off, or the fades would swallow clicks on the video. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-white to-transparent"
      />
    </div>
  );
}
