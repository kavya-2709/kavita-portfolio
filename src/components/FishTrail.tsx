import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useSpring, useAnimationFrame } from "framer-motion";
import { KoiBody } from "./Koi";

/**
 * A koi that swims the length of the page.
 *
 * Scroll drives it along a wide curved path that sweeps from one side to the
 * other. What it leaves behind is a *wake* — expanding ripple rings and
 * bubbles that bloom as the fish passes and then dissipate to a faint trace —
 * rather than a drawn line.
 *
 * Two things make it read as swimming rather than sliding:
 *  - the scroll value is spring-smoothed, so it glides and overshoots
 *    slightly instead of snapping to the scroll position;
 *  - the body undulates perpendicular to its heading and the tail beats on
 *    its own clock, independent of scroll, so it stays alive when still.
 */

const AMP = 0.42; // sweep, as a fraction of viewport width — near edge to edge
const WAVES = 4; // long crossings rather than tight zigzags
const TRACES = 84;
const SCALE = 2; // double size

function buildPath(w: number, h: number) {
  const cx = w / 2;
  const a = w * AMP;
  const seg = h / WAVES;
  let d = `M ${cx + a} ${seg * 0.1}`;
  for (let i = 0; i < WAVES; i++) {
    const dir = i % 2 === 0 ? -1 : 1;
    const y0 = seg * (i + 0.1);
    const y1 = seg * (i + 1 + 0.1);
    const my = (y0 + y1) / 2;
    d += ` C ${cx + a * -dir * 0.55} ${my - seg * 0.34}, ${cx + a * dir * 1.15} ${my + seg * 0.2}, ${cx + a * dir} ${y1}`;
  }
  return d;
}

/** deterministic 0..1 from an index */
const rnd = (i: number, salt = 1) => {
  const x = Math.sin(i * 12.9898 * salt + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function FishTrail() {
  const pathRef = useRef<SVGPathElement>(null);
  const fishRef = useRef<SVGGElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const traceRefs = useRef<(SVGGElement | null)[]>([]);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [reduced, setReduced] = useState(false);

  const { scrollYProgress } = useScroll();
  // spring-smoothed so the fish glides instead of tracking scroll rigidly
  const smooth = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 18,
    mass: 0.6,
  });

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const measure = () =>
      setSize({
        w: document.documentElement.clientWidth,
        h: document.documentElement.scrollHeight,
      });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    const t = window.setInterval(measure, 1200);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearInterval(t);
    };
  }, []);

  const d = useMemo(() => (size.w ? buildPath(size.w, size.h) : ""), [size.w, size.h]);

  /* Sample the path once per resize so trace placement is stable.
     This must run in an effect, not useMemo: during render the <path> still
     carries the PREVIOUS `d`, so sampling there reads stale geometry (and on
     first paint the element doesn't exist at all). */
  const [traces, setTraces] = useState<
    { t: number; x: number; y: number; r: number; ring: boolean; phase: number }[]
  >([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !d) return;
    const len = path.getTotalLength();
    if (!len) return;
    setTraces(
      Array.from({ length: TRACES }, (_, i) => {
      const t = (i + 0.5) / TRACES;
      const p = path.getPointAtLength(len * t);
      const a = path.getPointAtLength(Math.min(len, len * t + 4));
      const b = path.getPointAtLength(Math.max(0, len * t - 4));
      const ang = Math.atan2(a.y - b.y, a.x - b.x);
      // scatter perpendicular to the direction of travel
      const off = (rnd(i) - 0.5) * 46;
      return {
        t,
        x: p.x + Math.cos(ang + Math.PI / 2) * off,
        y: p.y + Math.sin(ang + Math.PI / 2) * off,
        r: 3 + rnd(i, 2) * 9,
          ring: rnd(i, 3) > 0.42,
          phase: rnd(i, 4),
        };
      })
    );
  }, [d, size.w, size.h]);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    const fish = fishRef.current;
    if (!path || !fish || !d) return;

    const len = path.getTotalLength();
    if (!len) return;

    const t = Math.min(1, Math.max(0, smooth.get()));
    const pt = path.getPointAtLength(len * t);
    const ahead = path.getPointAtLength(Math.min(len, len * t + 8));
    const behind = path.getPointAtLength(Math.max(0, len * t - 8));
    const ang = Math.atan2(ahead.y - behind.y, ahead.x - behind.x);

    // body undulation perpendicular to heading — swimming, not sliding
    const sway = Math.sin(time / 620) * 9;
    const x = pt.x + Math.cos(ang + Math.PI / 2) * sway;
    const y = pt.y + Math.sin(ang + Math.PI / 2) * sway;
    const roll = Math.sin(time / 620) * 7;

    // Point along the tangent, unmodified — the route descends, so the fish
    // genuinely faces downward as it swims down the page. (An earlier version
    // eased this toward horizontal, which stopped it facing where it was
    // going.) The path never heads upward, so the angle stays within roughly
    // 40–140° and the fish never inverts; no mirroring is needed.
    const deg = (ang * 180) / Math.PI;

    fish.setAttribute(
      "transform",
      `translate(${x} ${y}) rotate(${deg + roll}) scale(${SCALE})`
    );

    if (tailRef.current) {
      tailRef.current.setAttribute(
        "transform",
        `rotate(${Math.sin(time / 190) * 17} -14 0)`
      );
    }

    // wake: bloom as the fish passes, then dissipate to a faint trace
    for (let i = 0; i < traces.length; i++) {
      const g = traceRefs.current[i];
      if (!g) continue;
      const behindBy = t - traces[i].t;
      let o = 0;
      let s = 1;
      if (behindBy >= 0) {
        const fresh = Math.max(0, 1 - behindBy / 0.055);
        o = 0.09 + 0.5 * fresh;
        s = 0.5 + 1.1 * (1 - fresh) + Math.sin(time / 900 + traces[i].phase * 6) * 0.06;
      }
      g.setAttribute("opacity", o.toFixed(3));
      g.setAttribute(
        "transform",
        `translate(${traces[i].x} ${traces[i].y}) scale(${s.toFixed(3)})`
      );
    }
  });

  if (reduced || !size.w) return null;

  return (
    <svg
      aria-hidden
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className="pointer-events-none absolute top-0 left-0 -z-10"
    >
      {/* the path is the fish's route only — never stroked */}
      <path ref={pathRef} d={d} fill="none" stroke="none" />

      {traces.map((tr, i) => (
        <g
          key={i}
          ref={(el) => {
            traceRefs.current[i] = el;
          }}
          opacity="0"
        >
          {tr.ring ? (
            <circle
              r={tr.r}
              fill="none"
              stroke="#5bb3e8"
              strokeWidth={1.6}
              strokeOpacity={0.9}
            />
          ) : (
            <circle r={tr.r * 0.5} fill="#7cc7ef" fillOpacity={0.55} />
          )}
        </g>
      ))}

      <g ref={fishRef}>
        <KoiBody tailRef={tailRef} />
      </g>
    </svg>
  );
}
