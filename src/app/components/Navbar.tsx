"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const sections = ["INICIO", "ACERCA", "CV", "EXPERIENCIA", "PROYECTOS", "EXTRA", "CONTACTO"];

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Detectar sección activa
      const sectionElements = sections.map(section => 
        document.getElementById(section)
      ).filter(Boolean) as HTMLElement[];

      const currentSection = sectionElements.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-black/90 backdrop-blur-xl border-b border-gray-800 shadow-2xl" 
        : "bg-black/50 backdrop-blur-lg"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo/Título mejorado */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">J</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 animate-text">
            Mi Portafolio
          </h1>
        </div>

        {/* Navegación desktop mejorada */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-xs sm:text-sm uppercase font-semibold tracking-wide">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="relative group transition-all duration-300"
            >
              <span className={`transition-colors duration-300 ${
                activeSection === section
                  ? "text-green-400"
                  : "text-gray-300 group-hover:text-cyan-400"
              }`}>
                {section === "cv" ? "CV" : section}
              </span>
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-300 ${
                activeSection === section ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
              
              {/* Efecto de brillo en active */}
              {activeSection === section && (
                <div className="absolute inset-0 bg-green-400/10 rounded-lg blur-sm"></div>
              )}
            </button>
          ))}
        </div>

        {/* Botón menú móvil mejorado */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
            menuOpen 
              ? "bg-green-400 text-black" 
              : "text-green-400 hover:bg-green-400/10"
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {menuOpen ? "✕" : "☰"}
          </div>
        </button>
      </div>

      {/* Menú móvil mejorado */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-700 px-6 py-4 space-y-3 animate-fadeIn">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                activeSection === section
                  ? "bg-green-400/20 text-green-400 border border-green-400/30"
                  : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
              }`}
            >
              <span className="flex items-center gap-3">
                {activeSection === section && (
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                )}
                {section === "cv" ? "📄 CV" : `🎯 ${section.charAt(0).toUpperCase() + section.slice(1)}`}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Indicador de progreso de scroll */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-300"
          style={{
            width: `${((sections.indexOf(activeSection) + 1) / sections.length) * 100}%`
          }}
        ></div>
      </div>
    </nav>
  );
}