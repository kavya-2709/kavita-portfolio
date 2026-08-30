import { motion } from "framer-motion";
import { profile } from "../lib/content";
import { ActionLink, Container, EASE } from "../components/ui";
import { TYPE } from "../lib/type";
import FooterScene from "../components/FooterScene";

const SOCIALS = [
  { name: "LinkedIn", href: profile.links.linkedin },
  { name: "Behance", href: profile.links.behance },
  { name: "X", href: profile.links.twitter },
];

/**
 * Closing section: the hook, then the pond, then a thin black bar carrying
 * the footer links.
 *
 * The heading is the one line on the page that has to do sales. It states
 * the value rather than describing the service: the finished thing looking
 * effortless is exactly what makes the work invisible, so naming that is
 * what a hiring manager nods at. The invitation underneath stays plain.
 *
 * `FooterScene` closes the page on the same pond the hero opens on. The gap
 * above it is deliberately tight because the image begins in white, so
 * extra margin only reads as a hole.
 *
 * The links sit on the bar rather than on the water — over the pond they kept
 * crossing lily pads, which dropped contrast to the AA threshold.
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
            className={TYPE.lead}
          >
            Tell me what you are working on. I read every message and reply
            to all of them.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className={`${TYPE.h1} mt-6`}
          >
            Let's build something worth using
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <ActionLink href={`mailto:${profile.email}`} tone="solid" arrow={null}>
              Email me
            </ActionLink>
            <ActionLink href={profile.links.linkedin}>
              Connect on LinkedIn
            </ActionLink>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative mt-2 md:mt-3"
      >
        <FooterScene />

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
