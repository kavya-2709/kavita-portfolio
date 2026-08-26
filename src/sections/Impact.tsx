import { motion } from "framer-motion";
import { profile } from "../lib/content";
import { Container, EASE } from "../components/ui";
import { useCountUp } from "../lib/useCountUp";

/**
 * "Ripples of impact" — the −1 m reflections layer.
 *
 * Each number floats at its own height and bobs on the surface, throws a
 * ripple ring outward on a slow loop, and casts a mirrored reflection
 * beneath it. Numbers count up when they scroll into view rather than
 * sitting inert in a row of boxes.
 */

const CONTEXT = [
  "Nine steps became five at Clean4Wheels — and support tickets fell with it.",
  "Across booking, faith-tech, edtech and marketplace products.",
  "Owned from first research call to pixel-accurate handoff.",
];

/** Vertical offsets so the three never sit on one dead horizontal line. */
const OFFSET = [0, 46, 14];
const BOB = [5.5, 6.8, 6.1];

function Stat({
  value,
  label,
  context,
  index,
}: {
  value: string;
  label: string;
  context: string;
  index: number;
}) {
  const { ref, value: shown } = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
      className="relative flex flex-1 justify-center"
      style={{ marginTop: OFFSET[index] }}
    >
      <motion.div
        className="group relative flex flex-col items-center text-center"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: BOB[index], repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ripple rings pushing outward from the number */}
        {[0, 1].map((r) => (
          <motion.span
            key={r}
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 rounded-full border border-iris-blue/35"
            style={{ width: 130, height: 130, marginLeft: -65, marginTop: -78 }}
            animate={{ scale: [0.55, 1.9], opacity: [0.5, 0] }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.5 + r * 2.2,
            }}
          />
        ))}

        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className="font-serif-display relative text-[clamp(3rem,7vw,92px)] leading-none text-ink tabular-nums"
        >
          {shown}
        </span>

        <span className="mt-5 max-w-[190px] font-geist text-body text-ink">{label}</span>
        <span className="mt-1.5 max-w-[200px] font-geist text-body-sm text-graphite">
          {context}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Impact() {
  return (
    <section className="relative py-14 md:py-20">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center font-geist text-caption tracking-[0.3em] text-graphite uppercase"
        >
          Ripples of impact
        </motion.p>

        <div className="mt-16 flex flex-col items-center gap-20 sm:flex-row sm:items-start sm:gap-6">
          {profile.stats.map((s, i) => (
            <Stat
              key={s.label}
              value={s.value}
              label={s.label}
              context={CONTEXT[i]}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
