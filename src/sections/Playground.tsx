import { playground as p } from "../lib/content";
import { Container } from "../components/ui";

/**
 * Playground — the one warm room in the house.
 *
 * Everything else on the site sits on white and answers to a client. This
 * does not, so it gets its own ground, a serif that leans, and a strip that
 * never stops moving. The tiles are placeholders on purpose: the real
 * captures drop in later, and each tile is already the shape an image needs.
 */

/** Empty tile. Sized so dropping a capture in changes nothing but the fill. */
function LoopTile({ label }: { label: string }) {
  return (
    <div className="border-ink/[0.10] rounded-cards-sm flex aspect-[4/3] w-full items-center justify-center border border-dashed bg-white/60">
      <div className="text-center">
        {/* Placeholder glyph, not a control: there is nothing to click yet. */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="text-ink/25 mx-auto w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5-5-4 4-2-2-7 7" />
        </svg>
        <p className="font-geist text-body-sm text-graphite mt-3">{label}</p>
      </div>
    </div>
  );
}

/**
 * One run of the strip.
 *
 * The gap lives inside the run with matching trailing padding, never on the
 * track: on the track the two runs come out unequal, so the -50% keyframe
 * lands mid-tile and the strip jumps every cycle.
 */
function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex gap-6 pr-6">
      {p.loops.map((l) => (
        <figure
          key={l.label}
          className="m-0 w-[240px] shrink-0 sm:w-[280px] md:w-[300px]"
        >
          <LoopTile label={l.label} />
          <figcaption className="font-geist text-body-sm text-graphite/80 mt-3">
            {l.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Playground() {
  return (
    <section
      id="playground"
      className="bg-sand relative overflow-hidden py-16 md:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <span className="bg-ink text-paper-white font-geist text-caption inline-flex rounded-full px-4 py-1.5 tracking-[0.11em] uppercase">
              {p.badge}
            </span>

            <h2 className="font-serif-display text-ink mt-7 text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] font-normal tracking-[-0.02em]">
              {p.title}
              <br />
              <span className="text-clay italic">{p.titleAccent}</span>
            </h2>
          </div>

          <div className="flex items-start gap-5 lg:pt-3">
            <img
              src={p.sticker}
              alt=""
              aria-hidden
              width={96}
              height={96}
              className="h-[72px] w-auto shrink-0 -rotate-6 md:h-[88px]"
            />
            <p className="font-geist text-body text-graphite max-w-sm">
              {p.blurbBefore}
              <em className="font-serif-display text-ink text-body-lg not-italic">
                <span className="italic">{p.blurbEmphasis}</span>
              </em>
              {p.blurbAfter}
            </p>
          </div>
        </div>
      </Container>

      {/* Full-bleed strip, deliberately outside Container so tiles run off
          both edges instead of stopping at the 1200px gutter. */}
      <div className="group relative mt-14 md:mt-20">
        <div className="overflow-hidden">
          <div
            className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "48s" }}
          >
            <Run />
            {/* second run is decorative — screen readers get the first only */}
            <Run hidden />
          </div>
        </div>

        {/* Feathered edges so tiles arrive and leave rather than being cut. */}
        <div
          aria-hidden
          className="from-sand pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r to-transparent"
        />
        <div
          aria-hidden
          className="from-sand pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l to-transparent"
        />
      </div>
    </section>
  );
}
