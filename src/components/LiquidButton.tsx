import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * The site's only button.
 *
 * Gooey liquid-morph fill, matching the reference component: three circles
 * sit at `scale(0)` behind the label and expand on hover, staggered by 50ms,
 * under an SVG filter that blurs them and then re-sharpens the alpha. The
 * blur makes the circles bleed into each other and the alpha ramp cuts the
 * soft edge back to a hard one, so three separate dots read as a single
 * liquid mass rising through the button.
 *
 * The filter is defined once for the whole document by `LiquidFilter`, which
 * `App` renders. Every button points at that one id: defining it per button
 * would put an identical filter in the DOM for every CTA on the page.
 *
 * **Contrast is the part that matters.** The fill lands on top of the resting
 * background, so the label has to change colour with it or it disappears the
 * moment the blobs arrive. Each tone therefore declares three things that are
 * checked together: resting ground, blob colour, and the label colour once
 * the blobs cover it.
 */

/** Shared id, so every button references one filter rather than its own. */
export const GOO_FILTER_ID = "liquid-goo";

/**
 * The gooey filter itself. Rendered once, near the root.
 *
 * `stdDeviation` sets how far the circles bleed together; the alpha row
 * `18 -8` is what turns that blur back into a hard edge. Lower the 18 and
 * the fill goes foggy, raise the -8 and the blobs stop merging.
 */
export function LiquidFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0"
    >
      <defs>
        <filter id={GOO_FILTER_ID}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

type Tone = "solid" | "outline" | "light" | "brand";

/**
 * Resting ground, what rises, and what the label becomes once covered.
 *
 * Every pair here is deliberately high-contrast in both states: dark ground
 * takes a light fill and a dark label, light ground the reverse. A tone whose
 * label stayed one colour through the transition would be unreadable for the
 * half-second the fill is crossing it.
 */
const TONES: Record<
  Tone,
  { base: string; blob: string; label: string; hoverLabel: string }
> = {
  /** Dark button on a light page. */
  solid: {
    base: "bg-charcoal border-transparent",
    blob: "bg-white",
    label: "text-paper-white",
    hoverLabel: "group-hover/lq:text-ink group-focus-visible/lq:text-ink",
  },
  /** Outlined button on a light page. */
  outline: {
    base: "bg-transparent border-ink/20",
    blob: "bg-ink",
    label: "text-ink",
    hoverLabel:
      "group-hover/lq:text-paper-white group-focus-visible/lq:text-paper-white",
  },
  /** On a dark section. */
  light: {
    base: "bg-transparent border-white/35",
    blob: "bg-white",
    label: "text-paper-white",
    hoverLabel: "group-hover/lq:text-ink group-focus-visible/lq:text-ink",
  },
  /** Inherits the current case study's colour via `--lq-brand`. */
  brand: {
    base: "bg-transparent border-[color:var(--lq-brand,theme(colors.ink))]/30",
    blob: "bg-[color:var(--lq-brand,#0a0d12)]",
    label: "text-[color:var(--lq-brand,#0a0d12)]",
    hoverLabel:
      "group-hover/lq:text-paper-white group-focus-visible/lq:text-paper-white",
  },
};

/** Three blobs, staggered, so the fill arrives as a wave rather than a wall. */
function Blobs({ blob }: { blob: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ filter: `url(#${GOO_FILTER_ID})` }}
    >
      {[0, 0.05, 0.1].map((delay, i) => (
        <span
          key={delay}
          // Translate and scale are both utilities so Tailwind composes them
          // into one transform. Setting `transform` inline here instead would
          // win over the class and the blob would never leave scale(0) — the
          // fill simply would not happen.
          className={`absolute top-1/2 aspect-square w-[65%] -translate-y-1/2 scale-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/lq:scale-100 group-focus-visible/lq:scale-100 ${blob}`}
          style={{
            // Spread across the width so the merged mass covers the whole
            // button rather than bulging out of the middle. `left` is safe to
            // set inline: it is not part of the transform.
            left: `${i * 32 - 6}%`,
            transitionDelay: `${delay}s`,
          }}
        />
      ))}
    </span>
  );
}

export function LiquidButton({
  children,
  to,
  href,
  as,
  tone = "outline",
  size = "md",
  download = false,
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  /** For cards that are already a link: an anchor inside an anchor is invalid. */
  as?: "span";
  tone?: Tone;
  size?: "sm" | "md";
  download?: boolean;
  className?: string;
}) {
  const t = TONES[tone];
  const sizing = {
    sm: "px-5 py-2.5 text-body-sm",
    md: "px-7 py-3.5 text-body",
  }[size];

  // Every tone carries a border, transparent where it isn't drawn, or filled
  // and outlined buttons come out a pixel apart when they sit side by side.
  const cls = `group/lq rounded-buttons relative isolate inline-flex items-center justify-center overflow-hidden border font-geist font-medium ${sizing} ${t.base} ${className}`;

  const inner = (
    <>
      <Blobs blob={t.blob} />
      <span
        className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${t.label} ${t.hoverLabel}`}
      >
        {children}
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

/** Download glyph, for the resume button. */
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
