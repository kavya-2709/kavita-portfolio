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
 * Card anatomy follows the reference: index + meta, a headline that ends on
 * a full stop, the impact line, then tags and a circular action on one row,
 * with a wide image beneath. Each card rises and settles as it enters, and
 * the image drifts up slightly behind the content for depth.
 */

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
      className="group border-ink/[0.08] bg-paper-white rounded-cards border p-6 md:p-10"
    >
      <div className="font-geist text-body-sm text-fog flex items-center gap-3">
        <span>{item.index}</span>
        <span className="bg-ink/10 h-px w-6" />
        <span>{item.meta}</span>
      </div>

      <h3 className="text-heading-sm md:text-heading text-ink mt-5 max-w-2xl">
        {item.title}
      </h3>

      <p className="font-geist text-body text-graphite mt-4 max-w-2xl">
        {item.impact}
      </p>

      <div className="mt-8 flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li
              key={t}
              className="bg-mist-gray font-geist text-body-sm text-graphite rounded-full px-4 py-2"
            >
              {t}
            </li>
          ))}
        </ul>

        <Link
          to={`/work/${item.slug}`}
          aria-label={`Read the ${item.meta} case study`}
          className="bg-charcoal text-paper-white flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
        >
          <span aria-hidden className="inline-block">
            ↗
          </span>
        </Link>
      </div>

      {/* Wide visual. Uses the exported case-study image when it exists and
          falls back to the built UI panel if that file isn't there yet, so a
          missing export degrades to a placeholder instead of a broken image. */}
      <div className="rounded-images bg-mist-gray mt-8 aspect-[16/10] w-full overflow-hidden">
        {imgOk && item.image ? (
          <img
            src={item.image}
            alt={`${item.meta} — case study`}
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
                alt={`${item.meta} — screen ${n + 1}`}
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
            Selected works
          </h2>
          <p className="font-geist text-body-lg text-graphite mt-4">
            Car care, exam prep, property hunting — I've designed for people
            booking a service, students working against a deadline, and
            strangers negotiating a home.
            <br className="hidden md:block" />
            Different industries, same job: making the next step obvious.
          </p>
        </div>

        {/* Sticky stack: each card parks a little lower than the last, so the
            next one slides up and settles on top of it. Sticky does the
            stacking in pure CSS — if the scroll-driven scale never runs, the
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
