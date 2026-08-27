import { motion } from "framer-motion";
import { EASE } from "./ui";

/**
 * SVG-only water kit — no canvas.
 *
 * The homepage hero already pays for a full ripple simulation; these pieces
 * give the rest of the site the same pond language for a few kilobytes of
 * markup. Everything here is decorative and `aria-hidden`.
 */

/* ── Section joiner ──────────────────────────────────────────────────
   Sections meet on a hand-drawn waterline, never a hard edge. The wave
   is filled with the colour of the section *arriving* underneath it, so
   it reads as one body of water rising into the next environment. */
export function WaveDivider({
  className = "text-powder-blue",
  flip = false,
  height = 96,
}: {
  /** `text-*` sets the fill — use the incoming section's colour. */
  className?: string;
  /** Mirror vertically, for a section ending rather than beginning. */
  flip?: boolean;
  height?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative w-full leading-[0] ${className}`}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* far swell, softened */}
        <path
          d="M0 52 C 200 12, 340 84, 560 62 C 780 40, 900 6, 1120 30 C 1280 48, 1360 74, 1440 62 L1440 96 L0 96 Z"
          fill="currentColor"
          opacity="0.45"
        />
        {/* near swell */}
        <path
          d="M0 68 C 180 40, 320 96, 540 78 C 760 60, 940 34, 1160 54 C 1300 66, 1380 88, 1440 80 L1440 96 L0 96 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/* ── Lily pad ────────────────────────────────────────────────────────
   A disc with a wedge cut out of it. One arc from -20° to +20° the *long*
   way round — 320° of travel, so large-arc = 1, and counter-clockwise, so
   sweep = 0. Both centres are equidistant from the two endpoints; sweep = 1
   picks the one at x≈144 and the pad renders as a 144-wide blob hanging off
   the right edge instead of a 100×100 disc. Verified via getBBox. */
export function LilyPad({
  className = "",
  tone = "mint",
}: {
  className?: string;
  tone?: "mint" | "aqua" | "powder";
}) {
  const fill = { mint: "#d3f6e3", aqua: "#c2e9ff", powder: "#cce7ff" }[tone];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 50 L96.98 32.90 A50 50 0 1 0 96.98 67.10 Z"
        fill={fill}
      />
      {/* two veins, kept inside the pad */}
      <path
        d="M50 50 L18 30 M50 50 L18 70 M50 50 L50 12"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/* ── Ripple rings ────────────────────────────────────────────────────
   Rings expanding from a single point, on a loop. */
export function RippleRings({
  className = "",
  count = 3,
  duration = 5,
}: {
  className?: string;
  count?: number;
  duration?: number;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="border-powder-blue absolute inset-0 rounded-full border"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 1], opacity: [0, 0.7, 0] }}
          transition={{
            duration,
            delay: (i * duration) / count,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Koi ─────────────────────────────────────────────────────────────
   The same fish that swims the homepage, reduced to a still silhouette. */
export function Koi({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="koi-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd1b8" />
          <stop offset="100%" stopColor="#ff9e6b" />
        </linearGradient>
      </defs>
      {/* tail */}
      <path d="M104 32 C 112 18, 118 14, 120 12 C 116 24, 116 40, 120 52 C 118 50, 112 46, 104 32 Z" fill="url(#koi-body)" opacity="0.85" />
      {/* body */}
      <ellipse cx="56" cy="32" rx="50" ry="18" fill="url(#koi-body)" />
      {/* dorsal fin */}
      <path d="M50 15 C 58 4, 70 6, 74 16 Z" fill="#ff9e6b" opacity="0.7" />
      {/* eye */}
      <circle cx="18" cy="28" r="3.2" fill="#0a0d12" />
      {/* a couple of pale markings */}
      <ellipse cx="46" cy="26" rx="9" ry="6" fill="#ffffff" opacity="0.45" />
      <ellipse cx="74" cy="36" rx="7" ry="5" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}

/* ── Koi that swims a short loop across its container ────────────────
   Used as a moving accent rather than a scroll-scrubbed path. */
export function DriftingKoi({
  className = "",
  duration = 22,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      initial={{ x: "-12%", opacity: 0 }}
      animate={{ x: ["-12%", "112%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        opacity: { duration, delay, repeat: Infinity, times: [0, 0.1, 0.9, 1] },
      }}
    >
      <Koi className="w-full" />
    </motion.div>
  );
}

/* ── Caustic light band ──────────────────────────────────────────────
   Soft overlapping radials — the dappled light on the floor of a pond. */
export function Caustics({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          "radial-gradient(60% 40% at 20% 30%, rgba(194,233,255,0.55) 0%, rgba(194,233,255,0) 70%)," +
          "radial-gradient(45% 35% at 78% 20%, rgba(211,246,227,0.5) 0%, rgba(211,246,227,0) 70%)," +
          "radial-gradient(55% 45% at 60% 85%, rgba(204,231,255,0.5) 0%, rgba(204,231,255,0) 70%)",
      }}
    />
  );
}

/* ── Mono-ish instructional cue ──────────────────────────────────────
   The reference site invites its interactions out loud instead of
   hiding them. No mono face exists in this system, so the cue is Geist
   at caption size, uppercased and tracked wide. */
export function Cue({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="font-geist text-caption text-fog block uppercase"
      style={{ letterSpacing: "0.18em" }}
    >
      {children}
    </motion.span>
  );
}
