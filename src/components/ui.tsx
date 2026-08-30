import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

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


/**
 * The site's one call to action.
 *
 * Every button on the site is this component. It replaced two different
 * things: a bare label sitting beside an unattached circle, and a separate
 * `Button` whose filled and outlined variants differed by a pixel.
 *
 * The liquid fill rises from the bottom on hover and focus. It was previously
 * on the filled variant only, where dark-on-dark made it nearly invisible;
 * here it runs on every variant and always lands on a contrasting ground, so
 * you can actually see it happen.
 *
 * `as="span"` is for cards already wrapped in a link, since nesting an anchor
 * inside an anchor is invalid and the browser's recovery is not worth relying
 * on. `download` turns it into a file link.
 */
export function ActionLink({
  children,
  to,
  href,
  as,
  arrow = "→",
  size = "md",
  tone = "outline",
  download = false,
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  as?: "span";
  arrow?: string | null;
  size?: "sm" | "md";
  tone?: "outline" | "solid" | "light";
  download?: boolean;
  className?: string;
}) {
  // Two sizes only. Anything needing a third is a sign the layout is off,
  // not that the button scale is short.
  const sizing = {
    sm: "px-5 py-2.5 text-body-sm",
    md: "px-7 py-3.5 text-body",
  }[size];

  // Every tone carries a border, transparent where it isn't drawn: without it
  // the filled and outlined buttons come out a pixel apart, which shows when
  // they sit side by side.
  const tones = {
    outline: "border-ink/20 text-ink hover:text-paper-white",
    solid: "border-transparent bg-charcoal text-paper-white",
    light: "border-white/30 text-paper-white hover:text-ink",
  }[tone];

  // What rises. Each is chosen against its own resting ground so the fill is
  // visible rather than dark sliding over dark.
  const fill = {
    outline: "bg-ink",
    solid: "bg-iris-blue",
    light: "bg-white",
  }[tone];

  const cls = `group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-buttons border font-geist font-medium transition-colors duration-300 ${sizing} ${tones} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-y-0 group-focus-visible/cta:translate-y-0 group-hover:translate-y-0 ${fill}`}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {arrow ? (
          <span
            aria-hidden
            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-0.5 group-hover:translate-x-0.5"
          >
            {arrow}
          </span>
        ) : null}
      </span>
    </>
  );

  if (as === "span" || (!to && !href))
    return <span className={cls}>{inner}</span>;

  if (href)
    return (
      <a
        href={href}
        {...(download
          ? { download: "" }
          : { target: "_blank", rel: "noreferrer" })}
        className={cls}
      >
        {inner}
      </a>
    );

  return (
    <RouterLink to={to!} className={cls}>
      {inner}
    </RouterLink>
  );
}

/** Download glyph for the resume button. */
export function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-[1.05em] ${className}`}
    >
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}
