import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CaseStudy from "./sections/CaseStudy";
import Clean4WheelsCase from "./pages/Clean4WheelsCase";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import ScrollToTop from "./components/ScrollToTop";
import SelectedWork from "./sections/SelectedWork";
import FishTrail from "./components/FishTrail";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Impact from "./sections/Impact";
import LogoStrip from "./sections/LogoStrip";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

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
          <ScrollToTop />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/work" element={<WorkPage />} />
            {/* The one case study that is actually written. The others still
                fall through to the generic scaffold below. */}
            <Route path="/work/clean4wheels" element={<Clean4WheelsCase />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
