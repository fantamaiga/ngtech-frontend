'use client';

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Globe, MessageCircle, Camera, Play, ArrowUp, Heart, Shield, Code, Smartphone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { contactService } from '@/services/contactService';
import { ContactFormData, ContactState } from '@/types';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectDescription: string;
  budget: string;
  timeline: string;
}

const ContactSection: React.FC = () => {
  const [state, setState] = useState<ContactState>(contactService.initializeState());

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    projectDescription: '',
    budget: '',
    timeline: ''
  });

  const services = [
    'Développement Mobile',
    'Développement Fullstack',
    'Cyber-Audit & Sécurité',
    'Consulting Technique',
    'Formation Équipe',
    'Autre'
  ];

  const budgets = [
    'Moins de 5.000€',
    '5.000€ - 15.000€',
    '15.000€ - 50.000€',
    '50.000€ - 100.000€',
    'Plus de 100.000€'
  ];

  const timelines = [
    'Urgent (1-2 mois)',
    'Court (3-6 mois)',
    'Moyen (6-12 mois)',
    'Long (+12 mois)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(contactService.setLoading(true));

    try {
      // Envoyer les données vers le backend NestJS
      await contactService.submitContact(formData);
      
      // Succès
      setState(contactService.setSuccess());
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        projectDescription: '',
        budget: '',
        timeline: ''
      });
    } catch (error) {
      setState(contactService.setError(error instanceof Error ? error.message : 'Erreur lors de l\'envoi'));
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFFFFF] via-[#F0F9FF] to-[#F8FDFF]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#00B4D8] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#0077A8] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#023E8A] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00B4D8]/10 to-[#0077A8]/10 border border-[#00B4D8]/20 px-5 py-2.5 rounded-full mb-6">
            <Send className="w-5 h-5 text-[#00B4D8]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#0A0A0A]">Contact & Devis</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-[#0A0A0A]">Démarrons</span>
            <span className="block bg-gradient-to-r from-[#00B4D8] via-[#0077A8] to-[#023E8A] text-transparent bg-clip-text">Ensemble</span>
          </h2>
          <p className="text-xl text-[#4A5568] max-w-4xl mx-auto leading-relaxed font-medium">
            Parlons de votre projet. Notre équipe d'experts vous accompagne 
            <span className="block mt-2 text-[#718096]">de la conception à la réalisation pour un impact maximal.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#0A0A0A] mb-8 bg-gradient-to-r from-[#00B4D8] to-[#0077A8] text-transparent bg-clip-text">Contactez-nous</h3>
              <div className="space-y-6">
                <div className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#00B4D8]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00B4D8] to-[#0077A8] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-[#0A0A0A] font-bold text-lg">Téléphone</div>
                      <div className="text-[#4A5568] font-medium">+224 622 123 456</div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#0077A8]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#0077A8]/10 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0077A8] to-[#023E8A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-[#0A0A0A] font-bold text-lg">Email</div>
                      <div className="text-[#4A5568] font-medium">contact@ngtech.com</div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#023E8A]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#023E8A]/10 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#023E8A] to-[#00B4D8] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-[#0A0A0A] font-bold text-lg">Adresse</div>
                      <div className="text-[#4A5568] font-medium">Minière,Conakry, Guinée</div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#F59E0B]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#F59E0B]/10 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-[#0A0A0A] font-bold text-lg">Disponibilité</div>
                      <div className="text-[#4A5568] font-medium">Lun-Ven: 8h-17h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#E2E8F0] hover:border-[#00B4D8]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:-translate-y-1">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-[#00B4D8] to-[#0077A8] text-transparent bg-clip-text mb-4">Réponse rapide</h4>
              <p className="text-[#4A5568] text-lg mb-6 font-medium">
                Nous nous engageons à vous répondre dans les 24 heures ouvrées.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[#F0F9FF] px-4 py-3 rounded-xl border border-[#00B4D8]/20">
                  <CheckCircle className="w-5 h-5 text-[#10B981]" />
                  <span className="text-[#0A0A0A] font-medium">Devis gratuit</span>
                </div>
                <div className="flex items-center gap-3 bg-[#F0F9FF] px-4 py-3 rounded-xl border border-[#00B4D8]/20">
                  <CheckCircle className="w-5 h-5 text-[#10B981]" />
                  <span className="text-[#0A0A0A] font-medium">Sans engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-[#E2E8F0] p-8 hover:border-[#00B4D8]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#00B4D8]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] placeholder-[#718096] focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-all duration-300 font-medium"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] placeholder-[#718096] focus:outline-none focus:border-[#0077A8] focus:bg-white transition-all duration-300 font-medium"
                    placeholder="jean@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] placeholder-[#718096] focus:outline-none focus:border-[#023E8A] focus:bg-white transition-all duration-300 font-medium"
                    placeholder="Votre entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] placeholder-[#718096] focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-all duration-300 font-medium"
                    placeholder="+224 622 123 456"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="service" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                  Service souhaité *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] focus:outline-none focus:border-[#0077A8] focus:bg-white transition-all duration-300 font-medium"
                >
                  <option value="">Sélectionnez un service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="projectDescription" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                  Description du projet *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] placeholder-[#718096] focus:outline-none focus:border-[#023E8A] focus:bg-white transition-all duration-300 resize-none font-medium"
                  placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="budget" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                    Budget estimé
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-all duration-300 font-medium"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    {budgets.map(budget => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-[#0A0A0A] font-bold mb-3 text-lg">
                    Délai souhaité
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl text-[#0A0A0A] focus:outline-none focus:border-[#0077A8] focus:bg-white transition-all duration-300 font-medium"
                  >
                    <option value="">Sélectionnez un délai</option>
                    {timelines.map(timeline => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Messages */}
              {state.isSubmitted && (
                <div className="mb-6 p-6 bg-[#F0F9FF] border-2 border-[#10B981]/30 rounded-xl flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-[#10B981]" />
                  <div>
                    <div className="text-[#10B981] font-bold text-lg">Message envoyé avec succès !</div>
                    <div className="text-[#4A5568]">Nous vous répondrons dans les 24 heures.</div>
                  </div>
                </div>
              )}

              {state.error && (
                <div className="mb-6 p-6 bg-[#FEF2F2] border-2 border-[#EF4444]/30 rounded-xl flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-[#EF4444]" />
                  <div>
                    <div className="text-[#EF4444] font-bold text-lg">Erreur lors de l'envoi</div>
                    <div className="text-[#4A5568]">{state.error}</div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.isLoading}
                className="w-full bg-gradient-to-r from-[#00B4D8] to-[#0077A8] hover:from-[#0077A8] hover:to-[#023E8A] disabled:from-[#9CA3AF] disabled:to-[#6B7280] disabled:cursor-not-allowed text-white font-bold px-8 py-5 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 text-lg hover:scale-105 shadow-lg shadow-[#00B4D8]/20 hover:shadow-xl hover:shadow-[#00B4D8]/30"
              >
                {state.isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
