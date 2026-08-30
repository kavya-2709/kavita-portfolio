import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { nio as n } from "../lib/content";
import { Container, EASE } from "../components/ui";
import { LiquidButton } from "../components/LiquidButton";
import { ArrowRightIcon } from "../components/icons";
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
 * NioPractice case study.
 *
 * Follows the same shape as the Clean4Wheels study so the two read as one
 * body of work: thesis in the first screen, the arc summarised before any
 * evidence, then challenge, research, the turn, the work, and what it
 * taught. Re-skinned from the Figma file's Maven Pro and blue palette onto
 * this site's Geist, Instrument Serif and single iris accent.
 */

/**
 * Grouped bar chart, rebuilt as markup.
 *
 * Figma exports this as two SVGs holding only gridlines: the bars are
 * positioned rectangles, so nothing renderable ships with the chart. Rebuilt
 * here from the bar geometry, which also makes it responsive and readable to
 * a screen reader, neither of which a flattened image would be.
 */
function PainChart({ chart }: { chart: typeof n.research.chart }) {
  const colours = ["bg-ink", "bg-iris-blue"] as const;

  return (
    <figure className="border-ink/[0.08] rounded-cards-sm m-0 border bg-white p-6 md:p-8">
      <figcaption className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h4 className="font-geist text-subheading text-ink font-medium">
          {chart.title}
        </h4>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {chart.series.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2">
              <span
                aria-hidden
                className={`size-3 rounded-[3px] ${colours[i]}`}
              />
              <span className="font-geist text-body-sm text-graphite">
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      </figcaption>

      <div className="flex gap-4">
        {/* y axis */}
        <div
          aria-hidden
          className="font-geist text-caption text-fog flex h-[260px] flex-col justify-between text-right md:h-[320px]"
        >
          {chart.ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* plot: gridlines behind, bars in front */}
          <div className="relative h-[260px] md:h-[320px]">
            <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
              {chart.ticks.map((t) => (
                <span key={t} className="bg-ink/[0.06] h-px w-full" />
              ))}
              <span className="bg-ink/[0.12] h-px w-full" />
            </div>

            <ul className="relative flex h-full items-end gap-3 sm:gap-6 md:gap-10">
              {chart.groups.map((g) => (
                <li key={g.label} className="flex h-full flex-1 items-end justify-center gap-1.5 sm:gap-2.5">
                  {chart.series.map((s, i) => {
                    const v = g[s.key as "ansh" | "sameera"];
                    return (
                      <span
                        key={s.key}
                        // Bars carry their own label, so the chart is
                        // readable without sight of it.
                        role="img"
                        aria-label={`${s.name}, ${g.label}: approximately ${v} out of ${chart.max}`}
                        style={{ height: `${(v / chart.max) * 100}%` }}
                        className={`w-full max-w-[46px] rounded-t-[6px] ${colours[i]}`}
                      />
                    );
                  })}
                </li>
              ))}
            </ul>
          </div>

          {/* x axis */}
          <ul className="mt-3 flex gap-3 sm:gap-6 md:gap-10">
            {chart.groups.map((g) => (
              <li
                key={g.label}
                className="font-geist text-caption text-graphite flex-1 text-center"
              >
                {g.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="font-geist text-body-sm text-fog mt-6">
        {chart.axisLabel}. {chart.caption}
      </p>
    </figure>
  );
}

export default function NioCase() {
  const rail = [
    { id: `section-${n.challenge.n}`, n: n.challenge.n, label: n.challenge.eyebrow },
    { id: `section-${n.research.n}`, n: n.research.n, label: n.research.eyebrow },
    { id: `section-${n.screens.n}`, n: n.screens.n, label: n.screens.eyebrow },
    { id: `section-${n.learnings.n}`, n: n.learnings.n, label: n.learnings.eyebrow },
  ];
  return (
    <>
      <ProgressRail items={rail} />
      <main className="pt-28 md:pt-32" style={themeVars("niopractice")}>
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
              {n.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[color:var(--badge-line)] bg-[color:var(--badge-bg)] px-4 py-1.5 font-geist text-body-sm text-[color:var(--badge-ink)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <img
                src={n.logo}
                alt={`${n.client} logo`}
                width={192}
                height={96}
                className="h-[56px] w-auto self-start object-contain object-left"
              />
              <div>
                <h1 className={`${TYPE.h1} max-w-4xl`}>
                  {n.title}
                </h1>
                <p className="font-geist text-body-lg text-graphite mt-6 max-w-2xl">
                  {n.deck}
                </p>
              </div>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-16 gap-y-6">
              {n.facts.map((f) => (
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

          <Rise className="mt-12">
            <div className="grid gap-4 sm:grid-cols-2">
              {n.metrics.map((m) => (
                <Card key={m.label}>
                  <p className="font-serif-display text-ink text-[44px] leading-none">
                    {m.value}
                  </p>
                  <p className="font-geist text-body text-ink mt-4 font-medium">
                    {m.label}
                  </p>
                  <p className="font-geist text-body-sm text-graphite mt-2 leading-[1.5]">
                    {m.note}
                  </p>
                </Card>
              ))}
            </div>
          </Rise>

          <Rise className="mt-8">
            <Glance items={n.glance} />
          </Rise>
        </Container>

        {/* ----------------------------------------------- 1 · challenge */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={n.challenge.n}
                eyebrow={n.challenge.eyebrow}
                title={n.challenge.title}
                lead={n.challenge.lead}
              />
            </Rise>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {n.challenge.problems.map((p, i) => (
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
                n={n.research.n}
                eyebrow={n.research.eyebrow}
                title={n.research.title}
                lead={n.research.lead}
              />
            </Rise>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {n.research.personas.map((p, i) => (
                <Rise key={p.name} delay={i * 0.06}>
                  <Card className="h-full">
                    <h3 className="font-geist text-subheading text-ink font-medium">
                      {p.name}
                    </h3>
                    <p className="font-geist text-body-sm text-iris-blue mt-1.5">
                      {p.summary}
                    </p>
                    <ul className="border-ink/[0.08] mt-5 space-y-2.5 border-t pt-5">
                      {p.traits.map((t) => (
                        <li
                          key={t}
                          className="font-geist text-body-sm text-graphite flex gap-3"
                        >
                          <span aria-hidden className="text-fog">
                            ·
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Rise>
              ))}
            </div>

            <Rise className="mt-4">
              <PainChart chart={n.research.chart} />
            </Rise>
          </Container>
        </section>

        {/* ------------------------------------------------ the turn */}
        <section className="bg-[color:var(--band)] py-16 md:py-24">
          <Container>
            <Rise>
              <p className="font-serif-display text-paper-white mx-auto max-w-4xl text-center text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.35]">
                {n.statement}
              </p>
            </Rise>
          </Container>
        </section>

        {/* -------------------------------------------------- 3 · screens */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={n.screens.n}
                eyebrow={n.screens.eyebrow}
                title={n.screens.title}
                lead={n.screens.lead}
              />
            </Rise>

            <div className="mt-14 space-y-16 md:space-y-24">
              {n.screens.items.map((s, i) => (
                <Rise key={s.label}>
                  {/* Alternating sides, matching the source layout and
                      keeping four similar blocks from reading as one column. */}
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <DeviceFrame kind="browser">
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        className="block w-full"
                      />
                    </DeviceFrame>

                    <div>
                      <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                        {s.label}
                      </span>
                      <h3 className={`${TYPE.h3} mt-3`}>
                        {s.title}
                      </h3>
                      <p className="font-geist text-body text-graphite mt-5">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------ 4 · learnings */}
        <section className={`${SECTION} bg-[color:var(--section-warm)]`}>
          <Container>
            <Rise>
              <Eyebrow n={n.learnings.n}>{n.learnings.eyebrow}</Eyebrow>
              <h2 className={`${TYPE.h2} mt-5`}>
                {n.learnings.title}
              </h2>
              <p className="font-geist text-body-lg text-graphite mt-5 max-w-4xl">
                {n.learnings.quote}{" "}
                <span className="text-iris-blue">{n.learnings.quoteAccent}</span>
              </p>
            </Rise>

            <ol className="border-ink/[0.08] mt-10 border-t">
              {n.learnings.items.map((l, i) => (
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
