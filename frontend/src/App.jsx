import { useEffect } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";

import CursorGlow from "@/components/portfolio/CursorGlow";
import ParticleBg from "@/components/portfolio/ParticleBg";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Achievements from "@/components/portfolio/Achievements";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

function App() {
  useEffect(() => {
    document.title = "Thomas M — Backend Engineer";
    document.documentElement.classList.add("dark");
    // Smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="App relative min-h-screen bg-[#050505] text-white" data-testid="app-root">
      <CursorGlow />
      <ParticleBg />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </div>
  );
}

export default App;




