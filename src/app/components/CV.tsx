import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingParticles from "./FloatingParticles";

export default function CV() {
  const { content } = useContent();
  const { cv } = content;

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isSkillsVisible, elementRef: skillsRef } = useScrollAnimation(0.2);
  const { isVisible: isEducationVisible, elementRef: educationRef } = useScrollAnimation(0.3);

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
    <section id="cv" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative bg-transparent">
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Título con animación - CORREGIDO */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-12 pb-1 leading-tight">
          {cv.title}
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Habilidades Técnicas con animación - CORREGIDO PARA MODO CLARO */}
        <div 
          ref={skillsRef}
          className={`reveal-text ${isSkillsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isSkillsVisible ? '0.2s' : '0s' }}
        >
          <div className="bg-white dark:bg-gray-900/80 border-2 border-cyan-500 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            {/* Título corregido para modo claro */}
            <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-300 mb-6 flex items-center gap-2 justify-center">
              <span className="text-cyan-500">⚡</span> {cv.sections.technicalSkills}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cv.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 border-2 border-cyan-400/50 rounded-xl p-4 hover:border-cyan-500 transition-all duration-300 group hover:scale-105 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    {/* Nombre de habilidad corregido para modo claro */}
                    <span className="text-gray-900 dark:text-white font-bold text-lg">{skill.name}</span>
                    <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-sm font-semibold rounded-full border border-cyan-400">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getLevelIcon(skill.level)}</span>
                    <span className={`text-base font-bold bg-gradient-to-r ${getLevelColor(skill.level)} bg-clip-text text-transparent`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Educación con animación - CORREGIDO PARA MODO CLARO */}
        <div 
          ref={educationRef}
          className={`reveal-text ${isEducationVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isEducationVisible ? '0.3s' : '0s' }}
        >
          <div className="bg-white dark:bg-gray-900/80 border-2 border-purple-500 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            {/* Título corregido para modo claro */}
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4 flex items-center gap-2 justify-center">
              <span className="text-purple-500">🎓</span> {cv.sections.education}
            </h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4 hover:border-l-cyan-500 transition-all duration-300 hover:scale-105">
                  {/* Textos corregidos para modo claro */}
                  <h4 className="text-gray-900 dark:text-white font-bold text-xl">{edu.degree}</h4>
                  <p className="text-gray-700 dark:text-white text-base font-medium">{edu.institution}</p>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold font-mono">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}