import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Footer scenery: an Indian tabby peeking out of a koi pond.
 *
 * The palette is lifted from the hero's canvas pond (#2e8dc7 → #d6f0f9) and
 * the top edge fades to transparent, so the footer reads as the same body of
 * water surfacing again rather than a blue box pasted onto the page.
 *
 * Everything in the scene is drawn once and split by two clip paths at the
 * waterline — full strength above, tinted and faded below. That's what puts
 * the cat *and* the lily pads in the water rather than on top of it.
 *
 * The cat's pupils track the pointer via a -1..1 vector from the wrapper.
 */

const W = 1200;
const H = 470;
const WATER = 252;
const CAT_X = W / 2;
const CAT_Y = 214;
const CAT_S = 1.55;

function Pad({ x, y, r, rot = 0 }: { x: number; y: number; r: number; rot?: number }) {
  const a0 = 0.17;
  const a1 = Math.PI * 2 - 0.17;
  // sweep-flag must be 1 — with 0, SVG picks the circle centred to the right
  // of the origin and the disc renders beside the veins instead of around them.
  const d = `M 0 0 L ${Math.cos(a0) * r} ${Math.sin(a0) * r} A ${r} ${r} 0 1 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r} Z`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 0.84)`}>
      <path d={d} fill="url(#pad-g)" />
      {Array.from({ length: 13 }).map((_, n) => {
        const a = a0 + ((a1 - a0) * (n + 0.5)) / 13;
        return (
          <line
            key={n}
            x1={Math.cos(a) * r * 0.12}
            y1={Math.sin(a) * r * 0.12}
            x2={Math.cos(a) * r * 0.93}
            y2={Math.sin(a) * r * 0.93}
            stroke="#4d8f42"
            strokeOpacity="0.42"
            strokeWidth="1.6"
          />
        );
      })}
    </g>
  );
}

function Lotus({ x, y, s = 1, petal, petalBack }: { x: number; y: number; s?: number; petal: string; petalBack: string }) {
  const P = (rx: number, ry: number, fill: string, rot: number, key: string) => (
    <path
      key={key}
      d={`M0 0 Q ${rx} ${ry * 0.45} 0 ${ry} Q ${-rx} ${ry * 0.45} 0 0`}
      fill={fill}
      transform={`rotate(${rot})`}
    />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g>{[0, 45, 90, 135, 180, 225, 270, 315].map((r) => P(9, -31, petalBack, r + 22, `b${r}`))}</g>
      <g>{[0, 45, 90, 135, 180, 225, 270, 315].map((r) => P(10, -27, petal, r, `f${r}`))}</g>
      <circle cx="0" cy="0" r="8.5" fill="#f0b823" />
      {Array.from({ length: 9 }).map((_, n) => {
        const a = (n / 9) * Math.PI * 2;
        return <circle key={n} cx={Math.cos(a) * 5} cy={Math.sin(a) * 5} r="1.6" fill="#fbe08a" />;
      })}
    </g>
  );
}

function Koi({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity="0.7">
      <path d="M-34 0 q-14 -13 -22 -16 q6 16 0 32 q8 -3 22 -16 Z" fill="#e6f2fa" opacity="0.85" />
      <ellipse cx="0" cy="0" rx="36" ry="14" fill="#f7fbfe" />
      <path d="M-6 -14 q10 -3 20 1 q-8 7 -20 5 Z" fill="#e4562f" opacity="0.9" />
      <path d="M12 6 q12 -2 18 2 q-8 6 -18 3 Z" fill="#e4562f" opacity="0.85" />
      <ellipse cx="-16" cy="7" rx="9" ry="4" fill="#e4562f" opacity="0.7" />
      <circle cx="27" cy="-3" r="2.2" fill="#1b2530" />
    </g>
  );
}

export default function PondScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * (CAT_X / W);
      const cy = r.top + r.height * (CAT_Y / H);
      setLook({
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2))),
      });
    };
    const onLeave = () => setLook({ x: 0, y: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const px = look.x * 4.5;
  const py = look.y * 3;

  /** head + tail together, so one scale governs the whole animal */
  const cat = (
    <g transform={`translate(${CAT_X} ${CAT_Y}) scale(${CAT_S})`}>
      <motion.g
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "8px", originY: "26px" }}
      >
        <path
          d="M8 26 C4 -18 -6 -62 26 -76 C56 -89 68 -55 50 -42"
          stroke="#8d7256"
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
        />
        <g stroke="#5a4735" strokeWidth="8" strokeLinecap="round" opacity="0.85">
          <path d="M6 -8 q14 2 17 -6" />
          <path d="M2 -40 q14 2 18 -6" />
          <path d="M14 -66 q13 6 19 -1" />
        </g>
      </motion.g>

      <path d="M-58 -22 L-52 -84 L-8 -44 Z" fill="#8d7256" />
      <path d="M58 -22 L52 -84 L8 -44 Z" fill="#8d7256" />
      <path d="M-50 -28 L-47 -70 L-21 -43 Z" fill="#d9a3a0" />
      <path d="M50 -28 L47 -70 L21 -43 Z" fill="#d9a3a0" />
      <path d="M-52 -60 l-9 -9 M-49 -48 l-11 -6" stroke="#f0e4d4" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M52 -60 l9 -9 M49 -48 l11 -6" stroke="#f0e4d4" strokeWidth="2.4" strokeLinecap="round" />

      <ellipse cx="0" cy="0" rx="62" ry="54" fill="url(#fur-g)" />

      <g stroke="#5a4735" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M-34 -46 q8 20 4 34" />
        <path d="M-16 -54 q5 22 2 36" />
        <path d="M16 -54 q-5 22 -2 36" />
        <path d="M34 -46 q-8 20 -4 34" />
        <path d="M-1 -52 q0 16 -1 24" strokeWidth="5" />
      </g>
      <g stroke="#5a4735" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.72">
        <path d="M-62 -2 q14 8 24 6" />
        <path d="M62 -2 q-14 8 -24 6" />
        <path d="M-60 18 q14 7 22 4" />
        <path d="M60 18 q-14 7 -22 4" />
      </g>

      <ellipse cx="0" cy="26" rx="36" ry="22" fill="#f2e7d6" />

      <ellipse cx="-23" cy="-4" rx="17" ry="18" fill="#f7f3e8" />
      <ellipse cx="23" cy="-4" rx="17" ry="18" fill="#f7f3e8" />
      <circle cx={-23 + px} cy={-4 + py} r="12.5" fill="#a9bf46" />
      <circle cx={23 + px} cy={-4 + py} r="12.5" fill="#a9bf46" />
      <ellipse cx={-23 + px} cy={-4 + py} rx="5.5" ry="11" fill="#16181a" />
      <ellipse cx={23 + px} cy={-4 + py} rx="5.5" ry="11" fill="#16181a" />
      <circle cx={-27 + px} cy={-10 + py} r="3.4" fill="#ffffff" />
      <circle cx={19 + px} cy={-10 + py} r="3.4" fill="#ffffff" />

      <path d="M-8 16 L8 16 L0 25 Z" fill="#d98a92" />
      <path d="M0 25 q-8 8 -15 2 M0 25 q8 8 15 2" stroke="#6b5540" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      <g stroke="#ffffff" strokeWidth="2.2" opacity="0.8" strokeLinecap="round">
        <path d="M-36 22 L-92 12" />
        <path d="M-36 30 L-94 34" />
        <path d="M36 22 L92 12" />
        <path d="M36 30 L94 34" />
      </g>
    </g>
  );

  /** plants, drawn once and reused for the above/below split */
  const plants = (
    <>
      <Pad x={118} y={300} r={92} rot={-10} />
      <Pad x={1082} y={252} r={80} rot={16} />
      <Pad x={980} y={430} r={72} rot={-22} />
      <Pad x={286} y={444} r={60} rot={28} />
      <Lotus x={292} y={342} s={1.3} petal="#ffffff" petalBack="#e2edf4" />
      <Lotus x={922} y={318} s={1.25} petal="#f46f9b" petalBack="#d9436f" />
    </>
  );

  return (
    <div ref={ref} className={`treat-cursor relative ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="An Indian tabby cat peeking out of a koi pond">
        <defs>
          {/* hero pond palette */}
          <linearGradient id="water-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6f0f9" />
            <stop offset="22%" stopColor="#a3ddf1" />
            <stop offset="58%" stopColor="#5cbae2" />
            <stop offset="100%" stopColor="#2e8dc7" />
          </linearGradient>
          <linearGradient id="fur-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a0855f" />
            <stop offset="100%" stopColor="#7d6549" />
          </linearGradient>
          <radialGradient id="pad-g" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#a4d16a" />
            <stop offset="65%" stopColor="#79b451" />
            <stop offset="100%" stopColor="#59993f" />
          </radialGradient>
          {/* the water emerges from the page instead of starting on a hard edge */}
          {/* Mask stops must be WHITE. SVG masks key off luminance, so black
              stops hide everything no matter what stop-opacity says — the
              whole scene disappeared with #000 here. */}
          <linearGradient id="blend-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="16%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="34%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="blend-mask">
            <rect x="0" y="0" width={W} height={H} fill="url(#blend-g)" />
          </mask>
          <clipPath id="above">
            <rect x="0" y="0" width={W} height={WATER} />
          </clipPath>
          <clipPath id="below">
            <rect x="0" y={WATER} width={W} height={H - WATER} />
          </clipPath>
        </defs>

        <g mask="url(#blend-mask)">
          <rect x="0" y="0" width={W} height={H} fill="url(#water-g)" />

          {/* light marbling, in the hero's cream-to-cyan range */}
          <g>
            {Array.from({ length: 40 }).map((_, n) => {
              const a = (n * 97.13) % 1;
              const b = (n * 41.7) % 1;
              const light = n % 3 === 0;
              return (
                <ellipse
                  key={n}
                  cx={a * W}
                  cy={b * H}
                  rx={30 + ((n * 13) % 46)}
                  ry={10 + ((n * 7) % 16)}
                  fill={light ? "#e8f7fd" : "#2e8dc7"}
                  opacity={light ? 0.34 : 0.18}
                />
              );
            })}
          </g>

          <g fill="none" stroke="#eaf8ff" strokeLinecap="round">
            {[150, 235, 330, 435, 550].map((rx, n) => (
              <motion.ellipse
                key={rx}
                cx={CAT_X}
                cy={WATER + 10}
                rx={rx}
                ry={rx * 0.28}
                strokeWidth={n < 2 ? 3 : 2}
                strokeOpacity={0.55 - n * 0.08}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5 + n * 0.8, repeat: Infinity, ease: "easeInOut", delay: n * 0.4 }}
                style={{ originX: `${CAT_X}px`, originY: `${WATER + 10}px` }}
              />
            ))}
          </g>

          <g clipPath="url(#below)">
            <Koi x={250} y={330} s={0.95} rot={-8} />
            <Koi x={1010} y={392} s={1.05} rot={6} />
            <Koi x={470} y={430} s={0.9} rot={-4} />
          </g>

          {/* the sunk body */}
          <g clipPath="url(#below)">
            <ellipse cx={CAT_X} cy={WATER + 74} rx="112" ry="66" fill="#2e8dc7" opacity="0.5" />
            <ellipse cx={CAT_X} cy={WATER + 34} rx="86" ry="38" fill="#6b5540" opacity="0.26" />
          </g>

          {/* cat and plants: crisp above the line, submerged below it */}
          <g clipPath="url(#above)">{cat}</g>
          <g clipPath="url(#below)" opacity="0.36">{cat}</g>

          <g clipPath="url(#above)">{plants}</g>
          <g clipPath="url(#below)" opacity="0.5">{plants}</g>

          <g fill="none" stroke="#f0fbff" strokeWidth="2" opacity="0.75">
            {[[150, 356, 9], [520, 120, 7], [742, 176, 6], [880, 412, 8], [1146, 300, 7], [372, 236, 5]].map(
              ([cx, cy, r], n) => (
                <circle key={n} cx={cx} cy={cy} r={r} />
              )
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}
