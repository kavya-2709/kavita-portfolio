import { motion } from "framer-motion";

/**
 * Whimsical 3D-ish objects that float in the canvas with no card,
 * border, or shadow plate — the brand voice, not decoration.
 * Soft gradients + rounded forms give the squishy, clay-render feel.
 */

const Defs = () => (
  <defs>
    <linearGradient id="g-aqua" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#e5f6ff" />
      <stop offset="100%" stopColor="#c2e9ff" />
    </linearGradient>
    <linearGradient id="g-violet" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#f4ebff" />
      <stop offset="100%" stopColor="#e4ccff" />
    </linearGradient>
    <linearGradient id="g-peach" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#fff2eb" />
      <stop offset="100%" stopColor="#ffd1b8" />
    </linearGradient>
    <linearGradient id="g-solar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#fff9e0" />
      <stop offset="100%" stopColor="#ffeca3" />
    </linearGradient>
    <linearGradient id="g-mint" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#eafaf1" />
      <stop offset="100%" stopColor="#d3f6e3" />
    </linearGradient>
    <linearGradient id="g-iris" x1="0" y1="0" x2="0" y2="1">
      <stop offset="11%" stopColor="#479dff" />
      <stop offset="78%" stopColor="#0069e0" />
    </linearGradient>
  </defs>
);

/** Soft cloud */
export const Cloud = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 72" className={className} aria-hidden="true">
    <Defs />
    <g fill="url(#g-aqua)">
      <circle cx="36" cy="42" r="24" />
      <circle cx="64" cy="32" r="28" />
      <circle cx="92" cy="46" r="20" />
      <rect x="30" y="46" width="66" height="20" rx="10" />
    </g>
  </svg>
);

/** Crayon / pen stroke */
export const Crayon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 120" className={className} aria-hidden="true">
    <Defs />
    <rect x="10" y="26" width="28" height="82" rx="14" fill="url(#g-violet)" />
    <path d="M24 4 L38 30 H10 Z" fill="url(#g-iris)" />
    <rect x="10" y="52" width="28" height="8" fill="#ffffff" opacity="0.55" />
  </svg>
);

/** Floating envelope */
export const Envelope = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 88" className={className} aria-hidden="true">
    <Defs />
    <rect x="6" y="12" width="108" height="72" rx="18" fill="url(#g-peach)" />
    <path
      d="M14 26 L60 58 L106 26"
      fill="none"
      stroke="#ffffff"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Smiley blob */
export const Smiley = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
    <Defs />
    <circle cx="48" cy="48" r="42" fill="url(#g-solar)" />
    <circle cx="34" cy="40" r="5.5" fill="#0a0d12" />
    <circle cx="62" cy="40" r="5.5" fill="#0a0d12" />
    <path
      d="M30 60 Q48 76 66 60"
      fill="none"
      stroke="#0a0d12"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

/** Flower / sparkle bloom */
export const Bloom = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <Defs />
    <g fill="url(#g-mint)">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="50" cy="26" rx="15" ry="24" transform={`rotate(${deg} 50 50)`} />
      ))}
    </g>
    <circle cx="50" cy="50" r="14" fill="url(#g-solar)" />
  </svg>
);

/** The vivid iris accent object — one per scene, max */
export const IrisBlob = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
    <Defs />
    <path
      d="M48 6 C70 6 90 26 90 48 C90 70 70 90 48 90 C26 90 6 70 6 48 C6 26 26 6 48 6 Z"
      fill="url(#g-iris)"
    />
    <circle cx="34" cy="34" r="10" fill="#ffffff" opacity="0.35" />
  </svg>
);

/** Wraps a floaty with a slow, organic drift. */
export function Float({
  children,
  className = "",
  delay = 0,
  duration = 7,
  drift = 14,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  drift?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={{ y: [0, -drift, 0], rotate: [0, 3, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
