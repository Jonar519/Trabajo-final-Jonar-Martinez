import { useContent } from "@/hooks/useContent";

export default function Achievements() {
  const { content, getLevelColor } = useContent();
  const { achievements } = content;

  return (
    <section id="extra" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-black">
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
        {achievements.title}
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        {achievements.description}
      </p>

      {/* Grid de 2 columnas y 3 filas */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.achievements.slice(0, 6).map((achievement) => (
          <div
            key={achievement.id}
            className="bg-gray-900/80 border-2 border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Efecto de fondo gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(achievement.level)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            {/* Header con icono y nivel */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{achievement.icon}</div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getLevelColor(achievement.level)} text-white`}>
                {achievement.level}
              </span>
            </div>

            {/* Contenido */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {achievement.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {achievement.description}
            </p>

            {/* Barra de progreso */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{achievements.summary.labels.progress}</span>
                <span>{achievement.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getLevelColor(achievement.level)} transition-all duration-1000`}
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-cyan-400">{achievement.category}</span>
              <span className="text-gray-500">{achievement.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="max-w-2xl mx-auto mt-12 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-cyan-500/30">
          <div className="text-xl font-bold text-cyan-400">{achievements.summary.total}</div>
          <div className="text-gray-400 text-sm">{achievements.summary.labels.totalAchievements}</div>
        </div>
        <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-green-500/30">
          <div className="text-xl font-bold text-green-400">{achievements.summary.committed}</div>
          <div className="text-gray-400 text-sm">{achievements.summary.labels.committed}</div>
        </div>
      </div>
    </section>
  );
}