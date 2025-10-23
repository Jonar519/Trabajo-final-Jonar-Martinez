"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";

// Componente separado para las partículas (Client-only)
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    delay: string;
    duration: string;
  }>>([]);

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) {
    // Render vacío durante SSR
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { content } = useContent();
  const { hero, cv } = content;

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
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Efectos de fondo sutiles - Estos son estáticos, no causan problemas */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Título principal */}
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 leading-tight tracking-wide bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-textGlow">
          {hero.title}
        </h2>
        
        {/* Descripción */}
        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fadeIn">
          {hero.description}
        </p>

        {/* Stats rápidas */}
        <div className="flex justify-center gap-6 mb-8 text-base text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>{hero.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span>{hero.projectsCompleted}</span>
          </div>
        </div>

        {/* Botón Descargar CV */}
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

      {/* Partículas flotantes - Solo en cliente */}
      <FloatingParticles />
    </section>
  );
}