import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { housing as h } from "../lib/content";
import { Container, EASE } from "../components/ui";
import { LiquidButton } from "../components/LiquidButton";
import { ArrowRightIcon, ExternalIcon } from "../components/icons";
import { TYPE } from "../lib/type";
import { themeVars } from "../lib/surfaces";
import { ProgressRail } from "../components/ProgressRail";
import { DeviceFrame } from "../components/DeviceFrame";
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
 * Re-skinned from the Figma file onto this site's system. The persona blocks
 * in particular arrive as roughly thirty stacked SVG fragments (avatar
 * chrome, slider tracks, decorative rules); they are rebuilt as markup so
 * they stay readable, responsive and selectable.
 */

/** A phone screen with its caption. Used by both halves of the comparison. */
function Screen({
  src,
  title,
  alt,
}: {
  src: string;
  title: string;
  alt?: string;
}) {
  return (
    <figure className="m-0">
      {/* These are phone captures, so they get phone chrome: on a white page
          a bare screenshot has no edge and reads as a picture of an app
          rather than as the app. */}
      <DeviceFrame kind="phone">
        <img src={src} alt={alt ?? title} loading="lazy" className="block w-full" />
      </DeviceFrame>
      <figcaption className="font-geist text-body-sm text-graphite mt-3 text-center">
        {title}
      </figcaption>
    </figure>
  );
}

/**
 * Preference split, rebuilt from the study's own figures.
 *
 * The source draws this as icon art with the percentages set as loose text.
 * As bars the comparison is immediate, and each row states its own value so
 * it does not depend on reading a chart.
 */
function PreferenceBars({ stats }: { stats: { label: string; value: number }[] }) {
  return (
    <ul className="space-y-5">
      {stats.map((s, i) => (
        <li key={s.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-geist text-body text-ink font-medium">
              {s.label}
            </span>
            <span className="font-serif-display text-ink text-heading-sm leading-none">
              {s.value}%
            </span>
          </div>
          <div
            className="bg-ink/[0.06] mt-2.5 h-2 w-full overflow-hidden rounded-full"
            role="img"
            aria-label={`${s.label}: ${s.value} percent`}
          >
            <div
              style={{ width: `${s.value}%` }}
              className={`h-full rounded-full ${
                i === 0 ? "bg-iris-blue" : "bg-ink/25"
              }`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

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

            <p className="font-geist text-body-sm text-fog mt-8 tracking-[0.11em] uppercase">
              {h.client} · {h.product}
            </p>
            <h1 className={`${TYPE.h1} max-w-4xl`}>
              {h.title}
            </h1>
            <p className="font-geist text-body-lg text-graphite mt-6 max-w-2xl">
              {h.deck}
            </p>

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
              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
                <div>
                  <h3 className={TYPE.h3}>
                    {h.research.concernsTitle}
                  </h3>
                  <p className="font-geist text-body text-graphite mt-2">
                    {h.research.concernsLead}
                  </p>

                  <ul className="mt-8 grid gap-3 md:grid-cols-2">
                    {h.research.concerns.map((q) => (
                      <li key={q}>
                        <Card className="h-full">
                          <p className="font-geist text-body text-graphite italic">
                            “{q}”
                          </p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>

                <img
                  src={h.research.illustration}
                  alt="Two people talking about a property"
                  loading="lazy"
                  className="mx-auto w-full max-w-[300px] lg:sticky lg:top-28"
                />
              </div>
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
                  <PreferenceBars stats={h.research.stats} />
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

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {h.personas.people.map((p, i) => (
                <Rise key={p.name} delay={i * 0.06}>
                  <Card className="flex h-full flex-col">
                    <span className="font-geist text-caption text-iris-blue tracking-[0.11em] uppercase">
                      {p.role}
                    </span>
                    <h3 className={`${TYPE.h3} mt-3`}>{p.name}</h3>
                    <p className="font-geist text-body text-graphite mt-1">
                      {p.tagline}
                    </p>

                    <dl className="border-ink/[0.08] mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y py-5">
                      {p.meta.map((m) => (
                        <div key={m.k}>
                          <dt className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                            {m.k}
                          </dt>
                          <dd className="font-geist text-body-sm text-ink mt-1">
                            {m.v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <p className="font-geist text-body-sm text-graphite mt-5">
                      {p.bio}
                    </p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      {[
                        { k: "Goals and needs", items: p.goals },
                        { k: "Pain points", items: p.pains },
                      ].map((col) => (
                        <div key={col.k}>
                          <p className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                            {col.k}
                          </p>
                          <ul className="mt-2.5 space-y-2">
                            {col.items.map((it) => (
                              <li
                                key={it}
                                className="font-geist text-body-sm text-graphite flex gap-2.5"
                              >
                                <span aria-hidden className="text-fog">
                                  ·
                                </span>
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                        Motivations
                      </p>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {p.motivations.map((m) => (
                          <li
                            key={m}
                            className="border-ink/[0.12] font-geist text-body-sm text-graphite rounded-full border px-3 py-1"
                          >
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="bg-mist-gray rounded-cards-sm font-geist text-body-sm text-ink mt-auto pt-0">
                      <span className="block p-4">{p.takeaway}</span>
                    </p>
                  </Card>
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
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className={TYPE.h3}>{half.label}</h3>
                  <p className="font-geist text-body text-graphite">
                    {half.caption}
                  </p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {half.notes.map((note) => (
                    <li
                      key={note}
                      className={`font-geist text-body-sm ${
                        idx === 0 ? "text-graphite" : "text-iris-blue"
                      }`}
                    >
                      {note}
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-7 grid gap-5 sm:grid-cols-3 ${
                    half.screens.length > 3 ? "lg:grid-cols-5" : "lg:grid-cols-4"
                  }`}
                >
                  {half.screens.map((s) => (
                    <Screen key={s.src} src={s.src} title={s.title} />
                  ))}
                </div>
              </Rise>
            ))}

            {/* the two flows */}
            <div className="mt-20 space-y-16 md:space-y-20">
              {h.redesign.flows.map((f, i) => (
                <Rise key={f.title}>
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div>
                      <h3 className={TYPE.h3}>
                        {f.title}
                      </h3>
                      <p className="font-geist text-body text-graphite mt-4">
                        {f.body}
                      </p>
                    </div>
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className="rounded-images border-ink/[0.08] w-full border bg-white"
                    />
                  </div>
                </Rise>
              ))}
            </div>
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
