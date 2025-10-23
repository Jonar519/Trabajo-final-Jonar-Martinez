"use client";

import { useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export default function Testimonials() {
  const [activeTestimonio, setActiveTestimonio] = useState<number>(0);
  const { content } = useContent();
  const { testimonials } = content;

  return (
    <section id="testimonios" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent mb-6">
          {testimonials.title}
        </h2>
        
        <p className="text-gray-400 text-xl text-center mb-12">
          {testimonials.description}
        </p>

        {/* Testimonio principal centrado */}
        <div className="bg-gray-900/50 border border-amber-500/30 rounded-2xl p-8 sm:p-12 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src={testimonials.testimonials[activeTestimonio].image}
                alt={testimonials.testimonials[activeTestimonio].name}
                width={80}
                height={80}
                className="rounded-full border-2 border-amber-400 shadow-lg"
              />
            </div>
            
            <div className="flex justify-center mb-4">
              {[...Array(testimonials.testimonials[activeTestimonio].rating)].map((_, i) => (
                <span key={i} className="text-amber-400 text-2xl">★</span>
              ))}
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-2">
              {testimonials.testimonials[activeTestimonio].name}
            </h3>
            <p className="text-amber-300 text-lg mb-6">
              {testimonials.testimonials[activeTestimonio].role}
            </p>
          </div>

          <div className="relative">
            <div className="text-amber-400 text-6xl absolute -top-8 -left-4 opacity-20">&quot;</div>
            <p className="text-gray-200 text-xl sm:text-2xl leading-relaxed text-center italic relative z-10">
              {testimonials.testimonials[activeTestimonio].text}
            </p>
            <div className="text-amber-400 text-6xl absolute -bottom-8 -right-4 opacity-20">&quot;</div>
          </div>
        </div>

        {/* Navegación inferior */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setActiveTestimonio(prev => prev === 0 ? testimonials.testimonials.length - 1 : prev - 1)}
            className="px-6 py-3 text-base bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            ◀ Anterior
          </button>

          <div className="flex gap-2">
            {testimonials.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonio(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonio
                    ? "bg-amber-400 scale-125 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                    : "bg-amber-600 hover:bg-amber-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveTestimonio(prev => (prev + 1) % testimonials.testimonials.length)}
            className="px-6 py-3 text-base bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Siguiente ▶
          </button>
        </div>

        {/* Contador */}
        <div className="text-center mt-6">
          <span className="text-amber-400 text-base">
            {activeTestimonio + 1} / {testimonials.testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
}