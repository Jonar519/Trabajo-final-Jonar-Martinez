import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FloatingParticles from "./FloatingParticles";

export default function Achievements() {
  const { content, getLevelColor } = useContent();
  const { achievements } = content;

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isGridVisible, elementRef: gridRef } = useScrollAnimation(0.2);
  const { isVisible: isSummaryVisible, elementRef: summaryRef } = useScrollAnimation(0.3);

  return (
    <section id="extra" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative bg-transparent">
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Título con animación - CORREGIDO PARA "LOGROS" */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4 pb-1 leading-tight">
          {achievements.title}
        </h2>
        <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
          {achievements.description}
        </p>
      </div>

      {/* Grid de logros con animación */}
      <div 
        ref={gridRef}
        className={`reveal-text ${isGridVisible ? 'revealed' : ''}`}
        style={{ transitionDelay: isGridVisible ? '0.2s' : '0s' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.achievements.slice(0, 6).map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-900/50 border-2 border-gray-600 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Efecto de fondo gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(achievement.level)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Header con icono y nivel */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{achievement.icon}</div>
                <span className={`px-3 py-1 text-sm font-bold rounded-full bg-gradient-to-r ${getLevelColor(achievement.level)} text-white`}>
                  {achievement.level}
                </span>
              </div>

              {/* Contenido */}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {achievement.title}
              </h3>
              <p className="text-gray-300 text-base mb-4 leading-relaxed">
                {achievement.description}
              </p>

              {/* Estado del logro */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>{achievements.summary.labels.status}</span>
                  <span className="font-semibold">{achievement.status}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-cyan-400">{achievement.category}</span>
                <span className="text-gray-500">{achievement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary con animación */}
      <div 
        ref={summaryRef}
        className={`reveal-text ${isSummaryVisible ? 'revealed' : ''}`}
        style={{ transitionDelay: isSummaryVisible ? '0.3s' : '0s' }}
      >
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
            <div className="text-2xl font-bold text-cyan-400">{achievements.summary.total}</div>
            <div className="text-gray-400 text-base">{achievements.summary.labels.totalAchievements}</div>
          </div>
          <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-green-500/30 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400">{achievements.summary.completed}</div>
            <div className="text-gray-400 text-base">{achievements.summary.labels.completed}</div>
          </div>
        </div>
      </div>
    </section>
  );
}