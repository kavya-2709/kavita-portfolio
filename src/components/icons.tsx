/**
 * CTA glyphs.
 *
 * Every button on the site shares one shape and one animation, which made
 * them read as interchangeable: an email, a case study and a PDF all looked
 * like the same control. The icon is what distinguishes them, so each one
 * describes what actually happens rather than decorating the label.
 *
 * All drawn on the same 24px grid at the same 1.8 stroke and sized in `em`,
 * so a glyph scales with its button's type instead of needing its own size.
 */
type IconProps = { className?: string };

const base = (className: string) =>
  `size-[1.05em] shrink-0 ${className}`;

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Opens a document in a new tab. Used by the resume button. */
export function ExternalIcon({ className = "" }: IconProps) {
  return (
    <svg {...common} className={base(className)}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/** Goes somewhere else on this site. */
export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg {...common} className={base(className)}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Opens a case study: forward and out, since it is a deeper page. */
export function ArrowUpRightIcon({ className = "" }: IconProps) {
  return (
    <svg {...common} className={base(className)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Starts an email. */
export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg {...common} className={base(className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

/** Off to a profile on another service. */
export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg {...common} className={base(className)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5V17" />
      <path d="M7.5 7.5v.01" />
      <path d="M11.5 17v-3.75a2.25 2.25 0 0 1 4.5 0V17" />
      <path d="M11.5 17v-6.5" />
    </svg>
  );
}
