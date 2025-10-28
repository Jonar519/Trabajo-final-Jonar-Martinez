"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);
  const { content } = useContent();
  const { experience } = content;

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isCarouselVisible, elementRef: carouselRef } = useScrollAnimation(0.2);
  const { isVisible: isControlsVisible, elementRef: controlsRef } = useScrollAnimation(0.3);

  // Auto-avance cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExperience((prev) => (prev + 1) % experience.experiences.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [experience.experiences.length]);

  return (
    <section id="experiencia" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Título con animación */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-12">
          {experience.title}
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Carrusel Vertical con animación - MEJORADO PARA MÓVIL */}
        <div 
          ref={carouselRef}
          className={`reveal-text ${isCarouselVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isCarouselVisible ? '0.2s' : '0s' }}
        >
          <div className="relative h-auto min-h-[500px] sm:min-h-[600px] overflow-hidden">
            {experience.experiences.map((exp, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  index === activeExperience
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-full opacity-0 scale-95"
                }`}
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
                          className="flex items-start gap-3 text-gray-300 text-sm sm:text-base bg-gray-800/50 rounded-lg p-3"
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
                onClick={() => setActiveExperience(index)}
                className={`w-8 h-2 sm:w-12 sm:h-2 rounded-full transition-all duration-300 ${
                  index === activeExperience
                    ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                    : "bg-blue-500 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={() => setActiveExperience(prev => prev === 0 ? experience.experiences.length - 1 : prev - 1)}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
            >
              ◀ <span className="hidden sm:inline">{experience.navigation.previous}</span>
            </button>
            <button
              onClick={() => setActiveExperience(prev => (prev + 1) % experience.experiences.length)}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
            >
              <span className="hidden sm:inline">{experience.navigation.next}</span> ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}