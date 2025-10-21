import Image from "next/image";

export default function About() {
  return (
    <section
      id="acerca"
      className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-48 h-48 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Imagen - Mejorada */}
        <div className="flex justify-center md:justify-start">
          <div className="relative group">
            <Image
              src="/perfil.jpeg"
              alt="Mi Foto"
              width={500}
              height={500}
              className="rounded-2xl border-2 border-green-400 shadow-[0_0_35px_rgba(34,197,94,0.7)] hover:scale-105 transition-transform duration-500 w-full max-w-sm md:max-w-md"
            />
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Contenido - Mejorado */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Acerca de mí
          </h2>
          
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-8">
            Soy un estudiante de <span className="text-green-400 font-semibold">Ingeniería de Software</span> con gran interés en el
            desarrollo de aplicaciones web, diseño UX/UI y tecnologías modernas como 
            <span className="text-cyan-400 font-semibold"> React, Next.js y Tailwind CSS</span>. 
            Me encanta crear proyectos que mezclen creatividad, funcionalidad y estilo gamer.
          </p>

          {/* Stats rápidas */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-green-500/30 hover:border-green-400 transition-colors">
              <div className="text-2xl font-bold text-green-400">+5</div>
              <div className="text-gray-400 text-sm">Proyectos Completados</div>
            </div>
            <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
              <div className="text-2xl font-bold text-cyan-400">2+</div>
              <div className="text-gray-400 text-sm">Años de Prácticas</div>
            </div>
          </div>

          {/* Enfoque profesional */}
          <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2 justify-center md:justify-start">
              <span className="text-green-400">🎯</span> Mi Enfoque
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Me especializo en crear experiencias digitales modernas y responsivas, 
              combinando las mejores prácticas de desarrollo con diseños innovadores 
              que cautiven a los usuarios.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center gap-2 justify-center"
            >
              <span>🚀</span> Ver Proyectos
            </button>
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-green-400 text-green-300 font-bold rounded-full hover:bg-green-400/10 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <span>💬</span> Contactar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}