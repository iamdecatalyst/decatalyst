import { lazy, Suspense } from 'react';
import Navigation from './components/layout/Navigation';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';
import PlanetSection from './components/layout/PlanetSection';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';

const SpaceCanvas = lazy(() => import('./components/three/SpaceCanvas'));

export default function App() {
  return (
    <>
      {/* Persistent full-page Three.js canvas */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-neu-base" />}>
        <SpaceCanvas />
      </Suspense>

      <ScrollProgress />
      <Navigation />

      <main className="relative z-10">
        <PlanetSection planetIndex={0} id="hero">
          <Hero />
        </PlanetSection>
        <PlanetSection planetIndex={1} id="about">
          <About />
        </PlanetSection>
        <PlanetSection planetIndex={2} id="skills">
          <Skills />
        </PlanetSection>
        <PlanetSection planetIndex={3} id="projects">
          <Projects />
        </PlanetSection>
        <PlanetSection planetIndex={4} id="experience">
          <Experience />
        </PlanetSection>
        <PlanetSection planetIndex={5} id="transmissions">
          <Blog />
        </PlanetSection>
        <PlanetSection planetIndex={6} id="contact">
          <Contact />
        </PlanetSection>
      </main>
      <Footer />
    </>
  );
}
