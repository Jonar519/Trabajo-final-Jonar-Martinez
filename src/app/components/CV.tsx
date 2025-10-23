import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    <section id="cv" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Título con animación */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-12">
          {cv.title}
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Habilidades Técnicas con animación */}
        <div 
          ref={skillsRef}
          className={`reveal-text ${isSkillsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isSkillsVisible ? '0.2s' : '0s' }}
        >
          <div className="bg-gray-900/80 border border-cyan-500 rounded-xl p-6 shadow-[0_0_25px_rgba(34,211,238,0.3)] backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2 justify-center">
              <span className="text-cyan-400">⚡</span> {cv.sections.technicalSkills}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cv.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-semibold text-base">{skill.name}</span>
                    <span className="text-cyan-300 text-sm bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-500/30">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{getLevelIcon(skill.level)}</span>
                    <span className={`text-sm font-medium bg-gradient-to-r ${getLevelColor(skill.level)} bg-clip-text text-transparent`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Educación con animación */}
        <div 
          ref={educationRef}
          className={`reveal-text ${isEducationVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isEducationVisible ? '0.3s' : '0s' }}
        >
          <div className="bg-gray-900/80 border border-purple-500 rounded-xl p-6 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2 justify-center">
              <span className="text-purple-400">🎓</span> {cv.sections.education}
            </h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-purple-400 pl-4 hover:border-l-cyan-400 transition-all duration-300">
                  <h4 className="text-white font-semibold text-xl">{edu.degree}</h4>
                  <p className="text-gray-300 text-base">{edu.institution}</p>
                  <p className="text-purple-300 text-sm font-mono">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}