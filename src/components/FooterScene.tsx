/**
 * The footer: a girl and her cat at the edge of a pond.
 *
 * `public/footer-scene.webp` used **as the image** — not traced, not
 * vectorised, not recoloured. Source was a 1.7MB PNG at 1672×941,
 * re-encoded to WebP q0.82 → **102KB, a 17× saving**.
 *
 * The frame is 16:9, not the 3:1 panorama it replaced, so it can't run full
 * bleed at its own ratio: at 1440px wide that would be an 810px-tall footer.
 * It's cropped to a band instead, anchored to the bottom so the girl, the
 * cat and the pond are always the part that survives, and the sky is what
 * gets trimmed. Enough sky is kept for the clouds to move through.
 *
 * The only other treatment is a fade at the top and sides so it has no edges
 * to notice: it emerges out of the white page rather than starting on a
 * line. The bottom stays solid because it meets the black bar.
 */
export default function FooterScene() {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src="/footer-scene.webp"
        alt="A girl and her tabby cat sitting on the grass at the edge of a still pond, looking out across the water under a wide blue sky"
        width={1672}
        height={941}
        // Not lazy: at ~100KB the saving is negligible, and the footer is
        // the one image that must never be missing when someone reaches it.
        decoding="async"
        // Bottom-anchored: the crop eats sky, never the figures.
        style={{ objectPosition: "45% 100%" }}
        className="block h-[260px] w-full object-cover sm:h-[380px] lg:h-[520px]"
      />

      <Clouds />

      {/* ── blend into the page ─────────────────────────────────────
          No frame, no border, no rounding. The top dissolves into white so
          the scene opens out of the page; the sides feather just enough to
          kill the hard vertical cut on very wide viewports.

          This sits above the clouds so they fade into the page along with
          the sky they're drifting through, instead of staying crisp against
          a dissolving background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[30%]"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,.7) 42%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[7%]"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,.6) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[7%]"
        style={{
          background:
            "linear-gradient(to left, rgba(255,255,255,.6) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}

/**
 * Two bands of cloud drifting across the upper sky.
 *
 * Painted, not photographed: each band is a row of soft radial gradients in
 * the sky palette's lightest tint, so there are no cut-outs to give away an
 * edge and nothing to download. They blend with `screen`, which can only
 * lighten — a cloud brightens the blue underneath it and can never darken
 * the artwork or leave a grey film over the water.
 *
 * The two bands run at different speeds and heights. That parallax is what
 * sells it as sky rather than a texture sliding sideways, and because the
 * periods (68s and 115s) don't divide into each other, the pair doesn't
 * visibly repeat.
 *
 * Both are masked to fade out before the horizon, so no cloud ever crosses
 * the treeline or floats over the pond.
 */
function Clouds() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[62%] overflow-hidden"
      style={{
        // Fade out well above the horizon. Clouds must never reach the grass.
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,.55) 0%, #000 28%, #000 62%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,.55) 0%, #000 28%, #000 62%, transparent 100%)",
      }}
    >
      <CloudBand
        // Far band: higher, smaller, fainter, slowest. Reads as distance.
        top="6%"
        height="52%"
        opacity={0.42}
        duration={115}
        puffs="radial-gradient(28% 62% at 8% 58%, #e6f2ff 0%, rgba(230,242,255,0) 72%), radial-gradient(19% 44% at 23% 40%, #f2f8ff 0%, rgba(242,248,255,0) 70%), radial-gradient(24% 52% at 38% 66%, #e6f2ff 0%, rgba(230,242,255,0) 74%), radial-gradient(15% 38% at 61% 44%, #f2f8ff 0%, rgba(242,248,255,0) 70%), radial-gradient(30% 58% at 82% 60%, #e6f2ff 0%, rgba(230,242,255,0) 73%)"
      />
      <CloudBand
        // Near band: lower, broader, brighter, faster.
        top="26%"
        height="70%"
        opacity={0.6}
        duration={68}
        puffs="radial-gradient(34% 74% at 15% 52%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(26% 56% at 34% 70%, #e6f2ff 0%, rgba(230,242,255,0) 72%), radial-gradient(38% 80% at 57% 46%, #ffffff 0%, rgba(255,255,255,0) 71%), radial-gradient(22% 50% at 76% 66%, #e6f2ff 0%, rgba(230,242,255,0) 73%), radial-gradient(29% 62% at 93% 48%, #ffffff 0%, rgba(255,255,255,0) 70%)"
      />
    </div>
  );
}

function CloudBand({
  top,
  height,
  opacity,
  duration,
  puffs,
}: {
  top: string;
  height: string;
  opacity: number;
  duration: number;
  puffs: string;
}) {
  return (
    <div
      className="absolute left-0 w-[200%]"
      style={{
        top,
        height,
        opacity,
        backgroundImage: puffs,
        // One tile is half the element, so exactly one container width. Two
        // tiles side by side is what makes the -50% shift seamless.
        backgroundSize: "50% 100%",
        backgroundRepeat: "repeat-x",
        // `screen` can only lighten, so a cloud brightens the sky and can
        // never lay a grey cast over the artwork the way `normal` would.
        mixBlendMode: "screen",
        // Not framer-motion: this is a resting decorative loop, and
        // framer-motion writes transforms from rAF, so it sits at
        // `transform: none` wherever rAF is throttled. A CSS animation keeps
        // running and, more to the point, is declaratively correct on first
        // paint. The global prefers-reduced-motion rule stops it.
        animation: `drift ${duration}s linear infinite`,
        willChange: "transform",
      }}
    />
  );
}
