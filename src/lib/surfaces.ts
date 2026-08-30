import type { CSSProperties } from "react";

/**
 * Per-project palettes, taken from each study's own Figma file rather than
 * derived. These are the exact hexes the designs use.
 *
 * The whole study inherits its palette from CSS variables set on the page
 * root, so a section, a numeral or a button picks up the right colour without
 * every component needing to know which study it is inside.
 *
 * This overrides two of the site's standing rules on case-study pages only,
 * deliberately and at the client's instruction: the page is no longer pure
 * white (studies use warm and dark bands from their designs), and the accent
 * is the project's colour rather than the single iris blue. The homepage,
 * work index and About page are untouched by this.
 *
 * `--lq-brand` is the same value under the name `LiquidButton` reads, so a
 * button inside a study fills with that study's colour.
 */
export type ProjectTheme = {
  /** Pale card fill, used on the work index and homepage stack. */
  surface: string;
  /** Tailwind class for accent text, where a class is more convenient. */
  brand: string;
  /** CSS variables applied to the study's root element. */
  vars: CSSProperties;
};

/**
 * The amber badge on hero tag chips, shared by all three designs.
 *
 * The designs set the label in #ffc300 on #fff8e3, which measures 1.52:1 and
 * is effectively unreadable. The border keeps the design's amber, since a
 * decorative edge carries no text, but the label is darkened to a deeper step
 * of the same hue that clears 4.5:1 on the same ground. This is the one place
 * the Figma colour is not reproduced exactly, and it is on purpose.
 */
const BADGE = {
  "--badge-bg": "#fff8e3",
  "--badge-line": "#ffc300",
  "--badge-ink": "#7a5c00",
} as const;

/** Every study bands its pull-quote on the same near-black. */
const BAND = { "--band": "#383838" } as const;

export const PROJECT_THEME: Record<string, ProjectTheme> = {
  clean4wheels: {
    surface: "bg-card-c4w",
    brand: "text-brand-c4w",
    vars: {
      ...BADGE,
      ...BAND,
      "--brand": "#98002e",
      "--brand-soft": "#fbeef0",
      /** Amber carries the metrics in this design, not the cherry red. */
      "--figure": "#c98322",
      "--figure-bar": "#ffd858",
      "--highlight": "#fff5bf",
      "--section-warm": "#fffcf8",
      "--section-dark": "#2c2c2c",
    } as CSSProperties,
  },
  niopractice: {
    surface: "bg-card-nio",
    brand: "text-brand-nio",
    vars: {
      ...BADGE,
      ...BAND,
      /** #2f99d7 fails contrast on a pale ground, so text uses a darker step. */
      "--brand": "#1f7fbb",
      "--brand-pure": "#2f99d7",
      "--brand-deep": "#2b2266",
      "--brand-soft": "#e0f4ff",
      "--figure": "#1f7fbb",
      "--figure-bar": "#2f99d7",
      "--highlight": "#e0f4ff",
      "--section-warm": "#f7fbfe",
      "--section-dark": "#222539",
    } as CSSProperties,
  },
  housing: {
    surface: "bg-card-housing",
    brand: "text-brand-housing",
    vars: {
      ...BADGE,
      ...BAND,
      "--brand": "#5e23dc",
      "--brand-deep": "#7b28a9",
      "--brand-soft": "#e9dfff",
      "--figure": "#5e23dc",
      "--figure-bar": "#ffe000",
      "--highlight": "#e9dfff",
      "--section-warm": "#faf8ff",
      "--section-dark": "#383535",
    } as CSSProperties,
  },
};

/** Fallback, so an unknown slug never renders unstyled. */
export const NEUTRAL_THEME: ProjectTheme = {
  surface: "bg-mist-gray",
  brand: "text-iris-blue",
  vars: {
    "--brand": "#0069e0",
    "--brand-soft": "#f6f7f8",
    "--figure": "#0069e0",
    "--figure-bar": "#0069e0",
    "--highlight": "#fff2be",
    "--section-warm": "#f6f7f8",
    "--section-dark": "#0a0d12",
    ...BADGE,
    ...BAND,
  } as CSSProperties,
};

export const themeFor = (slug: string): ProjectTheme =>
  PROJECT_THEME[slug] ?? NEUTRAL_THEME;

/**
 * Root style for a study page: its palette, plus the alias the shared button
 * reads so a CTA inside the study fills with the study's own colour.
 */
export const themeVars = (slug: string): CSSProperties => {
  const t = themeFor(slug);
  return { ...t.vars, "--lq-brand": (t.vars as Record<string, string>)["--brand"] } as CSSProperties;
};
