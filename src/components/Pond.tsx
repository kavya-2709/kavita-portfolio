import { useEffect, useRef } from "react";
import { createField, drop, step, type RippleField } from "../lib/ripple";
import { warpedFbm } from "../lib/noise";

/**
 * Interactive koi pond.
 *
 * The water is a domain-warped fBm field animated through time, mapped
 * through a palette LUT — that's what produces the marbled blue/cream
 * ribbons. Pointer ripples feed in as a displacement of the noise
 * sample coordinates, so touching the water genuinely bends the liquid
 * rather than just drawing highlights over it.
 *
 * All motion is delta-time driven, so speed is identical at 30, 60 or
 * 144 Hz instead of running at whatever the frame rate happens to be.
 */

const RES = 6; // water simulated at 1/6 scale and upscaled — shapes are soft
const DAMPING = 0.9615; // high damping = long, slow, glassy ripples

type Pad = { x: number; y: number; r: number; rot: number; spin: number; vx: number; vy: number };
type Flower = { x: number; y: number; r: number; pink: boolean; phase: number };
type Bubble = { x: number; y: number; r: number; drift: number; phase: number; alpha: number };
type Koi = {
  x: number; y: number; a: number;
  speed: number; size: number;
  turnPhase: number; turnRate: number;
  patch: string;
};

/* Palette LUT: deep blue → mid blue → cyan → cream, sampled 256 times. */
/* Lighter, true-to-water blues. The old ramp ran all the way to cream
   (253,254,250) which read as foam and made white text unreadable; this
   one stays blue end-to-end and tops out at a pale sky rather than white. */
const STOPS: [number, [number, number, number]][] = [
  [0.0, [46, 141, 199]],
  [0.28, [64, 163, 214]],
  [0.45, [92, 186, 226]],
  [0.58, [126, 205, 235]],
  [0.7, [163, 221, 241]],
  [0.82, [194, 233, 246]],
  [1.0, [214, 240, 249]],
];

function buildLUT(): Uint8Array {
  const lut = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let s = 0;
    while (s < STOPS.length - 2 && t > STOPS[s + 1][0]) s++;
    const [t0, c0] = STOPS[s];
    const [t1, c1] = STOPS[s + 1];
    const f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
    const e = f * f * (3 - 2 * f);
    lut[i * 3] = c0[0] + (c1[0] - c0[0]) * e;
    lut[i * 3 + 1] = c0[1] + (c1[1] - c0[1]) * e;
    lut[i * 3 + 2] = c0[2] + (c1[2] - c0[2]) * e;
  }
  return lut;
}
const LUT = buildLUT();

