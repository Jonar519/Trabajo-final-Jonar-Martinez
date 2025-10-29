"use client";

import { useState, useEffect } from "react";

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    delay: string;
    duration: string;
    size: string;
    opacity: string;
  }>>([]);

  useEffect(() => {
    const newParticles = [...Array(35)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${15 + Math.random() * 15}s`,
      size: `${1 + Math.random() * 2}px`,
      opacity: `${0.1 + Math.random() * 0.3}`
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400 animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
      
      {/* Estrellas grandes ocasionales */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
            width: '3px',
            height: '3px',
            opacity: 0.6,
            animationDelay: `${i * 2}s`,
            animationDuration: '3s'
          }}
        />
      ))}

      {/* Partículas adicionales para móvil */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`mobile-particle-${i}`}
          className="absolute rounded-full bg-cyan-300 animate-float md:hidden"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '1px',
            height: '1px',
            opacity: 0.2 + Math.random() * 0.3,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
}