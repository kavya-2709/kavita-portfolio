import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Clean4Wheels, Aumraa, NioPractice, Housing } from "./scenes/mockups";
import {
  GAP,
  clamp01,
  sceneDistance,
  worldZ as cameraZ,
  pathOffset,
} from "../lib/camera";

const SCENE_W = 640;
const SCENE_H = 380;

type Scene = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  /** lateral offset of this scene in the flight path */
  offset: { x: number; y: number };
  /** viewport-heights of scroll spent on this scene */
  dwell: number;
  render: () => ReactNode;
};

const SCENES: Scene[] = [
  {
    id: "clean4wheels",
    eyebrow: "Automotive · Booking platform",
    title: "Nine steps became five.",
    body: "Rebuilt the end-to-end booking flow across a connected customer, valet and manager ecosystem — then documented the design system that holds it together.",
    tags: ["40% faster turnaround", "6 screens", "Design system"],
    offset: { x: -140, y: -40 },
    dwell: 1.35,
    render: () => <Clean4Wheels />,
  },
  {
    id: "aumraa",
    eyebrow: "Faith-tech · Mobile app",
    title: "Ritual, made legible.",
    body: "15+ end-to-end flows for a B2C faith-tech app — discovery, onboarding, Panchang, Puja booking and reminders, from concept to pixel-accurate handoff.",
    tags: ["15+ flows", "WCAG 2.1", "Concept → handoff"],
    offset: { x: 170, y: 30 },
    dwell: 1.35,
    render: () => <Aumraa />,
  },
  {
    id: "niopractice",
    eyebrow: "EdTech · GATE / JEE",
    title: "Less friction, more practice.",
    body: "Restructured the Practice Hub information architecture to cut cognitive load, with guided learning and difficulty-based progress tracking.",
    tags: ["+28% completion", "+35% DAU"],
    offset: { x: -110, y: 55 },
    dwell: 1.35,
    render: () => <NioPractice />,
  },
  {
    id: "housing",
    eyebrow: "Marketplace · Trust & onboarding",
    title: "Trust is an interface problem.",
    body: "Reworked onboarding and the in-app chat experience so first-time users understand the platform's value — and feel safe enough to stay.",
    tags: ["Safer UX", "Retention"],
    offset: { x: 150, y: -50 },
    dwell: 1.35,
    render: () => <Housing />,
  },
];

