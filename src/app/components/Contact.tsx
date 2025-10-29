"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import emailjs from '@emailjs/browser';
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from '../contexts/ThemeContext';
import FloatingParticles from "./FloatingParticles";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { content } = useContent();
  const { contact, socialNetworks, cv } = content;
  const { resolvedTheme } = useTheme();

  const { isVisible: isTitleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: isContentVisible, elementRef: contentRef } = useScrollAnimation(0.2);
  const { isVisible: isFormVisible, elementRef: formRef } = useScrollAnimation(0.3);

  const EMAILJS_CONFIG = {
    SERVICE_ID: "protafolio_contact",
    TEMPLATE_ID: "template_pxdnma8",  
    PUBLIC_KEY: "uaHGTHHYmu3i2Q4Ny"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Por favor completa todos los campos");
      }

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "jonarmartinez519@gmail.com"
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email enviado:', result);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (error) {
      console.error('Error enviando email:', error);
      setIsSubmitting(false);
      setError(
        error instanceof Error 
          ? error.message 
          : "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
      );
    }
  };

  return (
    <section id="contacto" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden">
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Título con animación - CORREGIDO */}
      <div 
        ref={titleRef}
        className={`reveal-text ${isTitleVisible ? 'revealed' : ''}`}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-4 pb-1 leading-tight relative z-10">
          {contact.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto relative z-10">
          {contact.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Contenido principal con animación */}
        <div 
          ref={contentRef}
          className={`reveal-text ${isContentVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: isContentVisible ? '0.2s' : '0s' }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna Izquierda - Información de Contacto */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-900 border-2 border-indigo-400 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="text-center mb-6">
                <Image
                  src="/perfil.jpeg"
                  alt="Foto de perfil"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-500 mx-auto mb-4 shadow-lg"
                />
                {/* NOMBRE CORREGIDO - CONDICIONAL */}
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                >
                  {content.site.author}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold">{cv.position}</p>
              </div>

              <div className="space-y-6">
                {/* Contacto - TÍTULO CORREGIDO - CONDICIONAL */}
                <div>
                  <h4 
                    className="text-xl font-semibold mb-3 flex items-center gap-2"
                    style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                  >
                    <span className="text-cyan-600">📧</span> {cv.sections.contact}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-base mb-2 font-medium">{content.site.email}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-base mb-2 font-medium">{content.site.phone}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-base font-medium">{content.site.location}</p>
                </div>

                {/* Redes Sociales - TÍTULO CORREGIDO - CONDICIONAL */}
                <div>
                  <h4 
                    className="text-xl font-semibold mb-3 flex items-center gap-2"
                    style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                  >
                    <span className="text-cyan-600">🌐</span> {cv.sections.socialNetworks}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {socialNetworks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center p-3 rounded-lg ${social.bgColor} ${social.borderColor} border-2 ${social.glowColor} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      >
                        <div className="w-8 h-8 mb-2 flex items-center justify-center">
                          <Image 
                            src={social.icon} 
                            alt={social.name}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="text-sm text-center text-white font-medium">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Idiomas - TÍTULO CORREGIDO - CONDICIONAL */}
                <div>
                  <h4 
                    className="text-xl font-semibold mb-3 flex items-center gap-2"
                    style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                  >
                    <span className="text-cyan-600">🗣️</span> {cv.sections.languages}
                  </h4>
                  {cv.languages.map((lang, index) => (
                    <div key={index} className="mb-3">
                      <p className="text-gray-700 dark:text-gray-300 text-base font-semibold">{lang.language}</p>
                      <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha - Formulario de Contacto */}
            <div className="lg:col-span-2">
              <div 
                ref={formRef}
                className={`reveal-text ${isFormVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: isFormVisible ? '0.3s' : '0s' }}
              >
                <div className="bg-white dark:bg-gray-900 border-2 border-pink-500 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
                  {/* TÍTULO DEL FORMULARIO CORREGIDO - CONDICIONAL */}
                  <h3 
                    className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3 justify-center"
                    style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                  >
                    <span className="text-pink-500">📧</span> {contact.formTitle}
                  </h3>

                  {/* Mensaje de éxito */}
                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-100 dark:bg-green-500/20 border border-green-500 rounded-lg text-green-700 dark:text-green-400 text-center text-base font-medium">
                      {contact.successMessage}
                    </div>
                  )}

                  {/* Mensaje de error */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-500/20 border border-red-500 rounded-lg text-red-700 dark:text-red-400 text-center text-base font-medium">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        {/* LABEL NOMBRE CORREGIDO - CONDICIONAL */}
                        <label 
                          htmlFor="name" 
                          className="block text-base font-semibold mb-2"
                          style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                        >
                          {contact.fields.name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-gray-900 dark:text-white transition-all duration-300 text-base font-medium"
                          placeholder={contact.placeholders.name}
                        />
                      </div>
                      <div>
                        {/* LABEL CORREO CORREGIDO - CONDICIONAL */}
                        <label 
                          htmlFor="email" 
                          className="block text-base font-semibold mb-2"
                          style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                        >
                          {contact.fields.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-gray-900 dark:text-white transition-all duration-300 text-base font-medium"
                          placeholder={contact.placeholders.email}
                        />
                      </div>
                    </div>

                    <div>
                      {/* LABEL ASUNTO CORREGIDO - CONDICIONAL */}
                      <label 
                        htmlFor="subject" 
                        className="block text-base font-semibold mb-2"
                        style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                      >
                        {contact.fields.subject}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-gray-900 dark:text-white transition-all duration-300 text-base font-medium"
                        placeholder={contact.placeholders.subject}
                      />
                    </div>

                    <div>
                      {/* LABEL MENSAJE CORREGIDO - CONDICIONAL */}
                      <label 
                        htmlFor="message" 
                        className="block text-base font-semibold mb-2"
                        style={{ color: resolvedTheme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }}
                      >
                        {contact.fields.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-gray-900 dark:text-white resize-none transition-all duration-300 text-base font-medium"
                        placeholder={contact.placeholders.message}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {contact.submittingText}
                        </>
                      ) : (
                        <>
                          <span>🚀</span> {contact.submitButton}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}