'use client';

import React from 'react';
import { Mail, Globe, User, Award, Phone } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Amadou Bailo BARRY',
      role: 'Développeur Back-end',
      bio: 'Passionné par les technologies web et l\'impact social. 3 ans d\'expérience dans le développement d\'applications.',
      skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'GitHub'],
      social: { github: 'https://github.com/Bailosama', phone: '620862687', email: 'natsubarry@gmail.com' },
      initials: 'AB',
      color: '#00B4D8',
    },
    {
      name: 'Aminata Bâ',
      role: 'Expert Cyber-sécurité',
      bio: 'Spécialiste en sécurité des systèmes et audit de vulnérabilités. Engagée dans la protection des données.',
      skills: ['Pentesting', 'ISO 27001', 'Cryptographie', 'RGPD'],
      social: { github: '#', linkedin: '#', email: 'aminata@ngtech.com' },
      initials: 'AB',
      color: '#0077A8',
    },
    {
      name: 'Mamadou Masroughou BAH',
      role: 'Développeur Back-end',
      bio: 'Développeur BAckend. Avec plus de3 ans d\'expérience dans le développement d\'applications.',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      social: { github: 'https://github.com/MASROUGHOU001', phone: '622586164', email: 'mamadoumasroughoubah@gmail.com' },
      initials: 'MT',
      color: '#005F82',
    },
    {
      name: 'Fatoumata Camara',
      role: 'UI/UX Designer',
      bio: 'Créative passionnée par le design centré sur l\'utilisateur. Spécialisée dans les interfaces communautaires.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design System'],
      social: { github: '#', linkedin: '#', email: 'fatoumata@ngtech.com' },
      initials: 'FC',
      color: '#00B4D8',
    },
    {
      name: 'Ibrahim Konaté',
      role: 'DevOps Engineer',
      bio: 'Expert en infrastructure cloud et déploiement continu. Optimise les performances pour un impact maximal.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      social: { github: '#', linkedin: '#', email: 'ibrahim@ngtech.com' },
      initials: 'IK',
      color: '#0077A8',
    },
    {
      name: 'Mariam Sylla',
      role: 'Product Manager',
      bio: 'Passionnée par l\'innovation sociale. Connecte les besoins communautaires avec les solutions technologiques.',
      skills: ['Agile', 'Scrum', 'Product Strategy', 'User Research'],
      social: { github: '#', linkedin: '#', email: 'mariam@ngtech.com' },
      initials: 'MS',
      color: '#005F82',
    },
  ];

  const stats = [
    { value: '30+', label: 'Jeunes Talents' },
    { value: '5', label: 'Projets Sociaux' },
    { value: '8', label: 'Certifications' },
    { value: '4.9', label: 'Satisfaction Client' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .team-root {
          background: #F8FCFE;
          padding: 100px 0;
        }
        .team-stat-card {
          background: white;
          border: 1px solid rgba(0,180,216,0.15);
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.25s ease;
        }
        .team-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,180,216,0.12);
        }
        .team-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #00B4D8;
          line-height: 1;
          margin-bottom: 6px;
        }
        .team-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #6B7280;
        }
        .member-card {
          background: white;
          border: 1px solid #F0F0F0;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .member-card:hover {
          border-color: rgba(0,180,216,0.2);
          box-shadow: 0 16px 48px rgba(0,180,216,0.1);
          transform: translateY(-4px);
        }
        .member-header {
          padding: 28px 28px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .member-avatar {
          width: 60px; height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }
        .member-role-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #00B4D8;
          background: rgba(0,180,216,0.1);
          border-radius: 100px;
          padding: 4px 10px;
          white-space: nowrap;
        }
        .member-body {
          padding: 16px 28px 28px;
        }
        .member-name {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0A1628;
          margin: 0 0 4px;
        }
        .member-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #6B7280;
          margin: 0 0 12px;
        }
        .member-bio {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #9CA3AF;
          line-height: 1.6;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .skill-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 4px 10px;
          margin: 3px 3px 0 0;
        }
        .member-socials {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #F9FAFB;
        }
        .social-btn {
          width: 34px; height: 34px;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9CA3AF;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: #00B4D8;
          color: #00B4D8;
          background: rgba(0,180,216,0.05);
        }
        .join-banner {
          margin-top: 72px;
          background: white;
          border: 1px solid rgba(0,180,216,0.2);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .join-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00B4D8, #0077A8);
        }
        .join-btn {
          background: #00B4D8;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 20px;
        }
        .join-btn:hover {
          background: #0096B4;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,180,216,0.3);
        }
      `}</style>

      <section className="team-root" id="team">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00B4D8', marginBottom: '12px' }}>Notre Équipe</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, color: '#0A1628', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
              Jeunes <span style={{ color: '#00B4D8' }}>Talents</span>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: '#6B7280', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto' }}>
              Une équipe dynamique de passionnés alliant expertise technique et engagement social.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', maxWidth: '700px', margin: '0 auto 64px' }}>
            {stats.map((s, i) => (
              <div key={i} className="team-stat-card">
                <div className="team-stat-num">{s.value}</div>
                <div className="team-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Team grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {teamMembers.map((m, i) => (
              <div key={i} className="member-card">
                <div className="member-header">
                  <div className="member-avatar" style={{ background: m.color }}>{m.initials}</div>
                  <div className="member-role-badge">{m.role.split(' ')[0]}</div>
                </div>
                <div className="member-body">
                  <h3 className="member-name">{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                  <p className="member-bio">{m.bio}</p>
                  <div>
                    {m.skills.slice(0, 3).map((sk, si) => (
                      <span key={si} className="skill-tag">{sk}</span>
                    ))}
                    {m.skills.length > 3 && <span className="skill-tag">+{m.skills.length - 3}</span>}
                  </div>
                  <div className="member-socials">
                    <a href={m.social.github} className="social-btn" target="_blank" rel="noopener noreferrer"><Globe size={15} /></a>
                    <a href={`tel:+224${m.social.phone}`} className="social-btn"><Phone size={15} /></a>
                    <a href={`mailto:${m.social.email}`} className="social-btn"><Mail size={15} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join banner */}
          <div className="join-banner">
            <Award size={32} color="#00B4D8" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0A1628', margin: '0 0 8px' }}>
              Vous êtes un jeune talent passionné ?
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#6B7280', margin: 0 }}>
              Rejoignez notre équipe et participez à la transformation numérique de la Guinée.
            </p>
            <button className="join-btn">Rejoignez-nous →</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
