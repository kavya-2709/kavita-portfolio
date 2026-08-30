import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "./ui";
import { LiquidButton } from "./LiquidButton";
import { ExternalIcon } from "./icons";
import { profile } from "../lib/content";

/**
 * One floating pill: avatar, routes, and the resume.
 *
 * Replaces a header that spread a wordmark, a scroll-triggered availability
 * chip and a separate CTA across the full width. Everything now sits in a
 * single capsule, so the header reads as one object over the artwork instead
 * of three things placed near each other.
 *
 * Playground is deliberately not a nav item: it is a section at the foot of
 * Work, and giving a one-section page a top-level slot sent people looking
 * for case studies down a second path.
 */
const LINKS = [
  { id: "work", label: "Work", to: "/work" },
  { id: "about", label: "About", to: "/about" },
] as const;

export default function Nav() {
  const { pathname } = useLocation();
  // While the header floats over the pond it inverts to white.
  const [overPond, setOverPond] = useState(true);
  // Past the first scroll the capsule collapses to the availability pill.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("hero");
      const pondBottom = hero
        ? hero.getBoundingClientRect().top + window.innerHeight
        : 0;
      setOverPond(pondBottom > 96);
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
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-6"
    >
      <div
        // Frosted over the pond, solid white once past it. The border is
        // present in both states so the capsule never changes height.
        className={`pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border p-2 transition-colors duration-500 md:gap-3 ${
          overPond
            ? "border-white/40 bg-white/15 backdrop-blur-md"
            : "border-ink/10 bg-paper-white/90 backdrop-blur-md"
        }`}
      >
        {/* Avatar doubles as the home link, which is what the wordmark did. */}
        <Link
          to="/"
          aria-label={`${profile.name}, home`}
          className="shrink-0 rounded-full"
        >
          <img
            src="/avatar.webp"
            alt=""
            width={40}
            height={40}
            className={`size-9 rounded-full border object-cover transition-colors duration-500 md:size-10 ${
              overPond ? "border-white/50" : "border-ink/10"
            }`}
          />
        </Link>

        {/*
          The middle of the capsule swaps as you scroll: routes at the top of
          the page, the availability pill once you are into it.

          Both live in the same grid cell so the capsule is sized by the wider
          of the two and never resizes mid-transition. Only opacity animates,
          and whichever is hidden loses pointer events and is taken out of the
          accessibility tree, so nothing invisible is still tabbable.
        */}
        <div className="grid">
          <nav
            aria-hidden={scrolled}
            className={`col-start-1 row-start-1 flex items-center justify-center gap-1 transition-opacity duration-500 md:gap-2 ${
              scrolled ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {LINKS.map((l) => {
              // /work/:slug keeps Work lit while a case study is open.
              const isActive =
                pathname === l.to || pathname.startsWith(`${l.to}/`);
              return (
                <Link
                  key={l.id}
                  to={l.to}
                  tabIndex={scrolled ? -1 : undefined}
                  aria-current={isActive ? "page" : undefined}
                  // The active route is ringed rather than merely brighter,
                  // so it survives being read over a busy photograph.
                  className={`font-geist text-body-sm rounded-full border px-4 py-2 transition-colors duration-300 md:text-body ${
                    overPond
                      ? isActive
                        ? "border-white/70 text-white"
                        : "border-transparent text-white/80 hover:text-white"
                      : isActive
                        ? "border-ink/25 text-ink"
                        : "border-transparent text-graphite hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Availability, with the pulsing dot the old header carried. */}
          <a
            href="#contact"
            aria-hidden={!scrolled}
            tabIndex={scrolled ? undefined : -1}
            className={`col-start-1 row-start-1 flex items-center justify-center gap-2.5 px-4 transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <span
              className={`font-geist text-body-sm whitespace-nowrap transition-colors duration-500 md:text-body ${
                overPond ? "text-white" : "text-ink"
              }`}
            >
              Available for work
            </span>
            <span className="relative flex size-4 shrink-0 items-center justify-center">
              <motion.span
                className="bg-solar-wash absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.55, 1], opacity: [0.75, 0, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative size-2 rounded-full bg-[#f0c020]" />
            </span>
          </a>
        </div>

        <LiquidButton
          href={profile.links.resume}
          size="sm"
          tone={overPond ? "light" : "solid"}
          className="shrink-0"
        >
          Resume
          <ExternalIcon />
        </LiquidButton>
      </div>
    </motion.header>
  );
}
