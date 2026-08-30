import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* Motion Philosophy: fast start, gentle settle. 0.3–0.65s.
   Nothing snappy, nothing slow. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export const stagger = (gap = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

/** Scroll-triggered reveal. Children animate on the `fadeUp` variant. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — pair with <Stagger.Item>. */
export function Stagger({
  children,
  className = "",
  gap = 0.08,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  amount?: number;
}) {
  return (
    <motion.div
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

Stagger.Item = function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

/* ── Feature Card — depth from canvas→surface shift, never shadow ───── */
export function Card({
  children,
  className = "",
  wash,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  /** pastel tile variant; omit for the default bone-white surface */
  wash?: "lavender" | "mint" | "powder" | "solar" | "violet" | "aqua" | "peach";
  hover?: boolean;
}) {
  // On a white page a white card has no edge, so unwashed cards take a
  // hairline border instead of relying on the canvas/surface colour shift.
  const bg = wash
    ? {
        lavender: "bg-lavender-wash",
        mint: "bg-mint-wash",
        powder: "bg-powder-blue",
        solar: "bg-solar-wash",
        violet: "bg-violet-wash",
        aqua: "bg-aqua-wash",
        peach: "bg-peach-wash",
      }[wash]
    : "bg-white border border-ink/8";

  // On a white page a white card needs a hairline to exist at all — the old
  // canvas→surface shift did that job, and there are no shadows to fall back on.
  const edge = wash ? "" : "border border-ink/[0.08]";

  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.45, ease: EASE }}
      className={`rounded-cards p-10 ${bg} ${edge} ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Pill tag / chip ────────────────────────────────────────────────── */
export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "solid";
}) {
  const styles = {
    default: "bg-powder-blue/60 text-ink",
    accent: "border border-iris-blue/40 text-iris-blue",
    solid: "bg-charcoal text-paper-white",
  }[tone];
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 font-geist text-body-sm font-medium ${styles}`}
    >
      {children}
    </span>
  );
}

/** Page shell — 1200px max, generous margins. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
