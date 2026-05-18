import React from 'react';
import { Smartphone, Code2, Shield, CheckCircle, ArrowRight, Zap, Users, Lock, Sparkles } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Développement Mobile",
      description: "Applications natives et hybrides performantes pour iOS et Android. Expérience utilisateur optimale et performances natives.",
      features: [
        "React Native & Flutter",
        "Applications iOS/Android natives",
        "Performance optimisée",
        "Support et maintenance"
      ],
      color: "primary",
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: Code2,
      title: "Développement Fullstack",
      description: "Solutions web complètes du frontend au backend. Architecture scalable et technologies modernes pour votre croissance.",
      features: [
        "React, Next.js, Node.js",
        "API REST & GraphQL",
        "Bases de données optimisées",
        "Cloud & DevOps"
      ],
      color: "primary",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: Shield,
      title: "Cyber-Audit & Sécurité",
      description: "Audit de sécurité complet et protection de vos données. Équipe d'experts certifiés pour une sécurité à toute épreuve.",
      features: [
        "Audit de vulnérabilités",
        "Tests d'intrusion (Pentesting)",
        "Conformité RGPD/ISO 27001",
        "Formation sécurité"
      ],
      color: "primary",
      gradient: "from-primary-700 to-primary-800"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text mb-4">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">Nos Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white drop-shadow-2xl">Excellence</span>
            <span className="block bg-gradient-to-r from-primary-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text drop-shadow-2xl">Tech</span>
          </h2>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed font-medium">
            Des solutions technologiques de pointe adaptées à vos besoins, 
            <span className="block mt-2 text-primary-200">avec un engagement fort pour l'impact social et la formation des jeunes talents.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-primary-800/50 to-cyan-800/50 backdrop-blur-lg rounded-2xl border border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-primary-100 mb-6 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-primary-200 text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <button className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/40">
                    En savoir plus
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-primary-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl px-8 py-4 border-2 border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-primary-100 font-semibold text-lg">Besoin d'une solution sur mesure ?</span>
            <button className="bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/40">
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
