import { Fragment } from "react";
import { motion } from "framer-motion";
import { Container, EASE } from "../components/ui";

/**
 * The statement moment: what I believe, then what I've shipped.
 *
 * The belief leads as the header; the record sits under it as supporting
 * subtext. Text flows and wraps naturally — the reveal is per-word rather
 * than per-line, because hard-broken lines re-wrap mid-phrase at other
 * widths.
 */

const BELIEF =
  "I believe every interaction tells a story, and I'm here to make sure yours is one worth remembering.";

const RECORD =
  "Five teams across booking platforms, faith-tech, edtech and marketplaces – from a nine-step checkout cut to five at Clean4Wheels, to fifteen end-to-end flows shipped for a faith-tech app, to a practice hub that lifted test completion by 28%.";

function Words({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.018, delayChildren: delay } } }}
      className={className}
    >
      {/* The word-gap must be a SIBLING of the inline-block wrapper. Put it
          inside and inline-block strips the trailing whitespace, so every
          word renders flush against the next. */}
      {text.split(" ").map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "115%" },
                show: { y: 0, transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {" "}
        </Fragment>
      ))}
    </motion.p>
  );
}

export default function Intro() {
  return (
    <section id="intro" className="relative pt-28 pb-14 md:pt-40 md:pb-20">
      <Container>
        <div className="mx-auto max-w-[1000px] text-center">
          <Words
            text={BELIEF}
            className="text-[clamp(1.5rem,3.6vw,3rem)] leading-[1.28] font-medium tracking-[-0.025em] text-ink"
          />

          <div className="h-8 md:h-12" />

          <Words
            text={RECORD}
            className="mx-auto max-w-[820px] text-[clamp(1rem,1.9vw,1.375rem)] leading-[1.5] font-normal tracking-[-0.01em] text-graphite"
            delay={0.18}
          />

          <motion.span
            aria-hidden
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.9 }}
            className="mt-14 inline-block h-2.5 w-2.5 rounded-full bg-ink"
          />
        </div>
      </Container>
    </section>
  );
}
