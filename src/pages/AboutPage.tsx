import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  aboutPage,
  education,
  experience,
  lifeTiles,
  profile,
  skills,
} from "../lib/content";
import { Card, Container, EASE, Pill, Reveal, Stagger } from "../components/ui";
import {
  Caustics,
  Cue,
  DriftingKoi,
  Koi,
  LilyPad,
  RippleRings,
  WaveDivider,
} from "../components/Water";
import { Float } from "../components/Floaties";
import Contact from "../sections/Contact";

/**
 * About — one continuous descent through three water environments.
 *
 *   surface  →  the claim, the portrait, light on the water
 *   shallows →  the career, on white, with a koi crossing it
 *   depths   →  the personal tiles, on a powder-blue floor
 *
 * Sections are joined by `WaveDivider`, never a hard edge: each divider is
 * filled with the colour of the environment arriving underneath it, so the
 * page reads as one body of water rather than four stacked blocks.
 */

/* ── 01 · Surface ──────────────────────────────────────────────────── */
function Surface() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-aqua-wash/50 pt-28 md:pt-36">
      <Caustics />

      <Float className="top-[18%] right-[6%] w-20 md:w-28" duration={9}>
        <LilyPad className="w-full" tone="mint" />
      </Float>
      <Float className="bottom-[14%] left-[4%] w-14 md:w-20" delay={1.2} duration={11}>
        <LilyPad className="w-full" tone="powder" />
      </Float>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <Reveal>
              <Cue>{aboutPage.eyebrow}</Cue>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-serif-display text-heading-lg md:text-display text-ink mt-6 max-w-3xl">
                {aboutPage.statement}
              </h1>
            </Reveal>

            <Stagger className="mt-8 max-w-2xl space-y-5" gap={0.1}>
              {aboutPage.intro.map((p) => (
                <Stagger.Item key={p}>
                  <p className="font-geist text-body-lg text-graphite">{p}</p>
                </Stagger.Item>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Pill tone="accent">{profile.title}</Pill>
                <Pill>{profile.subtitle}</Pill>
              </div>
            </Reveal>
          </div>

          {/* Portrait, sitting in the water with rings spreading off it. */}
          <Reveal delay={0.15} className="justify-self-center lg:justify-self-end">
            <div className="relative h-[260px] w-[260px] md:h-[300px] md:w-[300px]">
              <RippleRings className="inset-0" count={3} duration={6} />
              <img
                src="/avatar.png"
                alt={`${profile.name}, ${profile.title}`}
                className="border-powder-blue relative h-full w-full rounded-full border-4 object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Stats, reading as three points along the waterline. */}
        <Stagger className="mt-16 grid gap-8 sm:grid-cols-3" gap={0.1}>
          {profile.stats.map((s) => (
            <Stagger.Item key={s.label}>
              <p className="font-serif-display text-heading md:text-heading-lg text-ink">
                {s.value}
              </p>
              <p className="font-geist text-body-sm text-graphite mt-2">
                {s.label}
              </p>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>

      {/* white shallows rising into the blue */}
      <WaveDivider className="mt-14 text-white md:mt-20" />
    </section>
  );
}

/* ── 02 · Shallows ─────────────────────────────────────────────────── */
function Shallows() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
      <DriftingKoi className="top-6 w-16 opacity-40 md:w-24" duration={28} />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <div>
            <Reveal>
              <h2 className="text-heading text-ink">{aboutPage.experienceTitle}</h2>
              <p className="font-geist text-body text-graphite mt-3">
                {aboutPage.experienceLead}
              </p>
            </Reveal>
          </div>

          <div className="relative">
            {/* the line draws itself as the section enters */}
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ transformOrigin: "top" }}
              className="bg-powder-blue absolute top-2 bottom-2 left-[7px] w-px"
            />

            <Stagger className="space-y-10" gap={0.12} amount={0.1}>
              {experience.map((job) => (
                <Stagger.Item key={job.company}>
                  <div className="relative pl-10">
                    <span className="bg-iris-blue absolute top-1.5 left-0 h-4 w-4 rounded-full border-[3px] border-white" />
                    <p className="font-geist text-body-sm text-fog">{job.period}</p>
                    <h3 className="text-heading-sm text-ink mt-1">
                      {job.role}{" "}
                      <span className="text-iris-blue">· {job.company}</span>
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {job.points.map((p) => (
                        <li key={p} className="font-geist text-body text-graphite">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Education */}
        <Reveal className="mt-20">
          <h2 className="text-heading text-ink">{aboutPage.educationTitle}</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2" gap={0.1}>
          {education.map((e) => (
            <Stagger.Item key={e.degree}>
              <Card className="h-full">
                <p className="font-geist text-body-sm text-fog">{e.period}</p>
                <h3 className="text-heading-sm text-ink mt-2">{e.degree}</h3>
                <p className="font-geist text-body text-graphite mt-1">{e.school}</p>
              </Card>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>

      {/* the floor of the pond arriving */}
      <WaveDivider className="mt-14 text-powder-blue md:mt-20" />
    </section>
  );
}

/* ── Life tiles ────────────────────────────────────────────────────── */

/** Shared tile shell — 1:1, 32px radius, hairline, never a shadow. */
function Tile({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`rounded-cards border-ink/[0.08] relative aspect-square overflow-hidden border p-7 ${className}`}
    >
      {children}
    </motion.div>
  );
}

const TILE_LABEL = "font-geist text-caption text-fog uppercase";
const LABEL_TRACKING = { letterSpacing: "0.18em" } as const;

/**
 * Fanned photo stack. Any missing file falls back to the avatar.
 *
 * `onError` alone isn't enough: a failed response gets cached, so on a
 * re-render the error fires before React attaches its handler (error
 * doesn't bubble, so there's no delegation to catch it late). The ref
 * callback re-checks `complete && naturalWidth === 0` to cover that.
 */
function PhotoTile() {
  const { label, year, images, fallback } = lifeTiles.photos;
  const shown = images.length > 0 ? images : [fallback, fallback, fallback];
  const [srcs, setSrcs] = useState(shown);
  const angles = [-9, 4, 12];

  const swap = (i: number) =>
    setSrcs((prev) =>
      prev[i] === fallback ? prev : prev.map((s, n) => (n === i ? fallback : s))
    );

  return (
    <Tile className="bg-white">
      <div className="flex items-start justify-between">
        <span className={TILE_LABEL} style={LABEL_TRACKING}>
          {label}
        </span>
        <span className="font-geist text-caption text-fog">{year}</span>
      </div>

      <div className="absolute inset-x-7 top-[38%] bottom-5">
        {srcs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            onError={() => swap(i)}
            ref={(el) => {
              if (el?.complete && el.naturalWidth === 0) swap(i);
            }}
            style={{ rotate: `${angles[i]}deg`, zIndex: i }}
            className="rounded-images border-ink/10 absolute top-0 left-1/2 h-full w-[62%] -translate-x-1/2 border-4 border-white object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ))}
      </div>
    </Tile>
  );
}

/** Weekend list — the one saturated tile, like a sticky note on water. */
function TodoTile() {
  const { day, title, items } = lifeTiles.todo;
  return (
    <Tile className="bg-solar-wash">
      <span className={TILE_LABEL} style={LABEL_TRACKING}>
        {day}
      </span>
      <div className="rounded-images mt-4 h-[calc(100%-2.5rem)] bg-white p-5">
        <h3 className="text-body-lg text-ink font-aeonik">{title}</h3>
        <ul className="mt-3 space-y-2.5">
          {items.map((t) => (
            <li
              key={t}
              className="font-geist text-body-sm text-graphite flex items-start gap-2.5"
            >
              <span className="border-fog mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[4px] border" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Tile>
  );
}

/** Record player — the dark tile, for weight. The disc turns on hover. */
function SongTile() {
  const { label, track, artist, duration } = lifeTiles.song;
  return (
    <Tile className="bg-charcoal group">
      <span
        className="font-geist text-caption uppercase text-white/50"
        style={LABEL_TRACKING}
      >
        {label}
      </span>

      <div className="absolute top-1/2 left-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-[58%]">
        <motion.div
          className="h-full w-full rounded-full bg-[#1f242e]"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute inset-[18%] rounded-full border border-white/10" />
          <span className="absolute inset-[32%] rounded-full border border-white/10" />
          <span className="bg-iris-blue absolute inset-[42%] rounded-full" />
        </motion.div>
      </div>

      <div className="absolute inset-x-7 bottom-6">
        <p className="font-geist text-body-sm truncate text-white">{track}</p>
        <p className="font-geist text-caption mt-1 text-white/50">{artist}</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-[3px] flex-1 rounded-full bg-white/15">
            <span className="bg-iris-blue block h-full w-1/3 rounded-full" />
          </span>
          <span className="font-geist text-caption text-white/50">{duration}</span>
        </div>
      </div>
    </Tile>
  );
}

/** Pull quote, with a koi resting under it. */
function QuoteTile() {
  const { text, author } = lifeTiles.quote;
  return (
    <Tile className="bg-white">
      <Koi className="w-14 -rotate-6" />
      <p className="font-serif-display text-heading-sm md:text-heading text-ink mt-6">
        “{text}”
      </p>
      <p className="font-geist text-caption text-fog absolute bottom-7 uppercase" style={LABEL_TRACKING}>
        — {author}
      </p>
    </Tile>
  );
}

/** A tile that links somewhere — used for the pond and the availability chip. */
function LinkTile({
  data,
  wash,
}: {
  data: { label: string; title: string; detail: string; cta: string; href: string };
  wash: string;
}) {
  const inner = (
    <>
      <span className={TILE_LABEL} style={LABEL_TRACKING}>
        {data.label}
      </span>
      <h3 className="text-heading-sm text-ink mt-4">{data.title}</h3>
      <p className="font-geist text-body-sm text-graphite mt-3">{data.detail}</p>
      <span className="font-geist text-body-sm text-iris-blue absolute bottom-7 inline-flex items-center gap-2">
        {data.cta}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </>
  );

  const isRoute = data.href.startsWith("/");

  return (
    <Tile className={`${wash} group`}>
      {isRoute ? (
        <Link to={data.href} className="absolute inset-0 z-10" aria-label={data.title} />
      ) : (
        <a href={data.href} className="absolute inset-0 z-10" aria-label={data.title} />
      )}
      {inner}
    </Tile>
  );
}

/* ── 03 · Depths ───────────────────────────────────────────────────── */
function Depths() {
  return (
    <section className="bg-powder-blue relative overflow-hidden pt-14 md:pt-20">
      <Caustics className="opacity-70" />
      <DriftingKoi className="bottom-[12%] w-20 opacity-30 md:w-28" duration={34} delay={3} />

      <Container className="relative">
        <Reveal>
          <h2 className="text-heading md:text-heading-lg text-ink">
            {aboutPage.depthsTitle}
          </h2>
          <p className="font-geist text-body-lg text-graphite mt-3">
            {aboutPage.depthsLead}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
          <Stagger.Item><PhotoTile /></Stagger.Item>
          <Stagger.Item><TodoTile /></Stagger.Item>
          <Stagger.Item><SongTile /></Stagger.Item>
          <Stagger.Item><QuoteTile /></Stagger.Item>
          <Stagger.Item><LinkTile data={lifeTiles.coded} wash="bg-white" /></Stagger.Item>
          <Stagger.Item><LinkTile data={lifeTiles.status} wash="bg-mint-wash" /></Stagger.Item>
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8">
            <Cue>{aboutPage.cue}</Cue>
          </p>
        </Reveal>

        {/* Skills, as the sediment at the bottom */}
        <Reveal className="mt-20">
          <h2 className="text-heading text-ink">{aboutPage.skillsTitle}</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-6 md:grid-cols-3" gap={0.1}>
          {Object.entries(skills).map(([group, items]) => (
            <Stagger.Item key={group}>
              <Card className="h-full">
                <h3 className="text-heading-sm text-ink">{group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="bg-mist-gray font-geist text-body-sm text-graphite rounded-full px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>

      {/* surfacing again into the white contact block */}
      <WaveDivider className="mt-14 text-white md:mt-20" />
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <main>
        <Surface />
        <Shallows />
        <Depths />
      </main>
      <Contact />
    </>
  );
}
