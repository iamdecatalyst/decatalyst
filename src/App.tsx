import Navigation from './components/layout/Navigation';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';
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
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
