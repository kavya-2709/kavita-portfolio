import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "../lib/content";
import { Container, EASE } from "../components/ui";

/**
 * Testimonials as a single physical sheet of paper, clipped and replaced.
 *
 * The whole section is one object: an off-white page held by a metal clip,
 * with a printed photograph pinned to the left and the quote handwritten
 * across the right. It is deliberately not a card — square corners, warm
 * paper, fine grain, and a shallow contact shadow instead of elevation.
 *
 * The motion is a replacement, not a reel: one sheet sits perfectly still
 * for five seconds, then slides off to the left as the next arrives from
 * the right. Nothing moves in between, which is the point.
 */

/** Hold time before the current sheet is replaced. */
const HOLD_MS = 5000;
/** Slide duration. Long enough to read as paper, short enough not to drag. */
const SLIDE_S = 0.7;
/**
 * `EASE` is a framer-motion coordinate array, so it cannot go straight into
 * a CSS shorthand — doing that yields `transform 0.7s 0.16,1,0.3,1`, which
 * is invalid and silently drops the whole declaration. Derived from the same
 * constant so the curve here can never drift from the rest of the site.
 */
const EASE_CSS = `cubic-bezier(${EASE.join(",")})`;

/**
 * Fine paper grain, as an inline SVG turbulence filter.
 *
 * ~250 bytes and no network request, which is why this isn't a texture
 * image. Rendered at very low opacity: the grain should only be findable
 * if you go looking for it, never read as dirt or age.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E\")";

/**
 * Bent-wire paperclip holding the sheet.
 *
 * One continuous stroked path: down, U-turn, up, U-turn, down. The turns
 * are cubic curves rather than arcs on purpose — arcs need sweep flags, and
 * the wrong one silently centres the curve on the far side (the lily-pad
 * bug). The second, lighter path is the specular highlight down the wire,
 * which is most of what makes it read as metal rather than an outline icon.
 */
function Paperclip({ className = "" }: { className?: string }) {
  const d =
    "M32 30 L32 84 C32 96 14 96 14 84 L14 24 C14 8 44 8 44 24 L44 92 C44 108 12 108 12 92 L12 40";
  return (
    <svg viewBox="0 0 64 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="clip-steel" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#e8ebee" />
          <stop offset="28%" stopColor="#9aa1a9" />
          <stop offset="55%" stopColor="#6f767e" />
          <stop offset="78%" stopColor="#b8bec5" />
          <stop offset="100%" stopColor="#848b93" />
        </linearGradient>
      </defs>
      {/* contact shadow the wire casts onto the paper */}
      <path
        d={d}
        fill="none"
        stroke="#0a0d12"
        strokeOpacity="0.16"
        strokeWidth="7"
        strokeLinecap="round"
        transform="translate(1.5 2.5)"
      />
      <path
        d={d}
        fill="none"
        stroke="url(#clip-steel)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
        transform="translate(-1.1 -1.1)"
      />
    </svg>
  );
}

type Testimonial = (typeof testimonials)[number];

