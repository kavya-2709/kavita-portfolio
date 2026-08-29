/**
 * Case-study card surfaces, shared by the homepage stack and the work index
 * so a card keeps its identity between the two places a visitor meets it.
 *
 * Solid and fully opaque on purpose: the homepage cards physically overlap as
 * they stack, so an alpha tint would show the card underneath through the one
 * on top. The tokens themselves live in `index.css` under `@theme`, and read
 * as shore, reed and water.
 *
 * This sits in its own module rather than in `ui.tsx` because a constant
 * exported from a component file breaks fast refresh for that whole file.
 */
export const CARD_SURFACES = [
  "bg-card-ivory",
  "bg-card-sage",
  "bg-card-stone",
] as const;
