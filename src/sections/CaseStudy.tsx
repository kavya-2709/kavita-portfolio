import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { selectedWork } from "../lib/content";
import { Container, EASE } from "../components/ui";
import { TYPE } from "../lib/type";

/**
 * Case-study page scaffold.
 *
 * Carries over everything the card already knows — index, client, headline,
 * impact, tags and the hero image — so the transition from card to page is
 * continuous. The body below is a deliberate placeholder for the full write-up.
 */
export default function CaseStudy() {
  const { slug } = useParams();
  const item = selectedWork.find((w) => w.slug === slug);

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className={TYPE.h2}>That case study isn't here.</h1>
          <Link
            to="/"
            className="font-geist text-body text-iris-blue mt-4 inline-block"
          >
            ← Back to work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20 md:pt-36">
      <Container>
        <Link
          to="/work"
          className="font-geist text-body-sm text-graphite hover:text-ink transition-colors"
        >
          ← Selected works
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10"
        >
          <div className="font-geist text-body-sm text-fog flex items-center gap-3">
            <span>{item.index}</span>
            <span className="bg-ink/10 h-px w-6" />
            <span>{item.meta}</span>
          </div>

          <h1 className={`${TYPE.h1} mt-5 max-w-4xl`}>
            {item.title}
          </h1>

          <p className="font-geist text-body-lg text-graphite mt-6 max-w-2xl">
            {item.impact}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <li
                key={t}
                className="bg-mist-gray font-geist text-body-sm text-graphite rounded-full px-4 py-2"
              >
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          className="rounded-images bg-mist-gray mt-14 aspect-[16/10] w-full overflow-hidden"
        >
          <img
            src={item.image}
            alt={`${item.meta} — case study`}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Write-up goes here */}
        <div className="border-ink/[0.08] mt-16 max-w-2xl border-t pt-10">
          <p className="font-geist text-body text-fog">
            Full case study — problem framing, research, flows and outcomes —
            coming next.
          </p>
        </div>
      </Container>
    </main>
  );
}