export default function Pond({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // offscreen buffer holds the low-res water, then gets scaled up
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d", { alpha: false })!;

    let field!: RippleField;
    let img!: ImageData;
    let W = 0, H = 0, sw = 0, sh = 0;
    let pads: Pad[] = [];
    let flowers: Flower[] = [];
    let koi: Koi[] = [];
    let bubbles: Bubble[] = [];
    let raf = 0;
    let running = true;
    let time = 0;      // seconds of simulated time
    let lastTs = 0;
    let rippleAcc = 0; // fixed-step accumulator for the ripple solver

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      sw = Math.max(16, Math.floor(W / RES));
      sh = Math.max(16, Math.floor(H / RES));
      buf.width = sw;
      buf.height = sh;
      field = createField(sw, sh, DAMPING);
      img = bctx.createImageData(sw, sh);

      pads = Array.from({ length: 8 }, () => ({
        x: rand(0.05, 0.95), y: rand(0.1, 0.92),
        r: rand(24, 46), rot: rand(0, Math.PI * 2),
        spin: rand(-0.06, 0.06), vx: rand(-0.004, 0.004), vy: rand(-0.003, 0.003),
      }));

      flowers = Array.from({ length: 5 }, () => ({
        x: rand(0.1, 0.9), y: rand(0.15, 0.88),
        r: rand(7, 11), pink: Math.random() > 0.5, phase: rand(0, 6.28),
      }));

      koi = Array.from({ length: 6 }, () => ({
        x: rand(0.1, 0.9), y: rand(0.15, 0.9),
        a: rand(0, Math.PI * 2),
        speed: rand(0.012, 0.024),     // normalized units per second — an unhurried glide
        size: rand(15, 23),
        turnPhase: rand(0, 6.28), turnRate: rand(0.14, 0.3),
        patch: Math.random() > 0.45 ? "#e8552e" : "#f2a03f",
      }));

      // surface droplets — the scattered glassy beads in the reference
      bubbles = Array.from({ length: 26 }, () => ({
        x: rand(0.02, 0.98), y: rand(0.04, 0.96),
        r: rand(4, 15), drift: rand(-0.006, 0.006),
        phase: rand(0, 6.28), alpha: rand(0.16, 0.4),
      }));

      paintAll();
    }

    /* ── water ─────────────────────────────────────────────────────────── */
    function paintWater() {
      const d = img.data;
      const hf = field.a;
      const t = time * 0.018;                // very slow drift — the pond breathes
      // Isotropic: a fixed number of noise units per pixel in BOTH axes, so
      // the liquid keeps the same shape and scale at any aspect ratio.
      // (Deriving ny from the aspect ratio smeared it into vertical streaks
      // on portrait viewports.)
      const nx = 0.017;
      const ny = 0.017;

      for (let y = 0; y < sh; y++) {
        const row = y * sw;
        // solid blue at the top, more cream marbling toward the bottom
        const depth = (y / sh - 0.45) * 0.13;

        for (let x = 0; x < sw; x++) {
          const i = row + x;

          // ripple gradient displaces where we sample the liquid
          const gx = (hf[i - 1] ?? 0) - (hf[i + 1] ?? 0);
          const gy = (hf[i - sw] ?? 0) - (hf[i + sw] ?? 0);

          let v = warpedFbm(
            x * nx + t + gx * 1.15,
            y * ny - t * 0.45 + gy * 1.15,
            3.1
          );

          // stretch contrast so the cream ribbons read as defined shapes
          v = (v - 0.352) * 2.7 + depth;
          // ripple crests brighten the surface
          v += (gx + gy) * 1.9;
          v = v < 0 ? 0 : v > 1 ? 1 : v;

          const li = ((v * 255) | 0) * 3;
          const p = i * 4;
          d[p] = LUT[li];
          d[p + 1] = LUT[li + 1];
          d[p + 2] = LUT[li + 2];
          d[p + 3] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);
      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = "high";
      ctx!.drawImage(buf, 0, 0, sw, sh, 0, 0, W, H);
    }

    /* ── lily pads ─────────────────────────────────────────────────────── */
    function paintPads() {
      for (const p of pads) {
        const px = p.x * W;
        const py = p.y * H;
        const r = p.r;
        ctx!.save();
        ctx!.translate(px, py);

        // soft blue-tinted depth, not a black drop shadow
        ctx!.beginPath();
        ctx!.ellipse(2, 4, r * 1.02, r * 0.96, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(58,150,205,0.20)";
        ctx!.fill();

        ctx!.rotate(p.rot);
        ctx!.beginPath();
        ctx!.arc(0, 0, r, 0.42, Math.PI * 2 - 0.42);
        ctx!.lineTo(0, 0);
        ctx!.closePath();
        const g = ctx!.createRadialGradient(-r * 0.25, -r * 0.3, r * 0.1, 0, 0, r);
        g.addColorStop(0, "#6fb877");
        g.addColorStop(0.55, "#4e9459");
        g.addColorStop(1, "#3a7a46");
        ctx!.fillStyle = g;
        ctx!.fill();

        // radial veins
        ctx!.strokeStyle = "rgba(255,255,255,0.12)";
        ctx!.lineWidth = 1.2;
        for (let k = 0; k < 7; k++) {
          const ang = 0.55 + (k / 7) * (Math.PI * 2 - 1.1);
          ctx!.beginPath();
          ctx!.moveTo(0, 0);
          ctx!.lineTo(Math.cos(ang) * r * 0.92, Math.sin(ang) * r * 0.92);
          ctx!.stroke();
        }
        ctx!.restore();
      }
    }

    /* Glassy surface beads — a soft body, a bright rim on the lower edge
       and a small specular dot, which is what reads as "water droplet". */
    function paintBubbles() {
      for (const b of bubbles) {
        const px = b.x * W;
        const py = (b.y * H) + Math.sin(time * 0.5 + b.phase) * 3;
        const r = b.r;

        ctx!.save();
        ctx!.translate(px, py);

        const g = ctx!.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r);
        g.addColorStop(0, `rgba(255,255,255,${b.alpha + 0.22})`);
        g.addColorStop(0.6, `rgba(214,238,250,${b.alpha * 0.5})`);
        g.addColorStop(1, `rgba(160,210,238,${b.alpha * 0.16})`);
        ctx!.beginPath();
        ctx!.arc(0, 0, r, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();

        // refracted rim along the bottom
        ctx!.beginPath();
        ctx!.arc(0, 0, r * 0.94, 0.5, Math.PI - 0.5);
        ctx!.strokeStyle = `rgba(255,255,255,${b.alpha + 0.3})`;
        ctx!.lineWidth = Math.max(1, r * 0.11);
        ctx!.stroke();

        // specular highlight
        ctx!.beginPath();
        ctx!.ellipse(-r * 0.32, -r * 0.38, r * 0.2, r * 0.14, -0.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${b.alpha + 0.4})`;
        ctx!.fill();

        ctx!.restore();
      }
    }

    function paintFlowers() {
      for (const f of flowers) {
        const px = f.x * W;
        const py = f.y * H;
        const bob = Math.sin(time * 1.2 + f.phase) * 1.5;
        ctx!.save();
        ctx!.translate(px, py + bob);
        for (let k = 0; k < 8; k++) {
          ctx!.save();
          ctx!.rotate((k / 8) * Math.PI * 2 + f.phase * 0.1);
          ctx!.beginPath();
          ctx!.ellipse(0, -f.r * 0.62, f.r * 0.3, f.r * 0.66, 0, 0, Math.PI * 2);
          ctx!.fillStyle = f.pink ? "#ffd3e2" : "#ffffff";
          ctx!.fill();
          ctx!.restore();
        }
        ctx!.beginPath();
        ctx!.arc(0, 0, f.r * 0.32, 0, Math.PI * 2);
        ctx!.fillStyle = "#ffd84d";
        ctx!.fill();
        ctx!.restore();
      }
    }

    /* ── koi ───────────────────────────────────────────────────────────── */
    function paintKoi() {
      for (const k of koi) {
        const px = k.x * W;
        const py = k.y * H;
        const s = k.size;
        const wag = Math.sin(time * 6 + k.turnPhase) * 0.35;

        ctx!.save();
        ctx!.translate(px, py);
        ctx!.rotate(k.a);

        // shadow cast on the pond floor
        ctx!.save();
        ctx!.translate(3, 5);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, s * 1.05, s * 0.42, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(58,150,205,0.22)";
        ctx!.fill();
        ctx!.restore();

        // tail
        ctx!.save();
        ctx!.translate(-s * 0.9, 0);
        ctx!.rotate(wag);
        ctx!.beginPath();
        ctx!.moveTo(0, 0);
        ctx!.quadraticCurveTo(-s * 0.7, -s * 0.5, -s * 1.15, -s * 0.16);
        ctx!.quadraticCurveTo(-s * 0.85, 0, -s * 1.15, s * 0.16);
        ctx!.quadraticCurveTo(-s * 0.7, s * 0.5, 0, 0);
        ctx!.fillStyle = "rgba(255,255,255,0.82)";
        ctx!.fill();
        ctx!.restore();

        // pectoral fins
        ctx!.beginPath();
        ctx!.ellipse(s * 0.05, -s * 0.36, s * 0.3, s * 0.14, -0.5 + wag * 0.4, 0, Math.PI * 2);
        ctx!.ellipse(s * 0.05, s * 0.36, s * 0.3, s * 0.14, 0.5 - wag * 0.4, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.7)";
        ctx!.fill();

        // body
        ctx!.beginPath();
        ctx!.ellipse(0, 0, s, s * 0.4, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "#fdfdfb";
        ctx!.fill();

        // koi patches
        ctx!.save();
        ctx!.beginPath();
        ctx!.ellipse(0, 0, s, s * 0.4, 0, 0, Math.PI * 2);
        ctx!.clip();
        ctx!.beginPath();
        ctx!.ellipse(s * 0.42, -s * 0.05, s * 0.42, s * 0.3, 0.2, 0, Math.PI * 2);
        ctx!.fillStyle = k.patch;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.ellipse(-s * 0.34, s * 0.08, s * 0.3, s * 0.2, -0.3, 0, Math.PI * 2);
        ctx!.fillStyle = k.patch;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.ellipse(-s * 0.02, -s * 0.16, s * 0.16, s * 0.11, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "#22282e";
        ctx!.fill();
        ctx!.restore();

        // eye
        ctx!.beginPath();
        ctx!.arc(s * 0.72, -s * 0.13, s * 0.075, 0, Math.PI * 2);
        ctx!.fillStyle = "#14181c";
        ctx!.fill();

        ctx!.restore();
      }
    }

    function paintAll() {
      paintWater();
      paintBubbles();
      paintKoi();
      paintPads();
      paintFlowers();
    }

    /* ── simulation ────────────────────────────────────────────────────── */
    function update(dt: number) {
      time += dt;

      // ambient raindrops — occasional and soft
      if (Math.random() < dt * 0.7) {
        drop(field, rand(2, sw - 2), rand(2, sh - 2), rand(3, 5), rand(0.25, 0.5));
      }

      for (const b of bubbles) {
        b.x += b.drift * dt;
        if (b.x < 0.01) b.x = 0.99;
        if (b.x > 0.99) b.x = 0.01;
      }

      for (const p of pads) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0.03 || p.x > 0.97) p.vx *= -1;
        if (p.y < 0.06 || p.y > 0.94) p.vy *= -1;
        p.rot += p.spin * dt;
        if (Math.random() < dt * 1.2)
          drop(field, (p.x * sw) | 0, (p.y * sh) | 0, 3, 0.06);
      }

      for (const k of koi) {
        // gentle sinusoidal steering — koi never swim in straight lines
        k.a += Math.sin(time * k.turnRate + k.turnPhase) * 0.45 * dt;
        k.x += Math.cos(k.a) * k.speed * dt;
        k.y += Math.sin(k.a) * k.speed * dt;

        // steer away from the edges instead of hard-bouncing
        if (k.x < 0.06) k.a += 1.6 * dt;
        if (k.x > 0.94) k.a += 1.6 * dt;
        if (k.y < 0.08) k.a += 1.6 * dt;
        if (k.y > 0.92) k.a += 1.6 * dt;
        k.x = Math.min(0.97, Math.max(0.03, k.x));
        k.y = Math.min(0.96, Math.max(0.04, k.y));

        // wake
        if (Math.random() < dt * 18)
          drop(field, (k.x * sw) | 0, (k.y * sh) | 0, 2, 0.07);
      }
    }

    function tick(ts: number) {
      if (!running) return;
      if (!lastTs) lastTs = ts;
      // clamp so a background tab doesn't fast-forward the pond on return
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      update(dt);

      // ripple solver runs at a fixed 60Hz for stability
      rippleAcc += dt;
      let guard = 0;
      while (rippleAcc >= 1 / 60 && guard++ < 4) {
        step(field);
        rippleAcc -= 1 / 60;
      }

      paintAll();
      raf = requestAnimationFrame(tick);
    }

    /* ── pointer ───────────────────────────────────────────────────────── */
    let lastX = -1, lastY = -1;
    const toSim = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      return [
        ((e.clientX - rect.left) / rect.width) * sw,
        ((e.clientY - rect.top) / rect.height) * sh,
      ];
    };
    function onMove(e: PointerEvent) {
      const [x, y] = toSim(e);
      if (x < 0 || y < 0 || x > sw || y > sh) return;
      if (lastX >= 0) {
        const n = Math.min(14, Math.hypot(x - lastX, y - lastY) | 0);
        for (let i = 1; i <= n; i++)
          drop(field, lastX + ((x - lastX) * i) / n, lastY + ((y - lastY) * i) / n, 4, 0.16);
      }
      drop(field, x, y, 5, 0.22);
      lastX = x; lastY = y;
    }
    function onDown(e: PointerEvent) {
      const [x, y] = toSim(e);
      drop(field, x, y, 10, 1.3);
    }
    const onLeave = () => { lastX = -1; lastY = -1; };

    layout();

    if (reduced) {
      update(0);
      paintAll();
    } else {
      raf = requestAnimationFrame(tick);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        if (reduced) return;
        if (e.isIntersecting && !running) {
          running = true;
          lastTs = 0;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={style}
      className={`block h-full w-full touch-none ${className}`}
    />
  );
}
