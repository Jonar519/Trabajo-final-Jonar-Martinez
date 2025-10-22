import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export default function CV() {
  const { content } = useContent();
  const { cv, socialNetworks } = content;

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-jonar-andres.pdf';
    link.download = 'CV-Jonar-Andres.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Experto":
      case "Expert":
        return "from-green-400 to-emerald-500";
      case "Avanzado":
      case "Advanced":
        return "from-blue-400 to-cyan-500";
      case "Intermedio":
      case "Intermediate":
        return "from-yellow-400 to-amber-500";
      case "Básico":
      case "Basic":
        return "from-gray-400 to-gray-600";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Experto":
      case "Expert":
        return "🚀";
      case "Avanzado":
      case "Advanced":
        return "⚡";
      case "Intermedio":
      case "Intermediate":
        return "🔷";
      case "Básico":
      case "Basic":
        return "🔶";
      default:
        return "⚪";
    }
  };

  return (
    <section id="cv" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-12">
        {cv.title}
      </h2>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Columna Izquierda - Información Personal */}
        <div className="md:col-span-1 bg-gray-900/80 border border-indigo-500 rounded-xl p-6 shadow-[0_0_25px_rgba(99,102,241,0.3)] backdrop-blur-sm">
          <div className="text-center mb-6">
            <Image
              src="/perfil.jpeg"
              alt="Foto CV"
              width={120}
              height={120}
              className="rounded-full border-4 border-indigo-400 mx-auto mb-4 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            />
            <h3 className="text-xl font-bold text-white">{content.site.author}</h3>
            <p className="text-indigo-300">{cv.position}</p>
          </div>

          <div className="space-y-6">
            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">📧</span> {cv.sections.contact}
              </h4>
              <p className="text-gray-300 text-sm mb-2">{content.site.email}</p>
              <p className="text-gray-300 text-sm mb-2">{content.site.phone}</p>
              <p className="text-gray-300 text-sm">{content.site.location}</p>
            </div>

            {/* Redes Sociales - CORREGIDO */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">🌐</span> {cv.sections.socialNetworks}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialNetworks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-3 rounded-lg ${social.bgColor} ${social.borderColor} border-2 ${social.glowColor} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    <div className="w-8 h-8 mb-2 flex items-center justify-center">
                      <Image 
                        src={social.icon} 
                        alt={social.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-xs text-center text-white font-medium">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">🗣️</span> {cv.sections.languages}
              </h4>
              {cv.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-300 text-sm font-medium">{lang.language}</p>
                  <p className="text-cyan-400 text-xs">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha - Contenido Principal */}
        <div className="md:col-span-2 space-y-8">
          {/* Habilidades Técnicas */}
          <div className="bg-gray-900/80 border border-cyan-500 rounded-xl p-6 shadow-[0_0_25px_rgba(34,211,238,0.3)] backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
              <span className="text-cyan-400">⚡</span> {cv.sections.technicalSkills}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cv.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-semibold text-sm">{skill.name}</span>
                    <span className="text-cyan-300 text-xs bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-500/30">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getLevelIcon(skill.level)}</span>
                    <span className={`text-xs font-medium bg-gradient-to-r ${getLevelColor(skill.level)} bg-clip-text text-transparent`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educación */}
          <div className="bg-gray-900/80 border border-purple-500 rounded-xl p-6 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
              <span className="text-purple-400">🎓</span> {cv.sections.education}
            </h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-purple-400 pl-4 hover:border-l-cyan-400 transition-all duration-300">
                  <h4 className="text-white font-semibold text-lg">{edu.degree}</h4>
                  <p className="text-gray-300 text-sm">{edu.institution}</p>
                  <p className="text-purple-300 text-xs font-mono">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Descargar CV */}
          <div className="text-center">
            <button 
              onClick={downloadCV}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_rgba(34,211,238,0.8)] flex items-center gap-2 mx-auto border-2 border-cyan-400"
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