/**
 * Per-project colour, shared by the homepage stack, the work index and each
 * case-study page.
 *
 * Each project carries a pale tint of its own brand colour, taken from that
 * project's Figma file: Clean4Wheels #98002e, NioPractice #2f99d7, Housing
 * #5e23dc. The card and the study it opens are the same colour, so the tint
 * does work rather than decoration — it tells you where you are.
 *
 * The tints are solid and fully opaque: the homepage cards physically overlap
 * as they stack, so an alpha tint would show the card underneath.
 *
 * `brand` is darkened where the raw hex would fail contrast on a pale tint.
 * NioPractice's #2f99d7 is the case: it lands near 2.9:1 on white, so the
 * accent here is #1f7fbb, which clears 4.5:1 while reading as the same blue.
 *
 * This sits outside `ui.tsx` because a constant exported from a component
 * file breaks fast refresh for that whole file.
 */
export type ProjectTheme = {
  /** Pale card fill. */
  surface: string;
  /** Accent for rules, numerals and the section index. */
  brand: string;
  /** Same accent as a border at low alpha. */
  hairline: string;
};

export const PROJECT_THEME: Record<string, ProjectTheme> = {
  clean4wheels: {
    surface: "bg-card-c4w",
    brand: "text-brand-c4w",
    hairline: "border-brand-c4w/20",
  },
  niopractice: {
    surface: "bg-card-nio",
    brand: "text-brand-nio",
    hairline: "border-brand-nio/20",
  },
  housing: {
    surface: "bg-card-housing",
    brand: "text-brand-housing",
    hairline: "border-brand-housing/20",
  },
};

/** Fallback for a slug with no theme, so a new study never renders unstyled. */
export const NEUTRAL_THEME: ProjectTheme = {
  surface: "bg-mist-gray",
  brand: "text-iris-blue",
  hairline: "border-ink/10",
};

export const themeFor = (slug: string): ProjectTheme =>
  PROJECT_THEME[slug] ?? NEUTRAL_THEME;
