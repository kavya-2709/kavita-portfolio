import { motion } from "framer-motion";
import { testimonials } from "../lib/content";
import { Container, EASE } from "../components/ui";

/**
 * Testimonials as an endless horizontal reel of pinned polaroids.
 *
 * Each card is one compact panel, polaroid clipped to the left and the
 * quote to the right, and the whole strip drifts leftward forever. No
 * autoplay carousel, no avatar picker, no state: the motion is the layout.
 *
 * Type is Geist throughout the card: the quote, the name and the role all
 * sit in the secondary face at small sizes. The serif is reserved for the
 * section heading, so the reel stays quiet next to it.
 */

/**
 * Bent-wire paperclip holding the polaroid to the board.
 *
 * Drawn as one continuous stroked path: down, U-turn, up, U-turn, down.
 * The turns are cubic curves rather than arcs on purpose — arcs would need
 * sweep flags, and picking the wrong one silently centres the curve on the
 * far side (the lily-pad bug). Curves have no such ambiguity.
 */
function Paperclip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="clip-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d7dbe0" />
          <stop offset="45%" stopColor="#8d949d" />
          <stop offset="100%" stopColor="#c3c9d0" />
        </linearGradient>
      </defs>
      <path
        d="M32 30 L32 84 C32 96 14 96 14 84 L14 24 C14 8 44 8 44 24 L44 92 C44 108 12 108 12 92 L12 40"
        fill="none"
        stroke="url(#clip-steel)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Testimonial = (typeof testimonials)[number];

function QuoteCard({ t, tilt }: { t: Testimonial; tilt: number }) {
  return (
    <figure className="bg-mist-gray rounded-cards border-ink/[0.05] m-0 flex w-[82vw] max-w-[560px] shrink-0 flex-col gap-5 border px-5 py-7 md:w-[560px] md:flex-row md:items-center md:gap-8 md:px-8">
      {/* Polaroid — pinned, slightly askew */}
      <div className="relative mx-auto w-[128px] shrink-0 md:mx-0 md:w-[140px]">
        <div
          className="bg-white p-2 pb-3"
          style={{ rotate: `${tilt}deg` }}
        >
          <img
            src={t.photo}
            alt={t.name}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <figcaption className="mt-4 text-center">
            <p className="font-geist text-ink text-body-sm leading-none font-medium">
              {t.name}
            </p>
            <p className="font-geist text-fog mt-1.5 text-caption">
              {t.role}
            </p>
          </figcaption>
        </div>

        {/* clip sits over the polaroid's top-left corner */}
        <Paperclip className="pointer-events-none absolute -top-4 left-4 z-10 w-6 -rotate-3" />
      </div>

      {/* The words */}
      <blockquote className="font-geist text-graphite m-0 text-body-sm leading-[1.6]">
        {t.quote}
      </blockquote>
    </figure>
  );
}

/** Fixed tilts per index, so cards don't all lean the same way. */
const TILTS = [-3, 2, -1.5];

/**
 * One run of cards. The track holds two of these and the keyframe travels
 * -50%, i.e. exactly one run, so the loop never shows a seam.
 *
 * The gap has to live *inside* the run (plus matching trailing padding), not
 * on the track. Putting it on the track makes the two runs unequal — -50%
 * then lands mid-card and the strip visibly jumps every cycle.
 */
function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex gap-6 pr-6">
      {testimonials.map((t, i) => (
        <QuoteCard key={t.name} t={t} tilt={TILTS[i % TILTS.length]} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-white py-14 md:py-20"
    >
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-serif-display text-ink text-center text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.02em]"
        >
          What people say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          className="font-geist text-body-lg text-graphite mx-auto mt-4 max-w-lg text-center"
        >
          From the people I have designed with and shipped alongside.
        </motion.p>
      </Container>

      {/* Full-bleed reel — deliberately outside Container so cards run off
          both edges rather than stopping at the 1200px gutter. */}
      <div className="group relative mt-14 overflow-hidden md:mt-16">
        <div
          className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "90s" }}
        >
          <Run />
          {/* second run is decorative — screen readers get the first only */}
          <Run hidden />
        </div>
      </div>
    </section>
  );
}
