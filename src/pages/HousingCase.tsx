import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { housing as h } from "../lib/content";
import { Container, EASE } from "../components/ui";
import { LiquidButton } from "../components/LiquidButton";
import { ArrowRightIcon, ExternalIcon } from "../components/icons";
import { TYPE } from "../lib/type";
import { themeVars } from "../lib/surfaces";
import { ProgressRail } from "../components/ProgressRail";
import {
  Card,
  Eyebrow,
  Glance,
  Head,
  Rise,
  SECTION,
} from "../components/caseStudy";
import Contact from "../sections/Contact";

/**
 * Housing.com Chats case study.
 *
 * Third study on the shape the Clean4Wheels page settled on: thesis in the
 * first screen, the arc summarised before any evidence, then challenge,
 * research, people, the turn, the work, and what it taught.
 *
 * Re-skinned from the Figma file onto this site's system. Where the study has
 * a designed board (concerns, the channel split, the two personas, the before
 * and after flows) the board is shown as drawn and its content carried in the
 * alt, rather than rebuilt as markup that would print the same thing twice.
 */

export default function HousingCase() {
  const rail = [
    { id: `section-${h.challenge.n}`, n: h.challenge.n, label: h.challenge.eyebrow },
    { id: `section-${h.research.n}`, n: h.research.n, label: h.research.eyebrow },
    { id: `section-${h.personas.n}`, n: h.personas.n, label: h.personas.eyebrow },
    { id: `section-${h.redesign.n}`, n: h.redesign.n, label: h.redesign.eyebrow },
    { id: `section-${h.learnings.n}`, n: h.learnings.n, label: h.learnings.eyebrow },
  ];
  return (
    <>
      <ProgressRail items={rail} />
      <main className="pt-28 md:pt-32" style={themeVars("housing")}>
        {/* ---------------------------------------------------------- hero */}
        <Container>
          <Link
            to="/work"
            className="font-geist text-body-sm text-graphite hover:text-ink transition-colors"
          >
            ← Selected works
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-10"
          >
            <div className="flex flex-wrap items-center gap-2">
              {h.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[color:var(--badge-line)] bg-[color:var(--badge-bg)] px-4 py-1.5 font-geist text-body-sm text-[color:var(--badge-ink)]"
                >
                  {t}
                </span>
              ))}
              {/* Said out loud rather than left to be discovered. */}
              <span className="bg-solar-wash font-geist text-body-sm text-ink rounded-full px-4 py-1.5">
                {h.natureTag}
              </span>
            </div>

            {/* Client mark on the left, headline on the right, matching the
                other two studies. The mark replaces the tracked
                "Housing.com · Housing Chats" line that used to sit here. */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <img
                src={h.logo}
                alt={`${h.client} logo`}
                width={556}
                height={84}
                className="h-[30px] w-auto self-start object-contain object-left"
              />
              <div>
                <h1 className={`${TYPE.h1} max-w-4xl`}>
                  {h.title}
                </h1>
                <p className="font-geist text-body-lg text-graphite mt-6 max-w-2xl">
                  {h.deck}
                </p>
              </div>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-16 gap-y-6">
              {h.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                    {f.label}
                  </dt>
                  <dd className="font-geist text-subheading text-ink mt-1.5">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* The prototype the study is written about. Opens in a new tab,
              since it is Figma and not part of this site. */}
          <Rise className="mt-10">
            <LiquidButton href={h.prototype} tone="solid">
              View prototype
              <ExternalIcon />
            </LiquidButton>
          </Rise>

          {/* The redesigned screens, up front. The Figma hero frame exports
              as an empty layer, so this shows the work instead. */}
          <Rise delay={0.1} className="mt-12">
            <div className="bg-mist-gray rounded-cards grid gap-6 p-6 sm:grid-cols-3 md:gap-10 md:p-12">
              {h.hero.map((s) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  className="rounded-cards-sm border-ink/[0.08] w-full border bg-white"
                />
              ))}
            </div>
            <p className="font-geist text-body text-graphite mt-6 max-w-3xl">
              {h.impact}
            </p>
          </Rise>

          <Rise className="mt-12">
            <Glance items={h.glance} />
          </Rise>
        </Container>

        {/* ----------------------------------------------- 1 · challenge */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={h.challenge.n}
                eyebrow={h.challenge.eyebrow}
                title={h.challenge.title}
                lead={h.challenge.lead}
              />
            </Rise>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {h.challenge.problems.map((p, i) => (
                <Rise key={p.n} delay={i * 0.06}>
                  <Card className="h-full">
                    <span className="font-serif-display text-fog text-heading-sm leading-none">
                      {p.n}
                    </span>
                    <p className="font-geist text-body text-graphite mt-4">
                      {p.body}
                    </p>
                  </Card>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------ 2 · research */}
        <section className={`${SECTION} bg-[color:var(--section-warm)]`}>
          <Container>
            <Rise>
              <Head
                n={h.research.n}
                eyebrow={h.research.eyebrow}
                title={h.research.title}
                lead={h.research.lead}
              />
            </Rise>

            {/* the voices */}
            <Rise className="mt-14">
              <h3 className={TYPE.h3}>{h.research.concernsTitle}</h3>
              <p className="font-geist text-body text-graphite mt-2 max-w-2xl">
                {h.research.concernsLead}
              </p>
              {/* The designed board carries all six voices and the
                  illustration, so both are dropped from the markup rather
                  than shown twice. */}
              <img
                src={h.research.concernsBoard}
                alt={h.research.concernsBoardAlt}
                loading="lazy"
                className="rounded-cards border-ink/[0.08] mt-8 w-full border bg-white"
              />
            </Rise>

            {/* the numbers */}
            <Rise className="mt-16">
              <div className="border-ink/[0.08] rounded-cards-sm border bg-white p-7 md:p-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
                  <div>
                    <h3 className={TYPE.h3}>
                      {h.research.statsTitle}
                    </h3>
                    <p className="font-geist text-body text-graphite mt-2">
                      {h.research.statsLead}
                    </p>
                    <p className="font-geist text-body text-ink mt-6">
                      {h.research.statsNote}
                    </p>
                  </div>
                  {/* The figures as they were charted in the study. The split
                      is also stated in words above, so the reading does not
                      depend on the picture. */}
                  <img
                    src={h.research.statsBoard}
                    alt={h.research.statsBoardAlt}
                    loading="lazy"
                    className="w-full self-center"
                  />
                </div>
              </div>
            </Rise>
          </Container>
        </section>

        {/* ------------------------------------------------ 3 · personas */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={h.personas.n}
                eyebrow={h.personas.eyebrow}
                title={h.personas.title}
                lead={h.personas.lead}
              />
            </Rise>

            {/* The persona boards as designed: role, demographics, bio,
                goals, pains and motivations all live inside the artwork, so
                rebuilding them as markup would print everything twice. The
                full text of each board is carried in its alt. */}
            <div className="mt-12 space-y-12">
              {h.personas.people.map((p, i) => (
                <Rise key={p.name} delay={i * 0.06}>
                  <img
                    src={p.board}
                    alt={p.boardAlt}
                    loading="lazy"
                    className="rounded-cards border-ink/[0.08] w-full border bg-white"
                  />
                  <p className="font-geist text-body text-ink mt-5 max-w-3xl">
                    {p.takeaway}
                  </p>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------ the turn */}
        <section className="bg-[color:var(--band)] py-16 md:py-24">
          <Container>
            <Rise>
              <p className="font-serif-display text-paper-white mx-auto max-w-4xl text-center text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.35]">
                {h.statement}
              </p>
            </Rise>
          </Container>
        </section>

        {/* ------------------------------------------------ 4 · redesign */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={h.redesign.n}
                eyebrow={h.redesign.eyebrow}
                title={h.redesign.title}
                lead={h.redesign.lead}
              />
            </Rise>

            {/* Before and after stacked rather than interleaved: the point is
                the contrast between two whole states, not screen by screen. */}
            {[h.redesign.before, h.redesign.after].map((half, idx) => (
              <Rise key={half.label} className={idx === 0 ? "mt-14" : "mt-16"}>
                {/* Label only. The caption and the annotation lines are drawn
                    on the board itself, so setting them again above it just
                    printed the same reading twice. */}
                <h3 className={TYPE.h3}>{half.label}</h3>

                {/* The designed board: the screens already sit framed and in
                    sequence on it, so laying them out again as a grid would
                    only reflow the same picture worse. */}
                <img
                  src={half.board}
                  alt={half.boardAlt}
                  loading="lazy"
                  className="rounded-cards border-ink/[0.08] mt-7 w-full border bg-white"
                />
              </Rise>
            ))}

          </Container>
        </section>

        {/* ------------------------------------------------ 5 · learnings */}
        <section className={`${SECTION} bg-[color:var(--section-warm)]`}>
          <Container>
            <Rise>
              <Eyebrow n={h.learnings.n}>{h.learnings.eyebrow}</Eyebrow>
              <h2 className={`${TYPE.h2} mt-5`}>
                {h.learnings.title}
              </h2>
              <p className="font-geist text-body-lg text-graphite mt-5 max-w-4xl">
                {h.learnings.quote}{" "}
                <span className="text-iris-blue">{h.learnings.quoteAccent}</span>
              </p>
            </Rise>

            <ol className="border-ink/[0.08] mt-10 border-t">
              {h.learnings.items.map((l, i) => (
                <Rise key={l.n} delay={i * 0.06}>
                  <li className="border-ink/[0.08] grid gap-3 border-b py-8 md:grid-cols-[64px_minmax(0,1fr)] md:gap-8">
                    <span className="font-serif-display text-fog text-heading-sm leading-none">
                      {l.n}
                    </span>
                    <div>
                      <h3 className="font-geist text-subheading text-ink font-medium">
                        {l.title}
                      </h3>
                      <p className="font-geist text-body text-graphite mt-2 max-w-3xl">
                        {l.body}
                      </p>
                    </div>
                  </li>
                </Rise>
              ))}
            </ol>

            <Rise className="mt-14">
              <LiquidButton to="/work">
                See the other case studies
                <ArrowRightIcon />
              </LiquidButton>
            </Rise>
          </Container>
        </section>
      </main>

      <Contact />
    </>
  );
}
