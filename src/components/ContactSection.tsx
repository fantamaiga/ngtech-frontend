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
    <section className="py-20 bg-gradient-to-br from-primary-900 via-cyan-900 to-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text mb-4">
            <Send className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">Contact & Devis</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white drop-shadow-2xl">Démarrons</span>
            <span className="block bg-gradient-to-r from-primary-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text drop-shadow-2xl">Ensemble</span>
          </h2>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed font-medium">
            Parlons de votre projet. Notre équipe d'experts vous accompagne 
            <span className="block mt-2 text-primary-200">de la conception à la réalisation pour un impact maximal.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text">Contactez-nous</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Téléphone</div>
                      <div className="text-primary-200 font-medium">+224 622 123 456</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Email</div>
                      <div className="text-cyan-200 font-medium">contact@ngtech.com</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-600/20 to-primary-600/20 backdrop-blur-lg rounded-2xl p-6 border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-primary-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Adresse</div>
                      <div className="text-teal-200 font-medium">Conakry, Guinée</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Disponibilité</div>
                      <div className="text-yellow-200 font-medium">Lun-Ven: 9h-18h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-r from-primary-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text mb-4">Réponse rapide</h4>
              <p className="text-primary-100 text-lg mb-6 font-medium">
                Nous nous engageons à vous répondre dans les 24 heures ouvrées.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 px-4 py-3 rounded-xl border border-green-400/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-200 font-medium">Devis gratuit</span>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-4 py-3 rounded-xl border border-blue-400/30">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-200 font-medium">Sans engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-primary-800/30 to-cyan-800/30 backdrop-blur-lg rounded-2xl border-2 border-primary-400/30 p-8 hover:border-primary-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/25">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white font-bold mb-3 text-lg">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-gradient-to-r from-primary-700/30 to-cyan-700/30 border border-primary-400/30 rounded-xl text-white placeholder-primary-300 focus:outline-none focus:border-primary-400 focus:bg-gradient-to-r focus:from-primary-600/40 focus:to-cyan-600/40 transition-all duration-300 font-medium"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-bold mb-3 text-lg">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-gradient-to-r from-cyan-700/30 to-teal-700/30 border border-cyan-400/30 rounded-xl text-white placeholder-cyan-300 focus:outline-none focus:border-cyan-400 focus:bg-gradient-to-r focus:from-cyan-600/40 focus:to-teal-600/40 transition-all duration-300 font-medium"
                    placeholder="jean@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-white font-bold mb-3 text-lg">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-teal-700/30 to-primary-700/30 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:border-teal-400 focus:bg-gradient-to-r focus:from-teal-600/40 focus:to-primary-600/40 transition-all duration-300 font-medium"
                    placeholder="Votre entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-bold mb-3 text-lg">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-primary-700/30 to-cyan-700/30 border border-primary-400/30 rounded-xl text-white placeholder-primary-300 focus:outline-none focus:border-primary-400 focus:bg-gradient-to-r focus:from-primary-600/40 focus:to-cyan-600/40 transition-all duration-300 font-medium"
                    placeholder="+224 622 123 456"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="service" className="block text-white font-bold mb-3 text-lg">
                  Service souhaité *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gradient-to-r from-cyan-700/30 to-teal-700/30 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-gradient-to-r focus:from-cyan-600/40 focus:to-teal-600/40 transition-all duration-300 font-medium"
                >
                  <option value="" className="bg-cyan-800">Sélectionnez un service</option>
                  {services.map(service => (
                    <option key={service} value={service} className="bg-cyan-800">{service}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="projectDescription" className="block text-white font-bold mb-3 text-lg">
                  Description du projet *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-gradient-to-r from-teal-700/30 to-primary-700/30 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:border-teal-400 focus:bg-gradient-to-r focus:from-teal-600/40 focus:to-primary-600/40 transition-all duration-300 resize-none font-medium"
                  placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="budget" className="block text-white font-bold mb-3 text-lg">
                    Budget estimé
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-primary-700/30 to-cyan-700/30 border border-primary-400/30 rounded-xl text-white focus:outline-none focus:border-primary-400 focus:bg-gradient-to-r focus:from-primary-600/40 focus:to-cyan-600/40 transition-all duration-300 font-medium"
                  >
                    <option value="" className="bg-primary-800">Sélectionnez une fourchette</option>
                    {budgets.map(budget => (
                      <option key={budget} value={budget} className="bg-primary-800">{budget}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-white font-bold mb-3 text-lg">
                    Délai souhaité
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-cyan-700/30 to-teal-700/30 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-gradient-to-r focus:from-cyan-600/40 focus:to-teal-600/40 transition-all duration-300 font-medium"
                  >
                    <option value="" className="bg-cyan-800">Sélectionnez un délai</option>
                    {timelines.map(timeline => (
                      <option key={timeline} value={timeline} className="bg-cyan-800">{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Messages */}
              {state.isSubmitted && (
                <div className="mb-6 p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-400/30 rounded-xl flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-green-400 font-bold text-lg">Message envoyé avec succès !</div>
                    <div className="text-green-200">Nous vous répondrons dans les 24 heures.</div>
                  </div>
                </div>
              )}

              {state.error && (
                <div className="mb-6 p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-400/30 rounded-xl flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <div>
                    <div className="text-red-400 font-bold text-lg">Erreur lors de l'envoi</div>
                    <div className="text-red-200">{state.error}</div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 disabled:from-neutral-600 disabled:to-neutral-700 disabled:cursor-not-allowed text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/40"
              >
                {state.isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-[#00A9C1] border-t-transparent rounded-full animate-spin" />
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
