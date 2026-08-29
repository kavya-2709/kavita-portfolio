import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `target` once the element scrolls into view.
 *
 * Parses the numeric part out of a display string ("10,000+" -> 10000) and
 * re-applies the original prefix/suffix, so callers pass the final string
 * and get a correctly formatted animated value back.
 */
export function useCountUp(display: string, duration = 1600) {
  const ref = useRef<HTMLElement | null>(null);
  const [out, setOut] = useState(() => zeroed(display));
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOut(display);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const { value, prefix, suffix, grouped, pad } = parse(display);
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo — fast start, long settle, matches the site's motion
          const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const v = Math.round(value * e);
          const body = grouped
            ? v.toLocaleString(grouped)
            : String(v).padStart(pad, "0");
          setOut(prefix + body + suffix);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [display, duration]);

  return { ref, value: out };
}

/**
 * Splits "1,00,000+" into its parts and works out which digit grouping the
 * author used. Indian grouping puts a 2-digit group after the first comma
 * (1,00,000); Western uses 3 (100,000). Formatting with the wrong locale
 * would silently rewrite the number the user typed.
 */
function parse(s: string): {
  prefix: string;
  value: number;
  suffix: string;
  grouped: false | "en-IN" | "en-US";
  /** Original digit count, so "04+" doesn't finish as "4+". */
  pad: number;
} {
  const m = s.match(/([^\d]*)([\d,]+)(.*)/);
  if (!m) return { value: 0, prefix: "", suffix: s, grouped: false, pad: 1 };

  const digits = m[2];
  let grouped: false | "en-IN" | "en-US" = false;
  if (digits.includes(",")) {
    const groups = digits.split(",");
    // a 2-digit group anywhere but the first/last marks Indian grouping
    grouped = groups.slice(1, -1).some((g) => g.length === 2) ? "en-IN" : "en-US";
  }

  return {
    prefix: m[1],
    value: parseInt(digits.replace(/,/g, ""), 10) || 0,
    suffix: m[3],
    grouped,
    pad: digits.replace(/,/g, "").length,
  };
}

function zeroed(s: string) {
  const { prefix, suffix, pad, grouped } = parse(s);
  // match the final width so the number doesn't visibly reflow as it counts
  return prefix + (grouped ? "0" : "0".padStart(pad, "0")) + suffix;
}
