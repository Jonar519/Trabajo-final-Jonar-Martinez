"use client";

import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-800/80 rounded-full p-1 border border-gray-600 backdrop-blur-sm">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'es' 
            ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg shadow-green-500/25' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en' 
            ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg shadow-green-500/25' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        EN
      </button>
    </div>
  );
}