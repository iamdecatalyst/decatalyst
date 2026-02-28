import Navigation from './components/layout/Navigation';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';
import TerminalSection from './components/layout/TerminalSection';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main className="relative">
        <TerminalSection id="hero" compact>
          <Hero />
        </TerminalSection>
        <TerminalSection id="about">
          <About />
        </TerminalSection>
        <TerminalSection id="skills">
          <Skills />
        </TerminalSection>
        <TerminalSection id="projects">
          <Projects />
        </TerminalSection>
        <TerminalSection id="experience">
          <Experience />
        </TerminalSection>
        <TerminalSection id="transmissions">
          <Blog />
        </TerminalSection>
        <TerminalSection id="contact">
          <Contact />
        </TerminalSection>
      </main>
      <Footer />
    </>
  );
}
