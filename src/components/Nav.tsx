import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "./ui";
import { LiquidButton } from "./LiquidButton";
import { ExternalIcon } from "./icons";
import { profile } from "../lib/content";

/**
 * Every nav item is a real route — no homepage hash jumps.
 *
 * Playground used to sit here as a third route. It is now a section at the
 * foot of Work, because side projects are work: splitting them out gave a
 * thin page its own top-level slot and sent people looking for case studies
 * down a second path.
 */
const LINKS = [
  { id: "work", label: "Work", to: "/work" },
  { id: "about", label: "About", to: "/about" },
] as const;

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // while the header floats over the pond it has to invert to white
  const [overPond, setOverPond] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("hero");
      const pondBottom = hero ? hero.getBoundingClientRect().top + window.innerHeight : 0;
      setOverPond(pondBottom > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      <div
        className={`relative mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <Link
          to="/"
          className={`font-aeonik text-subheading tracking-[-0.02em] transition-colors duration-500 ${
            overPond ? "text-white" : "text-ink"
          }`}
          
        >
          Kavya<span className={overPond ? "text-white/70" : "text-iris-blue"}>.</span>
        </Link>

        {/* Availability chip — avatar, status, pulsing dot.
            Centre-absolute, so it only appears once the in-flow links have
            faded out; otherwise the two would sit on top of each other. */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          animate={{
            opacity: scrolled ? 1 : 0,
            y: scrolled ? 0 : -8,
            pointerEvents: scrolled ? "auto" : "none",
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-2.5 rounded-full py-1.5 pr-2 pl-1.5 backdrop-blur-md transition-colors duration-500 md:flex ${
            overPond
              ? "border border-white/40 bg-white/15"
              : "border border-ink/10 bg-paper-white"
          }`}
        >
          <img
            src="/avatar.png"
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
          <span
            className={`font-geist text-body-sm transition-colors duration-500 ${
              overPond ? "text-white" : "text-ink"
            }`}
          >
            Available for work
          </span>
          <span className="relative flex h-4 w-4 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-solar-wash"
              animate={{ scale: [1, 1.55, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative h-2 w-2 rounded-full bg-[#f0c020]" />
          </span>
        </motion.a>

        <motion.nav
          animate={{
            opacity: scrolled ? 0 : 1,
            y: scrolled ? 8 : 0,
            pointerEvents: scrolled ? "none" : "auto",
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="hidden items-center gap-8 md:flex"
        >
          {LINKS.map((l) => {
            // /work/:slug keeps Work lit while reading a case study
            const isActive = pathname === l.to || pathname.startsWith(`${l.to}/`);
            const cls = `relative font-geist text-body transition-colors duration-500 ${
              overPond
                ? "text-white/90 hover:text-white"
                : isActive
                  ? "text-ink"
                  : "text-graphite hover:text-ink"
            }`;
            const label = (
              <>
                [&nbsp;{l.label}&nbsp;]
                {!overPond && isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-iris-blue"
                  />
                )}
              </>
            );

            return (
              <Link key={l.id} to={l.to} className={cls}>
                {label}
              </Link>
            );
          })}
        </motion.nav>

        {/* Resume, not "Let's talk": the footer already carries the contact
            CTA, and the thing someone actually wants from a persistent header
            is the document. It opens in its own tab rather than downloading,
            so the site stays where it was and the PDF gets a viewer.

            Same component and same liquid fill as every other button; only the
            tone changes, because over the pond the header sits on dark water
            and below it on white. */}
        <LiquidButton
          href={profile.links.resume}
          size="sm"
          tone={overPond ? "light" : "solid"}
        >
          Resume
          <ExternalIcon />
        </LiquidButton>
      </div>

      {/* frosted band only once past the pond */}
      <motion.div
        aria-hidden
        animate={{ opacity: scrolled && !overPond ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10 bg-white/85 backdrop-blur-md"
      />
    </motion.header>
  );
}
