import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { liveWork, selectedWork } from "../lib/content";
import { Container, EASE, Pill, Reveal, Stagger } from "../components/ui";
import { LiquidButton } from "../components/LiquidButton";
import { ArrowUpRightIcon } from "../components/icons";
import { themeFor } from "../lib/surfaces";
import { TYPE } from "../lib/type";
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
            <p className={TYPE.eyebrow}>{liveWork.eyebrow}</p>
            <h2 className={`${TYPE.h2} mt-4 max-w-xl`}>{liveWork.title}</h2>
          </div>
          <p className={TYPE.eyebrow}>{liveWork.hint}</p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {liveWork.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.name}>
                {/*
                  The whole card is the link to the live product, so it is an
                  anchor rather than a button: the action is navigation, and a
                  button would take it away from middle-click, "open in new
                  tab" and the status bar.

                  The detail is an overlay on the image, not a panel below it,
                  so the card is edge-to-edge artwork with no white margin. It
                  is revealed by hover, focus and touch alike — hover alone
                  would hide this copy on every phone.
                */}
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onTouchStart={() => setOpen(i)}
                  aria-label={`${it.name}, ${it.tag}. Opens the live product in a new tab.`}
                  className="rounded-cards border-ink/[0.08] group/live relative block aspect-[4/5] overflow-hidden border"
                >
                  <img
                    src={it.image}
                    alt={it.alt}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "scale-[1.04]" : "scale-100"
                    }`}
                  />

                  {/* Ink wash carrying the copy. Sits over the artwork rather
                      than beside it, and only when this card is the open one. */}
                  <span
                    aria-hidden={!isOpen}
                    className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,13,18,0.92) 0%, rgba(10,13,18,0.72) 38%, rgba(10,13,18,0.12) 72%, rgba(10,13,18,0) 100%)",
                    }}
                  >
                    <span className="font-geist text-caption tracking-[0.11em] text-white/70 uppercase">
                      {it.tag}
                    </span>
                    <span className="font-serif-display text-paper-white mt-2 block text-[1.75rem] leading-[1.1]">
                      {it.name}
                    </span>
                    <span className="font-geist text-body-sm mt-3 block text-white/85">
                      {it.detail}
                    </span>
                    <span className="font-geist text-body-sm mt-3 block text-white/60">
                      {it.stat}
                    </span>
                    <span className="font-geist text-body-sm text-paper-white mt-5 inline-flex items-center gap-2">
                      Visit live
                      <ArrowUpRightIcon />
                    </span>
                  </span>

                  {/* Resting label, so a closed card still says what it is. */}
                  <span
                    aria-hidden={isOpen}
                    className={`absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-6 transition-opacity duration-300 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,13,18,0.78) 0%, rgba(10,13,18,0) 100%)",
                    }}
                  >
                    <span className="bg-paper-white/70 size-2 shrink-0 rounded-full" />
                    <span className="font-geist text-body text-paper-white font-medium">
                      {it.name}
                    </span>
                  </span>
                </a>
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
              <h1 className={TYPE.h1}>Selected work</h1>
              <p className={`${TYPE.lead} mt-4`}>
                Booking, exam prep and property. Different industries, same job:
                making the next step obvious.
              </p>
            </motion.div>

            <Stagger className="mt-14 flex flex-col gap-6 md:gap-8" gap={0.1}>
              {selectedWork.map((item) => (
                <Stagger.Item key={item.slug}>
                  <Link
                    to={`/work/${item.slug}`}
                    aria-label={`Read the ${item.meta} case study`}
                    className="group block"
                  >
                    <article
                      className={`border-ink/[0.06] rounded-cards border p-6 md:p-10 lg:p-12 ${
                        themeFor(item.slug).surface
                      }`}
                    >
                      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
                        <div>
                          <div className="font-geist text-body-sm text-graphite/70 flex items-center gap-3">
                            <span>{item.index}</span>
                            <span className="bg-ink/15 h-px w-6" />
                            <span>{item.meta}</span>
                          </div>

                          <h3 className={`${TYPE.h3} mt-5`}>{item.title}</h3>

                          <p className={`${TYPE.body} mt-4`}>{item.impact}</p>

                          <ul className="mt-7 flex flex-wrap gap-2">
                            {item.tags.map((t) => (
                              <li key={t}>
                                <Pill>{t}</Pill>
                              </li>
                            ))}
                          </ul>

                          {/* span, not a link: the card is already the link */}
                          <LiquidButton as="span" className="mt-8">
                            Read case study
                            <ArrowUpRightIcon />
                          </LiquidButton>
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
