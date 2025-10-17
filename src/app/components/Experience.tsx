"use client";

import { useState, useEffect } from "react";

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      title: "Desarrollador Full Stack",
      company: "Empresa Tech Innovadora",
      period: "2024 - Presente",
      description: "Desarrollo de aplicaciones web modernas con tecnologías de vanguardia.",
      achievements: ["Lideré el desarrollo de 3 proyectos", "Mejoré performance en 40%", "Implementé CI/CD"]
    },
    {
      title: "Practicante en Desarrollo Web",
      company: "Startup Digital",
      period: "2023 - 2024", 
      description: "Enfoque en desarrollo frontend y experiencia de usuario.",
      achievements: ["Desarrollé 10+ componentes", "Optimicé carga de sitios", "Colaboré en equipo ágil"]
    },
    {
      title: "Estudiante Universitario",
      company: "Universidad XYZ", 
      period: "2022 - 2026",
      description: "Formación integral en ingeniería de software y tecnologías.",
      achievements: ["Promedio 4.5/5.0", "Proyectos destacados", "Participación en hackathons"]
    }
  ];

  // Auto-avance cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExperience((prev) => (prev + 1) % experiences.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [experiences.length]);

  return (
    <section id="experiencia" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-12">
        Mi Trayectoria
      </h2>

      <div className="max-w-3xl mx-auto">
        {/* Carrusel Vertical */}
        <div className="relative h-96 overflow-hidden">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 transform ${
                index === activeExperience
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-full opacity-0 scale-95"
              }`}
            >
              <div className="bg-gray-900/80 border-2 border-cyan-500 rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.3)] backdrop-blur-sm h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-cyan-300 text-lg font-semibold">{exp.company}</p>
                  <p className="text-gray-400 text-sm mt-1">{exp.period}</p>
                </div>

                <p className="text-gray-300 text-center mb-6 text-lg leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-cyan-400 font-semibold text-center">Logros Destacados:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <span className="text-green-400">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-3 mt-8">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveExperience(index)}
              className={`w-12 h-2 rounded-full transition-all duration-300 ${
                index === activeExperience
                  ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            />
          ))}
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveExperience(prev => prev === 0 ? experiences.length - 1 : prev - 1)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            ◀ Anterior
          </button>
          <button
            onClick={() => setActiveExperience(prev => (prev + 1) % experiences.length)}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-300 hover:scale-105"
          >
            Siguiente ▶
          </button>
        </div>
      </div>
    </section>
  );
}