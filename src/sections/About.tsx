import { motion } from "framer-motion";
import { skills, education, experience } from "../lib/content";
import { Card, Container, EASE, Reveal, SectionHeader, Stagger } from "../components/ui";
import { Bloom, Float, IrisBlob } from "../components/Floaties";

const WASHES = ["lavender", "mint", "aqua"] as const;

export default function About() {
  return (
    <section id="about" className="relative py-14 md:py-20">
      <Float className="top-[6%] right-[4%] w-16 md:w-24" delay={0.3} duration={8}>
        <Bloom className="w-full" />
      </Float>
      <Float className="bottom-[10%] left-[3%] w-10 md:w-14" delay={0.8} duration={9}>
        <IrisBlob className="w-full" />
      </Float>

      <Container>
        <SectionHeader
          eyebrow="About me"
          title={
            <>
              Every interaction tells a story — I make sure it's one worth
              remembering.
            </>
          }
          subhead="I deliver experiences users love by uniting research, design systems, and a pinch of creativity. Beyond the screen: strong coffee, mountain detours, and a notebook that's always open."
        />

        {/* Skills as pastel category tiles */}
        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3" gap={0.1}>
          {Object.entries(skills).map(([group, items], i) => (
            <Stagger.Item key={group}>
              <Card wash={WASHES[i % WASHES.length]} className="h-full">
                <h3 className="text-heading-sm text-ink">{group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-paper-white/70 px-3 py-1 font-geist text-body-sm text-graphite"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            </Stagger.Item>
          ))}
        </Stagger>

        {/* Experience — line draws itself as the section enters */}
        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <h3 className="text-heading text-ink">Where I've worked</h3>
            <p className="mt-3 font-geist text-body text-graphite">
              Five teams, four industries, one throughline: shipping flows that
              measurably move.
            </p>
          </Reveal>

          <div className="relative">
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ transformOrigin: "top" }}
              className="absolute top-2 bottom-2 left-[7px] w-px bg-powder-blue"
            />

            <Stagger className="space-y-10" gap={0.12} amount={0.1}>
              {experience.map((job) => (
                <Stagger.Item key={job.company}>
                  <div className="relative pl-10">
                    <span className="absolute top-1.5 left-0 h-4 w-4 rounded-full border-[3px] border-sky-tint bg-iris-blue" />
                    <p className="font-geist text-body-sm text-fog">{job.period}</p>
                    <h4 className="mt-1 text-heading-sm text-ink">
                      {job.role}{" "}
                      <span className="text-iris-blue">· {job.company}</span>
                    </h4>
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
        <Stagger className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2" gap={0.1}>
          {education.map((e) => (
            <Stagger.Item key={e.degree}>
              <Card className="h-full">
                <p className="font-geist text-body-sm text-fog">{e.period}</p>
                <h4 className="mt-2 text-heading-sm text-ink">{e.degree}</h4>
                <p className="mt-1 font-geist text-body text-graphite">{e.school}</p>
              </Card>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
