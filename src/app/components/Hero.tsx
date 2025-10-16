"use client";

export default function Hero() {
  const scrollToCV = () => {
    const cvSection = document.getElementById('cv');
    if (cvSection) {
      cvSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="nicio"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenido principal - TODO CENTRADO */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Título principal */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-wide bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-textGlow">
          Bienvenido a mi Portafolio
        </h2>
        
        {/* Descripción */}
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fadeIn">
          Estudiante de Ingeniería de Software | Apasionado por el desarrollo
          web, el diseño de interfaces y la innovación tecnológica ⚡
        </p>

        {/* Stats rápidas - Centradas */}
        <div className="flex justify-center gap-6 mb-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Disponible para proyectos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span>+5 Proyectos completados</span>
          </div>
        </div>

        {/* Botón - Centrado */}
        <div className="flex justify-center">
          <button 
            onClick={scrollToCV}
            className="px-8 sm:px-10 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-full hover:scale-110 transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>📄</span> 
              Ver mi CV
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
        </div>
      </div>

      {/* Partículas flotantes sutiles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}