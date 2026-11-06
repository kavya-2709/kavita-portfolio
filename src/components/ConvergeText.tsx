import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./ui";

/**
 * Letters that fan out from the centre of the line and converge into place.
 *
 * Adapted from skiper-ui's skiper31 (gxuri, https://x.com/Gur__vi), which
 * does this on scroll scrub via Lenis. Three deliberate departures:
 *
 *  - **No Lenis.** It is a site-wide smooth-scroll hijack, and this codebase
 *    already has its own scroll rules, including a `behavior: "instant"`
 *    requirement on route changes that a scroll library would fight.
 *    Triggering on view gives the same read without taking over the page.
 *
 *  - **Split by word, then by letter.** The original gives each character its
 *    own inline-block and pads spaces to a fixed `w-4`. That breaks wrapping
 *    mid-word and sizes the gap wrong for display type. Here whole words are
 *    the wrapping unit and the spaces between them are real siblings, which
 *    is the rule the rest of this codebase already follows.
 *
 *  - **Offsets are normalised, not per-index.** `distanceFromCenter * 50`
 *    is fine for a short word and absurd for a sentence: a 100-character
 *    line would throw its outermost letters 2500px. Distance is scaled to
 *    [-1, 1] across the line instead, so a two-word title and a long
 *    statement fan by the same visible amount.
 *
 * The letters are decoration: the full string is on the wrapper as an
 * `aria-label` and every span is hidden, or a screen reader would read the
 * line out one character at a time.
 */
export default function ConvergeText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  /** Peak horizontal throw of the outermost letters, in pixels. */
  spread = 90,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
  delay?: number;
  spread?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  // Index every character across the whole line so the fan is symmetrical
  // about the line's centre rather than about each word's centre.
  const total = text.length;
  const centre = (total - 1) / 2;
  // Where each word starts in the full string, computed up front rather than
  // by mutating a counter inside the render.
  const starts = words.reduce<number[]>(
    (acc, _word, i) =>
      [...acc, i === 0 ? 0 : acc[i - 1] + words[i - 1].length + 1],
    [],
  );

  return (
    // `overflow-x: clip` because the outermost letters begin up to `spread`
    // px outside the line's final box. Without it they widen the document
    // while they converge: a centred statement on a phone added 46px of
    // horizontal scroll, which is a page-wide bug from a decorative effect.
    // `clip` rather than `hidden`, so this never becomes a scroll container.
    <Tag className={`block overflow-x-clip ${className}`} aria-label={text}>
      {words.map((word, w) => {
        const chars = [...word];
        const node = (
          <span key={`${word}-${w}`} aria-hidden className="inline-block">
            {chars.map((ch, c) => {
              const i = starts[w] + c;
              // -1 at the first character, +1 at the last, 0 in the middle.
              const t = centre === 0 ? 0 : (i - centre) / centre;
              return (
                <motion.span
                  key={`${ch}-${c}`}
                  className="inline-block"
                  initial={{
                    x: t * spread,
                    y: Math.abs(t) * 24,
                    rotate: t * 9,
                    opacity: 0,
                  }}
                  whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.85,
                    ease: EASE,
                    // Centre letters settle first and the ends follow, so
                    // the line reads as closing inwards.
                    delay: delay + Math.abs(t) * 0.28,
                  }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        );
        // The gap is a sibling of the inline-block, never inside it.
        return w < words.length - 1 ? (
          <Fragment key={`${word}-${w}-f`}>
            {node}{" "}
          </Fragment>
        ) : (
          node
        );
      })}
    </Tag>
  );
}
