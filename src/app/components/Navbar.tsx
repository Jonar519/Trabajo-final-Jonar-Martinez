"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const { content, scrollToSection, getSectionId } = useContent();

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Detectar sección activa
      const sectionElements = content.navigation.sections.map(section => 
        document.getElementById(getSectionId(section))
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
  }, [content.navigation.sections, getSectionId]);

  const handleNavClick = (sectionName: string) => {
    const sectionId = getSectionId(sectionName);
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const getSectionIcon = (sectionName: string) => {
    const iconMap: { [key: string]: string } = {
      'INICIO': '🏠',
      'HOME': '🏠',
      'ACERCA': '👤',
      'ABOUT': '👤',
      'HABILIDADES': '⚡',
      'SKILLS': '⚡',
      'EXPERIENCIA': '💼',
      'EXPERIENCE': '💼',
      'PROYECTOS': '🚀',
      'PROJECTS': '🚀',
      'TESTIMONIOS': '💬',
      'TESTIMONIALS': '💬',
      'EXTRA': '⭐',
      'CONTACTO': '📧',
      'CONTACT': '📧'
    };
    return iconMap[sectionName] || '🎯';
  };

  // Navegación compacta para pantallas medianas
  const getCompactSectionName = (section: string) => {
    const compactMap: { [key: string]: string } = {
      'INICIO': 'Inicio',
      'HOME': 'Home',
      'ACERCA': 'Acerca',
      'ABOUT': 'About',
      'HABILIDADES': 'Skills',
      'SKILLS': 'Skills',
      'EXPERIENCIA': 'Exp',
      'EXPERIENCE': 'Exp',
      'PROYECTOS': 'Proy',
      'PROJECTS': 'Proj',
      'TESTIMONIOS': 'Test',
      'TESTIMONIALS': 'Test',
      'EXTRA': 'Extra',
      'CONTACTO': 'Contact',
      'CONTACT': 'Contact'
    };
    return compactMap[section] || section;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg" 
        : "bg-white/90 dark:bg-black/90 backdrop-blur-lg"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo/Título */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">J</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 animate-text">
            {content.site.author}
          </h1>
        </div>

        {/* Navegación desktop + Switchers */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher />
          
          {/* Navegación para desktop - Versión compacta */}
          <div className="hidden lg:flex items-center gap-1 text-sm uppercase font-semibold tracking-wide">
            {content.navigation.sections.map((section) => {
              const sectionId = getSectionId(section);
              return (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className="relative group transition-all duration-300"
                >
                  <span className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                    activeSection === sectionId
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}>
                    {getCompactSectionName(section)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navegación para tablets */}
          <div className="hidden md:flex lg:hidden items-center gap-1 text-xs uppercase font-semibold tracking-wide">
            {content.navigation.sections.slice(0, 4).map((section) => {
              const sectionId = getSectionId(section);
              return (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className="relative group transition-all duration-300"
                >
                  <span className={`px-2 py-1 rounded transition-colors duration-300 ${
                    activeSection === sectionId
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                  }`}>
                    {getCompactSectionName(section)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
            menuOpen 
              ? "bg-green-400 text-black" 
              : "text-green-600 dark:text-green-400 hover:bg-green-400/10"
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {menuOpen ? "✕" : "☰"}
          </div>
        </button>
      </div>

      {/* Menú móvil MEJORADO */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 absolute top-full left-0 w-full max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-2 animate-fadeIn">
            {content.navigation.sections.map((section) => {
              const sectionId = getSectionId(section);
              return (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                    activeSection === sectionId
                      ? "bg-green-400/20 text-green-600 dark:text-green-400 border border-green-400/30"
                      : "text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <span className="flex items-center gap-3 text-base font-medium">
                    {activeSection === sectionId && (
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
                    )}
                    {getSectionIcon(section)} {section}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Indicador de progreso de scroll */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-300"
          style={{
            width: `${((content.navigation.sections.findIndex(section => getSectionId(section) === activeSection) + 1) / content.navigation.sections.length) * 100}%`
          }}
        ></div>
      </div>
    </nav>
  );
}