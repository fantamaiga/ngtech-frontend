import React from 'react';
import { ArrowRight, Code, Shield, Heart, Sparkles, Zap, Globe } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_primary-300_1px,_transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/logo.png" 
            alt="NGTech Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        {/* Main headline */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text">
            <Sparkles className="w-6 h-6 text-primary-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">Bienvenue chez NGTech</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in">
          <span className="block text-white drop-shadow-2xl">Expertise Tech</span>
          <span className="block bg-gradient-to-r from-primary-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text drop-shadow-2xl">Impact Social</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up font-medium">
          Développement Mobile, Fullstack et Cyber-sécurité d'excellence. 
          <span className="block mt-2 text-primary-200">Nous formons les jeunes talents et créons des applications communautaires pour transformer la société.</span>
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-8 border border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-primary-200 font-medium">Projets Livrés</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-cyan-200 font-medium">Sécurité Certifiée</div>
          </div>
          <div className="bg-gradient-to-br from-teal-500/20 to-primary-500/20 backdrop-blur-lg rounded-2xl p-8 border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-primary-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">30+</div>
            <div className="text-teal-200 font-medium">Jeunes Employés</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group relative bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary-500/40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative flex items-center gap-3 text-lg">
              <Zap className="w-5 h-5" />
              Demander un Devis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          
          <button className="group bg-gradient-to-r from-primary-600/20 to-cyan-600/20 hover:from-primary-600/30 hover:to-cyan-600/30 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 border-2 border-primary-400/50 hover:border-primary-400 backdrop-blur-lg hover:scale-105">
            <span className="flex items-center gap-3 text-lg">
              <Globe className="w-5 h-5" />
              Voir Nos Projets
            </span>
          </button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 px-4 py-2 rounded-full border border-primary-400/30">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-primary-200 font-medium">Certifié ISO 27001</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 px-4 py-2 rounded-full border border-cyan-400/30">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-200 font-medium">Partenaire Google Cloud</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-primary-500/20 px-4 py-2 rounded-full border border-teal-400/30">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-teal-200 font-medium">Startup Reconnue</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary-400/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-4 bg-gradient-to-b from-primary-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
