import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../lib/content";
import { Container, EASE } from "../components/ui";

/**
 * Avatar-switched testimonials.
 *
 * Quotes run 296–532 characters, so the card animates its own height rather
 * than reserving a fixed block — a min-height tall enough for the longest
 * quote leaves a dead gap under the shortest one.
 *
 * Autoplay advances every 9s with a progress ring drawn around the active
 * face, so the section moves on its own but never hides that it's clickable.
 * Hovering pauses it; clicking a face takes over.
 */

const DURATION = 9000;
const R = 30;
const CIRC = 2 * Math.PI * R;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[i];

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(
      () => setI((n) => (n + 1) % testimonials.length),
      DURATION
    );
    return () => window.clearTimeout(t);
  }, [i, paused]);

  return (
    <section
      className="relative py-14 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-geist text-caption text-graphite text-center tracking-[0.3em] uppercase"
          >
            In their words
          </motion.p>

          <motion.div
            layout
            transition={{ duration: 0.55, ease: EASE }}
            className="border-ink/[0.07] bg-paper-white rounded-cards relative mt-8 overflow-hidden border px-6 py-12 md:px-14 md:py-16"
          >
            {/* soft tint so a white card on a white page still has presence */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
              style={{ background: "var(--color-powder-blue)" }}
            />

            <span
              aria-hidden
              className="font-serif-display text-iris-blue/15 pointer-events-none absolute top-2 left-5 text-[120px] leading-none select-none md:left-10 md:text-[160px]"
            >
              &ldquo;
            </span>

            <div className="relative">
              {/* One element, plain transition objects — no nested variants.
                  A staggered-children version stalled: if any child can't
                  resolve the exit variant, the parent's exit never settles and
                  mode="wait" refuses to mount the next quote, so the text
                  froze while the avatars kept switching. */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.name}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-serif-display text-ink text-center text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.45] tracking-[-0.015em]"
                >
                  {active.quote}
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.name}-meta`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-10 text-center"
                >
                  <p className="font-geist text-body text-ink font-medium">
                    {active.name}
                  </p>
                  <p className="font-geist text-body-sm text-fog mt-1">
                    {active.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* avatar picker with an autoplay progress ring */}
          <div className="mt-10 flex items-center justify-center gap-5">
            {testimonials.map((t, n) => {
              const on = n === i;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Read what ${t.name} said`}
                  aria-pressed={on}
                  className="group relative flex items-center justify-center"
                  style={{ width: 72, height: 72 }}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 72 72"
                    className="absolute inset-0 -rotate-90"
                    style={{ width: 72, height: 72 }}
                  >
                    <circle
                      cx="36"
                      cy="36"
                      r={R}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-ink/[0.07]"
                    />
                    {on && (
                      <motion.circle
                        key={`${i}-${paused}`}
                        cx="36"
                        cy="36"
                        r={R}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-iris-blue"
                        strokeDasharray={CIRC}
                        initial={{ strokeDashoffset: CIRC }}
                        animate={{ strokeDashoffset: paused ? CIRC * 0.999 : 0 }}
                        transition={{
                          duration: paused ? 0 : DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </svg>

                  <motion.img
                    src={t.photo}
                    alt=""
                    animate={{ scale: on ? 1 : 0.82, opacity: on ? 1 : 0.45 }}
                    whileHover={{ scale: on ? 1 : 0.92, opacity: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="border-paper-white h-12 w-12 rounded-full border-2 object-cover"
                  />

                  <span className="font-geist text-caption text-graphite pointer-events-none absolute -bottom-1 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
