import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "./ui";

/**
 * Shared furniture for case-study pages.
 *
 * Both studies arrive from Figma in their own visual language (different
 * type, different accent colours, shadowed cards). These pieces are what
 * pull them onto one system, so a reader moving between them sees the same
 * site rather than two pasted-in artefacts.
 */

/** Vertical rhythm for case-study sections, matching the rest of the site. */
export const SECTION = "py-14 md:py-20";

/** Section eyebrow: numbered chip plus label. The spine of both studies. */
export function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-ink text-paper-white font-geist flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium">
        {n}
      </span>
      <span className="font-geist text-caption text-fog tracking-[0.11em] uppercase">
        {children}
      </span>
    </div>
  );
}

/** Standard section head: eyebrow, heading, lead. */
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
      <Eyebrow n={n}>{eyebrow}</Eyebrow>
      <h2
        className={`text-heading md:text-heading-lg mt-5 tracking-[-0.025em] ${
          invert ? "text-paper-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`font-geist text-body-lg mt-5 ${
            invert ? "text-white/70" : "text-graphite"
          }`}
        >
          {lead}
        </p>
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
 * Everything below it on the page is the evidence for these four claims.
 */
export function Glance({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="border-ink/[0.08] rounded-cards-sm border bg-white">
      <dl className="divide-ink/[0.06] grid divide-y md:grid-cols-2 md:divide-y-0">
        {items.map((g, i) => (
          <div
            key={g.label}
            className={`p-6 md:p-7 ${
              i % 2 === 1 ? "md:border-ink/[0.06] md:border-l" : ""
            } ${i > 1 ? "md:border-ink/[0.06] md:border-t" : ""}`}
          >
            <dt className="font-geist text-caption text-iris-blue tracking-[0.11em] uppercase">
              {g.label}
            </dt>
            <dd className="font-geist text-body text-graphite mt-2">
              {g.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
