import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { content, handleButtonAction } = useContent();
  const { about } = content;
  
  const { isVisible: isContentVisible, elementRef: contentRef } = useScrollAnimation();
  const { isVisible: isImageVisible, elementRef: imageRef } = useScrollAnimation();
  const { isVisible: isStatsVisible, elementRef: statsRef } = useScrollAnimation(0.2);
  const { isVisible: isFocusVisible, elementRef: focusRef } = useScrollAnimation(0.3);
  const { isVisible: isButtonsVisible, elementRef: buttonsRef } = useScrollAnimation(0.4);

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
        {/* Imagen con animación desde la izquierda */}
        <div 
          ref={imageRef}
          className={`reveal-text ${isImageVisible ? 'revealed' : ''}`}
        >
          <div className="flex justify-center md:justify-start">
            <div className="relative group">
              <Image
                src="/perfil.jpeg"
                alt="Mi Foto"
                width={500}
                height={500}
                className="rounded-2xl border-2 border-green-400 shadow-[0_0_35px_rgba(34,197,94,0.7)] hover:scale-105 transition-transform duration-500 w-full max-w-sm md:max-w-md"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Contenido con animación desde la derecha */}
        <div 
          ref={contentRef}
          className={`reveal-text ${isContentVisible ? 'revealed' : ''}`}
        >
          <div className="text-center md:text-left">
            <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              {about.title}
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-lg sm:text-xl mb-8">
              {about.content}
            </p>

            {/* Stats rápidas con animación escalonada */}
            <div 
              ref={statsRef}
              className={`reveal-text ${isStatsVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: isStatsVisible ? '0.2s' : '0s' }}
            >
              <div className="grid grid-cols-2 gap-4 mb-8">
                {about.stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`text-center p-4 bg-gray-900/50 rounded-lg border ${
                      stat.color === 'green' 
                        ? 'border-green-500/30 hover:border-green-400' 
                        : 'border-cyan-500/30 hover:border-cyan-400'
                    } transition-colors`}
                  >
                    <div className={`text-3xl font-bold ${
                      stat.color === 'green' ? 'text-green-400' : 'text-cyan-400'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enfoque profesional con animación */}
            <div 
              ref={focusRef}
              className={`reveal-text ${isFocusVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: isFocusVisible ? '0.3s' : '0s' }}
            >
              <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 justify-center md:justify-start">
                  {about.focus.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {about.focus.content}
                </p>
              </div>
            </div>

            {/* Botones de acción con animación */}
            <div 
              ref={buttonsRef}
              className={`reveal-text ${isButtonsVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: isButtonsVisible ? '0.4s' : '0s' }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {about.buttons.map((button, index) => (
                  <button 
                    key={index}
                    onClick={() => handleButtonAction(button.action)}
                    className={`px-6 py-3 text-lg ${
                      button.type === 'primary' 
                        ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-black hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.6)]'
                        : 'border border-green-400 text-green-300 hover:bg-green-400/10'
                    } font-bold rounded-full transition-all duration-300 flex items-center gap-2 justify-center`}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}