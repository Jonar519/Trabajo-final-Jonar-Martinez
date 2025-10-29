"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Si no hay tema guardado, usar sistema por defecto
      setTheme('system');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Determinar el tema resuelto
    let currentResolvedTheme: 'dark' | 'light' = 'dark';
    
    if (theme === 'system') {
      currentResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      currentResolvedTheme = theme;
    }

    setResolvedTheme(currentResolvedTheme);

    // Aplicar clases al documento
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(currentResolvedTheme);

    // Forzar repaint en móvil para evitar áreas blancas
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    }

    // Guardar en localStorage
    localStorage.setItem('portfolio-theme', theme);
  }, [theme, mounted]);

  // Escuchar cambios en las preferencias del sistema
  useEffect(() => {
    if (theme !== 'system' || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);
      
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newResolvedTheme);

      // Forzar repaint en móvil
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}