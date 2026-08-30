import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "./ui";
import { TYPE, TYPE_INVERT } from "../lib/type";

/**
 * Shared furniture for case-study pages.
 *
 * The three studies arrive from three Figma files in three visual languages.
 * These pieces are what pull them onto one system — and, since each study now
 * carries its own brand tint, what keeps them recognisably siblings rather
 * than three unrelated documents.
 */

/** Vertical rhythm for case-study sections, matching the rest of the site. */
export const SECTION = "py-14 md:py-20";

/**
 * Section index and label.
 *
 * The number used to be a 24px chip, the same weight as the eyebrow beside
 * it, so nine sections read as nine identical rows and the page had no sense
 * of place. It is now a large serif numeral in the project's own colour: it
 * says where you are at a glance and gives each section a visible anchor.
 */
export function Eyebrow({
  n,
  invert = false,
  children,
}: {
  n: string;
  invert?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span
        className={`font-serif-display text-[2.5rem] leading-none ${
          invert ? "text-white/35" : "text-[color:var(--brand)]"
        }`}
      >
        {n}
      </span>
      <span className={invert ? TYPE_INVERT.eyebrow : TYPE.eyebrow}>
        {children}
      </span>
    </div>
  );
}

/**
 * Standard section head.
 *
 * The rule underneath is the project's colour, so scrolling the page keeps
 * telling you which study you are in without another label.
 */
export function Head({
  n,
  eyebrow,
  title,
  lead,
  invert = false,
}: {
  n: string;
  eyebrow: string;
  title: string;
  lead?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow n={n} invert={invert}>
        {eyebrow}
      </Eyebrow>
      <h2 className={`${invert ? TYPE_INVERT.h2 : TYPE.h2} mt-5`}>{title}</h2>
      {lead ? (
        <p className={`${invert ? TYPE_INVERT.lead : TYPE.lead} mt-5`}>{lead}</p>
      ) : null}
    </div>
  );
}

/** Fades a block up as it arrives. Matches the rest of the site's reveals. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Hairline card. Definition comes from the border, never elevation. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-ink/[0.08] rounded-cards-sm border bg-white p-6 md:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * The whole arc in four lines, for the reader who gives the page a minute.
 * Sits on the project's tint so it reads as the study's own summary rather
 * than another white card in a run of white cards.
 */
export function Glance({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div
      className="rounded-cards overflow-hidden bg-[color:var(--brand-soft)]"
    >
      <dl className="divide-ink/[0.06] grid divide-y md:grid-cols-2 md:divide-y-0">
        {items.map((g, i) => (
          <div
            key={g.label}
            className={`p-6 md:p-8 ${
              i % 2 === 1 ? "md:border-ink/[0.06] md:border-l" : ""
            } ${i > 1 ? "md:border-ink/[0.06] md:border-t" : ""}`}
          >
            <dt
              className={`${TYPE.eyebrow} text-[color:var(--brand)]`}
            >
              {g.label}
            </dt>
            <dd className={`${TYPE.body} mt-2`}>{g.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
