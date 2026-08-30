import { lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CaseStudy from "./sections/CaseStudy";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import { LiquidFilter } from "./components/LiquidButton";
import ScrollToTop from "./components/ScrollToTop";
import SelectedWork from "./sections/SelectedWork";
import FishTrail from "./components/FishTrail";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Impact from "./sections/Impact";
import LogoStrip from "./sections/LogoStrip";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

/**
 * The three case studies are split out of the main bundle.
 *
 * Together they carry a lot of copy, and nobody landing on the homepage needs
 * any of it: adding the third pushed the entry chunk past 500kB. Each now
 * loads when its route is opened.
 */
const Clean4WheelsCase = lazy(() => import("./pages/Clean4WheelsCase"));
const NioCase = lazy(() => import("./pages/NioCase"));
const HousingCase = lazy(() => import("./pages/HousingCase"));

function Home() {
  return (
    <>
      <FishTrail />
      <main>
        <Hero />
        <Intro />
        <Impact />
        <LogoStrip />
        <SelectedWork />
        <Testimonials />
      </main>
      <Contact />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          {/* One gooey filter for every button on the site. */}
          <LiquidFilter />
          <ScrollToTop />
          <Nav />
          {/* The fallback is a blank hold rather than a spinner: these chunks
              land in a few hundred milliseconds on any real connection, and a
              flashing loader reads worse than a beat of nothing. */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Playground is a section of Work now. The old route redirects
                  rather than 404s, since it was linked from the work index. */}
              <Route
                path="/playground"
                element={<Navigate to="/work" replace />}
              />
              <Route path="/work" element={<WorkPage />} />
              {/* All three case studies are written. The :slug scaffold below
                is now only a fallback for an unknown slug. */}
              <Route path="/work/clean4wheels" element={<Clean4WheelsCase />} />
              <Route path="/work/niopractice" element={<NioCase />} />
              <Route path="/work/housing" element={<HousingCase />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
