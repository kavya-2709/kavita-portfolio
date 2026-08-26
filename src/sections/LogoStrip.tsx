import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
} from "framer-motion";
import { Container, EASE, Reveal } from "../components/ui";

/**
 * Scroll-reactive logo drift.
 *
 * A plain CSS marquee reads as mechanical wallpaper — it ignores the user
 * entirely. This one drifts on its own, but scroll velocity pushes it
 * faster and flips its direction to match the way you're scrolling, and
 * each mark skews slightly with the speed. It reacts, so it feels alive.
 */

const MARKS = [
  { name: "Clean4Wheels", src: "/logos/companies/clean4wheels.png", h: 46 },
  { name: "Nio", src: "/logos/companies/nio.png", h: 40 },
  { name: "Software Incubator", src: "/logos/companies/software-incubator.png", h: 46 },
  { name: "Doorstep Beauty", src: "/logos/companies/doorstep-beauty.png", h: 66 },
  { name: "Thrift Guide", src: "/logos/companies/thrift-guide.png", h: 62 },
];

const FADE: React.CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
};

/** wrap a value into [min, max) so the strip loops seamlessly */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export default function LogoStrip() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 320,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-1500, 0, 1500], [6, 0, -6], {
    clamp: true,
  });

  const direction = useRef(1);
  useMotionValueEvent(smoothVelocity, "change", (v) => {
    if (v !== 0) direction.current = v < 0 ? -1 : 1;
  });

  useAnimationFrame((_, delta) => {
    // base drift, then scroll velocity adds on top and steers direction
    let move = direction.current * -1.6 * (delta / 1000);
    move += direction.current * -1.6 * (delta / 1000) * velocityFactor.get();
    baseX.set(baseX.get() + move);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const loop = [...MARKS, ...MARKS, ...MARKS, ...MARKS];

  return (
    <section className="relative py-14 md:py-20">
      <Container>
        <Reveal>
          <p className="text-center font-geist text-caption tracking-[0.3em] text-graphite uppercase">
            Teams and founders I've built for
          </p>
        </Reveal>
      </Container>

      <div className="relative mt-14 overflow-hidden" style={FADE}>
        <motion.div className="flex w-max items-end gap-20 md:gap-28" style={{ x, skewX: skew }}>
          {loop.map((m, i) => (
            <motion.div
              key={`${m.name}-${i}`}
              className="flex shrink-0 items-center"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <img
                src={m.src}
                alt={m.name}
                loading="lazy"
                style={{ height: m.h }}
                className="w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
