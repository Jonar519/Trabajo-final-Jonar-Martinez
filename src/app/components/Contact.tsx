"use client";

import { useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import emailjs from '@emailjs/browser';

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

  // Configuración de EmailJS - REEMPLAZA CON TUS DATOS REALES
  const EMAILJS_CONFIG = {
    SERVICE_ID: "protafolio_contact", // Reemplaza con tu Service ID
    TEMPLATE_ID: "template_pxdnma8", // Reemplaza con tu Template ID  
    PUBLIC_KEY: "uaHGTHHYmu3i2Q4Ny" // Reemplaza con tu Public Key
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validación básica
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Por favor completa todos los campos");
      }

      // Enviar email usando EmailJS
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

      // Éxito
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Resetear mensaje después de 5 segundos
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
    <section id="contacto" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-4">
        {contact.title}
      </h2>
      <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
        {contact.description}
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Columna Izquierda - Información de Contacto */}
        <div className="md:col-span-1 bg-gray-900/80 border border-indigo-500 rounded-xl p-6 shadow-[0_0_25px_rgba(99,102,241,0.3)] backdrop-blur-sm">
          <div className="text-center mb-6">
            <Image
              src="/perfil.jpeg"
              alt="Foto de perfil"
              width={120}
              height={120}
              className="rounded-full border-4 border-indigo-400 mx-auto mb-4 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            />
            <h3 className="text-xl font-bold text-white">{content.site.author}</h3>
            <p className="text-indigo-300 text-lg">{cv.position}</p>
          </div>

          <div className="space-y-6">
            {/* Contacto */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">📧</span> {cv.sections.contact}
              </h4>
              <p className="text-gray-300 text-base mb-2">{content.site.email}</p>
              <p className="text-gray-300 text-base mb-2">{content.site.phone}</p>
              <p className="text-gray-300 text-base">{content.site.location}</p>
            </div>

            {/* Redes Sociales */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">🌐</span> {cv.sections.socialNetworks}
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
                      <img 
                        src={social.icon} 
                        alt={social.name}
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

            {/* Idiomas */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">🗣️</span> {cv.sections.languages}
              </h4>
              {cv.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-300 text-base font-medium">{lang.language}</p>
                  <p className="text-cyan-400 text-sm">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha - Formulario de Contacto */}
        <div className="md:col-span-2">
          <div className="bg-gray-900/50 border-2 border-pink-500 rounded-2xl p-8 shadow-[0_0_40px_rgba(236,72,153,0.3)] backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
              <span className="text-pink-400">📧</span> {contact.formTitle}
            </h3>

            {/* Mensaje de éxito */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center text-base">
                {contact.successMessage}
              </div>
            )}

            {/* Mensaje de error */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center text-base">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white text-base font-medium mb-2">
                    {contact.fields.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white transition-all duration-300 text-base"
                    placeholder={contact.placeholders.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-base font-medium mb-2">
                    {contact.fields.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white transition-all duration-300 text-base"
                    placeholder={contact.placeholders.email}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white text-base font-medium mb-2">
                  {contact.fields.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white transition-all duration-300 text-base"
                  placeholder={contact.placeholders.subject}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white text-base font-medium mb-2">
                  {contact.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white resize-none transition-all duration-300 text-base"
                  placeholder={contact.placeholders.message}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2"
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
    </section>
  );
}