import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  aboutPage,
  beyondScreen,
  experience,
  howIWork,
  personalInterlude,
  photoScatter,
} from "../lib/content";
import { Container, EASE, Pill, Reveal, Stagger } from "../components/ui";
import { Coral, Shell, Starfish, Sun } from "../components/Scrapbook";
import { Caustics, Cue, LilyPad, WaveDivider } from "../components/Water";
import { Float } from "../components/Floaties";
import Contact from "../sections/Contact";

/**
 * About, in four sections.
 *
 *   surface → how I work → track record → off the clock
 *
 * The motion is deliberately one idea rather than a pile of effects. The
 * headline surfaces word by word, the photo pile settles into its tilts, the
 * work cards can be picked up out of their overlap, the timeline draws itself
 * downward, and the photo reel runs on forever. Sections meet on a waterline
 * (`WaveDivider`) filled with the colour of whatever arrives underneath.
 */

/* ── Headline that surfaces one word at a time ─────────────────────────
   Each word gets an inline-block wrapper so it can translate on its own.
   The space between words has to live OUTSIDE those wrappers — whitespace
   inside an inline-block is stripped, and the line renders with no gaps. */
function SurfacingText({ text, from = 0.15 }: { text: string; from?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: from + i * 0.05 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/**
 * Three photographs dropped on top of each other.
 *
 * Each one overlaps the one behind it while leaving roughly 70% of it
 * showing, so the group reads as a pile someone pushed around on a desk
 * rather than a tidy gallery. Offsets come from `photoScatter`.
 *
 * They arrive squared-up and settle into their tilts; hovering one lifts it
 * to the front and straightens it slightly, which is the only way to see a
 * buried photo in full.
 */
function PhotoScatter() {
  return (
    <motion.div
      initial="dropped"
      animate="settled"
      // 1.8 photo-widths across and 2 photo-heights down is what the
      // 40%/50% cascade spans, plus ~20px slack: rotating a rectangle grows
      // its bounding box, so a box sized to the exact span clips the corners.
      className="relative mx-auto h-[412px] w-[296px] sm:h-[522px] sm:w-[368px] lg:mx-0"
    >
      {photoScatter.map((p, i) => (
        <motion.figure
          key={p.src}
          variants={{
            dropped: { opacity: 0, rotate: 0, scale: 0.96 },
            settled: { opacity: 1, rotate: p.tilt, scale: 1 },
          }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.12 }}
          // Hover pulls a buried photo forward and straightens it — the only
          // way to see the ones underneath in full.
          whileHover={{ rotate: p.tilt * 0.3, scale: 1.04, zIndex: 10 }}
          // x/y stay on `style` rather than in the variants: they're the
          // fixed layout, and animating them would fight the entrance.
          style={{ zIndex: i, x: p.x, y: p.y }}
          // white border + a hairline: a print, not a card
          className="border-ink/[0.06] absolute top-0 left-0 m-0 w-[150px] border bg-white p-2.5 pb-2.5 sm:w-[190px]"
        >
          <img
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="aspect-[3/4] w-full object-cover"
          />
        </motion.figure>
      ))}
    </motion.div>
  );
}

/* ── 01 · Surface ──────────────────────────────────────────────────── */
function Surface() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-aqua-wash/50 pt-28 md:pt-36">
      <Caustics />

      {/* One drifting element, per the design brief — the rest of the shore
          is placed, not floating. */}
      <Float className="top-[10%] right-[4%] w-16 md:w-24" duration={9}>
        <LilyPad className="w-full" tone="mint" />
      </Float>

      {/* Beach findings, scattered into the section's margins. */}
      <Sun aria-hidden className="pointer-events-none absolute top-[7%] left-[4%] w-12 opacity-70 md:w-16" />
      <Starfish className="pointer-events-none absolute bottom-[22%] left-[6%] w-10 -rotate-12 opacity-80 md:w-14" />
      <Coral className="pointer-events-none absolute right-[7%] bottom-[10%] hidden w-12 opacity-60 lg:block" />
      <Shell className="pointer-events-none absolute top-[46%] left-[1%] hidden w-10 rotate-6 opacity-70 xl:block" />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div>
            <h1 className="font-serif-display text-heading-lg md:text-display text-ink leading-[1.08]">
              <SurfacingText text={personalInterlude.heading[0]} />
              <br />
              {/* second line picks up where the first left off */}
              <SurfacingText text={personalInterlude.heading[1]} from={0.32} />
            </h1>

            <Stagger className="mt-8 max-w-xl space-y-5" gap={0.1}>
              {[personalInterlude.body, personalInterlude.bodyTwo].map((p) => (
                <Stagger.Item key={p}>
                  <p className="font-geist text-body-lg text-graphite">{p}</p>
                </Stagger.Item>
              ))}
            </Stagger>

            <Stagger className="mt-10 flex flex-wrap gap-2.5" gap={0.07}>
              {aboutPage.badges.map((b) => (
                <Stagger.Item key={b}>
                  <Pill>{b}</Pill>
                </Stagger.Item>
              ))}
            </Stagger>

            <Reveal delay={0.15}>
              <Link
                to="/work"
                className="border-ink/20 text-ink hover:border-ink group mt-10 inline-flex items-center gap-3 rounded-buttons border px-7 py-3.5 font-geist text-body transition-colors duration-300"
              >
                {aboutPage.cta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <PhotoScatter />
        </div>
      </Container>

      <WaveDivider className="mt-16 text-mist-gray md:mt-24" />
    </section>
  );
}

