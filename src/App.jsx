import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Frame } from "./components/Frame";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Work } from "./components/Work";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Frame />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main id="main">
          <Hero theme={theme} />
          <Experience />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
