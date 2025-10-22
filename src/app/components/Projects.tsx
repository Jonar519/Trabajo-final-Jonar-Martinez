"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const { content } = useContent();
  const { projects } = content;

  // Crear array extendido para el efecto infinito
  const extendedProyectos = [...projects.projects, ...projects.projects, ...projects.projects];

  const nextProject = () => {
    setActiveProject((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= projects.projects.length * 2) {
        return projects.projects.length;
      }
      return nextIndex;
    });
  };

  const prevProject = () => {
    setActiveProject((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        return projects.projects.length - 1;
      }
      return prevIndex;
    });
  };

  const goToProject = (index) => {
    setActiveProject(index + projects.projects.length);
  };

  // Efecto para resetear suavemente cuando llegue a los extremos
  useEffect(() => {
    if (activeProject >= projects.projects.length * 2) {
      const timer = setTimeout(() => {
        setActiveProject(projects.projects.length);
      }, 50);
      return () => clearTimeout(timer);
    }
    if (activeProject < 0) {
      const timer = setTimeout(() => {
        setActiveProject(projects.projects.length - 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeProject, projects.projects.length]);

  // Calcular el índice real para mostrar la información correcta
  const getRealIndex = (index) => {
    return index % projects.projects.length;
  };

  return (
    <section id="proyectos" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-black relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
      
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 relative z-10">
        {projects.title}
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto relative z-10">
        {projects.description}
      </p>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Carrusel Container */}
        <div className="relative h-[500px] flex items-center justify-center">
          
          {/* Proyectos - Efecto 3D Infinito */}
          <div className="relative w-full h-full flex items-center justify-center perspective">
            {extendedProyectos.map((proyecto, index) => {
              const distance = Math.abs(index - activeProject);
              const isActive = index === activeProject;
              const isLeft = index < activeProject;
              const isRight = index > activeProject;

              let transform = "";
              let zIndex = 0;
              let opacity = 1;

              if (isActive) {
                transform = "translateX(0) scale(1)";
                zIndex = 30;
              } else if (isLeft) {
                transform = `translateX(-${120 + distance * 60}px) scale(${1 - distance * 0.15})`;
                zIndex = 20 - distance;
                opacity = 1 - distance * 0.3;
              } else if (isRight) {
                transform = `translateX(${120 + distance * 60}px) scale(${1 - distance * 0.15})`;
                zIndex = 20 - distance;
                opacity = 1 - distance * 0.3;
              }

              // Ocultar proyectos muy lejanos para mejor performance
              if (distance > 3) {
                return null;
              }

              const realIndex = getRealIndex(index);
              const realProject = projects.projects[realIndex];

              return (
                <div
                  key={`${realProject.id}-${index}`}
                  className={`absolute w-80 transition-all duration-500 ease-in-out ${
                    isActive ? "cursor-default" : "cursor-pointer"
                  }`}
                  style={{
                    transform,
                    zIndex,
                    opacity: Math.max(opacity, 0.3)
                  }}
                  onClick={() => !isActive && goToProject(realIndex)}
                >
                  <div className={`bg-gradient-to-br from-gray-900 to-black border-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    isActive 
                      ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.6)]" 
                      : "border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                  }`}>
                    {/* Imagen del proyecto */}
                    <div className="relative h-48 bg-gradient-to-r from-purple-500 to-pink-500">
                      <Image
                        src={realProject.image}
                        alt={realProject.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/80 text-purple-300 text-xs rounded-full border border-purple-500">
                          {realProject.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{realProject.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {realProject.description}
                      </p>

                      {/* Tecnologías */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {realProject.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Botones - Solo visible en proyecto activo */}
                      {isActive && (
                        <div className="flex gap-3">
                          <a
                            href={realProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-lg text-sm font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                          >
                            <span>🌐</span> Ver Demo
                          </a>
                          <a
                            href={realProject.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 border border-purple-500 text-purple-300 text-center rounded-lg text-sm font-semibold hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
                          >
                            <span>📂</span> Repositorio
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
            className="absolute left-4 bg-purple-600/80 hover:bg-purple-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
          >
            ◀
          </button>
          <button
            onClick={nextProject}
            className="absolute right-4 bg-purple-600/80 hover:bg-purple-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
          >
            ▶
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                getRealIndex(activeProject) === index
                  ? "bg-purple-400 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                  : "bg-purple-600 hover:bg-purple-400"
              }`}
            />
          ))}
        </div>

        {/* Contador */}
        <div className="text-center mt-4 space-y-2">
          <span className="text-purple-300 text-sm block">
            {getRealIndex(activeProject) + 1} / {projects.projects.length}
          </span>
        </div>
      </div>
    </section>
  );
}