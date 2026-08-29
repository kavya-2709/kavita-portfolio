/**
 * Tactile paper objects — the scrapbook layer.
 *
 * Small collected things rather than icons: a shell, a piece of sea glass, a
 * pebble, a torn strip of tape. They sit on the page like objects placed by
 * hand, so every one of them is drawn slightly off-square.
 *
 * Colours are the `@theme` wash values written as literals, matching the
 * existing convention in `Floaties.tsx` — SVG fills can't take Tailwind
 * utilities, and these are the same hexes the tokens resolve to.
 */

/* peach-wash #ffd1b8 · aqua-wash #c2e9ff · mint-wash #d3f6e3
   powder-blue #cce7ff · solar-wash #fff2be · mist-gray #f6f7f8 · fog #93979f */

/** Scallop shell — fan of ribs over a rounded body. */
export function Shell({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 92" className={className} aria-hidden="true">
      <path
        d="M50 88 C 20 88 4 64 6 40 C 8 16 28 4 50 4 C 72 4 92 16 94 40 C 96 64 80 88 50 88 Z"
        fill="#ffd1b8"
      />
      {/* ribs radiate from the hinge at the bottom */}
      {[-52, -34, -17, 0, 17, 34, 52].map((deg) => (
        <path
          key={deg}
          d="M50 84 L50 12"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
          transform={`rotate(${deg} 50 84)`}
        />
      ))}
      {/* hinge */}
      <path d="M38 86 Q 50 78 62 86" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

/** Sea glass — a worn, frosted shard. Deliberately irregular. */
export function SeaGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 84" className={className} aria-hidden="true">
      <path
        d="M14 44 C 10 22 30 6 54 8 C 78 10 94 26 92 48 C 90 70 70 80 48 78 C 28 76 18 64 14 44 Z"
        fill="#c2e9ff"
      />
      <path
        d="M30 34 C 38 22 56 20 68 26"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/** Smooth pebble, with the one pale band they always seem to have. */
export function Pebble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 72" className={className} aria-hidden="true">
      <path
        d="M8 40 C 6 20 26 6 50 6 C 76 6 96 18 94 40 C 92 60 72 68 50 68 C 28 68 10 60 8 40 Z"
        fill="#e6e8ec"
      />
      <path
        d="M22 46 C 36 36 62 34 80 42"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/** Two hand-drawn swell lines. The only "doodle" in the composition. */
export function WaveDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 34" className={className} aria-hidden="true">
      <path
        d="M2 12 C 14 2, 26 22, 38 12 C 50 2, 62 22, 74 12 C 86 2, 98 22, 118 10"
        fill="none"
        stroke="#93979f"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 26 C 22 18, 34 32, 46 24 C 58 16, 70 30, 82 23"
        fill="none"
        stroke="#93979f"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * A torn strip of masking tape.
 *
 * The two ends are ragged rather than straight — a clean rectangle reads as
 * a UI chip, which is the one thing this element must not look like.
 */
export function Tape({
  className = "",
  tone = "peach",
}: {
  className?: string;
  tone?: "peach" | "mint" | "solar" | "aqua";
}) {
  const fill = {
    peach: "#ffd1b8",
    mint: "#d3f6e3",
    solar: "#fff2be",
    aqua: "#c2e9ff",
  }[tone];
  return (
    <svg viewBox="0 0 64 34" className={className} aria-hidden="true">
      <path
        d="M3 5 L9 2 L15 5 L22 2 L29 5 L36 2 L43 5 L50 2 L57 5 L61 3 L61 30 L55 32 L47 29 L40 32 L33 29 L26 32 L18 29 L11 32 L3 29 Z"
        fill={fill}
        opacity="0.9"
      />
      {/* the sheen along the middle of real tape */}
      <path d="M4 15 L60 15" stroke="#ffffff" strokeWidth="3" opacity="0.45" />
    </svg>
  );
}

/** Starfish — five arms, tapered, with the speckled centre they have. */
export function Starfish({ className = "" }: { className?: string }) {
  // Arm tips and the valleys between them, walked alternately around the
  // centre. Building the outline from real polar coordinates keeps the arms
  // even; hand-guessed control points always drift.
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? 46 : 17;
    return `${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`;
  });

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d={`M${pts[0]} ${pts
          .slice(1)
          .map((p, i) => (i % 2 === 0 ? `Q ${p}` : `${p}`))
          .join(" ")} Z`}
        fill="#ffd1b8"
      />
      <g fill="#ffffff" opacity="0.6">
        <circle cx="50" cy="44" r="2.4" />
        <circle cx="44" cy="53" r="2" />
        <circle cx="57" cy="54" r="2" />
        <circle cx="50" cy="60" r="1.8" />
      </g>
    </svg>
  );
}

/** A sprig of coral. Reads as seaweed at small sizes, which is fine. */
export function Coral({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke="#cce7ff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 98 L40 52" />
        <path d="M40 74 C 30 68, 22 56, 20 42" />
        <path d="M40 66 C 52 60, 60 48, 62 34" />
        <path d="M40 52 C 36 40, 38 26, 44 14" />
        <path d="M20 42 C 14 36, 12 28, 13 20" />
        <path d="M62 34 C 68 28, 70 22, 69 15" />
      </g>
    </svg>
  );
}

/** A small sun — concentric disc and a ring of short rays. */
export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="22" fill="#fff2be" />
      <g stroke="#fff2be" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI / 6) * i;
          const x1 = 50 + 30 * Math.cos(a);
          const y1 = 50 + 30 * Math.sin(a);
          const x2 = 50 + 40 * Math.cos(a);
          const y2 = 50 + 40 * Math.sin(a);
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} />;
        })}
      </g>
    </svg>
  );
}

