import About from "../sections/About";
import Contact from "../sections/Contact";

/**
 * About, lifted off the homepage onto its own route.
 *
 * Deliberately unstyled beyond clearing the fixed header — this is a
 * straight move so the homepage gets shorter; the page design comes later.
 */
export default function AboutPage() {
  return (
    <>
      <main className="pt-24 md:pt-28">
        <About />
      </main>
      <Contact />
    </>
  );
}
