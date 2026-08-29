import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { clean4Wheels as c } from "../lib/content";
import { Container, EASE } from "../components/ui";
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
 * Clean4Wheels case study.
 *
 * Built from the Figma file, then re-skinned onto this site's system rather
 * than reproducing the source styling. The Figma page uses Maven Pro and
 * Manrope with a cherry-red and amber palette, three type faces and a
 * shadowed-card look. Here it is Geist and Instrument Serif, one iris-blue
 * accent, hairline borders and no shadows, so the study reads as part of the
 * portfolio instead of a pasted-in artefact.
 *
 * Structure, hierarchy and copy are the design's. Only the surface is ours.
 */

export default function Clean4WheelsCase() {
  const featured = c.booking.steps.filter((s) => "featured" in s && s.featured);
  const compact = c.booking.steps.filter((s) => !("featured" in s));

  return (
    <>
      <main className="pt-28 md:pt-32">
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
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="border-ink/[0.08] font-geist text-body-sm text-graphite rounded-full border px-4 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <img
                src={c.logo}
                alt={`${c.client} logo`}
                width={220}
                height={60}
                className="h-[52px] w-auto self-start object-contain object-left"
              />
              <div>
                <h1 className="text-heading md:text-heading-lg lg:text-display text-ink max-w-4xl tracking-[-0.03em]">
                  {c.title}
                </h1>
                {/* The thesis, before the evidence. Previously a reader had to
                    reach 42% of the page to learn what the study argues. */}
                <p className="font-geist text-body-lg text-graphite mt-6 max-w-2xl">
                  {c.deck}
                </p>
              </div>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-16 gap-y-6">
              {c.facts.map((f) => (
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

          <Rise delay={0.1} className="mt-12">
            <img
              src={c.hero}
              alt="Clean4Wheels customer, valet and manager interfaces"
              width={1536}
              height={1024}
              className="rounded-images border-ink/[0.08] w-full border"
            />
          </Rise>

          {/* headline metrics */}
          <Rise className="mt-12">
            <div className="grid gap-4 md:grid-cols-3">
              {c.metrics.map((m) => (
                <Card key={m.label}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-serif-display text-ink text-[44px] leading-none">
                      {m.value}
                    </p>
                    {/* On the card, not only in the footnote. A reader who
                        scans the three numbers and leaves should still know
                        they are modelled. */}
                    <span className="border-ink/[0.12] font-geist text-caption text-fog mt-1 shrink-0 rounded-full border px-2.5 py-1 tracking-[0.08em] uppercase">
                      {c.metricsTag}
                    </span>
                  </div>
                  <p className="font-geist text-body text-ink mt-4 font-medium">
                    {m.label}
                  </p>
                  <p className="font-geist text-body-sm text-graphite mt-2 leading-[1.5]">
                    {m.note}
                  </p>
                </Card>
              ))}
            </div>
            <p className="font-geist text-body-sm text-fog mt-5">
              {c.metricsNote}
            </p>
          </Rise>

          {/* The whole arc, for the reader who gives the page a minute.
              Everything after this section is the evidence for these four
              claims: the first designed outcome used to sit at 51% depth. */}
          <Rise className="mt-14">
            <Glance items={c.glance} />
          </Rise>
        </Container>

        {/* ----------------------------------------------- 1 · ecosystem */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={c.ecosystem.n}
                eyebrow={c.ecosystem.eyebrow}
                title={c.ecosystem.title}
                lead={c.ecosystem.lead}
              />
            </Rise>

            {/* The source art is a 20-fragment chart export. Rebuilt as real
                markup so it stays legible, selectable and responsive. */}
            <Rise className="mt-12">
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {c.ecosystem.steps.map((s, i) => (
                  <li key={s.name} className="relative">
                    <Card className="h-full">
                      <span className="font-geist text-caption text-iris-blue tracking-[0.11em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-geist text-body text-ink mt-3 font-medium">
                        {s.name}
                      </p>
                      <p className="font-geist text-body-sm text-graphite mt-2 leading-[1.5]">
                        {s.note}
                      </p>
                    </Card>
                    {i < c.ecosystem.steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="text-fog absolute top-1/2 -right-2.5 hidden -translate-y-1/2 text-body lg:block"
                      >
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </Rise>

            <Rise className="mt-10">
              <blockquote className="border-iris-blue font-geist text-body-lg text-graphite max-w-3xl border-l-2 pl-6">
                {c.ecosystem.quote}
              </blockquote>
            </Rise>
          </Container>
        </section>

        {/* ------------------------------------------------- 2 · context */}
        <section className={`${SECTION} bg-mist-gray`}>
          <Container>
            <Rise>
              <Head
                n={c.context.n}
                eyebrow={c.context.eyebrow}
                title={c.context.title}
                lead={c.context.lead}
              />
            </Rise>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {c.context.gaps.map((g, i) => (
                <Rise key={g.area} delay={i * 0.05}>
                  <Card className="h-full">
                    <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                      {g.area}
                    </span>
                    <h3 className="font-geist text-subheading text-ink mt-3 font-medium">
                      {g.title}
                    </h3>
                    <p className="font-geist text-body text-graphite mt-3">
                      {g.body}
                    </p>

                    <dl className="border-ink/[0.08] mt-6 space-y-3 border-t pt-5">
                      {[
                        { k: "Pain point", v: g.pain },
                        { k: "Opportunity", v: g.opportunity },
                      ].map((row) => (
                        <div
                          key={row.k}
                          className="grid gap-1 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-4"
                        >
                          <dt className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                            {row.k}
                          </dt>
                          <dd className="font-geist text-body-sm text-graphite">
                            {row.v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <p className="font-geist text-body-sm text-iris-blue mt-5 font-medium">
                      Potential impact: {g.impact}
                    </p>
                  </Card>
                </Rise>
              ))}
            </div>

            <Rise className="mt-8">
              <div className="border-ink/[0.08] rounded-cards-sm border bg-white p-7 md:p-9">
                <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                  {c.context.realisationLabel}
                </span>
                <p className="font-geist text-body-lg text-ink mt-3 max-w-4xl">
                  {c.context.realisation}
                </p>
              </div>
            </Rise>
          </Container>
        </section>

        {/* ----------------------------------------------- 3 · discovery */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={c.discovery.n}
                eyebrow={c.discovery.eyebrow}
                title={c.discovery.title}
                lead={c.discovery.lead}
              />
            </Rise>

            {/* 3.1 stakeholder */}
            <Rise className="mt-14">
              <p className="font-geist text-body-sm text-iris-blue font-medium">
                {c.discovery.stakeholder.label}
              </p>
              <h3 className="text-heading-sm text-ink mt-2">
                {c.discovery.stakeholder.title}
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {c.discovery.stakeholder.roles.map((r) => (
                  <Card key={r.role}>
                    <p className="font-geist text-body text-ink font-medium">
                      {r.role}
                    </p>
                    <p className="font-geist text-body-sm text-graphite mt-2 leading-[1.5]">
                      {r.focus}
                    </p>
                  </Card>
                ))}
              </div>

              <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
                {c.discovery.stakeholder.findings.map((f, i) => (
                  <li key={f} className="flex gap-3">
                    <span className="font-geist text-caption text-fog mt-1 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-geist text-body text-graphite">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Rise>

            {/* 3.2 audit */}
            <Rise className="mt-16">
              <p className="font-geist text-body-sm text-iris-blue font-medium">
                {c.discovery.audit.label}
              </p>
              <h3 className="text-heading-sm text-ink mt-2">
                {c.discovery.audit.title}
              </h3>

              <div className="mt-6 flex flex-wrap gap-3">
                {c.discovery.audit.stats.map((s) => (
                  <span
                    key={s.label}
                    className="border-ink/[0.08] font-geist text-body-sm text-graphite rounded-full border px-4 py-1.5"
                  >
                    <span className="text-ink font-medium">{s.value}</span>{" "}
                    {s.label}
                  </span>
                ))}
              </div>

              <img
                src={c.discovery.audit.image}
                alt="Audit of the existing Clean4Wheels booking screens"
                loading="lazy"
                width={1535}
                height={1024}
                className="rounded-images border-ink/[0.08] mt-8 w-full border"
              />

              {/* A real table: this is tabular data, and a screen reader
                  should be able to say so. It scrolls rather than squashing,
                  and the wrapper is focusable because a scroll container that
                  can't be reached by keyboard traps its content. */}
              <div
                role="region"
                aria-label="Screen audit findings"
                tabIndex={0}
                className="mt-8 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0"
              >
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-ink/[0.12] border-b">
                      {c.discovery.audit.columns.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="font-geist text-caption text-fog px-3 py-3 font-medium tracking-[0.11em] uppercase first:pl-0 last:pr-0"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.discovery.audit.rows.map((row) => (
                      <tr
                        key={row[0]}
                        className="border-ink/[0.06] border-b align-top"
                      >
                        <th
                          scope="row"
                          className="font-geist text-body-sm text-ink w-[150px] px-3 py-4 pl-0 text-left font-medium"
                        >
                          {row[0]}
                        </th>
                        <td className="font-geist text-body-sm text-graphite px-3 py-4">
                          {row[1]}
                        </td>
                        <td className="font-geist text-body-sm text-graphite px-3 py-4 pr-0">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Rise>

            {/* 3.3 heuristics */}
            <Rise className="mt-16">
              <p className="font-geist text-body-sm text-iris-blue font-medium">
                {c.discovery.heuristics.label}
              </p>
              <h3 className="text-heading-sm text-ink mt-2">
                {c.discovery.heuristics.title}
              </h3>

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <ul className="border-ink/[0.08] divide-ink/[0.06] divide-y rounded-cards-sm border">
                  {c.discovery.heuristics.rows.map((r) => (
                    <li
                      key={r.principle}
                      className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4"
                    >
                      <span className="font-geist text-body text-ink min-w-[240px] flex-1 font-medium">
                        {r.principle}
                      </span>
                      <span className="font-geist text-body-sm text-graphite flex-[2]">
                        {r.finding}
                      </span>
                      <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                        {r.verdict}
                      </span>
                    </li>
                  ))}
                </ul>

                <blockquote className="bg-solar-wash rounded-cards-sm font-geist text-body text-ink m-0 self-start p-6">
                  {c.discovery.heuristics.quote}
                </blockquote>
              </div>
            </Rise>

            {/* 3.4 benchmark */}
            <Rise className="mt-16">
              <p className="font-geist text-body-sm text-iris-blue font-medium">
                {c.discovery.benchmark.label}
              </p>
              <h3 className="text-heading-sm text-ink mt-2">
                {c.discovery.benchmark.title}
              </h3>

              <div
                role="region"
                aria-label="Competitive benchmark"
                tabIndex={0}
                className="mt-6 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0"
              >
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-ink/[0.12] border-b">
                      {c.discovery.benchmark.columns.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="font-geist text-caption text-fog px-3 py-3 font-medium tracking-[0.11em] uppercase first:pl-0 last:pr-0"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.discovery.benchmark.rows.map((r) => (
                      <tr
                        key={r.feature}
                        className="border-ink/[0.06] border-b align-top"
                      >
                        <th
                          scope="row"
                          className="font-geist text-body-sm text-ink px-3 py-4 pl-0 text-left font-medium"
                        >
                          {r.feature}
                        </th>
                        {/* Words, not symbols: a bare ✓/✗/◑ is unreadable to
                            a screen reader and ambiguous to everyone else. */}
                        <td className="font-geist text-body-sm text-graphite px-3 py-4">
                          {MARK[r.ours]}
                        </td>
                        <td className="font-geist text-body-sm text-graphite px-3 py-4">
                          {MARK[r.theirs]}
                        </td>
                        <td className="font-geist text-body-sm text-graphite px-3 py-4 pr-0">
                          {r.opportunity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {c.discovery.benchmark.notes.map((n) => (
                  <Card key={n}>
                    <p className="font-geist text-body-sm text-graphite leading-[1.55]">
                      {n}
                    </p>
                  </Card>
                ))}
              </div>

              <p className="font-geist text-body-lg text-ink mt-8 max-w-3xl">
                {c.discovery.benchmark.gap}
              </p>
            </Rise>
          </Container>
        </section>

        {/* ----------------------------------------------- 4 · synthesis */}
        <section className={`${SECTION} bg-mist-gray`}>
          <Container>
            <Rise>
              <Head
                n={c.synthesis.n}
                eyebrow={c.synthesis.eyebrow}
                title={c.synthesis.title}
                lead={c.synthesis.lead}
              />
            </Rise>

            <Rise className="mt-12">
              <div className="bg-solar-wash rounded-cards-sm p-7 md:p-10">
                <span className="font-geist text-caption text-graphite tracking-[0.11em] uppercase">
                  {c.synthesis.featured.label}
                </span>
                <h3 className="text-heading-sm md:text-heading text-ink mt-4 max-w-3xl tracking-[-0.02em]">
                  {c.synthesis.featured.title}{" "}
                  <span className="text-iris-blue">
                    {c.synthesis.featured.titleAccent}
                  </span>
                </h3>
                <p className="font-geist text-body text-graphite mt-5 max-w-3xl">
                  {c.synthesis.featured.body}
                </p>
                <Sources items={c.synthesis.featured.sources} />
              </div>
            </Rise>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {c.synthesis.insights.map((ins, i) => (
                <Rise key={ins.label} delay={i * 0.05}>
                  <Card className="flex h-full flex-col">
                    <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                      {ins.label}
                    </span>
                    <p className="font-geist text-body text-ink mt-3">
                      {ins.title}
                    </p>
                    <p className="font-geist text-body-sm text-iris-blue mt-3">
                      {ins.action}
                    </p>
                    <div className="mt-auto">
                      <Sources items={ins.sources} />
                    </div>
                  </Card>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------ 5 · statement */}
        <section className="bg-ink py-16 md:py-24">
          <Container>
            <Rise>
              <p className="font-serif-display text-paper-white mx-auto max-w-4xl text-center text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.35]">
                {c.statement}
              </p>
            </Rise>
          </Container>
        </section>

        {/* -------------------------------------------------- 6 · booking */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Head
                n={c.booking.n}
                eyebrow={c.booking.eyebrow}
                title={c.booking.title}
                lead={c.booking.lead}
              />
            </Rise>

            {/* Six steps given equal weight read as six equally easy
                decisions, which hides the judgement. The three that carry the
                argument get the full treatment; the rest are summarised, so
                the journey stays complete without flattening it. */}
            <div className="mt-14 space-y-16 md:space-y-24">
              {featured.map((s, i) => (
                <Rise key={s.n}>
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={`Booking step ${s.n}, ${s.title}`}
                      loading="lazy"
                      className="rounded-images border-ink/[0.08] w-full border"
                    />

                    <div>
                      <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
                        Booking · step {s.n} of 06
                      </span>
                      <h3 className="text-heading-sm md:text-heading text-ink mt-3 tracking-[-0.02em]">
                        {s.title}
                      </h3>

                      <dl className="mt-7 space-y-5">
                        {[
                          { k: "Why", v: s.why },
                          { k: "Decision", v: s.decision },
                          { k: "Outcome", v: s.outcome },
                        ].map((row) => (
                          <div key={row.k}>
                            <dt className="font-geist text-caption text-iris-blue tracking-[0.11em] uppercase">
                              {row.k}
                            </dt>
                            <dd className="font-geist text-body text-graphite mt-1.5">
                              {row.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </Rise>
              ))}
            </div>

            <Rise className="mt-16">
              <p className="font-geist text-body-sm text-fog tracking-[0.11em] uppercase">
                The other three steps
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {compact.map((s) => (
                  <Card key={s.n} className="flex h-full flex-col">
                    <img
                      src={s.image}
                      alt={`Booking step ${s.n}, ${s.title}`}
                      loading="lazy"
                      className="rounded-cards-sm border-ink/[0.08] w-full border"
                    />
                    <span className="font-geist text-caption text-fog mt-5 tracking-[0.11em] uppercase">
                      Step {s.n}
                    </span>
                    <h3 className="font-geist text-subheading text-ink mt-1.5 font-medium">
                      {s.title}
                    </h3>
                    <p className="font-geist text-body-sm text-graphite mt-3">
                      {s.decision}
                    </p>
                    <p className="font-geist text-body-sm text-iris-blue mt-auto pt-4">
                      {s.outcome}
                    </p>
                  </Card>
                ))}
              </div>
            </Rise>
          </Container>
        </section>

        {/* --------------------------------------------- 7 · verification */}
        <section className={`${SECTION} bg-ink`}>
          <Container>
            <Rise>
              <Head
                n={c.verification.n}
                eyebrow={c.verification.eyebrow}
                title={c.verification.title}
                lead={c.verification.lead}
                invert
              />
            </Rise>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {c.verification.audiences.map((a, i) => (
                <Rise key={a.who} delay={i * 0.05}>
                  <div className="rounded-cards-sm h-full border border-white/10 bg-white/[0.04] p-6">
                    <p className="font-geist text-body text-paper-white font-medium">
                      {a.who}
                    </p>
                    <p className="font-geist text-body-sm mt-2 leading-[1.55] text-white/65">
                      {a.what}
                    </p>
                  </div>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------- 8 · platform */}
        <section className={SECTION}>
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Rise>
                <div className="grid gap-4">
                  <img
                    src={c.platform.images[0]}
                    alt="Manager dashboard showing live service status"
                    loading="lazy"
                    className="rounded-images border-ink/[0.08] w-full border"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {c.platform.images.slice(1).map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`Valet field app screen ${i + 1}`}
                        loading="lazy"
                        className="rounded-images border-ink/[0.08] w-full border"
                      />
                    ))}
                  </div>
                </div>
              </Rise>

              <Rise delay={0.08}>
                <Eyebrow n={c.platform.n}>{c.platform.eyebrow}</Eyebrow>
                <h2 className="text-heading md:text-heading-lg text-ink mt-5 tracking-[-0.025em]">
                  {c.platform.title}
                </h2>
                <p className="font-geist text-body-lg text-graphite mt-5">
                  {c.platform.lead}
                </p>

                <ul className="mt-8 space-y-3">
                  {c.platform.points.map((p) => (
                    <li key={p.title}>
                      <Card>
                        <p className="font-geist text-body text-ink font-medium">
                          {p.title}
                        </p>
                        <p className="font-geist text-body-sm text-graphite mt-1.5 leading-[1.55]">
                          {p.body}
                        </p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
          </Container>
        </section>

        {/* --------------------------------------------- 9 · design system */}
        <section className={`${SECTION} bg-mist-gray`}>
          <Container>
            <Rise>
              <Head
                n={c.system.n}
                eyebrow={c.system.eyebrow}
                title={c.system.title}
                lead={c.system.lead}
              />
            </Rise>
            <Rise className="mt-12">
              <img
                src={c.system.image}
                alt="The Clean4Wheels design system: tokens, components and patterns"
                loading="lazy"
                width={1600}
                height={1120}
                className="rounded-images border-ink/[0.08] w-full border bg-white"
              />
            </Rise>
          </Container>
        </section>

        {/* ------------------------------------------------ 10 · learnings */}
        <section className={SECTION}>
          <Container>
            <Rise>
              <Eyebrow n={c.learnings.n}>{c.learnings.eyebrow}</Eyebrow>
              <h2 className="text-heading md:text-heading-lg text-ink mt-5 tracking-[-0.025em]">
                {c.learnings.title}
              </h2>
              <p className="font-geist text-body-lg text-graphite mt-5 max-w-4xl">
                {c.learnings.quote}{" "}
                <span className="text-iris-blue">{c.learnings.quoteAccent}</span>
              </p>
            </Rise>

            <ol className="border-ink/[0.08] mt-10 border-t">
              {c.learnings.items.map((l, i) => (
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
              <Link
                to="/work"
                className="font-geist text-body text-ink group inline-flex items-center gap-3"
              >
                See the other case studies
                <span
                  aria-hidden
                  className="bg-charcoal text-paper-white text-body flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                >
                  →
                </span>
              </Link>
            </Rise>
          </Container>
        </section>
      </main>

      <Contact />
    </>
  );
}

/** Benchmark cell wording. Spelled out rather than tick/cross glyphs. */
const MARK: Record<string, string> = {
  yes: "Yes",
  no: "No",
  partial: "Partial",
};

/** The research methods an insight came from. */
function Sources({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li
          key={s}
          className="border-ink/[0.12] font-geist text-caption text-graphite rounded-full border px-2.5 py-1 tracking-[0.08em] uppercase"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
