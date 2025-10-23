"use client";

import { useLanguage } from './useLanguage';
import contentES from '@/data/content.json';
import contentEN from '@/data/content-en.json';

// Definir tipos para el contenido
export interface Site {
  title: string;
  author: string;
  description: string;
  email: string;
  phone: string;
  location: string;
}

export interface Navigation {
  sections: string[];
}

export interface Hero {
  title: string;
  description: string;
  status: string;
  projectsCompleted: string;
  ctaButton: string;
}

export interface About {
  title: string;
  content: string;
  stats: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  focus: {
    title: string;
    content: string;
  };
  buttons: Array<{
    text: string;
    action: string;
    type: string;
  }>;
}

export interface CV {
  title: string;
  position: string;
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  languages: Array<{
    language: string;
    level: string;
  }>;
  downloadButton: string;
  sections: {
    technicalSkills: string;
    contact: string;
    socialNetworks: string;
    education: string;
    languages: string;
  };
}

export interface Experience {
  title: string;
  experiences: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
  }>;
  navigation: {
    previous: string;
    next: string;
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
  category: string;
}

export interface Projects {
  title: string;
  description: string;
  projects: Project[];
  buttons: {
    viewDemo: string;
    repository: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

export interface Testimonials {
  title: string;
  description: string;
  testimonials: Testimonial[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  level: string;
  status: string;
  category: string;
  date: string;
}

export interface Achievements {
  title: string;
  description: string;
  achievements: Achievement[];
  summary: {
    total: string;
    completed: string;
    labels: {
      totalAchievements: string;
      completed: string;
      status: string;
    };
  };
}

export interface Contact {
  title: string;
  description: string;
  formTitle: string;
  successMessage: string;
  fields: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  submitButton: string;
  submittingText: string;
  directContact: string;
}

export interface SocialNetwork {
  name: string;
  url: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

export interface Footer {
  copyright: string;
  developedWith: string;
}

export interface Content {
  site: Site;
  navigation: Navigation;
  hero: Hero;
  about: About;
  cv: CV;
  experience: Experience;
  projects: Projects;
  testimonials: Testimonials;
  achievements: Achievements;
  contact: Contact;
  socialNetworks: SocialNetwork[];
  footer: Footer;
}

export const useContent = () => {
  const { language } = useLanguage();
  
  const content = (language === 'es' ? contentES : contentEN) as Content;

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleButtonAction = (action: string) => {
    const sectionMap: { [key: string]: string } = {
      // Español
      'proyectos': 'proyectos',
      'contacto': 'contacto',
      'cv': 'cv',
      'inicio': 'inicio',
      'testimonios': 'testimonios',
      'extra': 'extra',
      'acerca': 'acerca',
      'experiencia': 'experiencia',
      // Inglés
      'projects': 'proyectos',
      'contact': 'contacto', 
      'home': 'inicio',
      'testimonials': 'testimonios',
      'about': 'acerca',
      'experience': 'experiencia'
    };

    const sectionId = sectionMap[action];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  // Función para obtener el ID de sección basado en el nombre y idioma
  const getSectionId = (sectionName: string): string => {
    const sectionMap: { [key: string]: string } = {
      // Mapeo de nombres de sección a IDs
      'INICIO': 'inicio',
      'HOME': 'inicio',
      'ACERCA': 'acerca', 
      'ABOUT': 'acerca',
      'HABILIDADES': 'cv',
      'SKILLS': 'cv',
      'EXPERIENCIA': 'experiencia',
      'EXPERIENCE': 'experiencia',
      'PROYECTOS': 'proyectos',
      'PROJECTS': 'proyectos',
      'TESTIMONIOS': 'testimonios',
      'TESTIMONIALS': 'testimonios',
      'EXTRA': 'extra',
      'CONTACTO': 'contacto',
      'CONTACT': 'contacto'
    };
    
    return sectionMap[sectionName] || sectionName.toLowerCase();
  };

  const getLevelColor = (level: string) => {
    const levelMap: { [key: string]: string } = {
      // Español
      "Legendario": "from-yellow-400 to-orange-500",
      "Épico": "from-purple-500 to-pink-500", 
      "Raro": "from-blue-500 to-cyan-500",
      "Común": "from-green-500 to-emerald-500",
      // Inglés
      "Legendary": "from-yellow-400 to-orange-500",
      "Epic": "from-purple-500 to-pink-500",
      "Rare": "from-blue-500 to-cyan-500", 
      "Common": "from-green-500 to-emerald-500",
      // Niveles de habilidades
      "Experto": "from-green-400 to-emerald-500",
      "Expert": "from-green-400 to-emerald-500",
      "Avanzado": "from-blue-400 to-cyan-500",
      "Advanced": "from-blue-400 to-cyan-500",
      "Intermedio": "from-yellow-400 to-amber-500",
      "Intermediate": "from-yellow-400 to-amber-500",
      "Básico": "from-gray-400 to-gray-600",
      "Basic": "from-gray-400 to-gray-600"
    };
    return levelMap[level] || "from-gray-500 to-gray-700";
  };

  return {
    content,
    scrollToSection, 
    handleButtonAction,
    getLevelColor,
    getSectionId
  };
};