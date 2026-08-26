import Playground from "../sections/Playground";
import Contact from "../sections/Contact";

/**
 * Playground, lifted off the homepage onto its own route.
 *
 * Straight move — page design comes later, same as About.
 */
export default function PlaygroundPage() {
  return (
    <>
      <main className="pt-24 md:pt-28">
        <Playground />
      </main>
      <Contact />
    </>
  );
}
