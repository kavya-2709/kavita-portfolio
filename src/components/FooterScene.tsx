/**
 * The footer: a girl and her cat at the edge of a pond.
 *
 * `public/footer.webp` used **as the image** — not traced, not vectorised,
 * not recoloured. It replaced a 25MB video of the same subject: the still
 * frame says the same thing, loads in a hundredth of the weight, and a
 * quiet scene is arguably better served by being quiet.
 *
 * Source was a 1.4MB PNG at 1672×563. It needed no cropping (unlike the
 * earlier artwork, this one is already edge to edge — the corners sample as
 * sky and grass, not white) and was re-encoded to WebP q0.82 → **106KB, a
 * 13× saving**.
 *
 * The panorama is nearly 3:1, which is exactly what a footer band wants, so
 * it runs full bleed at its own ratio with no cropping at any width. The
 * only treatment is a fade at the top and sides so it has no edges to
 * notice: it emerges out of the white page rather than starting on a line.
 * The bottom stays solid because it meets the black bar.
 */
export default function FooterScene() {
  return (
    <div className="relative w-full">
      <img
        src="/footer.webp"
        alt="A girl and her tabby cat sitting on the grass at the edge of a still pond, looking out across the water under a wide blue sky"
        width={1672}
        height={563}
        // Not lazy: at 106KB the saving is negligible, and the footer is
        // the one image that must never be missing when someone reaches it.
        decoding="async"
        // A 3:1 panorama is only ~126px tall at 375px wide, which shrinks
        // the girl and the cat to about 95px and loses them. On phones the
        // band keeps a fixed height and crops in instead, biased left of
        // centre where the two figures sit. From sm up, `h-auto` restores
        // the full frame at its own ratio and object-fit stops applying.
        style={{ objectPosition: "42% 58%" }}
        className="block h-[200px] w-full object-cover sm:h-auto sm:object-fill"
      />

      {/* ── blend into the page ─────────────────────────────────────
          No frame, no border, no rounding. The top dissolves into white so
          the scene opens out of the page; the sides feather just enough to
          kill the hard vertical cut on very wide viewports. */}
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
