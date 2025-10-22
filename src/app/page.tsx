"use client";

import { LanguageProvider } from './hooks/useLanguage';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About"; 
import CV from "./components/CV";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <main className="bg-black text-white font-[Poppins] selection:bg-green-500/30">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Hero />
        <About />
        <CV />
        <Experience />
        <Projects />
        <Testimonials />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}