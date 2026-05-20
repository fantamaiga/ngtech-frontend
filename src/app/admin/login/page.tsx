'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Zap } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Identifiants invalides');
      }-

      localStorage.setItem('ngtech_token', data.accessToken);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          background: #f9fafb;
          font-family: 'Inter', sans-serif;
        }

        /* Panneau gauche décoratif */
        .login-left {
          flex: 1;
          background: #080C14;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 900px) { .login-left { display: none; } }

        .left-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 65%);
          top: -100px; right: -100px;
          pointer-events: none;
          animation: breathe 6s ease-in-out infinite;
        }
        .left-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,119,168,0.1) 0%, transparent 65%);
          bottom: -50px; left: -50px;
          pointer-events: none;
          animation: breathe 8s ease-in-out infinite reverse;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        .left-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,180,216,0.12) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .left-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }
        .left-brand img {
          height: 36px;
          filter: brightness(10);
          opacity: 0.9;
        }
        .left-brand-text {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
        }

        .left-content {
          position: relative;
          z-index: 2;
        }
        .left-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,180,216,0.15);
          border: 1px solid rgba(0,180,216,0.25);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          color: #00B4D8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .left-title {
          font-family: 'Syne', sans-serif;
          font-size: 42px;
          font-weight: 900;
          color: white;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .left-title span {
          background: linear-gradient(135deg, #00B4D8, #0077A8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .left-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          max-width: 340px;
          margin-bottom: 40px;
        }

        /* Cards déco gauche */
        .left-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .left-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lcard-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(0,180,216,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #00B4D8;
          flex-shrink: 0;
        }
        .lcard-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2px;
        }
        .lcard-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }

        .left-footer {
          position: relative;
          z-index: 2;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
        }

        /* Panneau droit - formulaire */
        .login-right {
          width: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px;
          background: white;
        }
        @media (max-width: 900px) {
          .login-right { width: 100%; padding: 32px 24px; }
        }

        .form-header {
          margin-bottom: 40px;
        }
        .form-eyebrow {
          font-size: 12px;
          font-weight: 600;
          color: #00B4D8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #080C14;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .form-sub {
          font-size: 14px;
          color: #9CA3AF;
          line-height: 1.5;
        }

        /* Champs */
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }
        .field-wrap {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        .field-input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 1.5px solid #E5E7EB;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #1F2937;
          background: #FAFAFA;
          outline: none;
          transition: all 0.2s ease;
          -webkit-appearance: none;
        }
        .field-input:focus {
          border-color: #00B4D8;
          background: white;
          box-shadow: 0 0 0 4px rgba(0,180,216,0.08);
        }
        .field-input::placeholder { color: #D1D5DB; }
        .field-input.error-input { border-color: #EF4444; }

        .pw-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9CA3AF;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: #00B4D8; }

        /* Erreur */
        .error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 20px;
          animation: shake 0.4s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .error-text {
          font-size: 13px;
          color: #DC2626;
          font-weight: 500;
        }

        /* Bouton submit */
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #00B4D8;
          color: white;
          border: none;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:hover:not(:disabled) {
          background: #0096B4;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(0,180,216,0.35);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .form-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #F3F4F6;
          text-align: center;
        }
        .form-footer-text {
          font-size: 12px;
          color: #D1D5DB;
        }
        .form-footer-text a {
          color: #00B4D8;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>

      <div className="login-root">
        {/* Panneau gauche */}
        <div className="login-left">
          <div className="left-glow" />
          <div className="left-glow-2" />
          <div className="left-dots" />

          <div className="left-brand">
            <img src="/logo.png" alt="NGTech" />
            <span className="left-brand-text">NGTech Admin</span>
          </div>

          <div className="left-content">
            <div className="left-tag">
              <Zap size={11} />
              Espace Administration
            </div>
            <h1 className="left-title">
              Gérez votre<br />
              <span>activité</span><br />
              en temps réel.
            </h1>
            <p className="left-sub">
              Tableau de bord centralisé pour gérer vos projets, 
              messages clients, équipe et bien plus encore.
            </p>

            <div className="left-cards">
              {[
                { icon: '📩', title: 'Messages clients', sub: 'Suivez vos demandes de devis' },
                { icon: '🚀', title: 'Gestion des projets', sub: 'Créez et publiez vos réalisations' },
                { icon: '👥', title: 'Équipe & Admins', sub: 'Gérez les accès et membres' },
              ].map((card, i) => (
                <div key={i} className="left-card">
                  <div className="lcard-icon">{card.icon}</div>
                  <div>
                    <div className="lcard-title">{card.title}</div>
                    <div className="lcard-sub">{card.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="left-footer">© 2024 NGTech · Conakry, Guinée</div>
        </div>

        {/* Panneau droit - formulaire */}
        <div className="login-right">
          <div className="form-header">
            <div className="form-eyebrow">Connexion sécurisée</div>
            <h2 className="form-title">Bon retour ! 👋</h2>
            <p className="form-sub">Connectez-vous à votre espace administrateur NGTech.</p>
          </div>

          {error && (
            <div className="error-box">
              <AlertCircle size={16} color="#DC2626" />
              <span className="error-text">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field-label">Adresse email</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={16} /></span>
                <input
                  type="email"
                  className={`field-input ${error ? 'error-input' : ''}`}
                  placeholder="admin@ngtech.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Mot de passe</label>
              <div className="field-wrap">
                <span className="field-icon"><Lock size={16} /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`field-input ${error ? 'error-input' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p className="form-footer-text">
              Accès réservé aux administrateurs NGTech.<br />
              Problème de connexion ? <a href="mailto:contact@ngtech.com">Contactez le support</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
