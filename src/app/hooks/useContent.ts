"use client";

import content from '@/data/content.json';

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
    level: number;
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
  testimonials: Testimonial[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  level: string;
  progress: number;
  category: string;
  date: string;
}

export interface Achievements {
  title: string;
  description: string;
  achievements: Achievement[];
  summary: {
    total: string;
    committed: string;
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
  iconColor: string;
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

// En useContent.ts, actualiza la interfaz Testimonials:
export interface Testimonials {
  title: string;
  description: string; // ← Agregar esta línea
  testimonials: Testimonial[];
}

export const useContent = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleButtonAction = (action: string) => {
    if (action === 'proyectos') {
      scrollToSection('proyectos');
    } else if (action === 'contacto') {
      scrollToSection('contacto');
    } else if (action === 'cv') {
      scrollToSection('cv');
    } else if (action === 'inicio') {
      scrollToSection('inicio');
    } else if (action === 'testimonios') {
      scrollToSection('testimonios');
    } else if (action === 'extra') {
      scrollToSection('extra');
    } else if (action === 'acerca') {
      scrollToSection('acerca');
    } else if (action === 'experiencia') {
      scrollToSection('experiencia');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Legendario": return "from-yellow-400 to-orange-500";
      case "Épico": return "from-purple-500 to-pink-500";
      case "Raro": return "from-blue-500 to-cyan-500";
      case "Común": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-700";
    }
  };

  return {
    content: content as Content,
    scrollToSection,
    handleButtonAction,
    getLevelColor
  };
};