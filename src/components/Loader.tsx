import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "./ui";

const DOT_COUNT = 10;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [eaten, setEaten] = useState(0);
  const [exiting, setExiting] = useState(false);
  const intervalRef = useRef<number | null>(null);

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
              animate={{ left: `calc(${progress * 100}% - ${progress * 28}px)` }}
              transition={{ duration: 0.18, ease: "linear" }}
              style={{ left: 0 }}
            >
              <Pac />
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

/** Two clipped halves rotating apart = a chomping mouth. */
function Pac() {
  return (
    <div className="relative h-7 w-7">
      {[25, -25].map((deg) => (
        <motion.div
          key={deg}
          className="absolute inset-0 rounded-full bg-iris-blue"
          style={{
            clipPath: "polygon(100% 50%, 0 0, 0 100%)",
            transformOrigin: "50% 50%",
          }}
          animate={{ rotate: [0, deg, 0] }}
          transition={{ duration: 0.36, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
