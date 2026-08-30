/**
 * The site's type roles, in one place.
 *
 * Before this, headings were set inline at six different scales across a
 * hundred-odd places (`heading-sm` 28 times, `heading` 27, `heading-lg` 20,
 * `subheading` 15, `display` 9, `hero` 3), so two sections at the same level
 * of the page could differ by 24px for no reason a reader could infer.
 *
 * The rule now: **every section heading is the same size and the same face.**
 * Instrument Serif carries anything that announces a section; Geist carries
 * everything that explains one. Size communicates level, never emphasis.
 *
 * Use these instead of writing heading classes inline. If a heading needs to
 * be a different size, that is a signal it belongs at a different level.
 */
export const TYPE = {
  /** Page title. One per page, and only ever on an h1. */
  h1: "font-serif-display text-ink font-normal text-[clamp(2.5rem,5vw,4rem)] leading-[1.04] tracking-[-0.03em]",

  /** Section heading. The workhorse: identical everywhere on every page. */
  h2: "font-serif-display text-ink font-normal text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.02em]",

  /** Sub-section inside a section. Geist, because it labels rather than announces. */
  h3: "font-geist text-ink text-subheading font-medium tracking-[-0.01em]",

  /** Smallest titled thing: a card heading. */
  h4: "font-geist text-ink text-body font-medium",

  /** The line under a heading. */
  lead: "font-geist text-graphite text-body-lg",

  /** Running text. */
  body: "font-geist text-graphite text-body",

  /** Supporting detail, captions, notes. */
  small: "font-geist text-graphite text-body-sm",

  /** Uppercase label above a heading. */
  eyebrow: "font-geist text-caption text-fog uppercase tracking-[0.11em]",
} as const;

/**
 * Inverted variants, for the dark sections inside case studies.
 * Same sizes, so a dark section never changes the page's rhythm.
 */
export const TYPE_INVERT = {
  h2: "font-serif-display text-paper-white font-normal text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.02em]",
  lead: "font-geist text-white/70 text-body-lg",
  eyebrow: "font-geist text-caption text-white/50 uppercase tracking-[0.11em]",
} as const;
