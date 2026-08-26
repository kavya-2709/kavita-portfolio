import { motion } from "framer-motion";
import { profile } from "../lib/content";
import { Button, Container, EASE } from "../components/ui";
import PondScene from "../components/PondScene";

const SOCIALS = [
  { name: "LinkedIn", href: profile.links.linkedin },
  { name: "Behance", href: profile.links.behance },
  { name: "X", href: profile.links.twitter },
];

/**
 * Closing section: the invitation on dry land, the pond scenery beneath it,
 * then a thin black bar carrying the footer links.
 *
 * The links sit on the bar rather than on the water — over the pond they kept
 * crossing lily pads, which dropped contrast to the AA threshold. The treat
 * cursor is scoped to the scenery only, so real buttons keep their pointer.
 */
export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-14 md:pt-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-geist text-body-lg text-graphite"
          >
            From first research call to pixel-accurate handoff, I help teams
            ship products people actually get through.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="font-serif-display text-ink mt-6 text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.03em]"
          >
            Let's build your next idea
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href={`mailto:${profile.email}`}>Email me</Button>
            <Button href={profile.links.linkedin} variant="ghost">
              Connect on LinkedIn →
            </Button>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative mt-10 md:mt-12"
      >
        <PondScene />

        {/* thin black bar closing the page */}
        <div className="bg-[#08090b]">
          <Container>
            <div className="flex flex-col items-center justify-between gap-2 py-3 md:flex-row">
              <span className="font-geist text-body-sm text-white/70">
                Designed by Kavita Yadav · India @{new Date().getFullYear()}
              </span>
              <div className="flex items-center gap-6">
                {SOCIALS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-geist text-body-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </motion.div>
    </footer>
  );
}
