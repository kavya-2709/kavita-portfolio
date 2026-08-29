import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { selectedWork } from "../lib/content";
import { Container } from "../components/ui";
import { Clean4Wheels, NioPractice } from "../components/scenes/mockups";

const NAV_OFFSET = 100;
const STACK_STEP = 24;

/**
 * Selected work, as a stack of editorial case-study cards.
 *
 * Card anatomy: index and client, headline, impact line, tags and a labelled
 * action down the left, with the work itself on the right. Each card carries
 * a different solid neutral so the stack reads as three distinct pieces
 * rather than one long white column.
 */

/**
 * Card surfaces. Solid and fully opaque by design: tinting with an alpha
 * lets whatever is behind bleed through, and these cards physically overlap
 * as they stack, so a translucent card would show the one underneath it.
 * The tokens live in `index.css` under `@theme` with the rest of the system.
 */
const SURFACES = ["bg-card-ivory", "bg-card-sage", "bg-card-stone"];

/** Placeholder shown only when a case-study export is missing. */
function MockPanel({ kind }: { kind: "clean4wheels" | "niopractice" | null }) {
  if (kind === "clean4wheels")
    return (
      <div className="h-full w-full p-3">
        <Clean4Wheels />
      </div>
    );
  if (kind === "niopractice")
    return (
      <div className="h-full w-full p-3">
        <NioPractice />
      </div>
    );
  return null;
}

function WorkCard({
  item,
  i,
  total,
}: {
  item: (typeof selectedWork)[number];
  i: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);
  // how far this card has travelled out of view beneath the next one
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const isLast = i === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.3]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: NAV_OFFSET + i * STACK_STEP, paddingBottom: STACK_STEP }}
    >
      <motion.article
        style={{ scale, opacity, transformOrigin: "top center" }}
        className={`group border-ink/[0.06] rounded-cards border p-6 md:p-10 lg:p-12 ${
          SURFACES[i % SURFACES.length]
        }`}
      >
        {/* Two columns from lg: the story left, the work right. Below that
            they stack, because a 50/50 split at tablet width sets the
            headline three words to a line. */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <div className="font-geist text-body-sm text-graphite/70 flex items-center gap-3">
              <span>{item.index}</span>
              <span className="bg-ink/15 h-px w-6" />
              <span>{item.meta}</span>
            </div>

            <h3 className="text-heading-sm md:text-heading text-ink mt-5 tracking-[-0.02em]">
              {item.title}
            </h3>

            <p className="font-geist text-body text-graphite mt-4">
              {item.impact}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <li
                  key={t}
                  className="border-ink/[0.06] font-geist text-body-sm text-graphite rounded-full border bg-white px-4 py-1.5"
                >
                  {t}
                </li>
              ))}
            </ul>

            {/* label plus circle, so the action reads as a sentence rather
                than an unlabelled icon */}
            <Link
              to={`/work/${item.slug}`}
              aria-label={`Read the ${item.meta} case study`}
              className="mt-8 inline-flex items-center gap-3"
            >
              <span className="font-geist text-body text-ink">
                Read case study
              </span>
              <span
                aria-hidden
                className="bg-charcoal text-paper-white flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-body transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* The work itself, on a white plate so the mockups read against
              the card's tone rather than sinking into it. Uses the exported
              image when it exists and falls back to the built UI panel, so a
              missing export degrades to a placeholder, not a broken image. */}
          <div className="rounded-images aspect-[16/10] w-full overflow-hidden bg-white">
            {imgOk && item.image ? (
              <img
                src={item.image}
                alt={`${item.meta} case study`}
                loading="lazy"
                onError={() => setImgOk(false)}
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            ) : item.screens ? (
              <div className="flex h-full w-full items-end justify-center gap-3 px-4 pt-6 md:gap-5 md:px-8">
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
            ) : (
              <MockPanel kind={item.mock} />
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="relative py-14 md:py-20">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-heading md:text-heading-lg text-ink tracking-[-0.025em]">
            Selected work
          </h2>
          <p className="font-geist text-body-lg text-graphite mt-4">
            Booking, exam prep and property. Different industries, same job:
            making the next step obvious.
          </p>
        </div>

        {/* Sticky stack: each card parks a little lower than the last, so the
            next one slides up and settles on top of it. Sticky does the
            stacking in pure CSS, so if the scroll-driven scale never runs the
            cards still stack rather than the section breaking. */}
        <div className="mt-14">
          {selectedWork.map((item, i) => (
            <WorkCard
              key={item.index}
              item={item}
              i={i}
              total={selectedWork.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
