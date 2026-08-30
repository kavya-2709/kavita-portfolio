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

  useEffect(() => {
    const onScroll = () => {
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
            src="/avatar.png"
            alt=""
            width={40}
            height={40}
            className={`size-9 rounded-full border object-cover transition-colors duration-500 md:size-10 ${
              overPond ? "border-white/50" : "border-ink/10"
            }`}
          />
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {LINKS.map((l) => {
            // /work/:slug keeps Work lit while a case study is open.
            const isActive =
              pathname === l.to || pathname.startsWith(`${l.to}/`);
            return (
              <Link
                key={l.id}
                to={l.to}
                aria-current={isActive ? "page" : undefined}
                // The active route is ringed rather than merely brighter, so
                // it survives being read over a busy photograph.
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