/* ── 02 · How I work ───────────────────────────────────────────────────
   Four cards laid down overlapping, like a hand of cards on a table.
   Focusing one lifts it out of the pile and nudges its neighbours aside —
   the parts of a practice existing together, one coming forward when you
   look at it. That interaction *is* the message, so it's built with
   transform + z-index only; nothing re-lays-out, nothing jumps. */

type WorkCard = (typeof howIWork.cards)[number];

function WorkCard({
  card,
  index,
  focused,
  onFocus,
  onBlur,
}: {
  card: WorkCard;
  index: number;
  focused: number | null;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const isFocused = focused === index;
  const someoneElse = focused !== null && !isFocused;

  return (
    <motion.article
      // Reveal: rises and rotates into its resting angle, one after another.
      initial={{ opacity: 0, y: 34, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: card.tilt }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: EASE, delay: index * 0.11 }}
      className="relative w-[86vw] max-w-[330px] shrink-0 lg:w-[270px] xl:w-[300px]"
      style={{ zIndex: isFocused ? 50 : index }}
    >
      <motion.div
        onHoverStart={onFocus}
        onHoverEnd={onBlur}
        onTapStart={onFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        animate={{
          // picked up: straightens, lifts, comes forward
          y: isFocused ? -20 : 0,
          scale: isFocused ? 1.035 : someoneElse ? 0.975 : 1,
          rotate: isFocused ? card.tilt * 0.15 : card.tilt,
          // neighbours lean away from whatever is being read, which is what
          // opens the overlap up rather than hiding it
          x: someoneElse ? (index < (focused ?? 0) ? -26 : 26) : 0,
          opacity: someoneElse ? 0.72 : 1,
        }}
        transition={{ duration: 0.45, ease: EASE }}
        // Three paddings here are load-bearing, all set by measurement.
        // The sticker is 92/104px tall and hangs 56px above the card.
        // Rotation matters more than it looks: a tilted 104px image has a
        // ~130px bounding box, so ~74px still lands INSIDE the card.
        //   `pt-20`  clears that at the top of this card.
        //   `pb-32`  clears the NEXT card's sticker on mobile, where the
        //            cards also overlap by 24px. Rotation costs ~23px more:
        //            a tilted card's text bounding box sits lower than the
        //            flat padding implies, which is why this looks oversized
        //            on paper and is only just enough.
        //   `lg:pr-12` the next card overlaps by 40px across on desktop,
        //            so text has to stop short of that strip.
        className={`rounded-cards-sm border-ink/[0.08] block h-full cursor-pointer border px-7 pt-20 pb-32 outline-none transition-colors duration-500 focus-visible:border-iris-blue lg:pr-12 lg:pb-8 ${
          card.paper
        } ${isFocused ? "border-ink/25" : ""}`}
      >
        {/* Sticker, perched on the top-left corner.
            These are real cut-outs now (transparent PNG / WebP), so the old
            `mix-blend-multiply` die-cutting hack is gone — it would only
            darken the artwork against the tinted papers. */}
        <motion.span
          animate={{
            rotate: isFocused ? card.stickerTilt * 0.4 : card.stickerTilt,
            y: isFocused ? -6 : 0,
            scale: isFocused ? 1.06 : 1,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          // Constrained by HEIGHT, not width: the four images have different
          // aspect ratios, so sizing by width let the taller ones hang lower
          // and clip their own card's heading. A fixed height makes all four
          // intrude by the same amount, which is what the paddings are tuned
          // against.
          className="absolute -top-14 -left-2 block"
        >
          <img
            src={card.sticker}
            alt={card.stickerAlt}
            loading="lazy"
            className="h-[92px] w-auto md:h-[104px]"
          />
        </motion.span>

        <h3 className="font-serif-display text-heading-sm md:text-heading text-ink leading-[1.12]">
          {card.title}
        </h3>

        <p className="font-geist text-body-sm text-graphite mt-4">{card.body}</p>
      </motion.div>
    </motion.article>
  );
}

function HowIWork() {
  const { label, heading, body, cards } = howIWork;
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <section className="bg-mist-gray relative overflow-hidden pt-16 md:pt-28">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Cue>{label}</Cue>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-serif-display text-heading-lg md:text-display text-ink mt-6 leading-[1.08]">
              {heading[0]}
              <br />
              {heading[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-geist text-body-lg text-graphite mt-6">{body}</p>
          </Reveal>
        </div>

        {/* The pile. Overlap is negative margin on the flow axis — vertical
            on mobile, horizontal from md — so focusing a card only ever
            moves transforms, never the layout. */}
      </Container>

      {/* The pile sits outside `Container` so it can use more width than the
          1200px text measure — four cards side by side need the room, and
          the composition is the hero of this section. Goes horizontal at lg,
          not md: a tablet can't fit four cards even at maximum overlap, so
          below that they stack and overlap vertically instead. */}
      <Container className="lg:max-w-none lg:px-8">
        <div
          className="mt-24 flex flex-col items-center md:mt-28 lg:flex-row lg:items-start lg:justify-center"
          onMouseLeave={() => setFocused(null)}
        >
          {cards.map((c, i) => (
            <div
              key={c.id}
              style={{ "--drop": `${c.drop}px` } as React.CSSProperties}
              className={
                i === 0
                  ? "lg:mt-[var(--drop)]"
                  : "-mt-6 lg:mt-[var(--drop)] lg:-ml-10"
              }
            >
              <WorkCard
                card={c}
                index={i}
                focused={focused}
                onFocus={() => setFocused(i)}
                onBlur={() => setFocused(null)}
              />
            </div>
          ))}
        </div>
      </Container>

      <WaveDivider className="mt-20 text-white md:mt-28" />
    </section>
  );
}

/* ── 03 · Track record ─────────────────────────────────────────────────
   One glance should answer "when, what, where", so a row is exactly that
   and nothing else. Years sit in their own column so the eye can run
   straight down them, the role is the loudest thing on the line, the
   organisation follows it, and the tags summarise the work without turning
   into bullet points. */
function TimelineRow({
  job,
  first,
}: {
  job: (typeof experience)[number];
  first: boolean;
}) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group border-ink/[0.06] relative grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b py-7 last:border-b-0 sm:grid-cols-[110px_1fr_auto]"
    >
      {/* years, the scan column */}
      <span className="font-geist text-body-sm text-fog whitespace-nowrap transition-colors duration-300 group-hover:text-graphite">
        {job.years}
      </span>

      {/* The node on the rail. The current role is the filled one, and the
          only place the accent appears in this section. */}
      <span
        aria-hidden
        className={`absolute top-[34px] left-[106px] hidden h-[9px] w-[9px] rounded-full border transition-colors duration-300 sm:block ${
          first
            ? "border-iris-blue bg-iris-blue"
            : "border-ink/25 bg-white group-hover:border-ink/60"
        }`}
      />

      <span className="sm:pl-6">
        <span className="font-geist text-subheading text-ink block leading-snug">
          {job.role}
        </span>
        <span className="font-serif-display text-graphite text-body-lg mt-1 block italic">
          {job.org}
        </span>

        <span className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
          {job.tags.map((t) => (
            <span
              key={t}
              className="border-ink/10 font-geist text-caption text-graphite rounded-full border px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </span>
      </span>

      <span
        className="font-geist text-caption text-fog whitespace-nowrap uppercase"
        style={{ letterSpacing: "0.16em" }}
      >
        {job.kind}
      </span>
    </motion.div>
  );
}

function TrackRecord() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <h2 className="font-serif-display text-heading md:text-heading-lg text-ink">
              {aboutPage.experienceTitle}
            </h2>
            <p className="font-geist text-body text-graphite mt-3">
              {aboutPage.experienceLead}
            </p>
          </Reveal>

          {/* An index, not a set of cards: one row per role, scannable
              down a single column of years. No bullets — the detail lives
              in the case studies, and repeating it here just flattens the
              hierarchy until nothing stands out. */}
          <div className="relative">
            {/* The rail draws itself downward as the section arrives, which
                is also the direction the dates run. */}
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.4, ease: EASE }}
              style={{ transformOrigin: "top" }}
              className="bg-ink/10 absolute top-3 bottom-3 left-[110px] hidden w-px sm:block"
            />

            <Stagger className="flex flex-col" gap={0.09} amount={0.05}>
              {experience.map((job, i) => (
                <Stagger.Item key={job.id}>
                  <TimelineRow job={job} first={i === 0} />
                </Stagger.Item>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>

      {/* No waterline into "Beyond the screen" — that section is white now,
          so a divider would only be a white wave on white. */}
      <div className="h-14 md:h-20" />
    </section>
  );
}

/* ── 04 · Off the clock ────────────────────────────────────────────────
   A single reel of photographs drifting left, forever. Replaces the old
   parallax grid: eight tiles competing for the same attention read as a
   contact sheet, whereas one moving row reads as a life going past. */

/** Fixed tilts, so the reel looks hand-laid rather than machine-aligned. */
const REEL_TILTS = [-2.5, 1.5, -1, 2, -2, 1, -1.5, 2.5];

function ReelRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex gap-6 pr-6">
      {beyondScreen.map((p, i) => (
        <figure
          key={p.src}
          style={{ rotate: `${REEL_TILTS[i % REEL_TILTS.length]}deg` }}
          className="group/photo m-0 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:!rotate-0"
        >
          <div
            // Heights chosen so BOTH aspect ratios yield whole pixels
            // (240→320/180, 288→384/216). Fractional widths accumulate
            // across the run and leave the -50% loop a half-pixel short.
            className={`rounded-images border-ink/[0.08] h-[240px] overflow-hidden border bg-white md:h-[288px] ${
              p.span === "wide" ? "aspect-[4/3]" : "aspect-[3/4]"
            }`}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/photo:scale-[1.05]"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

function OffTheClock() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="font-serif-display text-heading md:text-heading-lg text-ink">
              {aboutPage.beyondTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-geist text-body-lg text-graphite mt-4">
              {aboutPage.beyondLead}
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed reel. Two identical runs and a -50% keyframe, so the
          loop is seamless — the gap has to live inside each run (plus
          matching trailing padding) or -50% lands mid-photo and jumps. */}
      <div className="group relative mt-14 overflow-hidden md:mt-16">
        <div
          className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "70s" }}
        >
          <ReelRun />
          <ReelRun hidden />
        </div>
      </div>

      <Container>
        <Reveal delay={0.1}>
          <p className="mt-12">
            <Cue>{aboutPage.cue}</Cue>
          </p>
        </Reveal>
      </Container>

      <div className="h-14 md:h-20" />
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <main>
        <Surface />
        <HowIWork />
        <TrackRecord />
        <OffTheClock />
      </main>
      <Contact />
    </>
  );
}
