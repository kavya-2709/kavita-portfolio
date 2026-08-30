/**
 * Koi geometry, shared by the drawing and by everything that animates it.
 *
 * The fish is drawn nose-along-+x, centred on the origin, occupying roughly
 * -28 to +15 on x and -10 to +10 on y. See `components/Koi.tsx`.
 */

/** The tail. Split out because callers animate it independently. */
export const KOI_TAIL_D =
  "M-13 0 C-19 -8, -25 -10, -28 -8 C-25 -3, -25 3, -28 8 C-25 10, -19 8, -13 0 Z";

export const KOI_TAIL_FILL = "#f2622e";

/** Where the tail meets the body, and so what it must pivot about. */
export const KOI_TAIL_PIVOT = { x: -14, y: 0 };
