'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projets', href: '#projects' },
    { name: 'Équipe', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: all 0.4s ease;
        }
        .nav-root.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,180,216,0.12);
          box-shadow: 0 1px 40px rgba(0,180,216,0.08);
        }
        .nav-root.top {
          background: transparent;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          letter-spacing: 0.01em;
          padding: 6px 4px;
          position: relative;
          cursor: pointer;
          border: none;
          background: none;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: #00B4D8;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover { color: #00B4D8; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-cta {
          background: #00B4D8;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .nav-cta:hover {
          background: #0096B4;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,180,216,0.3);
        }
        .mobile-nav {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0,180,216,0.1);
        }
        .mobile-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 14px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #1F2937;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 10px;
        }
        .mobile-link:hover {
          background: rgba(0,180,216,0.08);
          color: #00B4D8;
          padding-left: 28px;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      <nav className={`nav-root ${isScrolled ? 'scrolled' : 'top'}`}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/logo.png" alt="NGTech" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
              {navItems.map(item => (
                <button key={item.name} onClick={() => scrollToSection(item.href)} className="nav-link">
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden md:flex">
              <a href="tel:+224622123456" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}>
                <Phone size={14} />
                <span style={{ fontFamily: 'DM Sans, sans-serif' }}>+224 621 62 01 40</span>
              </a>
              <button className="nav-cta" onClick={() => scrollToSection('#contact')}>
                Demander un Devis
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '4px' }}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-nav md:hidden">
            <div style={{ padding: '12px 16px 20px' }}>
              {navItems.map(item => (
                <button key={item.name} onClick={() => scrollToSection(item.href)} className="mobile-link">
                  {item.name}
                </button>
              ))}
              <div style={{ marginTop: '16px', padding: '0 4px' }}>
                <button className="nav-cta" style={{ width: '100%' }} onClick={() => scrollToSection('#contact')}>
                  Demander un Devis
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
