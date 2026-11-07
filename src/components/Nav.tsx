import { useEffect, useRef, useState } from "react";
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
 * **Phones get a menu, not a second row.** Avatar, three labels and Resume
 * need about 400px, which no common phone has, so the capsule had been
 * wrapping to two rows and reading as two stacked bars. Below `sm` the
 * routes now collapse behind a button and the capsule is one row again:
 * avatar, menu, Resume. From `sm` up nothing changed.
 */
const LINKS = [
  { id: "work", label: "Work", to: "/work" },
  { id: "fun", label: "Fun", to: "/fun" },
  { id: "about", label: "About", to: "/about" },
] as const;

export default function Nav() {
  const { pathname } = useLocation();
  // While the header floats over the pond it inverts to white.
  const [overPond, setOverPond] = useState(true);
  // Past the first scroll the capsule collapses to the availability pill.
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("hero");
      // Measure the hero's own bottom rather than assuming it is one viewport
      // tall. It isn't on phones, where the pond is deliberately shorter, and
      // assuming 100vh left the header in its white-over-water state well
      // after the water had scrolled away.
      const pondBottom = hero ? hero.getBoundingClientRect().bottom : 0;
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

  /** Escape, and a tap anywhere else, close it. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menuOpen]);

  const linkClass = (isActive: boolean) =>
    `font-geist text-body-sm rounded-full border px-3 py-2 transition-colors duration-300 sm:px-4 md:text-body ${
      overPond
        ? isActive
          ? "border-white/70 text-white"
          : "border-transparent text-white/80 hover:text-white"
        : isActive
          ? "border-ink/25 text-ink"
          : "border-transparent text-graphite hover:text-ink"
    }`;

  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(`${to}/`);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full px-3 pt-4 sm:px-4 md:px-6 md:pt-6"
    >
      <div ref={menuRef} className="pointer-events-auto mx-auto w-full sm:w-fit">
        <div
          // Frosted over the pond, solid white once past it. The border is
          // present in both states so the capsule never changes height.
          className={`flex w-full items-center justify-between gap-1.5 rounded-full border p-1.5 transition-colors duration-500 sm:w-fit sm:justify-start sm:gap-2 sm:p-2 md:gap-3 ${
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
              className={`size-8 rounded-full border object-cover transition-colors duration-500 sm:size-9 md:size-10 ${
                overPond ? "border-white/50" : "border-ink/10"
              }`}
            />
          </Link>

          {/*
            The middle of the capsule swaps as you scroll: routes at the top
            of the page, the availability pill once you are into it.

            Both live in the same grid cell so the capsule is sized by the
            wider of the two and never resizes mid-transition. Only opacity
            animates, and whichever is hidden loses pointer events and is
            taken out of the accessibility tree, so nothing invisible is
            still tabbable.
          */}
          <div className="hidden grid-cols-1 sm:grid">
            <nav
              aria-hidden={scrolled}
              className={`col-start-1 row-start-1 flex items-center justify-center gap-1 transition-opacity duration-500 md:gap-2 ${
                scrolled ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {LINKS.map((l) => (
                <Link
                  key={l.id}
                  to={l.to}
                  tabIndex={scrolled ? -1 : undefined}
                  aria-current={isActive(l.to) ? "page" : undefined}
                  // The active route is ringed rather than merely brighter,
                  // so it survives being read over a busy photograph.
                  className={linkClass(isActive(l.to))}
                >
                  {l.label}
                </Link>
              ))}
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
              <AvailabilityDot />
            </a>
          </div>

          {/* Phones: the routes live behind this. */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:hidden ${
              overPond
                ? "border-white/40 text-white"
                : "border-ink/15 text-ink"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="size-[18px]"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>

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

        {/* The menu itself: a sheet under the capsule rather than a drawer
            over the page, so the header stays the thing you are using and
            the artwork behind it is never covered. */}
        <div
          id="nav-menu"
          hidden={!menuOpen}
          className="border-ink/10 bg-paper-white/95 rounded-cards-sm mt-2 border p-2 backdrop-blur-md sm:hidden"
        >
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(l.to) ? "page" : undefined}
                className={`font-geist text-body rounded-full px-4 py-2.5 transition-colors ${
                  isActive(l.to)
                    ? "bg-mist-gray text-ink"
                    : "text-graphite hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-geist text-body-sm text-graphite flex items-center gap-2.5 px-4 pt-3 pb-1"
            >
              Available for work
              <AvailabilityDot />
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

/** The pulsing dot the old header carried. */
function AvailabilityDot() {
  return (
    <span className="relative flex size-4 shrink-0 items-center justify-center">
      <motion.span
        className="bg-solar-wash absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.55, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative size-2 rounded-full bg-[#f0c020]" />
    </span>
  );
}