/** One sheet. Photograph left, handwriting right, clip over the top edge. */
function Sheet({ t }: { t: Testimonial }) {
  return (
    <article
      role="group"
      aria-roledescription="testimonial"
      aria-label={`${t.name}, ${t.role}`}
      className="bg-paper-sheet relative h-full w-full overflow-hidden"
      style={{
        // Square corners, explicitly. This is a sheet of paper, not a card.
        borderRadius: 0,
        // Scoped exception to the project's no-shadow rule: the sheet has to
        // read as sitting *on* the page. Tight contact shadow plus a wider,
        // very faint one, rather than a single soft glow.
        boxShadow:
          "0 1px 1px rgba(10,13,18,0.06), 0 10px 22px -12px rgba(10,13,18,0.22)",
      }}
    >
      {/* Uneven sheet brightness: light catches the top-left, the bottom
          edge falls off slightly. Keeps the paper from reading as a flat fill. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 55%), linear-gradient(to bottom, rgba(255,255,255,0) 72%, rgba(120,110,95,0.05) 100%)",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{ backgroundImage: GRAIN }}
      />

      {/* The row layout starts at md, where the sheet is still fairly narrow,
          so the photo, gap and padding all step up again at lg. Sizing them
          for the wide sheet alone overflows the quote column at 768px. */}
      <div className="relative flex h-full flex-col gap-6 px-6 py-7 sm:gap-7 sm:px-10 sm:py-9 md:flex-row md:gap-8 md:px-10 md:py-12 lg:gap-12 lg:px-14 lg:py-14">
        {/* Printed photograph, pinned slightly askew */}
        <figure
          className="m-0 w-[128px] shrink-0 self-center sm:w-[150px] md:self-start lg:w-[196px]"
          style={{ rotate: "-2.2deg" }}
        >
          <div
            className="bg-white p-2.5 pb-3"
            style={{
              boxShadow:
                "0 1px 2px rgba(10,13,18,0.10), 0 6px 14px -8px rgba(10,13,18,0.28)",
            }}
          >
            <img
              src={t.photo}
              alt={`${t.name}, ${t.role}`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <figcaption className="pt-3 text-center">
              <p className="font-hand text-ink text-[22px] leading-none md:text-[26px]">
                {t.name}
              </p>
              <p className="font-hand text-graphite mt-1 text-[15px] leading-[1.25] md:text-[17px]">
                {t.role}
              </p>
            </figcaption>
          </div>
        </figure>

        {/* The words. Ragged right, generous leading, never justified. */}
        <blockquote className="font-hand text-charcoal m-0 max-w-[62ch] text-[17px] leading-[1.58] sm:text-[20px] sm:leading-[1.62] lg:text-[24px] lg:leading-[1.66]">
          {t.quote}
        </blockquote>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = testimonials.length;

  // Hold, replace, hold. Restarts whenever the sheet changes or the pointer
  // leaves, so a hover always buys a fresh five seconds rather than a scrap.
  //
  // Nothing rotates on its own for anyone who asked for reduced motion; they
  // move through the quotes with the controls instead. The slide itself is
  // already neutralised by the global prefers-reduced-motion kill-switch in
  // index.css, which caps every transition, so the swap is instant there.
  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), HOLD_MS);
    return () => clearTimeout(id);
  }, [index, paused, count, reduced]);

  /**
   * Where sheet `i` sits, as a signed distance from the visible one, taking
   * the shorter way round the loop: -1 is parked off-frame left, 0 is
   * centred, 1 is parked off-frame right.
   */
  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <section id="testimonials" className="relative bg-white py-14 md:py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-serif-display text-ink text-center text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.02em]"
        >
          What people say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          className="font-geist text-body-lg text-graphite mx-auto mt-4 max-w-lg text-center"
        >
          From the people I have designed with and shipped alongside.
        </motion.p>

        {/* Stage. Clipped horizontally so sheets arrive and leave off-frame.
            The top padding is what gives the clip room to overhang the sheet
            without being cut off by that same clipping. */}
        <div
          // max-w keeps the sheet at roughly 80% of the content column, so it
          // reads as a large object with air around it rather than a panel
          // stretched edge to edge.
          className="relative mx-auto mt-16 w-full max-w-[920px] overflow-hidden px-1 pt-10 pb-6 md:mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Every sheet stays mounted and is positioned by transform alone.
              Nothing enters or leaves the tree, so there is no presence to
              leak orphaned nodes, no reset frame at the wrap, and no layout
              work during the slide. With three sheets that is cheaper than
              mounting and unmounting one. */}
          {/* Fixed per breakpoint because the sheets are absolutely
              positioned. Set from the longest quote's measured height, not
              guessed: at 375px that quote runs 13 lines. */}
          <div className="relative h-[650px] sm:h-[640px] md:h-[540px]">
            {testimonials.map((t, i) => {
              const d = offsetOf(i);
              const active = d === 0;
              return (
                <div
                  key={t.name}
                  className="absolute inset-0"
                  style={{
                    // Position is a plain CSS transform, not a JS-driven one.
                    // It is declarative, so it is correct on the very first
                    // paint and stays correct with no animation frames at
                    // all — a background or throttled tab still lays the
                    // sheets out properly instead of stacking them.
                    transform: `translate3d(${d * 108}%,0,0) rotate(${d * 1.3}deg)`,
                    transformOrigin: "center center",
                    // The sheet wrapping round to the right jumps rather than
                    // travels, or it would slide the whole way across frame.
                    // It is off-frame at both ends, so the jump is never seen.
                    transition:
                      d === 1
                        ? "none"
                        : `transform ${SLIDE_S}s ${EASE_CSS}`,
                    willChange: "transform",
                  }}
                  aria-hidden={!active}
                  // Keeps parked sheets out of the tab order and off the
                  // accessibility tree while they sit off-frame.
                  inert={!active}
                >
                  <Sheet t={t} />
                  {/* The clip lives on the sheet, not the stage, so it
                      travels with its own page. It sits outside the article
                      because the article clips its grain to the paper edge,
                      and the clip has to overhang the top. */}
                  <Paperclip className="pointer-events-none absolute -top-9 left-10 z-20 w-[52px] -rotate-6 md:left-16 md:w-[60px]" />
                </div>
              );
            })}
          </div>

          {/* Manual controls. The rotation carries the content on its own, so
              these exist for anyone who can't or won't wait for it. */}
          <div className="mt-7 flex items-center justify-center gap-2.5">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index}
                className={`h-[3px] w-8 transition-colors duration-300 ${
                  i === index ? "bg-ink" : "bg-ink/15 hover:bg-ink/30"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
