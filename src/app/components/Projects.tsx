"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingParticles from "./FloatingParticles";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { content } = useContent();
  const { projects } = content;

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isCarouselVisible, elementRef: carouselRef } = useScrollAnimation(0.2);
  const { isVisible: isControlsVisible, elementRef: controlsRef } = useScrollAnimation(0.3);

  const totalProjects = projects.projects.length;

  const nextProject = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % totalProjects);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToProject = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Función para calcular la posición de cada proyecto
  const getProjectPosition = (index: number) => {
    // Calcular la distancia desde el proyecto activo
    let distance = index - activeIndex;
    
    // Ajustar la distancia para el wrap around
    if (distance > totalProjects / 2) {
      distance = distance - totalProjects;
    } else if (distance < -totalProjects / 2) {
      distance = distance + totalProjects;
    }

    const absDistance = Math.abs(distance);

    // Proyecto activo
    if (distance === 0) {
      return {
        transform: "translateX(0) scale(1) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
      };
    }

    // Proyectos a la izquierda
    if (distance < 0) {
      const translateX = -Math.min(280 + absDistance * 60, 500);
      const scale = Math.max(0.8 - absDistance * 0.15, 0.4);
      const opacity = Math.max(0.7 - absDistance * 0.2, 0.1);
      const blur = Math.min(absDistance * 1.5, 6);
      const rotateY = Math.min(absDistance * 3, 10);
      
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        zIndex: 20 - absDistance,
        opacity,
        filter: `blur(${blur}px)`,
        pointerEvents: "auto" as const,
      };
    }

    // Proyectos a la derecha
    if (distance > 0) {
      const translateX = Math.min(280 + absDistance * 60, 500);
      const scale = Math.max(0.8 - absDistance * 0.15, 0.4);
      const opacity = Math.max(0.7 - absDistance * 0.2, 0.1);
      const blur = Math.min(absDistance * 1.5, 6);
      const rotateY = -Math.min(absDistance * 3, 10);
      
      return {
        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        zIndex: 20 - absDistance,
        opacity,
        filter: `blur(${blur}px)`,
        pointerEvents: "auto" as const,
      };
    }
  };

  // Ocultar proyectos que están muy lejos
  const shouldShowProject = (index: number) => {
    let distance = index - activeIndex;
    
    // Ajustar la distancia para el wrap around
    if (distance > totalProjects / 2) {
      distance = distance - totalProjects;
    } else if (distance < -totalProjects / 2) {
      distance = distance + totalProjects;
    }

    return Math.abs(distance) <= 2; // Mostrar solo 2 proyectos a cada lado
  };

  return (
    <section id="proyectos" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden">
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Título con animación - CORREGIDO PARA "PROYECTOS" */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 pb-1 leading-tight relative z-10">
          {projects.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto relative z-10">
          {projects.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Carrusel Container con animación */}
        <div 
          ref={carouselRef}
          className={`reveal-text ${isCarouselVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isCarouselVisible ? '0.2s' : '0s' }}
        >
          <div className="relative h-[600px] flex items-center justify-center">
            
            {/* Proyectos - Carrusel infinito suave */}
            <div className="relative w-full h-full flex items-center justify-center">
              {projects.projects.map((project, index) => {
                if (!shouldShowProject(index)) return null;

                const style = getProjectPosition(index);
                const isActive = index === activeIndex;

                return (
                  <div
                    key={project.id}
                    className={`absolute w-80 transition-all duration-600 ease-out ${
                      isActive ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={style}
                    onClick={() => !isActive && goToProject(index)}
                  >
                    <div className={`bg-white dark:bg-gray-900 border-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                      isActive 
                        ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.6)]" 
                        : "border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    }`}>
                      {/* Imagen del proyecto */}
                      <div className="relative h-48 bg-gradient-to-r from-purple-500 to-pink-500">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 dark:bg-black/80 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-500 font-semibold">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Contenido - TECNOLOGÍAS MEJORADAS */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-base mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tecnologías - FONDO GRIS CLARO CON TEXTO NEGRO */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gray-100 text-gray-900 text-sm rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Botones - Solo visible en proyecto activo */}
                        {isActive && (
                          <div className="flex gap-3 animate-fadeIn">
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-lg text-base font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                            >
                              <span>🌐</span> {projects.buttons.viewDemo}
                            </a>
                            <a
                              href={project.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 border border-purple-500 text-purple-600 dark:text-purple-300 text-center rounded-lg text-base font-semibold hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <span>📂</span> {projects.buttons.repository}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Controles de navegación */}
            <button
              onClick={prevProject}
              disabled={isTransitioning}
              className={`absolute left-4 p-4 rounded-full shadow-lg transition-all duration-300 z-40 ${
                isTransitioning 
                  ? "bg-purple-400/50 cursor-not-allowed" 
                  : "bg-purple-600/80 hover:bg-purple-500 hover:scale-110"
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextProject}
              disabled={isTransitioning}
              className={`absolute right-4 p-4 rounded-full shadow-lg transition-all duration-300 z-40 ${
                isTransitioning 
                  ? "bg-purple-400/50 cursor-not-allowed" 
                  : "bg-purple-600/80 hover:bg-purple-500 hover:scale-110"
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Indicadores y controles con animación */}
        <div 
          ref={controlsRef}
          className={`reveal-text ${isControlsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isControlsVisible ? '0.3s' : '0s' }}
        >
          {/* Indicadores */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-purple-400 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "bg-purple-600 hover:bg-purple-400"
                } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            ))}
          </div>

          {/* Contador */}
          <div className="text-center mt-4 space-y-2">
            <span className="text-purple-600 dark:text-purple-300 text-base block">
              {activeIndex + 1} / {totalProjects}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}