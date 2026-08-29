import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { liveWork, selectedWork } from "../lib/content";
import {
  ActionLink,
  Container,
  EASE,
  Pill,
  Reveal,
  Stagger,
} from "../components/ui";
import { CARD_SURFACES } from "../lib/surfaces";
import Contact from "../sections/Contact";
import Playground from "../sections/Playground";
import { Clean4Wheels, NioPractice } from "../components/scenes/mockups";

/**
 * Work index — case studies, shipped work, and the playground beneath.
 *
 * The heading and the cards deliberately match the homepage's `SelectedWork`
 * section: same words, same type, same three surfaces. The homepage stacks
 * them and this lists them flat, but a card should not change identity
 * between the two places a visitor meets it.
 */

/** Same fallback chain as the homepage card: export → real screens → mockup. */
function Visual({ item }: { item: (typeof selectedWork)[number] }) {
  const [imgOk, setImgOk] = useState(true);

  if (imgOk && item.image)
    return (
      <img
        src={item.image}
        alt={`${item.meta} case study`}
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
            alt={`${item.meta} screen ${n + 1}`}
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

/**
 * Shipped work that never became a case study.
 *
 * One card is open at a time. It opens on hover, on focus and on tap, so the
 * detail is reachable by pointer, keyboard and thumb alike — a hover-only
 * disclosure would simply hide this content on every phone.
 *
 * The panel is animated with a 0fr→1fr grid row rather than max-height:
 * height animates to the content's real size, so a longer line never gets
 * clipped by a guessed maximum.
 */
function LiveWork() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-mist-gray py-14 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
              {liveWork.eyebrow}
            </p>
            <h2 className="text-heading md:text-heading-lg text-ink mt-4 max-w-xl tracking-[-0.025em]">
              {liveWork.title}
            </h2>
          </div>
          <p className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
            {liveWork.hint}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {liveWork.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.name}>
                <button
                  type="button"
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="border-ink/[0.08] rounded-cards flex h-full min-h-[300px] w-full cursor-default flex-col border bg-white p-7 text-left transition-colors duration-300 md:min-h-[340px]"
                >
                  <span
                    aria-hidden
                    className={`size-2.5 shrink-0 rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-iris-blue" : "bg-ink/15"
                    }`}
                  />

                  {/* pushes the label block to the foot of the card */}
                  <span className="flex-1" />

                  <span
                    className={`font-geist text-caption tracking-[0.11em] uppercase transition-colors duration-300 ${
                      isOpen ? "text-iris-blue" : "text-fog"
                    }`}
                  >
                    {it.tag}
                  </span>
                  <span className="text-heading-sm text-ink mt-2 block tracking-[-0.02em]">
                    {it.name}
                  </span>

                  <span
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <span className="overflow-hidden">
                      <span className="font-geist text-body text-graphite mt-4 block">
                        {it.detail}
                      </span>
                      <span className="font-geist text-body-sm text-fog mt-3 block">
                        {it.stat}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export default function WorkPage() {
  return (
    <>
      <main className="pt-28 md:pt-36">
        <section className="py-14 md:py-20">
          <Container>
            {/* Same words and same type as the homepage section. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-3xl"
            >
              <h1 className="text-heading md:text-heading-lg text-ink tracking-[-0.025em]">
                Selected work
              </h1>
              <p className="font-geist text-body-lg text-graphite mt-4">
                Booking, exam prep and property. Different industries, same job:
                making the next step obvious.
              </p>
            </motion.div>

            <Stagger className="mt-14 flex flex-col gap-6 md:gap-8" gap={0.1}>
              {selectedWork.map((item, i) => (
                <Stagger.Item key={item.slug}>
                  <Link
                    to={`/work/${item.slug}`}
                    aria-label={`Read the ${item.meta} case study`}
                    className="group block"
                  >
                    <article
                      className={`border-ink/[0.06] rounded-cards border p-6 md:p-10 lg:p-12 ${
                        CARD_SURFACES[i % CARD_SURFACES.length]
                      }`}
                    >
                      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
                        <div>
                          <div className="font-geist text-body-sm text-graphite/70 flex items-center gap-3">
                            <span>{item.index}</span>
                            <span className="bg-ink/15 h-px w-6" />
                            <span>{item.meta}</span>
                          </div>

                          <h2 className="text-heading-sm md:text-heading text-ink mt-5 tracking-[-0.02em]">
                            {item.title}
                          </h2>

                          <p className="font-geist text-body text-graphite mt-4">
                            {item.impact}
                          </p>

                          <ul className="mt-7 flex flex-wrap gap-2">
                            {item.tags.map((t) => (
                              <li key={t}>
                                <Pill>{t}</Pill>
                              </li>
                            ))}
                          </ul>

                          {/* span, not a link: the card is already the link */}
                          <ActionLink as="span" arrow="↗" className="mt-8">
                            Read case study
                          </ActionLink>
                        </div>

                        <div className="rounded-images aspect-[16/10] w-full overflow-hidden bg-white">
                          <Visual item={item} />
                        </div>
                      </div>
                    </article>
                  </Link>
                </Stagger.Item>
              ))}
            </Stagger>
          </Container>
        </section>

        <Reveal>
          <LiveWork />
        </Reveal>

        {/* Playground closes the page rather than owning a route of its own.
            It carries its own header and ground, so it needs no separator. */}
        <Playground />
      </main>
      <Contact />
    </>
  );
}
