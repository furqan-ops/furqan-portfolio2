import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import CommandPalette from "./components/CommandPalette";
import Toast from "./components/Toast";
import BootScreen from "./components/BootScreen";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Process from "./components/Process";
import Certifications from "./components/Certifications";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <ThemeProvider>
      <main className="relative">
        <ScrollProgress />
        <Nav onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        <Toast />
        <BootScreen />
        <Hero />
        <Stats />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Skills />
        <Process />
        <Certifications />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
