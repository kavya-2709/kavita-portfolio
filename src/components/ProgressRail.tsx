import { useEffect, useState } from "react";

/**
 * Reading position for a case study.
 *
 * These pages run to eighteen screens, and until now nothing told you how far
 * in you were or how much was left. The rail sits against the left edge,
 * centred vertically, and marks which numbered section you are in.
 *
 * It is a nav of real anchors, not decoration: each dot jumps to its section,
 * so it doubles as a table of contents for anyone who wants to skip.
 *
 * Position comes from an IntersectionObserver on the section headings rather
 * than from a scroll handler. A scroll handler would run on every frame and
 * still have to measure; the observer only fires when a boundary is crossed.
 */
export function ProgressRail({
  items,
}: {
  items: { id: string; n: string; label: string }[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = items
      .map((it) => document.getElementById(it.id))
      .filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;

    // A band across the upper-middle of the viewport. The section whose head
    // is inside that band is the one being read; using the whole viewport
    // would leave two sections active at once on a tall screen.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!hit) return;
        const i = nodes.indexOf(hit.target as HTMLElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      // Hidden below xl: at narrower widths it would either overlap the
      // content column or push it off-centre.
      className="pointer-events-none fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="pointer-events-auto flex flex-col gap-1">
        {items.map((it, i) => {
          const isActive = i === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "step" : undefined}
                className="group/rail flex items-center gap-3 py-1.5"
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "w-7 bg-[color:var(--brand,#0a0d12)]"
                      : "bg-ink/25 group-hover/rail:bg-ink/50 w-3.5"
                  }`}
                />
                <span
                  className={`font-geist text-caption tracking-[0.11em] whitespace-nowrap uppercase transition-all duration-500 ${
                    isActive
                      ? "text-[color:var(--brand,#0a0d12)] opacity-100"
                      : "text-fog opacity-0 group-hover/rail:opacity-100"
                  }`}
                >
                  {it.n} {it.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
