import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "./ui";
import { KoiTrunk } from "./Koi";
import { KOI_TAIL_D, KOI_TAIL_FILL, KOI_TAIL_PIVOT } from "../lib/koi";

const DOT_COUNT = 10;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [eaten, setEaten] = useState(0);
  const [exiting, setExiting] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setEaten((prev) => {
        const next = prev + 1;
        if (next >= DOT_COUNT) {
          window.clearInterval(intervalRef.current!);
          window.setTimeout(() => setExiting(true), 320);
        }
        return next;
      });
    }, 180);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const t = window.setTimeout(onDone, 620);
    return () => window.clearTimeout(t);
  }, [exiting, onDone]);

  const progress = eaten / DOT_COUNT;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sky-tint"
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-10 text-center"
          >
            <p className="font-aeonik text-heading text-ink">
              Kavya<span className="text-iris-blue">.</span>
            </p>
            <p className="mt-2 font-geist text-caption tracking-[0.3em] text-fog uppercase">
              loading the canvas
            </p>
          </motion.div>

          <div className="relative flex h-12 w-[min(78vw,400px)] items-center">
            <div className="flex w-full items-center justify-between px-1">
              {Array.from({ length: DOT_COUNT }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-powder-blue transition-opacity duration-200"
                  style={{ opacity: i < eaten ? 0 : 1 }}
                />
              ))}
            </div>

            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              animate={{ left: `calc(${progress * 100}% - ${progress * 44}px)` }}
              transition={{ duration: 0.18, ease: "linear" }}
              style={{ left: 0 }}
            >
              <Koi still={!!reduced} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 font-geist text-body-sm text-fog"
          >
            {Math.round(progress * 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * The site's koi, swimming the progress track.
 *
 * Two motions, both decorative: the tail sweeps about the point where it
 * joins the body, and the whole fish bobs and pitches a little, the way one
 * does holding station in water. Travel along the track is driven by
 * progress, not by these, so under reduced motion the fish still advances
 * and the loader still reads as a loader.
 */
function Koi({ still }: { still: boolean }) {
  return (
    <motion.svg
      viewBox="-30 -12 46 24"
      width={44}
      height={23}
      aria-hidden
      className="overflow-visible"
      animate={still ? undefined : { y: [0, -2.5, 0, 2.5, 0], rotate: [0, -3, 0, 3, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* An SVG element's transform-origin is in user units by default, so
          the pivot is the fish's own coordinates, not a fraction of a box. */}
      <motion.path
        d={KOI_TAIL_D}
        fill={KOI_TAIL_FILL}
        style={{
          transformOrigin: `${KOI_TAIL_PIVOT.x}px ${KOI_TAIL_PIVOT.y}px`,
        }}
        animate={still ? undefined : { rotate: [0, 16, 0, -16, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
      />
      <KoiTrunk />
    </motion.svg>
  );
}
