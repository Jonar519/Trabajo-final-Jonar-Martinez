"use client";

import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingParticles from "./FloatingParticles";

export default function Hero() {
  const { content } = useContent();
  const { hero, cv } = content;
  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation(0.3);
  const { isVisible: isDescVisible, elementRef: descRef } = useScrollAnimation(0.2);
  const { isVisible: isStatsVisible, elementRef: statsRef } = useScrollAnimation(0.4);
  const { isVisible: isButtonVisible, elementRef: buttonRef } = useScrollAnimation(0.5);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-jonar-andres.pdf';
    link.download = 'CV-Jonar-Andres.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 relative overflow-hidden"
    >
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Título principal con animación - CORREGIDO */}
        <div 
          ref={titleRef}
          className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
        >
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 leading-tight tracking-wide bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent pb-2">
            {hero.title}
          </h2>
        </div>
        
        {/* Descripción con animación escalonada */}
        <div 
          ref={descRef}
          className={`reveal-text ${isDescVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isDescVisible ? '0.2s' : '0s' }}
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {hero.description}
          </p>
        </div>

        {/* Stats rápidas con animación */}
        <div 
          ref={statsRef}
          className={`reveal-text ${isStatsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isStatsVisible ? '0.4s' : '0s' }}
        >
          <div className="flex justify-center gap-6 mb-8 text-base text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>{hero.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>{hero.projectsCompleted}</span>
            </div>
          </div>
        </div>

        {/* Botón con animación */}
        <div 
          ref={buttonRef}
          className={`reveal-text ${isButtonVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isButtonVisible ? '0.6s' : '0s' }}
        >
          <div className="flex justify-center">
            <button 
              onClick={downloadCV}
              className="px-8 sm:px-10 py-4 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:scale-110 transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_rgba(34,211,238,0.8)] flex items-center gap-2 mx-auto border-2 border-cyan-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {cv.downloadButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}