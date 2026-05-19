'use client';

import React from 'react';
import { Smartphone, Code2, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Smartphone,
      tag: 'Mobile',
      title: 'Développement Mobile',
      description: 'Applications natives et hybrides performantes pour iOS et Android. Expérience utilisateur optimale et performances natives.',
      features: ['React Native & Flutter', 'Applications iOS/Android', 'Performance optimisée', 'Support et maintenance'],
      accent: '#00B4D8',
      bg: 'rgba(0,180,216,0.06)',
    },
    {
      icon: Code2,
      tag: 'Fullstack',
      title: 'Développement Fullstack',
      description: 'Solutions web complètes du frontend au backend. Architecture scalable et technologies modernes pour votre croissance.',
      features: ['React, Next.js, Node.js', 'API REST & GraphQL', 'Bases de données optimisées', 'Cloud & DevOps'],
      accent: '#0077A8',
      bg: 'rgba(0,119,168,0.06)',
    },
    {
      icon: Shield,
      tag: 'Sécurité',
      title: 'Cyber-Audit & Sécurité',
      description: 'Audit de sécurité complet et protection de vos données. Équipe d\'experts certifiés pour une sécurité à toute épreuve.',
      features: ['Audit de vulnérabilités', 'Tests d\'intrusion (Pentesting)', 'Conformité RGPD/ISO 27001', 'Formation sécurité'],
      accent: '#005F82',
      bg: 'rgba(0,95,130,0.06)',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .services-root {
          background: white;
          padding: 100px 0;
        }
        .service-card {
          background: white;
          border: 1px solid #F0F0F0;
          border-radius: 20px;
          padding: 36px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00B4D8, #0077A8);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .service-card:hover {
          border-color: rgba(0,180,216,0.25);
          box-shadow: 0 20px 60px rgba(0,180,216,0.1);
          transform: translateY(-6px);
        }
        .service-card:hover::before {
          transform: scaleX(1);
        }
        .service-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00B4D8;
          background: rgba(0,180,216,0.1);
          border-radius: 100px;
          padding: 4px 12px;
          margin-bottom: 20px;
        }
        .service-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #0A1628;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .service-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #6B7280;
          line-height: 1.65;
          margin: 0 0 24px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #F9FAFB;
        }
        .feature-item:last-child { border-bottom: none; }
        .feature-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        .service-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #00B4D8;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: gap 0.2s ease;
        }
        .service-cta:hover { gap: 12px; }
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00B4D8;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 800;
          color: #0A1628;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }
        .section-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          color: #6B7280;
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto;
        }
        .bottom-banner {
          margin-top: 72px;
          background: linear-gradient(135deg, #00B4D8 0%, #0077A8 100%);
          border-radius: 20px;
          padding: 36px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .banner-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0 0 4px;
        }
        .banner-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin: 0;
        }
        .banner-btn {
          background: white;
          color: #00B4D8;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .banner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
      `}</style>

      <section className="services-root" id="services">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label">Nos Services</div>
            <h2 className="section-title">Excellence<br /><span style={{ color: '#00B4D8' }}>Technologique</span></h2>
            <p className="section-subtitle">
              Des solutions de pointe adaptées à vos besoins, avec un engagement fort 
              pour l'impact social et la formation des jeunes talents.
            </p>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="service-card">
                  <div style={{ width: '52px', height: '52px', background: service.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={24} color={service.accent} />
                  </div>
                  <div className="service-tag">{service.tag}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div>
                    {service.features.map((f, fi) => (
                      <div key={fi} className="feature-item">
                        <CheckCircle size={15} color="#00B4D8" style={{ flexShrink: 0 }} />
                        <span className="feature-text">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className="service-cta">
                    En savoir plus
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom banner */}
          <div className="bottom-banner">
            <div>
              <p className="banner-title">Besoin d'une solution sur mesure ?</p>
              <p className="banner-sub">Notre équipe est disponible pour discuter de votre projet.</p>
            </div>
            <button className="banner-btn" onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contactez-nous →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
