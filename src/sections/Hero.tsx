import { motion } from "framer-motion";
import { EASE } from "../components/ui";
import Pond from "../components/Pond";

/** Each word rises out of an overflow mask. */
function Word({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative">
      {/* ── Full-bleed pond; the header floats over it ─────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* The canvas itself fades to transparent at the bottom, so the page
            gradient shows THROUGH it. Matching a colour by hand left a faint
            seam (dissolve ended on #ebf5ff, page gradient was #e2f1fd there);
            masking makes the blend exact by construction. */}
        <Pond
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.35) 84%, transparent 99%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.35) 84%, transparent 99%)",
          }}
        />

        {/* ── Depth gradients ────────────────────────────────────────────
            Pure-blue, not black. These read as deeper water while still
            carrying the contrast white text needs — the pale water alone
            measures ~1:1 against white. Blue keeps the hero in one theme
            instead of dropping a grey shadow over the artwork. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[280px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,70,118,0.95) 0%, rgba(8,70,118,0.72) 40%, rgba(8,70,118,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[56vh] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,70,118,0) 0%, rgba(8,70,118,0.78) 26%, rgba(8,70,118,0.78) 70%, rgba(8,70,118,0) 100%)",
          }}
        />


        {/* name over the water */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1
            className="font-serif-display leading-[0.88] font-normal tracking-[-0.035em] whitespace-nowrap text-white"
            style={{
              fontSize: "clamp(3.25rem, 16.5vw, 280px)",
            }}
          >
            <Word text="Kavita" delay={0.35} />{" "}
            <Word text="Yadav" delay={0.47} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
            className="font-serif-display mt-5 max-w-3xl text-heading-sm text-white md:text-heading"

          >
            I make complex products feel obvious.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
            className="mt-4 font-geist text-body text-white/85 md:text-body-lg"

          >
            Product &amp; UX Designer · Booking, marketplace &amp; AI products
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="font-serif-display text-ink absolute bottom-10 text-body-lg"
          >
            Scroll to start
          </motion.span>
        </div>
      </motion.div>

    </section>
  );
}
