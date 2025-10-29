"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from '../contexts/ThemeContext';
import FloatingParticles from "./FloatingParticles";

export default function Testimonials() {
  const [activeTestimonio, setActiveTestimonio] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { content } = useContent();
  const { testimonials } = content;
  const { resolvedTheme } = useTheme();

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isTestimonialVisible, elementRef: testimonialRef } = useScrollAnimation(0.2);
  const { isVisible: isControlsVisible, elementRef: controlsRef } = useScrollAnimation(0.3);

  const totalTestimonials = testimonials.testimonials.length;

  // Auto-avance cada 7 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToTestimonial((activeTestimonio + 1) % totalTestimonials);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [activeTestimonio, isTransitioning, totalTestimonials]);

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === activeTestimonio) return;
    
    setIsTransitioning(true);
    setActiveTestimonio(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const nextTestimonial = () => {
    goToTestimonial((activeTestimonio + 1) % totalTestimonials);
  };

  const prevTestimonial = () => {
    goToTestimonial((activeTestimonio - 1 + totalTestimonials) % totalTestimonials);
  };

  return (
    <section id="testimonios" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative">
      {/* Partículas flotantes */}
      <FloatingParticles />

      <div className="max-w-4xl mx-auto">
        {/* Título con animación */}
        <div 
          ref={titleRef}
          className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent mb-4 sm:mb-6 pb-1 leading-tight">
            {testimonials.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl text-center mb-8 sm:mb-12 px-4">
            {testimonials.description}
          </p>
        </div>

        {/* Testimonio principal MEJORADO PARA MÓVIL */}
        <div 
          ref={testimonialRef}
          className={`reveal-text ${isTestimonialVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isTestimonialVisible ? '0.2s' : '0s' }}
        >
          <div className="relative h-auto min-h-[400px] sm:min-h-[500px]">
            {testimonials.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-600 ease-in-out transform ${
                  index === activeTestimonio
                    ? "opacity-100 translate-y-0 scale-100 z-10"
                    : "opacity-0 translate-y-8 scale-95 -z-10"
                } ${isTransitioning ? 'transitioning' : ''}`}
                style={{
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="bg-gray-50/95 dark:bg-gray-900/50 border border-amber-500/30 rounded-2xl p-4 sm:p-8 md:p-12 backdrop-blur-sm shadow-2xl h-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] mx-2">
                  <div className="text-center mb-4 sm:mb-8">
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-amber-400 shadow-lg transition-transform duration-600 hover:scale-110 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                      />
                    </div>
                    
                    <div className="flex justify-center mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-xl sm:text-2xl transition-all duration-300 hover:scale-110">★</span>
                      ))}
                    </div>
                    
                    {/* Información personal */}
                    <h3 
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 transition-all duration-600"
                      style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-amber-600 dark:text-amber-300 text-base sm:text-lg mb-4 sm:mb-6 transition-all duration-600">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Texto del testimonio MEJORADO PARA MÓVIL */}
                  <div className="relative">
                    <div className="text-amber-400 text-4xl sm:text-6xl absolute -top-4 -left-2 sm:-top-8 sm:-left-4 opacity-20 transition-all duration-600">&quot;</div>
                    
                    {/* Contenedor scrollable para texto largo */}
                    <div className="max-h-[200px] sm:max-h-[250px] overflow-y-auto px-1 sm:px-2">
                      <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-center italic relative z-10 transition-all duration-600">
                        {testimonial.text}
                      </p>
                    </div>
                    
                    <div className="text-amber-400 text-4xl sm:text-6xl absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-4 opacity-20 transition-all duration-600">&quot;</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navegación inferior MEJORADA PARA MÓVIL */}
        <div 
          ref={controlsRef}
          className={`reveal-text ${isControlsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isControlsVisible ? '0.3s' : '0s' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 px-4">
            {/* Botón Anterior */}
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base bg-amber-600 text-white rounded-lg transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center ${
                isTransitioning 
                  ? "opacity-50 cursor-not-allowed scale-95" 
                  : "hover:bg-amber-500 hover:scale-105 active:scale-95 hover:shadow-lg"
              }`}
            >
              ◀ <span className="sm:inline">Anterior</span>
            </button>

            {/* Indicadores */}
            <div className="flex gap-2 order-2 sm:order-none">
              {testimonials.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-out ${
                    index === activeTestimonio
                      ? "bg-amber-400 scale-125 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                      : "bg-amber-600 hover:bg-amber-500 hover:scale-110"
                  } ${isTransitioning ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                />
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={nextTestimonial}
              disabled={isTransitioning}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base bg-amber-600 text-white rounded-lg transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center ${
                isTransitioning 
                  ? "opacity-50 cursor-not-allowed scale-95" 
                  : "hover:bg-amber-500 hover:scale-105 active:scale-95 hover:shadow-lg"
              }`}
            >
              <span className="sm:inline">Siguiente</span> ▶
            </button>
          </div>

          {/* Contador */}
          <div className="text-center mt-4">
            <span className="text-amber-600 dark:text-amber-400 text-sm sm:text-base transition-all duration-300">
              {activeTestimonio + 1} / {testimonials.testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}