import { motion } from "framer-motion";
import { Container, EASE } from "../components/ui";
import { sketchwall as copy } from "../lib/content";
import Explorations from "../components/playground/Explorations";
import Reel from "../sections/Playground";
import Contact from "../sections/Contact";

/**
 * `/fun` — the self-directed half of the site.
 *
 * Deliberately not part of `/work`: the case studies and the shipped
 * products are the hiring argument, and these are the things Kavita makes
 * when nobody asked. Keeping them apart means the work index stays a
 * portfolio rather than half portfolio and half sketchbook.
 *
 * Two sections, in descending weight. The explorations carry the page and
 * own its only large heading; the reel follows as a labelled strip. A
 * visitor drawing pad and a shared wall used to close the page and were
 * removed: it was the one thing here that was not Kavita's own work, and it
 * asked a visitor for effort before the page had earned any. The history is
 * in PR #4 if it ever wants to come back.
 */
export default function PlaygroundPage() {
  return (
    <>
      <main className="pt-28 md:pt-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="bg-ink text-paper-white font-geist text-caption inline-flex rounded-full px-3.5 py-1.5 tracking-[0.11em] uppercase">
              {copy.badge}
            </span>
          </motion.div>
        </Container>

        <div className="mt-8">
          <Explorations />
        </div>

        {/* The motion reel, moved here from the foot of Work. It is the same
            kind of thing as the explorations, self-directed and curious, and
            Work is stronger as case studies plus shipped products alone. */}
        <Reel />
      </main>
      <Contact />
    </>
  );
}
