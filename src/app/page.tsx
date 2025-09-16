// app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: "welcome", label: "Bienvenida" },
    { id: "about", label: "Acerca de mí" },
    { id: "projects", label: "Proyectos" },
    { id: "experience", label: "Experiencia" },
    { id: "contact", label: "Contacto" },
    { id: "extra", label: "Extra" },
  ];

  return (
    <div className="bg-black text-white font-mono scroll-smooth">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LOGO */}
          <h1 className="text-2xl font-extrabold text-purple-500 tracking-widest">
            Portafolio<span className="text-cyan-400">Dev</span>
          </h1>

          {/* MENU DESKTOP */}
          <ul className="hidden md:flex gap-6 text-sm uppercase">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>

          {/* MENU MOBILE */}
          <button
            className="md:hidden text-purple-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black border-t border-purple-600">
            <ul className="flex flex-col items-center py-4 gap-4">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {sec.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* CONTENIDO */}
      <main className="pt-24">
        {/* Bienvenida */}
        <section
          id="welcome"
          className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-purple-900 text-center px-6"
        >
          <h2 className="text-5xl font-extrabold text-purple-400 mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]">
            ¡Hola, soy Jonar Martínez! 👋
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            Estudiante de <span className="text-cyan-400">Ingeniería de Software</span>, 
            apasionado por la tecnología, el desarrollo web y la creación de soluciones innovadoras.
          </p>
        </section>

        {/* Acerca de mí */}
        <section
          id="about"
          className="min-h-screen flex flex-col justify-center items-center bg-black px-6 py-16"
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-10">Acerca de mí</h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl items-center">
            <Image
              src="/profile.jpg" // pon aquí tu foto
              alt="Mi foto"
              width={500}
              height={500}
              className="rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.7)]"
            />
            <p className="text-gray-300 leading-relaxed text-lg">
              Soy un desarrollador en formación con sólidos conocimientos en{" "}
              <span className="text-cyan-400">Next.js, TailwindCSS y TypeScript</span>.  
              Me encanta aprender nuevas tecnologías y trabajar en proyectos que
              mezclen diseño atractivo con funcionalidad. 🚀
            </p>
          </div>
        </section>

        {/* Proyectos */}
        <section
          id="projects"
          className="min-h-screen bg-gradient-to-r from-purple-950 to-black px-6 py-16"
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-10 text-center">
            Mis Proyectos
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((p) => (
              <div
                key={p}
                className="bg-black/60 border border-purple-700 rounded-xl p-6 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.7)]"
              >
                <Image
                  src={`/project${p}.jpg`} // cambia estas imágenes
                  alt={`Proyecto ${p}`}
                  width={400}
                  height={250}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-purple-300 mb-2">
                  Proyecto {p}
                </h3>
                <p className="text-gray-400">
                  Descripción breve del proyecto {p} que muestra mi experiencia en
                  desarrollo y diseño.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experiencia */}
        <section
          id="experience"
          className="min-h-screen bg-black px-6 py-16"
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-10 text-center">
            Experiencia Académica y Laboral
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex gap-6 items-start">
              <div className="bg-purple-700 rounded-lg px-4 py-2 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.7)]">
                2023
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">
                  Prácticas académicas
                </h3>
                <p className="text-gray-400">
                  Participación en proyectos de desarrollo web con tecnologías modernas.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-purple-700 rounded-lg px-4 py-2 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.7)]">
                2024
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">
                  Proyecto universitario
                </h3>
                <p className="text-gray-400">
                  Creación de una plataforma en Next.js y Tailwind para gestión de información.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section
          id="contact"
          className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-black to-purple-900 px-6"
        >
          <h2 className="text-4xl font-bold text-pink-500 mb-6">Contacto</h2>
          <p className="text-gray-300 mb-4">¿Quieres trabajar conmigo? Escríbeme:</p>
          <a
            href="mailto:tuemail@correo.com"
            className="px-6 py-3 bg-purple-700 rounded-full hover:bg-purple-600 transition shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          >
            tuemail@correo.com
          </a>
        </section>

        {/* EXTRA */}
        <section
          id="extra"
          className="min-h-screen bg-black px-6 py-16"
        >
          <h2 className="text-4xl font-bold text-green-400 mb-10 text-center">
            Mi Setup & Hobbies
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-black/70 border border-green-600 p-6 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.7)]">
              <h3 className="text-xl font-bold text-green-400 mb-2">Setup</h3>
              <p className="text-gray-300">
                Computadora, monitores y herramientas que uso para programar y aprender.
              </p>
            </div>
            <div className="bg-black/70 border border-green-600 p-6 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.7)]">
              <h3 className="text-xl font-bold text-green-400 mb-2">Hobbies</h3>
              <p className="text-gray-300">
                Me gusta el fútbol, la música y experimentar con nuevas tecnologías.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-purple-600 py-6 text-center text-sm text-gray-400">
        © 2025 Jonar Martínez - Portafolio Gamer Style. Todos los derechos reservados.
      </footer>
    </div>
  );
}
