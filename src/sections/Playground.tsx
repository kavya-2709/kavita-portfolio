import { useEffect, useRef } from "react";
import { playground as p } from "../lib/content";
import { Container } from "../components/ui";
import { TYPE } from "../lib/type";

/**
 * Playground — the motion work, on an endless strip.
 *
 * The strip scrolls forever and each clip swells as it reaches the middle of
 * the screen, then falls back as it passes: the piece you are looking at is
 * the biggest thing on the row, and the rest stay present without competing.
 *
 * Scale is driven from each tile's real distance to the viewport centre in a
 * rAF loop rather than from keyframes. Keyframes would have to assume the
 * strip's exact speed and spacing, and would drift the moment either changed
 * or the row re-wrapped at a different width. Measuring is self-correcting.
 *
 * If rAF never runs (a background tab, or a throttled preview) every tile
 * simply stays at its resting size. The strip still scrolls, because that is
 * a CSS animation; only the swell is lost, which is the right thing to lose.
 */

/** How much the centred tile grows, and how far out the effect reaches. */
const PEAK = 1.18;
const BASE = 0.84;
/** Falloff, as a fraction of viewport width. */
const REACH = 0.42;

function Strip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const tiles = Array.from(
      track.querySelectorAll<HTMLElement>("[data-tile]"),
    );

    const paint = () => {
      const mid = window.innerWidth / 2;
      const reach = window.innerWidth * REACH;
      for (const tile of tiles) {
        const r = tile.getBoundingClientRect();
        // Skip anything nowhere near the viewport: this runs every frame.
        if (r.right < -reach || r.left > window.innerWidth + reach) continue;
        const d = Math.abs(r.left + r.width / 2 - mid);
        const t = Math.max(0, 1 - d / reach);
        // Ease the falloff so the peak is a swell, not a spike.
        const eased = t * t * (3 - 2 * t);
        tile.style.transform = `scale(${BASE + (PEAK - BASE) * eased})`;
        tile.style.zIndex = String(Math.round(eased * 100));
      }
      frame = requestAnimationFrame(paint);
    };

    frame = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(frame);
  }, []);

  /** One run. The track holds two and travels -50%, so the loop is seamless. */
  const run = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {p.loops.map((l) => (
        <figure
          key={l.src + (hidden ? "-b" : "")}
          data-tile
          // Resting scale is BASE, set inline so the tile is correct on the
          // first paint rather than starting at 1 and snapping down.
          style={{ transform: `scale(${BASE})` }}
          className="relative m-0 w-[240px] shrink-0 transition-none will-change-transform sm:w-[300px] lg:w-[340px]"
        >
          <div className="rounded-cards border-ink/[0.08] overflow-hidden border bg-white">
            <video
              src={l.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={l.caption}
              className="block aspect-square w-full object-cover"
            />
          </div>
          <figcaption className="font-geist text-body-sm text-graphite mt-3 text-center">
            {l.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <div className="group relative">
      <div className="overflow-hidden py-10">
        <div
          ref={trackRef}
          className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "60s" }}
        >
          {run(false)}
          {run(true)}
        </div>
      </div>

      {/* Feathered edges, so tiles arrive and leave rather than being cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-white to-transparent"
      />
    </div>
  );
}

export default function Playground() {
  return (
    <section id="playground" className="relative overflow-hidden py-16 md:py-24">
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
      </Container>

      {/* Full-bleed, deliberately outside Container so tiles run off both
          edges instead of stopping at the 1200px gutter. */}
      <div className="mt-10 md:mt-14">
        <Strip />
      </div>
    </section>
  );
}
