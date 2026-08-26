import { sideProjects, profile } from "../lib/content";
import { Card, Container, Pill, SectionHeader, Stagger } from "../components/ui";
import { Crayon, Float, Smiley } from "../components/Floaties";

export default function Playground() {
  return (
    <section id="playground" className="relative py-14 md:py-20">
      <Float className="top-[10%] left-[5%] w-12 md:w-16" delay={0.5} duration={8.5}>
        <Crayon className="w-full" />
      </Float>
      <Float className="right-[6%] bottom-[14%] w-14 md:w-20" delay={1} duration={7}>
        <Smiley className="w-full" />
      </Float>

      <Container>
        <SectionHeader
          eyebrow="Playground"
          title="Side projects, motion experiments & works in progress."
          subhead="A running log of things I build for fun — motion design on X, essays in progress on Medium, and independent products."
        />

        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3" gap={0.1}>
          {sideProjects.map((p, i) => (
            <Stagger.Item key={p.name}>
              <Card wash={i === 0 ? "peach" : "powder"} className="h-full">
                <Pill>{p.tag}</Pill>
                <h3 className="mt-5 text-heading text-ink">{p.name}</h3>
                <p className="mt-3 font-geist text-body text-graphite">{p.detail}</p>
              </Card>
            </Stagger.Item>
          ))}

          <Stagger.Item>
            <a
              href={profile.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="group block h-full"
            >
              <Card wash="solar" className="flex h-full flex-col justify-between">
                <Pill>In progress</Pill>
                <div className="mt-5">
                  <h3 className="text-heading text-ink">Motion reel</h3>
                  <p className="mt-3 font-geist text-body text-graphite">
                    Daily motion studies posted on X — Rive, Jitter and Figma
                    Motion experiments.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-geist text-body text-iris-blue">
                    Watch on X
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Card>
            </a>
          </Stagger.Item>
        </Stagger>
      </Container>
    </section>
  );
}
