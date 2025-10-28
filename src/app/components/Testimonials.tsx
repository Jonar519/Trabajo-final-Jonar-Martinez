"use client";

import { useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Testimonials() {
  const [activeTestimonio, setActiveTestimonio] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { content } = useContent();
  const { testimonials } = content;

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isTestimonialVisible, elementRef: testimonialRef } = useScrollAnimation(0.2);
  const { isVisible: isControlsVisible, elementRef: controlsRef } = useScrollAnimation(0.3);

  const changeTestimonial = (index: number) => {
    if (isTransitioning || index === activeTestimonio) return;
    
    setIsTransitioning(true);
    setActiveTestimonio(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextTestimonial = () => {
    if (isTransitioning) return;
    const nextIndex = (activeTestimonio + 1) % testimonials.testimonials.length;
    changeTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    const prevIndex = (activeTestimonio - 1 + testimonials.testimonials.length) % testimonials.testimonials.length;
    changeTestimonial(prevIndex);
  };

  return (
    <section id="testimonios" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Título con animación */}
        <div 
          ref={titleRef}
          className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent mb-6">
            {testimonials.title}
          </h2>
          
          <p className="text-gray-400 text-xl text-center mb-12">
            {testimonials.description}
          </p>
        </div>

        {/* Testimonio principal con animación y transición suave */}
        <div 
          ref={testimonialRef}
          className={`reveal-text ${isTestimonialVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isTestimonialVisible ? '0.2s' : '0s' }}
        >
          <div className="bg-gray-900/50 border border-amber-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl transition-all duration-500">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Image
                  src={testimonials.testimonials[activeTestimonio].image}
                  alt={testimonials.testimonials[activeTestimonio].name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-amber-400 shadow-lg transition-all duration-500"
                />
              </div>
              
              <div className="flex justify-center mb-3">
                {[...Array(testimonials.testimonials[activeTestimonio].rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 transition-all duration-500">
                {testimonials.testimonials[activeTestimonio].name}
              </h3>
              <p className="text-amber-300 text-base sm:text-lg mb-4 transition-all duration-500">
                {testimonials.testimonials[activeTestimonio].role}
              </p>
            </div>

            <div className="relative">
              <div className="text-amber-400 text-4xl sm:text-6xl absolute -top-4 -left-2 sm:-top-8 sm:-left-4 opacity-20 transition-all duration-500">&quot;</div>
              <p className="text-gray-200 text-lg sm:text-xl leading-relaxed text-center italic relative z-10 transition-all duration-500 min-h-[120px] flex items-center justify-center">
                {testimonials.testimonials[activeTestimonio].text}
              </p>
              <div className="text-amber-400 text-4xl sm:text-6xl absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-4 opacity-20 transition-all duration-500">&quot;</div>
            </div>
          </div>
        </div>

        {/* Navegación inferior con animación */}
        <div 
          ref={controlsRef}
          className={`reveal-text ${isControlsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isControlsVisible ? '0.3s' : '0s' }}
        >
          <div className="flex justify-between items-center mt-6 sm:mt-8">
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              ◀ <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex gap-1 sm:gap-2">
              {testimonials.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeTestimonial(index)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonio
                      ? "bg-amber-400 scale-125 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                      : "bg-amber-600 hover:bg-amber-500"
                  } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              disabled={isTransitioning}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              <span className="hidden sm:inline">Siguiente</span> ▶
            </button>
          </div>

          {/* Contador */}
          <div className="text-center mt-4">
            <span className="text-amber-400 text-sm sm:text-base">
              {activeTestimonio + 1} / {testimonials.testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}