export default function ScrollWorld() {
  const outer = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(1);

  // Progress is derived from window scroll against the section's measured
  // bounds. (useScroll({ target }) silently reports 0 here — the ref-based
  // measurement doesn't resolve for this pinned layout.)
  const { scrollY } = useScroll();
  const [range, setRange] = useState({ start: 0, end: 1 });

  useEffect(() => {
    const measure = () => {
      const el = outer.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const end = top + el.offsetHeight - window.innerHeight;
      setRange({ start: top, end: Math.max(end, top + 1) });
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 300); // re-measure once fonts/images settle
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const raw = useTransform(scrollY, (v) =>
    clamp01((v - range.start) / (range.end - range.start))
  );

  // rAF-smoothed scrub, so a flick of the wheel doesn't snap the camera
  const p = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  const last = SCENES.length - 1;

  // camera position along the winding path (geometry tested in lib/camera.test.ts)
  const xs = SCENES.map((s) => s.offset.x);
  const ys = SCENES.map((s) => s.offset.y);
  const worldZ = useTransform(p, (v) => cameraZ(v, last));
  const worldX = useTransform(p, (v) => pathOffset(v, xs));
  const worldY = useTransform(p, (v) => pathOffset(v, ys));

  useMotionValueEvent(p, "change", (v) => {
    setActive(Math.round(clamp01(v) * last));
  });

  // scenes are fixed-size set pieces; scale the whole rig down on small screens
  useEffect(() => {
    const fit = () => setScale(Math.min(1, window.innerWidth / 900));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const totalDwell = SCENES.reduce((sum, s) => sum + s.dwell, 0);

  /* Reduced motion: no camera, no pinning — just the scenes stacked. */
  if (reduced) {
    return (
      <section id="work" className="px-5 py-24 sm:px-10">
        <Heading />
        <div className="mt-14 space-y-16">
          {SCENES.map((s) => (
            <div key={s.id} className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div style={{ height: SCENE_H }}>{s.render()}</div>
              <Copy scene={s} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={outer}
      style={{ height: `${totalDwell * 100}vh` }}
      /* Margin, not padding: the scrub range is measured from offsetHeight,
         which excludes margin but would include padding — padding here would
         desync the camera from the scroll. Margin gives the section its
         rhythm without touching the maths. */
      className="relative my-14 md:my-20"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* the 3D stage */}
        <div
          className="absolute inset-0"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          <div className="absolute inset-0" style={{ perspective: "1200px" }}>
            <motion.div
              className="absolute top-1/2 left-1/2"
              style={{
                transformStyle: "preserve-3d",
                x: worldX,
                y: worldY,
                z: worldZ,
              }}
            >
              {SCENES.map((s, i) => (
                <SceneCard key={s.id} scene={s} index={i} last={last} p={p} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* pinned copy — only the focused scene's copy is visible */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-10">
          <div className="relative h-56">
            {SCENES.map((s, i) => (
              <CopyLayer key={s.id} scene={s} index={i} last={last} p={p} />
            ))}
          </div>
        </div>

        {/* route rail */}
        <div className="absolute top-1/2 right-5 flex -translate-y-1/2 flex-col gap-3 sm:right-8">
          {SCENES.map((s, i) => (
            <div key={s.id} className="flex items-center justify-end gap-2">
              <span
                className={`font-geist text-caption tracking-[0.2em] text-graphite uppercase transition-opacity duration-300 ${
                  active === i ? "opacity-70" : "opacity-0"
                }`}
              >
                {s.id}
              </span>
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-7 bg-iris-blue" : "w-1.5 bg-fog/40"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-24 left-5 sm:left-10">
          <Heading compact />
        </div>
      </div>
    </section>
  );
}

/* ── One scene in 3D space ──────────────────────────────────────────── */
function SceneCard({
  scene,
  index,
  last,
  p,
}: {
  scene: Scene;
  index: number;
  last: number;
  p: MotionValue<number>;
}) {
  // signed distance from the camera, in units of GAP (0 = in focus)
  const d = useTransform(p, (v) => sceneDistance(v, index, last));
  const opacity = useTransform(d, [-1.15, -0.6, 0, 0.5, 0.9], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: SCENE_W,
        height: SCENE_H,
        marginLeft: -SCENE_W / 2,
        marginTop: -SCENE_H / 2,
        x: scene.offset.x,
        y: scene.offset.y,
        z: -index * GAP,
        opacity,
        transformStyle: "preserve-3d",
      }}
    >
      {scene.render()}
    </motion.div>
  );
}

/* ── Copy that swaps as each scene reaches focus ────────────────────── */
function CopyLayer({
  scene,
  index,
  last,
  p,
}: {
  scene: Scene;
  index: number;
  last: number;
  p: MotionValue<number>;
}) {
  const d = useTransform(p, (v) => sceneDistance(v, index, last));
  const opacity = useTransform(d, [-0.5, -0.18, 0, 0.18, 0.5], [0, 1, 1, 1, 0]);
  const y = useTransform(d, [-0.5, 0, 0.5], [24, 0, -24]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0">
      <Copy scene={scene} />
    </motion.div>
  );
}

function Copy({ scene }: { scene: Scene }) {
  return (
    <div className="max-w-xl">
      <p className="font-geist text-caption tracking-[0.22em] text-iris-blue uppercase">
        {scene.eyebrow}
      </p>
      <h3 className="mt-3 text-heading text-ink md:text-heading-lg">{scene.title}</h3>
      <p className="mt-3 font-geist text-body text-graphite md:text-body-lg">{scene.body}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {scene.tags.map((t) => (
          <li
            key={t}
            className="rounded-full bg-paper-white/80 px-3 py-1 font-geist text-body-sm text-ink backdrop-blur"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Heading({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "max-w-2xl"}>
      <span className="inline-flex rounded-full border border-iris-blue/40 px-3 py-1 font-geist text-body-sm text-iris-blue">
        Selected Work
      </span>
      {!compact && (
        <h2 className="mt-4 text-heading-lg text-ink md:text-display">
          Projects across booking platforms, faith-tech, edtech & marketplaces.
        </h2>
      )}
    </div>
  );
}
