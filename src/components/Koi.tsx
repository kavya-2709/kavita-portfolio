import type { Ref } from "react";
import { KOI_TAIL_D, KOI_TAIL_FILL } from "../lib/koi";

/**
 * The site's koi, drawn once.
 *
 * Both the scroll-scrubbed `FishTrail` and the `Loader` render this, so the
 * fish that swims down the homepage and the fish that loads the page are the
 * same animal. Geometry and the tail pivot live in `lib/koi.ts`.
 *
 * The body is saturated orange rather than white: the page is white, and a
 * white-bellied koi vanished into it. White is an accent only.
 */

/** Everything forward of the tail: fins, body, belly, gill, eye. */
export function KoiTrunk() {
  return (
    <>
      <ellipse cx="-3" cy="-5.4" rx="6" ry="2.6" fill="#f8834f" />
      <ellipse cx="-3" cy="5.4" rx="6" ry="2.6" fill="#f8834f" />
      <ellipse
        cx="0"
        cy="0"
        rx="15"
        ry="6.6"
        fill="#ef5a22"
        stroke="#c8410f"
        strokeWidth="0.9"
      />
      <ellipse cx="2" cy="2.6" rx="9" ry="2.6" fill="#ffb489" opacity="0.75" />
      <ellipse cx="-4.5" cy="-1.8" rx="3.6" ry="2.4" fill="#fff3ea" opacity="0.95" />
      <ellipse cx="6.5" cy="1.4" rx="2.6" ry="1.8" fill="#22262c" opacity="0.5" />
      <circle cx="10.8" cy="-1.8" r="1.7" fill="#14181c" />
      <circle cx="11.4" cy="-2.3" r="0.55" fill="#ffffff" />
    </>
  );
}

/**
 * The whole fish, with the tail exposed for animation.
 *
 * `tailRef` is optional. Callers that animate the tail put a ref on it and
 * rotate about `KOI_TAIL_PIVOT`.
 */
export function KoiBody({ tailRef }: { tailRef?: Ref<SVGPathElement> }) {
  return (
    <>
      <path ref={tailRef} d={KOI_TAIL_D} fill={KOI_TAIL_FILL} />
      <KoiTrunk />
    </>
  );
}
