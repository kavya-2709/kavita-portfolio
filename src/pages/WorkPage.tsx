import { useState } from "react";
import { Link } from "react-router-dom";
import { selectedWork, workIndex } from "../lib/content";
import { Container, Card, Pill, SectionHeader, Stagger } from "../components/ui";
import Contact from "../sections/Contact";
import Playground from "../sections/Playground";
import { Clean4Wheels, NioPractice } from "../components/scenes/mockups";

/**
 * Work index — every case study on one route, with the playground beneath.
 *
 * The homepage keeps its sticky card stack; this is the flat list the nav
 * points at. Side projects sit at the foot of the same page rather than on
 * their own route, so there is one place to look for anything Kavita made.
 */

/** Same fallback chain as the homepage card: export → real screens → mockup. */
function Visual({ item }: { item: (typeof selectedWork)[number] }) {
  const [imgOk, setImgOk] = useState(true);

  if (imgOk && item.image)
    return (
      <img
        src={item.image}
        alt={`${item.meta} — case study`}
        loading="lazy"
        onError={() => setImgOk(false)}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
    );

  if (item.screens)
    return (
      <div className="flex h-full w-full items-end justify-center gap-3 px-4 pt-6">
        {item.screens.map((src, n) => (
          <img
            key={src}
            src={src}
            alt={`${item.meta} — screen ${n + 1}`}
            loading="lazy"
            className={`border-ink/10 h-full w-auto rounded-t-[14px] border border-b-0 object-cover object-top transition-transform duration-700 group-hover:-translate-y-1.5 ${
              n === 2 ? "hidden sm:block" : ""
            }`}
          />
        ))}
      </div>
    );

  if (item.mock === "clean4wheels")
    return (
      <div className="h-full w-full p-3">
        <Clean4Wheels />
      </div>
    );
  if (item.mock === "niopractice")
    return (
      <div className="h-full w-full p-3">
        <NioPractice />
      </div>
    );
  return null;
}

export default function WorkPage() {
  return (
    <>
      <main className="pt-28 md:pt-36">
        <section className="py-14 md:py-20">
          <Container>
            <SectionHeader
              eyebrow={workIndex.eyebrow}
              title={workIndex.title}
              subhead={workIndex.subhead}
              align="left"
            />

            <Stagger className="mt-14 flex flex-col gap-8 md:gap-10" gap={0.1}>
              {selectedWork.map((item) => (
                <Stagger.Item key={item.slug}>
                  <Link
                    to={`/work/${item.slug}`}
                    aria-label={`Read the ${item.meta} case study`}
                    className="group block"
                  >
                    <Card>
                      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
                        <div>
                          <div className="font-geist text-body-sm text-fog flex items-center gap-3">
                            <span>{item.index}</span>
                            <span className="bg-ink/10 h-px w-6" />
                            <span>{item.meta}</span>
                          </div>

                          <h3 className="text-heading-sm md:text-heading text-ink mt-5 tracking-[-0.025em]">
                            {item.title}
                          </h3>

                          <p className="font-geist text-body text-graphite mt-4">
                            {item.impact}
                          </p>

                          <ul className="mt-8 flex flex-wrap gap-2">
                            {item.tags.map((t) => (
                              <li key={t}>
                                <Pill>{t}</Pill>
                              </li>
                            ))}
                          </ul>

                          <span className="font-geist text-body text-ink mt-8 inline-flex items-center gap-2">
                            {workIndex.cta}
                            <span
                              aria-hidden
                              className="bg-charcoal text-paper-white flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                            >
                              ↗
                            </span>
                          </span>
                        </div>

                        <div className="rounded-images bg-mist-gray aspect-[16/10] w-full overflow-hidden">
                          <Visual item={item} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Stagger.Item>
              ))}
            </Stagger>

          </Container>
        </section>

        {/* Playground closes the page rather than owning a route of its own.
            It carries its own header, so the hairline is the only separator
            it needs. The id stays so /work#playground still lands here. */}
        <div className="border-ink/[0.08] border-t">
          <Playground />
        </div>
      </main>
      <Contact />
    </>
  );
}
