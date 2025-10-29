"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingParticles from "./FloatingParticles";

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { content } = useContent();
  const { experience } = content;

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isCarouselVisible, elementRef: carouselRef } = useScrollAnimation(0.2);
  const { isVisible: isControlsVisible, elementRef: controlsRef } = useScrollAnimation(0.3);

  // Auto-avance cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToExperience((activeExperience + 1) % experience.experiences.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeExperience, isTransitioning, experience.experiences.length]);

  const goToExperience = (index: number) => {
    if (isTransitioning || index === activeExperience) return;
    
    setIsTransitioning(true);
    setActiveExperience(index);
    
    // Remover la clase de transición después de la animación
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const nextExperience = () => {
    goToExperience((activeExperience + 1) % experience.experiences.length);
  };

  const prevExperience = () => {
    goToExperience((activeExperience - 1 + experience.experiences.length) % experience.experiences.length);
  };

  return (
    <section id="experiencia" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative">
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Título con animación - CORREGIDO PARA "TRAYECTORIA" */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-12 pb-1 leading-tight">
          {experience.title}
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Carrusel Vertical con animación - MEJORADO CON TRANSICIÓN SUAVE */}
        <div 
          ref={carouselRef}
          className={`reveal-text ${isCarouselVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isCarouselVisible ? '0.2s' : '0s' }}
        >
          <div className="relative h-auto min-h-[500px] sm:min-h-[600px] overflow-hidden">
            {experience.experiences.map((exp, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                  index === activeExperience
                    ? "translate-y-0 opacity-100 scale-100 z-10"
                    : index < activeExperience
                    ? "translate-y-full opacity-0 scale-95 -z-10"
                    : "-translate-y-full opacity-0 scale-95 -z-10"
                } ${isTransitioning ? 'transitioning' : ''}`}
                style={{
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="bg-gray-900/80 border-2 border-cyan-500 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.3)] backdrop-blur-sm h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-cyan-300 text-lg sm:text-xl font-semibold">{exp.company}</p>
                    <p className="text-gray-400 text-sm sm:text-base mt-1">{exp.period}</p>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-300 text-center mb-4 sm:mb-6 text-base sm:text-xl leading-relaxed flex-grow-0">
                    {exp.description}
                  </p>

                  {/* Logros Destacados - MEJORADO PARA MÓVIL */}
                  <div className="space-y-3 flex-grow">
                    <h4 className="text-cyan-400 font-semibold text-center text-base sm:text-lg mb-3">
                      Logros Destacados:
                    </h4>
                    <ul className="space-y-2 max-h-[200px] sm:max-h-none overflow-y-auto">
                      {exp.achievements.map((achievement, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 text-gray-300 text-sm sm:text-base bg-gray-800/50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-800/70"
                        >
                          <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores y controles con animación */}
        <div 
          ref={controlsRef}
          className={`reveal-text ${isControlsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isControlsVisible ? '0.3s' : '0s' }}
        >
          {/* Indicadores */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {experience.experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToExperience(index)}
                disabled={isTransitioning}
                className={`w-8 h-2 sm:w-12 sm:h-2 rounded-full transition-all duration-300 ease-out ${
                  index === activeExperience
                    ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] scale-110"
                    : "bg-blue-500 hover:bg-blue-400 hover:scale-105"
                } ${isTransitioning ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
              />
            ))}
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={prevExperience}
              disabled={isTransitioning}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg transition-all duration-300 flex items-center gap-1 ${
                isTransitioning 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
              }`}
            >
              ◀ <span className="hidden sm:inline">{experience.navigation.previous}</span>
            </button>
            <button
              onClick={nextExperience}
              disabled={isTransitioning}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base bg-cyan-600 text-white rounded-lg transition-all duration-300 flex items-center gap-1 ${
                isTransitioning 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-cyan-500 hover:scale-105 hover:shadow-lg"
              }`}
            >
              <span className="hidden sm:inline">{experience.navigation.next}</span> ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}