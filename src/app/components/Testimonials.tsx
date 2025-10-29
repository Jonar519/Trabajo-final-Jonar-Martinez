"use client";

import { useState } from "react";
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

  const nextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTestimonio((prev) => (prev + 1) % totalTestimonials);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTestimonio((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === activeTestimonio) return;
    
    setIsTransitioning(true);
    setActiveTestimonio(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <section id="testimonios" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative">
      {/* Partículas flotantes */}
      <FloatingParticles />

      <div className="max-w-4xl mx-auto">
        {/* Título con animación - CORREGIDO */}
        <div 
          ref={titleRef}
          className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent mb-6 pb-1 leading-tight">
            {testimonials.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-xl text-center mb-12">
            {testimonials.description}
          </p>
        </div>

        {/* Testimonio principal con transición suave */}
        <div 
          ref={testimonialRef}
          className={`reveal-text ${isTestimonialVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isTestimonialVisible ? '0.2s' : '0s' }}
        >
          <div className="relative h-[500px]">
            {testimonials.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-600 ease-out ${
                  index === activeTestimonio
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95 pointer-events-none"
                }`}
              >
                <div className="bg-gray-50/95 dark:bg-gray-900/50 border border-amber-500/30 rounded-2xl p-8 sm:p-12 backdrop-blur-sm shadow-2xl h-full">
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-amber-400 shadow-lg transition-transform duration-600"
                      />
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-2xl">★</span>
                      ))}
                    </div>
                    
                    {/* NOMBRE CORREGIDO - CONDICIONAL PARA MODO CLARO/OSCURO */}
                    <h3 
                      className="text-3xl font-bold mb-2 transition-all duration-600"
                      style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-amber-600 dark:text-amber-300 text-lg mb-6 transition-all duration-600">
                      {testimonial.role}
                    </p>
                  </div>

                  <div className="relative">
                    <div className="text-amber-400 text-6xl absolute -top-8 -left-4 opacity-20 transition-all duration-600">&quot;</div>
                    <p className="text-gray-800 dark:text-gray-200 text-xl sm:text-2xl leading-relaxed text-center italic relative z-10 transition-all duration-600">
                      {testimonial.text}
                    </p>
                    <div className="text-amber-400 text-6xl absolute -bottom-8 -right-4 opacity-20 transition-all duration-600">&quot;</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navegación inferior con animación */}
        <div 
          ref={controlsRef}
          className={`reveal-text ${isControlsVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isControlsVisible ? '0.3s' : '0s' }}
        >
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className={`px-6 py-3 text-base bg-amber-600 text-white rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isTransitioning 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-amber-500 hover:scale-105"
              }`}
            >
              ◀ Anterior
            </button>

            <div className="flex gap-2">
              {testimonials.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
              className={`px-6 py-3 text-base bg-amber-600 text-white rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isTransitioning 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-amber-500 hover:scale-105"
              }`}
            >
              Siguiente ▶
            </button>
          </div>

          {/* Contador */}
          <div className="text-center mt-6">
            <span className="text-amber-600 dark:text-amber-400 text-base">
              {activeTestimonio + 1} / {testimonials.testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}