/* ── Notebook stickers ────────────────────────────────────────────────
   Four small drawings for the "How I work" cards. Deliberately not icon-set
   geometry: the strokes are uneven, the circles aren't quite circles, and
   nothing is centred perfectly. Each sits on a torn paper backing so it
   reads as something stuck on rather than rendered in.

   Ink is `--color-ink`; the single accent touch per sticker is iris blue,
   used at most twice so the row doesn't turn into a colour wheel. */

const INK = "#0a0d12";
const ACCENT = "#0069e0";

/** Shared paper backing — an off-square blob, never a rounded rect. */
function Backing() {
  return (
    <path
      d="M8 12 C 8 6, 14 3, 22 3 L60 4 C 70 4, 75 9, 75 17 L74 58 C 74 68, 68 74, 58 74 L20 73 C 10 73, 5 67, 6 57 Z"
      fill="#ffffff"
      stroke="rgba(10,13,18,0.10)"
      strokeWidth="1.5"
    />
  );
}

/** 01 — a lens with a compass needle inside it. Curiosity + investigation. */
export function StickerLens({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <Backing />
      <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* lens — drawn as two arcs so it closes slightly off-round */}
        <path d="M35 16 C 47 15, 55 24, 54 34 C 53 44, 44 51, 34 50 C 24 49, 17 41, 18 31 C 19 22, 26 17, 35 16 Z" />
        {/* handle */}
        <path d="M48 47 L62 62" strokeWidth="3.4" />
      </g>
      {/* compass needle, one half inked, one half accent */}
      <path d="M36 23 L40 33 L36 43 L32 33 Z" fill={INK} />
      <path d="M36 23 L40 33 L36 33 Z" fill={ACCENT} />
    </svg>
  );
}

/** 02 — a folded map with a route running across it. Navigating complexity. */
export function StickerMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <Backing />
      {/* the sheet, with creased top and bottom edges */}
      <path
        d="M14 26 L30 21 L47 27 L65 21 L64 53 L47 59 L30 53 L15 58 Z"
        fill="none"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* fold lines */}
      <path d="M30 21 L30 53 M47 27 L47 59" stroke={INK} strokeWidth="1.6" opacity="0.45" />
      {/* the route */}
      <path
        d="M22 47 C 30 40, 33 44, 40 38 C 46 33, 50 36, 57 30"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      {/* arrowhead at the end of the route */}
      <path d="M53 29 L58 29 L57 34" fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 03 — a drafting grid with one sparkle on it. Systems + craft. */
export function StickerGrid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <Backing />
      {/* frame, corners not quite square */}
      <path
        d="M19 22 L59 20 L61 57 L21 59 Z"
        fill="none"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* rules, hand-run so they wander a little */}
      <g stroke={INK} strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
        <path d="M32 21 L33 58" />
        <path d="M46 20.5 L47 57.5" />
        <path d="M20 34 L60 32.5" />
        <path d="M20.5 46 L60.5 44.5" />
      </g>
      {/* the sparkle — four-point, the one bit of shine */}
      <path
        d="M52 30 C 53 36, 55 38, 61 39 C 55 40, 53 42, 52 48 C 51 42, 49 40, 43 39 C 49 38, 51 36, 52 30 Z"
        fill={ACCENT}
      />
    </svg>
  );
}

/** 04 — a pencil inside a loop. Making, then making it again. */
export function StickerLoop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <Backing />
      {/* the iteration loop, left open so the arrow can close it */}
      <path
        d="M60 30 C 66 40, 60 55, 45 58 C 30 61, 17 52, 17 40 C 17 30, 24 23, 33 21"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M28 15 L34 21 L27 26" fill="none" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* pencil, tilted through the loop */}
      <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
        <path d="M31 50 L48 31" />
        <path d="M31 50 L28 54 L33 53 Z" fill={INK} />
        <path d="M44 27 L52 35 L48 39 L40 31 Z" />
        <path d="M42 29 L50 37" strokeWidth="1.4" opacity="0.45" />
      </g>
    </svg>
  );
}

/** Push pin, seen from the front. Used where tape would be too casual. */
export function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <circle cx="14" cy="14" r="9" fill="#cce7ff" />
      <circle cx="11" cy="11" r="3" fill="#ffffff" opacity="0.75" />
      <circle cx="14" cy="14" r="9" fill="none" stroke="#93979f" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

/**
 * Board pin, seen at a slight angle — domed head, collar, and the needle
 * disappearing into the paper. Pressed into the top of each note.
 */
export function BoardPin({
  className = "",
  tone = "powder",
}: {
  className?: string;
  tone?: "powder" | "peach" | "mint" | "solar";
}) {
  const head = {
    powder: "#cce7ff",
    peach: "#ffd1b8",
    mint: "#d3f6e3",
    solar: "#fff2be",
  }[tone];
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true">
      {/* needle, angled so the pin doesn't read as a flat sticker */}
      <path
        d="M16 22 L18 38"
        stroke="#93979f"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* collar */}
      <rect x="10" y="18" width="12" height="5" rx="2.5" fill={head} opacity="0.75" />
      {/* domed head */}
      <circle cx="16" cy="13" r="10" fill={head} />
      <circle cx="16" cy="13" r="10" fill="none" stroke="#93979f" strokeWidth="0.9" opacity="0.3" />
      {/* the highlight that makes it read as domed rather than flat */}
      <ellipse cx="12.5" cy="9.5" rx="3.4" ry="2.6" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}
