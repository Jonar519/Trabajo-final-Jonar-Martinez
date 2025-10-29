"use client";

import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 rounded-full p-1 border border-gray-300 dark:border-gray-600 backdrop-blur-sm">
      {/* Modo Light */}
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'light' 
            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' 
            : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30'
        }`}
        title="Modo Claro"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>

      {/* Modo Sistema */}
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'system' 
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
        }`}
        title="Modo Sistema"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Modo Dark */}
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
            : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30'
        }`}
        title="Modo Oscuro"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  );
}