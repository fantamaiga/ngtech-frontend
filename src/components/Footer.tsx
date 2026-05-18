'use client';

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Globe, MessageCircle, Camera, Play, ArrowUp, Heart, Shield, Code, Smartphone } from 'lucide-react';
import { newsletterService } from '@/services/newsletterService';
import { NewsletterState } from '@/types';

const Footer: React.FC = () => {
  const [state, setState] = useState<NewsletterState>(newsletterService.initializeState());

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.isLoading && state.email) {
      setState(newsletterService.setLoading(true));

      try {
        // Envoyer vers le backend NestJS
        await newsletterService.subscribe(state.email);
        
        // Succès
        setState(newsletterService.setSuccess());
      } catch (error) {
        setState(newsletterService.setError(error instanceof Error ? error.message : 'Erreur lors de l\'inscription'));
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-cyan-900 to-teal-900 border-t border-primary-400/30">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 via-cyan-600 to-teal-600 py-16 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Mail className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-sm uppercase tracking-wider">Newsletter</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Restez Connecté
            </h3>
            <p className="text-primary-100 text-lg mb-10 max-w-3xl mx-auto font-medium">
              Recevez nos dernières actualités, conseils tech et informations sur nos projets à impact social.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6">
              <input
                type="email"
                value={state.email}
                onChange={(e) => setState(newsletterService.setEmail(e.target.value))}
                placeholder="Votre email professionnel"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/30 transition-all text-lg font-medium"
                required
              />
              <button
                type="submit"
                disabled={state.isLoading}
                className="bg-white text-primary-600 hover:bg-neutral-100 disabled:bg-neutral-300 disabled:cursor-not-allowed font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-105 hover:shadow-2xl hover:shadow-white/30"
              >
                {state.isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#00A9C1] border-t-transparent rounded-full animate-spin" />
                    Inscription...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    S'inscrire
                  </>
                )}
              </button>
            </form>

            {state.isSubscribed && (
              <div className="mt-6 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl px-6 py-4 inline-block">
                <div className="text-green-200 font-bold text-lg">✓ Merci pour votre inscription ! Checkez vos emails.</div>
              </div>
            )}

            {state.error && (
              <div className="mt-6 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl px-6 py-4 inline-block">
                <div className="text-red-200 font-bold text-lg">Une erreur est survenue. Veuillez réessayer.</div>
                <div className="text-red-300 mt-2">{state.error}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <img 
                  src="/logo.png" 
                  alt="NGTech Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-primary-100 mb-8 leading-relaxed font-medium text-lg">
                Expertise tech et impact social. Nous développons des solutions innovantes 
                tout en formant les jeunes talents pour un avenir numérique inclusif.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-primary-600/30 to-cyan-600/30 backdrop-blur-sm border border-primary-400/30 hover:border-primary-400/60 text-primary-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  <Globe className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-cyan-600/30 to-teal-600/30 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-teal-600/30 to-primary-600/30 backdrop-blur-sm border border-teal-400/30 hover:border-teal-400/60 text-teal-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/25"
                >
                  <Camera className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-primary-600/30 to-cyan-600/30 backdrop-blur-sm border border-primary-400/30 hover:border-primary-400/60 text-primary-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  <Play className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text mb-8">Services</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#services" className="text-primary-200 hover:text-white transition-colors flex items-center gap-3 font-medium text-lg hover:translate-x-2 transition-transform">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    Développement Mobile
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-cyan-200 hover:text-white transition-colors flex items-center gap-3 font-medium text-lg hover:translate-x-2 transition-transform">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    Développement Fullstack
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-teal-200 hover:text-white transition-colors flex items-center gap-3 font-medium text-lg hover:translate-x-2 transition-transform">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-primary-400 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    Cyber-Audit & Sécurité
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-primary-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform pl-11">
                    Consulting Technique
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-cyan-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform pl-11">
                    Formation Équipe
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text mb-8">Entreprise</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#about" className="text-cyan-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform">
                    À Propos
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-teal-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform">
                    Notre Équipe
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-primary-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform">
                    Projets
                  </a>
                </li>
                <li>
                  <a href="#impact" className="text-cyan-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform">
                    Impact Social
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-teal-200 hover:text-white transition-colors font-medium text-lg hover:translate-x-2 transition-transform">
                    Carrières
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-primary-400 text-transparent bg-clip-text mb-8">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-gradient-to-r from-primary-600/20 to-cyan-600/20 backdrop-blur-sm rounded-xl p-4 border border-primary-400/30 hover:border-primary-400/60 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-primary-200 font-medium">contact@ngtech.com</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-cyan-200 font-medium">+224 622 123 456</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-gradient-to-r from-teal-600/20 to-primary-600/20 backdrop-blur-sm rounded-xl p-4 border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-teal-200 font-medium">Conakry, Guinée</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-400/30 py-12 bg-gradient-to-r from-primary-900/50 to-cyan-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-primary-200 text-lg font-medium">
              © 2024 NGTech. Tous droits réservés. Fait avec{' '}
              <Heart className="w-5 h-5 inline text-red-400 fill-current animate-pulse" />{' '}
              en Guinée.
            </div>
            
            <div className="flex flex-wrap items-center gap-8 text-lg">
              <a href="#" className="text-primary-200 hover:text-white transition-colors font-medium hover:translate-y-1 transition-transform">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-cyan-200 hover:text-white transition-colors font-medium hover:translate-y-1 transition-transform">
                Mentions Légales
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors font-medium hover:translate-y-1 transition-transform">
                CGV
              </a>
            </div>

            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="w-14 h-14 bg-gradient-to-br from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/40"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
