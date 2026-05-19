'use client';

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Globe, MessageCircle, ArrowUp, Heart, Shield, Code, Smartphone } from 'lucide-react';
import { newsletterService } from '@/services/newsletterService';
import { NewsletterState } from '@/types';

const Footer: React.FC = () => {
  const [state, setState] = useState<NewsletterState>(newsletterService.initializeState());

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.isLoading && state.email) {
      setState(newsletterService.setLoading(true));
      try {
        await newsletterService.subscribe(state.email);
        setState(newsletterService.setSuccess());
      } catch (error) {
        setState(newsletterService.setError(error instanceof Error ? error.message : 'Erreur'));
      }
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .footer-root {
          background: #0A1628;
          color: white;
        }
        .newsletter-section {
          background: linear-gradient(135deg, #00B4D8 0%, #0077A8 100%);
          padding: 64px 24px;
        }
        .nl-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: white;
          margin: 0 0 12px;
          text-align: center;
        }
        .nl-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: rgba(255,255,255,0.8);
          text-align: center;
          margin: 0 0 36px;
        }
        .nl-form {
          display: flex;
          gap: 12px;
          max-width: 480px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .nl-input {
          flex: 1;
          min-width: 200px;
          padding: 14px 18px;
          border-radius: 12px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .nl-input::placeholder { color: rgba(255,255,255,0.6); }
        .nl-input:focus { border-color: white; background: rgba(255,255,255,0.25); }
        .nl-btn {
          background: white;
          color: #00B4D8;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 24px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .footer-body {
          padding: 72px 24px 48px;
        }
        .footer-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
        }
        .footer-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin: 0 0 24px;
        }
        .footer-social {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .footer-social:hover {
          border-color: #00B4D8;
          color: #00B4D8;
          background: rgba(0,180,216,0.1);
        }
        .footer-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin: 0 0 20px;
        }
        .footer-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s ease;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
        }
        .footer-link:hover { color: white; }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .contact-item:last-child { border-bottom: none; }
        .contact-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(0,180,216,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px;
        }
        .scroll-top-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(0,180,216,0.15);
          border: 1px solid rgba(0,180,216,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00B4D8;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .scroll-top-btn:hover {
          background: #00B4D8;
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <footer className="footer-root">
        {/* Newsletter */}
        <div className="newsletter-section">
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '12px' }}>Newsletter</p>
            <h3 className="nl-title">Restez Connecté</h3>
            <p className="nl-sub">Recevez nos actualités tech et informations sur nos projets à impact social.</p>
            <form onSubmit={handleSubscribe} className="nl-form">
              <input
                type="email"
                className="nl-input"
                placeholder="votre@email.com"
                value={state.email}
                onChange={e => setState(newsletterService.setEmail(e.target.value))}
                required
              />
              <button type="submit" className="nl-btn" disabled={state.isLoading}>
                <Send size={16} />
                {state.isLoading ? 'Envoi...' : "S'inscrire"}
              </button>
            </form>
            {state.isSubscribed && (
              <p style={{ textAlign: 'center', marginTop: '16px', color: 'rgba(255,255,255,0.9)', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600 }}>
                ✓ Merci ! Vérifiez vos emails.
              </p>
            )}
          </div>
        </div>

        {/* Main footer */}
        <div className="footer-body">
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
            {/* Brand */}
            <div style={{ gridColumn: 'span 1' }}>
              <img src="/logo.png" alt="NGTech" style={{ height: '36px', marginBottom: '16px', filter: 'brightness(10)', opacity: 0.9 }} />
              <p className="footer-desc">Expertise tech et impact social. Nous développons des solutions innovantes tout en formant les jeunes talents guinéens.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="#" className="footer-social"><Globe size={16} /></a>
                <a href="#" className="footer-social"><MessageCircle size={16} /></a>
                <a href="#" className="footer-social"><Mail size={16} /></a>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="footer-heading">Services</p>
              {[
                { icon: Smartphone, label: 'Développement Mobile' },
                { icon: Code, label: 'Développement Fullstack' },
                { icon: Shield, label: 'Cyber-Audit & Sécurité' },
                { label: 'Consulting Technique' },
                { label: 'Formation Équipe' },
              ].map((item, i) => (
                <a key={i} href="#services" className="footer-link">{item.label}</a>
              ))}
            </div>

            {/* Entreprise */}
            <div>
              <p className="footer-heading">Entreprise</p>
              {['À Propos', 'Notre Équipe', 'Projets', 'Impact Social', 'Carrières'].map((item, i) => (
                <a key={i} href="#" className="footer-link">{item}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p className="footer-heading">Contact</p>
              <div className="contact-item">
                <div className="contact-icon"><Mail size={15} color="#00B4D8" /></div>
                <span className="contact-text">contact@ngtech.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Phone size={15} color="#00B4D8" /></div>
                <span className="contact-text">+224 622 123 456</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={15} color="#00B4D8" /></div>
                <span className="contact-text">Conakry, Guinée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              © 2024 NGTech. Tous droits réservés. Fait avec <Heart size={12} style={{ display: 'inline', color: '#00B4D8' }} /> en Guinée.
            </p>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['Confidentialité', 'Mentions Légales', 'CGV'].map((item, i) => (
                <a key={i} href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
                  {item}
                </a>
              ))}
              <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Retour en haut">
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
