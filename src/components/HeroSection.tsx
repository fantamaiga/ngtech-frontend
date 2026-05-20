'use client';

import React from 'react';
import { ArrowRight, Code, Shield, Heart, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');

        .hero-root {
          min-height: 100vh;
          background: #F8FCFE;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg-circle-1 {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%);
          top: -100px; right: -100px;
          pointer-events: none;
        }
        .hero-bg-circle-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 70%);
          bottom: 50px; left: -80px;
          pointer-events: none;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,180,216,0.1);
          border: 1px solid rgba(0,180,216,0.25);
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0096B4;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #0A1628;
          margin: 0 0 8px;
        }
        .hero-title-accent {
          font-family: 'Syne', sans-serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #00B4D8 0%, #0077A8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 32px;
        }
        .hero-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #4B5563;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 48px;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00B4D8;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .hero-btn-primary:hover {
          background: #0096B4;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0,180,216,0.35);
        }
        .hero-btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }
        .btn-arrow {
          transition: transform 0.2s ease;
        }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #0A1628;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 14px;
          border: 1.5px solid #E5E7EB;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .hero-btn-secondary:hover {
          border-color: #00B4D8;
          color: #00B4D8;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .stat-card {
          background: white;
          border: 1px solid rgba(0,180,216,0.15);
          border-radius: 16px;
          padding: 24px 28px;
          text-align: center;
          transition: all 0.25s ease;
          box-shadow: 0 2px 16px rgba(0,180,216,0.06);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,180,216,0.14);
          border-color: rgba(0,180,216,0.3);
        }
        .stat-icon {
          width: 44px; height: 44px;
          background: rgba(0,180,216,0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          color: #00B4D8;
        }
        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #0A1628;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #6B7280;
          letter-spacing: 0.02em;
        }
        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 100px;
          padding: 8px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: bounce 2s infinite;
        }
        .scroll-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00B4D8;
          opacity: 0.6;
        }
        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #00B4D8, transparent);
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>

      <section className="hero-root" id="home">
        <div className="hero-bg-circle-1" />
        <div className="hero-bg-circle-2" />
        <div className="hero-grid" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 80px', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Top badge */}
          <div style={{ textAlign: 'center' }}>
            <div className="hero-badge">
              <Zap size={13} />
              Bienvenue chez NGTech — Guinée
            </div>
          </div>

          {/* Main headline */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 className="hero-title">Expertise Tech,</h1>
            <h1 className="hero-title-accent">Impact Social.</h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle" style={{ textAlign: 'center' }}>
            Développement Mobile, Fullstack et Cyber-sécurité d'excellence. 
            Nous formons les jeunes talents guinéens et créons des solutions technologiques 
            pour transformer les communautés.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '72px' }}>
            <button className="hero-btn-primary" onClick={() => scrollToSection('#contact')}>
              <Zap size={18} />
              Demander un Devis
              <ArrowRight size={18} className="btn-arrow" />
            </button>
            <button className="hero-btn-secondary" onClick={() => scrollToSection('#projects')}>
              Voir Nos Projets
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', maxWidth: '680px', margin: '0 auto 56px' }}>
            <div className="stat-card">
              <div className="stat-icon"><Code size={20} /></div>
              <div className="stat-number">10+</div>
              <div className="stat-label">Projets Livrés</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Shield size={20} /></div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Sécurité Certifiée</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Heart size={20} /></div>
              <div className="stat-number">30+</div>
              <div className="stat-label">Jeunes Formés</div>
            </div>
          </div>

          {/* Trust pills */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div className="trust-pill">
              <Shield size={13} color="#00B4D8" />
              Certifié ISO 27001
            </div>
            <div className="trust-pill">
              <Code size={13} color="#00B4D8" />
              Partenaire Google Cloud
            </div>
            <div className="trust-pill">
              <Heart size={13} color="#00B4D8" />
              Startup Reconnue
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-dot" />
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
