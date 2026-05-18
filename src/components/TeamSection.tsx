import React from 'react';
import { Mail, Award, Code, Shield, Smartphone, Globe, User } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Amadou Bailo BARRY",
      role: "Développeur Back-end",
      bio: "Passionné par les technologies web et l'impact social. 3 ans d'expérience dans le développement d'applications.",
      skills: [ "Node.js", "TypeScript", "PostgreSQL", "github"],
      avatar: "/api/placeholder/200/200",
      social: {
        github: "https://github.com/Bailosama",
        linkedin: "#",
        email: "karim@ngtech.com"
      },
      icon: Code,
      joinYear: "2021"
    },
    {
      name: "Aminata Bâ",
      role: "Expert Cyber-sécurité",
      bio: "Spécialiste en sécurité des systèmes et audit de vulnérabilités. Engagée dans la protection des données des communautés.",
      skills: ["Pentesting", "ISO 27001", "Cryptographie", "RGPD"],
      avatar: "/api/placeholder/200/200",
      social: {
        github: "#",
        linkedin: "#",
        email: "aminata@ngtech.com"
      },
      icon: Shield,
      joinYear: "2022"
    },
    {
      name: "Moussa Touré",
      role: "Développeur Mobile",
      bio: "Expert en applications mobiles natives et hybrides. Focus sur l'accessibilité et l'inclusion numérique.",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      avatar: "/api/placeholder/200/200",
      social: {
        github: "#",
        linkedin: "#",
        email: "moussa@ngtech.com"
      },
      icon: Smartphone,
      joinYear: "2021"
    },
    {
      name: "Fatoumata Camara",
      role: "UI/UX Designer",
      bio: "Créative passionnée par le design centré sur l'utilisateur. Spécialisée dans les interfaces pour applications communautaires.",
      skills: ["Figma", "Adobe XD", "Prototyping", "Design System"],
      avatar: "/api/placeholder/200/200",
      social: {
        github: "#",
        linkedin: "#",
        email: "fatoumata@ngtech.com"
      },
      icon: Code,
      joinYear: "2023"
    },
    {
      name: "Ibrahim Konaté",
      role: "DevOps Engineer",
      bio: "Expert en infrastructure cloud et déploiement continu. Optimise les performances pour un impact maximal.",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      avatar: "/api/placeholder/200/200",
      social: {
        github: "#",
        linkedin: "#",
        email: "ibrahim@ngtech.com"
      },
      icon: Code,
      joinYear: "2022"
    },
    {
      name: "Mariam Sylla",
      role: "Product Manager",
      bio: "Passionnée par l'innovation sociale. Connecte les besoins communautaires avec les solutions technologiques.",
      skills: ["Agile", "Scrum", "Product Strategy", "User Research"],
      avatar: "/api/placeholder/200/200",
      social: {
        github: "#",
        linkedin: "#",
        email: "mariam@ngtech.com"
      },
      icon: Code,
      joinYear: "2023"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-900 via-primary-900 to-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-3000"></div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-primary-400 text-transparent bg-clip-text mb-4">
            <Award className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-semibold uppercase tracking-wider">Notre Équipe</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white drop-shadow-2xl">Jeunes</span>
            <span className="block bg-gradient-to-r from-teal-400 via-primary-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-2xl">Talents</span>
          </h2>
          <p className="text-xl text-teal-100 max-w-4xl mx-auto leading-relaxed font-medium">
            Une équipe dynamique de jeunes passionnés, alliant expertise technique 
            <span className="block mt-2 text-teal-200">et engagement social pour créer un impact positif durable.</span>
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-teal-600/20 to-primary-600/20 backdrop-blur-lg rounded-2xl p-6 border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
            <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-primary-400 text-transparent bg-clip-text mb-2">30+</div>
            <div className="text-teal-200 font-medium">Jeunes Talents</div>
          </div>
          <div className="bg-gradient-to-br from-primary-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-6 border border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-cyan-400 text-transparent bg-clip-text mb-2">15</div>
            <div className="text-primary-200 font-medium">Projets Sociaux</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text mb-2">8</div>
            <div className="text-cyan-200 font-medium">Certifications</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25">
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text mb-2">4.9</div>
            <div className="text-yellow-200 font-medium">Satisfaction Client</div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-teal-800/30 to-primary-800/30 backdrop-blur-lg rounded-2xl border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
              >
                {/* Avatar and Header */}
                <div className="relative p-6 pb-0">
                  <div className="flex items-start justify-between mb-6">
                    {/* Avatar placeholder with gradient */}
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-primary-400 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <span className="text-3xl font-bold text-white drop-shadow-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    {/* Join year badge */}
                    <div className="bg-gradient-to-r from-teal-600/80 to-primary-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg">
                      Depuis {member.joinYear}
                    </div>
                  </div>
                  
                  {/* Role icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  {/* Name and Role */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-primary-400 group-hover:bg-clip-text transition-all duration-300">
                    {member.name}
                  </h3>
                  <p className="bg-gradient-to-r from-teal-400 to-primary-400 text-transparent bg-clip-text text-sm font-bold mb-4">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-teal-100 text-sm mb-6 line-clamp-3 font-medium">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gradient-to-r from-teal-600/30 to-primary-600/30 text-teal-200 px-3 py-1 rounded-lg text-xs font-medium border border-teal-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="bg-gradient-to-r from-teal-600/30 to-primary-600/30 text-teal-200 px-3 py-1 rounded-lg text-xs font-medium border border-teal-400/30">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={member.social.github}
                      className="w-10 h-10 bg-gradient-to-r from-teal-600/30 to-primary-600/30 rounded-lg flex items-center justify-center text-teal-400 hover:text-white hover:from-teal-500 hover:to-primary-500 transition-all duration-300 border border-teal-400/30 hover:border-teal-400"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-gradient-to-r from-primary-600/30 to-cyan-600/30 rounded-lg flex items-center justify-center text-primary-400 hover:text-white hover:from-primary-500 hover:to-cyan-500 transition-all duration-300 border border-primary-400/30 hover:border-primary-400"
                    >
                      <User className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-gradient-to-r from-cyan-600/30 to-teal-600/30 rounded-lg flex items-center justify-center text-cyan-400 hover:text-white hover:from-cyan-500 hover:to-teal-500 transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Us CTA */}
        <div className="mt-20 text-center relative z-10">
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-teal-600/20 to-primary-600/20 backdrop-blur-lg rounded-2xl px-8 py-4 border-2 border-teal-400/30 hover:border-teal-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-primary-400 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-teal-100 font-semibold text-lg">Vous êtes un jeune talent passionné ?</span>
            <button className="bg-gradient-to-r from-teal-500 to-primary-500 hover:from-teal-600 hover:to-primary-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/40">
              Rejoignez-nous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
