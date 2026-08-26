import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "./ui";

/** `to` is a route; `hash` is a section on the homepage. */
const LINKS = [
  { id: "work", label: "Work", hash: "work" },
  { id: "about", label: "About", to: "/about" },
  { id: "playground", label: "Playground", to: "/playground" },
] as const;

export default function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const [active, setActive] = useState("work");
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

  /**
   * Homepage sections are anchors, but the nav is global. From another route
   * we have to land on "/" first and only then scroll — the target element
   * doesn't exist until Home has mounted.
   */
  const goToSection = (hash: string) => {
    if (onHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/");
    // Home has to mount before the target exists, and ScrollToTop resets to 0
    // on the way in. Poll briefly for the element, then jump instantly —
    // a smooth scroll here races the reset and gets cancelled.
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      } else if (tries++ < 40) {
        requestAnimationFrame(seek);
      }
    };
    requestAnimationFrame(seek);
  };

  useEffect(() => {
    if (!onHome) return;
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

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
            const isActive =
              "to" in l ? pathname === l.to : onHome && active === l.id;
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

            return "to" in l ? (
              <Link key={l.id} to={l.to} className={cls}>
                {label}
              </Link>
            ) : (
              <button
                key={l.id}
                type="button"
                onClick={() => goToSection(l.hash)}
                className={cls}
              >
                {label}
              </button>
            );
          })}
        </motion.nav>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`rounded-buttons px-6 py-2.5 font-geist text-body-sm transition-colors duration-500 md:text-body ${
            overPond
              ? "border border-white/50 bg-white/15 text-white backdrop-blur-sm"
              : "bg-charcoal text-paper-white"
          }`}
        >
          Let's talk
        </motion.a>
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
