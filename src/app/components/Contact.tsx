"use client";

import { useState } from "react";
import { useContent } from "@/hooks/useContent";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { content } = useContent();
  const { contact, socialNetworks } = content;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío (reemplazar con tu servicio de email)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Resetear mensaje después de 5 segundos
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-4">
        {contact.title}
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        {contact.description}
      </p>

      <div className="max-w-2xl mx-auto">
        {/* Formulario */}
        <div className="bg-gray-900/50 border-2 border-pink-500 rounded-2xl p-8 shadow-[0_0_40px_rgba(236,72,153,0.3)] backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
            {contact.formTitle}
          </h3>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
              {contact.successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                  {contact.fields.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white transition-all duration-300"
                  placeholder={contact.placeholders.name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  {contact.fields.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white transition-all duration-300"
                  placeholder={contact.placeholders.email}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">
                {contact.fields.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white transition-all duration-300"
                placeholder={contact.placeholders.subject}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                {contact.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white resize-none transition-all duration-300"
                placeholder={contact.placeholders.message}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {contact.submittingText}
                </>
              ) : (
                <>
                  {contact.submitButton}
                </>
              )}
            </button>
          </form>

          {/* Información de contacto rápida */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">
                {contact.directContact}
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href={`mailto:${content.site.email}`}
                  className="text-pink-400 hover:text-pink-300 transition-colors text-sm flex items-center gap-2"
                >
                  <span>📧</span> Email
                </a>
                <a
                  href={socialNetworks.find(s => s.name === "LinkedIn")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors text-sm flex items-center gap-2"
                >
                  <span>💼</span> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}