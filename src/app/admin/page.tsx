'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  LayoutDashboard, MessageSquare, FolderKanban, Users, Shield,
  LogOut, Menu, X, Plus, Trash2, Edit3, Eye,
  CheckCircle, Clock, Bell, XCircle, ExternalLink,
  RefreshCw, TrendingUp, ArrowUpRight, Save,
  Globe, ChevronRight, AlertTriangle, Info, Power, PowerOff
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

/* ─── Types ──────────────────────────────────────── */
type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'SPAM';
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast { id: number; type: ToastType; title: string; message?: string; }
interface ContactMsg {
  id: string; kind: string; status: ContactStatus;
  fullName: string; email: string; phone?: string;
  subject?: string; message: string; serviceDesired?: string;
  budget?: string; company?: string; country?: string; createdAt: string;
}
interface Project {
  id: string; title: string; slug: string; description: string;
  projectType: 'MOBILE' | 'FULLSTACK'; isCommunityProject: boolean;
  techStack: string[]; coverImageUrl?: string; repoUrl?: string; liveUrl?: string; createdAt: string;
}
interface TeamMember {
  id: string; fullName: string; role: string; techSpecialty: string;
  bio?: string; linkedInUrl?: string; githubUrl?: string; isActive: boolean; order: number;
}

/* ─── Toast System ───────────────────────────────── */
let toastId = 0;
const toastListeners: Set<(t: Toast) => void> = new Set();

export function toast(type: ToastType, title: string, message?: string) {
  const t: Toast = { id: ++toastId, type, title, message };
  toastListeners.forEach(fn => fn(t));
}

function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (t: Toast) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 4000);
    };
    toastListeners.add(handler);
    return () => { toastListeners.delete(handler); };
  }, []);

  const cfg: Record<ToastType, { bg: string; border: string; icon: React.ReactNode; titleColor: string }> = {
    success: { bg: '#F0FDF4', border: '#86EFAC', icon: <CheckCircle size={18} color="#16A34A"/>, titleColor: '#15803D' },
    error:   { bg: '#FEF2F2', border: '#FCA5A5', icon: <XCircle size={18} color="#DC2626"/>, titleColor: '#B91C1C' },
    warning: { bg: '#FFFBEB', border: '#FCD34D', icon: <AlertTriangle size={18} color="#D97706"/>, titleColor: '#B45309' },
    info:    { bg: '#EFF6FF', border: '#93C5FD', icon: <Info size={18} color="#2563EB"/>, titleColor: '#1D4ED8' },
  };

  return (
    <div style={{ position:'fixed', bottom:'24px', right:'24px', zIndex:9999, display:'flex', flexDirection:'column', gap:'10px', maxWidth:'360px', width:'100%' }}>
      {toasts.map(t => {
        const c = cfg[t.type];
        return (
          <div key={t.id} style={{
            background: c.bg, border: `1.5px solid ${c.border}`,
            borderRadius:'14px', padding:'14px 16px',
            display:'flex', gap:'12px', alignItems:'flex-start',
            boxShadow:'0 8px 32px rgba(0,0,0,0.1)',
            animation:'toastIn 0.3s ease',
          }}>
            <div style={{ flexShrink:0, marginTop:'1px' }}>{c.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:700, color:c.titleColor, fontFamily:'Syne,sans-serif' }}>{t.title}</div>
              {t.message && <div style={{ fontSize:'13px', color:'#6B7280', marginTop:'3px', lineHeight:1.5, fontFamily:'Inter,sans-serif' }}>{t.message}</div>}
            </div>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#9CA3AF', padding:'2px', flexShrink:0, display:'flex' }}>
              <X size={15}/>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ─── API Hook ───────────────────────────────────── */
const BASE = 'http://localhost:4000/api';
function useApi() {
  const tok = () => (typeof window !== 'undefined' ? localStorage.getItem('ngtech_token') : '') ?? '';
  const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${tok()}` });

  const handleRes = async (res: Response) => {
    if (res.status === 401) { toast('error', 'Session expirée', 'Veuillez vous reconnecter.'); throw new Error('401'); }
    if (res.status === 403) { toast('error', 'Accès refusé', 'Vous n\'avez pas les droits pour cette action.'); throw new Error('403'); }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);
    return data;
  };

  return {
    get:   (p: string) => fetch(`${BASE}${p}`, { headers: h() }).then(handleRes),
    post:  (p: string, b: any) => fetch(`${BASE}${p}`, { method:'POST',  headers: h(), body: JSON.stringify(b) }).then(handleRes),
    patch: (p: string, b: any) => fetch(`${BASE}${p}`, { method:'PATCH', headers: h(), body: JSON.stringify(b) }).then(handleRes),
    del:   (p: string) => fetch(`${BASE}${p}`, { method:'DELETE', headers: h() }).then(r => { if(!r.ok) throw new Error('Erreur'); return true; }),
  };
}

/* ─── UI Atoms ───────────────────────────────────── */
const StatusBadge = ({ status }: { status: ContactStatus }) => {
  const c = {
    NEW:         { bg:'#EFF6FF', color:'#2563EB', label:'Nouveau',   Icon: Bell },
    IN_PROGRESS: { bg:'#FFFBEB', color:'#D97706', label:'En cours',  Icon: Clock },
    RESOLVED:    { bg:'#ECFDF5', color:'#059669', label:'Résolu',    Icon: CheckCircle },
    SPAM:        { bg:'#FEF2F2', color:'#DC2626', label:'Spam',      Icon: XCircle },
  }[status];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', background:c.bg, color:c.color, borderRadius:'100px', padding:'4px 11px', fontSize:'12px', fontWeight:600, whiteSpace:'nowrap' }}>
      <c.Icon size={11}/>{c.label}
    </span>
  );
};

const Pill = ({ label, color = '#00B4D8' }: { label: string; color?: string }) => (
  <span style={{ fontSize:'11px', fontWeight:600, color, background:`${color}14`, borderRadius:'6px', padding:'3px 9px', whiteSpace:'nowrap' }}>{label}</span>
);

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div style={{ position:'fixed', inset:0, background:'rgba(0,62,138,0.1)', backdropFilter:'blur(6px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}
    onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div style={{ background:'white', borderRadius:'20px', width:'100%', maxWidth:'560px', maxHeight:'90vh', overflow:'auto', boxShadow:'0 24px 80px rgba(0,119,168,0.15)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 28px', borderBottom:'1px solid #F0F4F8', position:'sticky', top:0, background:'white', zIndex:1 }}>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'17px', fontWeight:700, color:'#0A0A0A' }}>{title}</h3>
        <button onClick={onClose} style={{ background:'#F5F7FA', border:'none', borderRadius:'8px', padding:'7px', cursor:'pointer', color:'#6B7280', display:'flex' }}><X size={17}/></button>
      </div>
      <div style={{ padding:'24px 28px' }}>{children}</div>
    </div>
  </div>
);

const ConfirmModal = ({ title, message, onConfirm, onCancel, danger = true }: { title: string; message: string; onConfirm: () => void; onCancel: () => void; danger?: boolean }) => (
  <Modal title={title} onClose={onCancel}>
    <div style={{ textAlign:'center', padding:'8px 0 4px' }}>
      <div style={{ fontSize:'44px', marginBottom:'16px' }}>{danger ? '⚠️' : '❓'}</div>
      <p style={{ fontSize:'15px', color:'#374151', lineHeight:1.6, marginBottom:'28px' }}>{message}</p>
      <div style={{ display:'flex', justifyContent:'center', gap:'12px' }}>
        <Btn variant="ghost" onClick={onCancel}>Annuler</Btn>
        <Btn variant={danger ? 'danger-solid' : 'primary'} onClick={onConfirm}>Confirmer</Btn>
      </div>
    </div>
  </Modal>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom:'16px' }}>
    <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'7px' }}>{label}</label>
    {children}
  </div>
);

const iStyle: React.CSSProperties = { width:'100%', padding:'11px 14px', border:'1.5px solid #E8EAED', borderRadius:'11px', fontFamily:'Inter,sans-serif', fontSize:'14px', color:'#1F2937', background:'#FAFBFC', outline:'none', transition:'all 0.2s' };
const focus = (e: any) => { e.target.style.borderColor='#00B4D8'; e.target.style.background='white'; e.target.style.boxShadow='0 0 0 4px rgba(0,180,216,0.08)'; };
const blur  = (e: any) => { e.target.style.borderColor='#E8EAED'; e.target.style.background='#FAFBFC'; e.target.style.boxShadow='none'; };

const Inp = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...p} style={{ ...iStyle, ...p.style }} onFocus={focus} onBlur={blur}/>;
const Txt = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} style={{ ...iStyle, resize:'vertical', minHeight:'88px', ...p.style as any }} onFocus={focus} onBlur={blur}/>;
const Sel = (p: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} style={{ ...iStyle, background:'white', cursor:'pointer', ...p.style as any }} onFocus={focus} onBlur={blur}/>;

const Btn = ({ variant = 'primary', size = 'md', children, disabled, ...p }: any) => {
  const base: React.CSSProperties = { display:'inline-flex', alignItems:'center', gap:'7px', border:'none', borderRadius:'11px', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily:'Inter,sans-serif', fontWeight:600, transition:'all 0.2s ease', padding: size==='sm' ? '7px 13px' : '11px 18px', fontSize: size==='sm' ? '12px' : '14px', opacity: disabled ? 0.6 : 1 };
  const styles: Record<string, React.CSSProperties> = {
    primary:      { background:'linear-gradient(135deg,#00B4D8,#0077A8)', color:'white', boxShadow:'0 2px 12px rgba(0,180,216,0.2)' },
    ghost:        { background:'transparent', color:'#6B7280', border:'1.5px solid #E5E7EB' },
    danger:       { background:'transparent', color:'#EF4444', border:'1.5px solid #FECACA' },
    'danger-solid': { background:'linear-gradient(135deg,#EF4444,#DC2626)', color:'white', boxShadow:'0 2px 12px rgba(239,68,68,0.2)' },
    outline:      { background:'#F0F9FF', color:'#0077A8', border:'1.5px solid rgba(0,180,216,0.25)' },
  };
  return <button {...p} disabled={disabled} style={{ ...base, ...styles[variant] }}>{children}</button>;
};

const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button type="button" onClick={onClick} style={{ display:'inline-flex', width:'40px', height:'22px', borderRadius:'100px', background: on ? 'linear-gradient(135deg,#00B4D8,#0077A8)' : '#E5E7EB', border:'none', cursor:'pointer', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
    <span style={{ position:'absolute', top:'2px', left: on ? '20px' : '2px', width:'18px', height:'18px', borderRadius:'50%', background:'white', transition:'left 0.25s', boxShadow:'0 1px 4px rgba(0,0,0,0.15)' }}/>
  </button>
);

const Empty = ({ icon, title, sub }: { icon: string; title: string; sub: string }) => (
  <div style={{ textAlign:'center', padding:'56px 20px' }}>
    <div style={{ fontSize:'36px', marginBottom:'12px' }}>{icon}</div>
    <div style={{ fontFamily:'Syne,sans-serif', fontSize:'16px', fontWeight:700, color:'#374151', marginBottom:'6px' }}>{title}</div>
    <div style={{ fontSize:'13px', color:'#9CA3AF' }}>{sub}</div>
  </div>
);

const Spinner = ({ size = 16 }: { size?: number }) => (
  <span style={{ width:size, height:size, border:'2px solid rgba(255,255,255,0.35)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.7s linear infinite', display:'inline-block', flexShrink:0 }}/>
);

/* ═══════════════════════════════════════════════════
   DASHBOARD ROOT
═══════════════════════════════════════════════════ */
type Tab = 'overview' | 'messages' | 'projects' | 'team' | 'admins';

export default function AdminDashboard() {
  const { user, isLoading, logout } = useAdminAuth();
  const api = useApi();
  const [tab, setTab] = useState<Tab>('overview');
  const [mob, setMob] = useState(false);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const [m, p] = await Promise.all([
        api.get('/contact/admin/all'),
        api.get('/projects'),
      ]);
      if (Array.isArray(m)) setMessages(m);
      if (Array.isArray(p)) setProjects(p);
    } catch {
      toast('error', 'Erreur de chargement', 'Impossible de récupérer les données.');
    } finally { setBusy(false); }
  }, []);

  useEffect(() => { if (user) load(); }, [user]);

  if (isLoading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F8FAFC' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:'36px', height:'36px', border:'3px solid #E0F4FA', borderTopColor:'#00B4D8', borderRadius:'50%', animation:'spin 0.7s linear infinite', margin:'0 auto 14px' }}/>
        <p style={{ fontFamily:'Inter,sans-serif', color:'#9CA3AF', fontSize:'14px' }}>Chargement...</p>
      </div>
    </div>
  );

  const newCount = messages.filter(m => m.status === 'NEW').length;
  const navItems: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id:'overview',  label:"Vue d'ensemble", icon: LayoutDashboard },
    { id:'messages',  label:'Messages',        icon: MessageSquare, count: newCount || undefined },
    { id:'projects',  label:'Projets',         icon: FolderKanban,  count: projects.length || undefined },
    { id:'team',      label:'Équipe',          icon: Users },
    ...(user?.role === 'SUPER_ADMIN' ? [{ id:'admins' as Tab, label:'Admins', icon: Shield }] : []),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        body { font-family:'Inter',sans-serif; background:#F8FAFC; }

        .d-root { display:flex; min-height:100vh; }

        .sidebar {
          width:256px; background:white; border-right:1px solid #F0F4F8;
          position:fixed; top:0; left:0; bottom:0; z-index:100;
          display:flex; flex-direction:column;
          transition:transform 0.3s ease;
          box-shadow:2px 0 20px rgba(0,119,168,0.04);
        }
        @media(max-width:900px){ .sidebar{transform:translateX(-100%);} .sidebar.open{transform:translateX(0);} }

        .sb-brand { padding:24px 20px 20px; border-bottom:1px solid #F0F4F8; display:flex; align-items:center; gap:10px; }
        .sb-brand img { height:32px; object-fit:contain; }
        .sb-brand-name { font-family:'Syne',sans-serif; font-size:16px; font-weight:800; color:#0A0A0A; }
        .sb-brand-tag { font-size:10px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:#00B4D8; background:rgba(0,180,216,0.08); border:1px solid rgba(0,180,216,0.2); border-radius:100px; padding:2px 8px; margin-left:2px; }

        .sb-nav { flex:1; padding:16px 12px; overflow-y:auto; }
        .sb-section { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#C4C4C4; padding:0 10px; margin:16px 0 8px; }
        .sb-item { display:flex; align-items:center; gap:11px; width:100%; padding:10px 12px; border-radius:11px; margin-bottom:3px; border:none; background:none; cursor:pointer; text-align:left; font-family:'Inter',sans-serif; font-size:14px; font-weight:500; color:#6B7280; transition:all 0.2s ease; }
        .sb-item:hover { background:#F8FAFC; color:#0A0A0A; }
        .sb-item.active { background:linear-gradient(135deg,rgba(0,180,216,0.1),rgba(0,119,168,0.06)); color:#00B4D8; font-weight:600; border-left:3px solid #00B4D8; padding-left:9px; }
        .sb-count { margin-left:auto; background:#00B4D8; color:white; border-radius:100px; padding:2px 9px; font-size:11px; font-weight:700; }

        .sb-footer { padding:16px 12px; border-top:1px solid #F0F4F8; flex-shrink:0; }
        .sb-user { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:11px; background:#F8FAFC; border:1px solid #F0F4F8; margin-bottom:8px; }
        .sb-avatar { width:36px; height:36px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,#00B4D8,#0077A8); display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:white; }
        .sb-uname { font-size:13px; font-weight:600; color:#0A0A0A; }
        .sb-urole { font-size:11px; color:#9CA3AF; margin-top:1px; }
        .sb-logout { display:flex; align-items:center; gap:8px; width:100%; padding:10px 12px; border-radius:11px; border:none; background:none; cursor:pointer; font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:#9CA3AF; transition:all 0.2s; }
        .sb-logout:hover { background:#FEF2F2; color:#EF4444; }

        .d-main { margin-left:256px; flex:1; display:flex; flex-direction:column; min-height:100vh; }
        @media(max-width:900px){ .d-main{margin-left:0;} }

        .topbar { background:white; border-bottom:1px solid #F0F4F8; padding:0 28px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; box-shadow:0 1px 12px rgba(0,119,168,0.04); }
        .topbar-title { font-family:'Syne',sans-serif; font-size:19px; font-weight:800; color:#0A0A0A; }
        .mob-btn { display:none; background:none; border:none; cursor:pointer; color:#374151; }
        @media(max-width:900px){ .mob-btn{display:flex;} }
        .refresh-btn { display:flex; align-items:center; gap:6px; padding:8px 14px; border:1.5px solid #E8EAED; border-radius:10px; background:white; font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:#6B7280; cursor:pointer; transition:all 0.2s; }
        .refresh-btn:hover { border-color:#00B4D8; color:#00B4D8; background:#F0F9FF; }

        .d-content { padding:28px; animation:fadeUp 0.3s ease; flex:1; }

        .stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin-bottom:24px; }
        .stat-card { background:white; border:1px solid #F0F4F8; border-radius:16px; padding:24px; transition:all 0.25s ease; position:relative; overflow:hidden; box-shadow:0 1px 8px rgba(0,119,168,0.04); }
        .stat-card:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(0,180,216,0.1); border-color:rgba(0,180,216,0.2); }
        .stat-card-accent { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#00B4D8,#0077A8); }
        .stat-num { font-family:'Syne',sans-serif; font-size:34px; font-weight:900; color:#0A0A0A; line-height:1; margin-bottom:4px; }
        .stat-lbl { font-size:13px; color:#9CA3AF; font-weight:500; }
        .stat-trend { display:flex; align-items:center; gap:4px; font-size:12px; font-weight:600; color:#00B4D8; margin-top:10px; }

        .tbl-wrap { background:white; border:1px solid #F0F4F8; border-radius:16px; overflow:hidden; box-shadow:0 1px 8px rgba(0,119,168,0.04); margin-bottom:20px; }
        .tbl-head { padding:20px 24px; border-bottom:1px solid #F0F4F8; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .tbl-title { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; color:#0A0A0A; }
        .tbl-overflow { overflow-x:auto; }
        table { width:100%; border-collapse:collapse; min-width:580px; }
        th { text-align:left; padding:11px 16px; font-size:11px; font-weight:700; color:#9CA3AF; letter-spacing:0.06em; text-transform:uppercase; border-bottom:1px solid #F0F4F8; background:#FAFBFC; white-space:nowrap; }
        td { padding:14px 16px; font-size:14px; color:#374151; border-bottom:1px solid #F8FAFC; vertical-align:middle; }
        tr:last-child td { border-bottom:none; }
        tr:hover td { background:#F8FBFF; }

        .mob-overlay { display:none; position:fixed; inset:0; background:rgba(0,62,138,0.15); z-index:99; backdrop-filter:blur(2px); }
        @media(max-width:900px){ .mob-overlay.open{display:block;} }

        .filter-bar { display:flex; gap:8px; margin-bottom:20px; overflow-x:auto; padding-bottom:4px; }
        .filter-btn { padding:8px 16px; border-radius:100px; border:1.5px solid #E8EAED; background:white; font-family:'Inter',sans-serif; font-size:13px; font-weight:600; color:#6B7280; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
        .filter-btn.active { background:linear-gradient(135deg,#00B4D8,#0077A8); color:white; border-color:transparent; }
        .filter-btn:hover:not(.active) { border-color:#00B4D8; color:#00B4D8; }
      `}</style>

      <ToastContainer/>

      <div className="d-root">
        <div className={`mob-overlay ${mob ? 'open' : ''}`} onClick={() => setMob(false)}/>

        {/* ── Sidebar ── */}
        <aside className={`sidebar ${mob ? 'open' : ''}`}>
          <div className="sb-brand">
            <img src="/logo.png" alt="NGTech"/>
            <span className="sb-brand-name">NGTech</span>
            <span className="sb-brand-tag">Admin</span>
          </div>
          <nav className="sb-nav">
            <div className="sb-section">Navigation</div>
            {navItems.map(({ id, label, icon: Icon, count }) => (
              <button key={id} className={`sb-item ${tab === id ? 'active' : ''}`}
                onClick={() => { setTab(id); setMob(false); }}>
                <Icon size={17}/>{label}
                {count ? <span className="sb-count">{count}</span> : null}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <div className="sb-user">
              <div className="sb-avatar">{(user?.fullName || user?.email || 'A').charAt(0).toUpperCase()}</div>
              <div>
                <div className="sb-uname">{user?.fullName || user?.email}</div>
                <div className="sb-urole">{user?.role}</div>
              </div>
            </div>
            <button className="sb-logout" onClick={logout}><LogOut size={15}/>Déconnexion</button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="d-main">
          <div className="topbar">
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <button className="mob-btn" onClick={() => setMob(true)}><Menu size={22}/></button>
              <span className="topbar-title">{navItems.find(n => n.id === tab)?.label}</span>
            </div>
            <button className="refresh-btn" onClick={load} disabled={busy}>
              <RefreshCw size={13} style={{ animation: busy ? 'spin 0.7s linear infinite' : 'none' }}/>
              Actualiser
            </button>
          </div>

          <div className="d-content">
            {tab === 'overview'  && <OverviewTab  messages={messages} projects={projects} setTab={setTab}/>}
            {tab === 'messages'  && <MessagesTab  messages={messages} api={api} reload={load}/>}
            {tab === 'projects'  && <ProjectsTab  projects={projects} api={api} reload={load}/>}
            {tab === 'team'      && <TeamTab      api={api}/>}
            {tab === 'admins' && user?.role === 'SUPER_ADMIN' && <AdminsTab api={api}/>}
          </div>
        </main>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   OVERVIEW
═══════════════════════════════════════════════════ */
function OverviewTab({ messages, projects, setTab }: { messages: ContactMsg[]; projects: Project[]; setTab: (t: Tab) => void }) {
  const newM     = messages.filter(m => m.status === 'NEW').length;
  const resolved = messages.filter(m => m.status === 'RESOLVED').length;

  const stats = [
    { label:'Messages totaux', value:messages.length, trend:`${newM} nouveaux`,      color:'#2563EB', bg:'#EFF6FF', icon:MessageSquare },
    { label:'Projets',         value:projects.length, trend:'Publiés',               color:'#059669', bg:'#ECFDF5', icon:FolderKanban  },
    { label:'Résolus',         value:resolved,        trend:'Messages traités',       color:'#7C3AED', bg:'#F5F3FF', icon:CheckCircle   },
    { label:'En attente',      value:newM,            trend:'À traiter',              color:'#D97706', bg:'#FFFBEB', icon:Clock         },
  ];

  return (
    <div>
      {/* Banner */}
      <div style={{ background:'linear-gradient(135deg,#00B4D8,#0077A8)', borderRadius:'16px', padding:'28px 32px', marginBottom:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.7)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'6px' }}>Tableau de bord</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'26px', fontWeight:800, color:'white', margin:'0 0 4px', letterSpacing:'-0.02em' }}>Bonjour 👋</h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.75)', margin:0 }}>Voici un résumé de votre activité NGTech.</p>
        </div>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
          <button onClick={() => setTab('messages')} style={{ background:'rgba(255,255,255,0.15)', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:'11px', padding:'10px 18px', color:'white', fontFamily:'Inter,sans-serif', fontSize:'13px', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
            <MessageSquare size={15}/>Messages
          </button>
          <button onClick={() => setTab('projects')} style={{ background:'white', border:'none', borderRadius:'11px', padding:'10px 18px', color:'#00B4D8', fontFamily:'Inter,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
            <FolderKanban size={15}/>Projets
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card">
              <div className="stat-card-accent"/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={20} color={s.color}/>
                </div>
                <ArrowUpRight size={15} color="#E0E0E0"/>
              </div>
              <div className="stat-num">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
              <div className="stat-trend"><TrendingUp size={12}/>{s.trend}</div>
            </div>
          );
        })}
      </div>

      {/* Table aperçu */}
      <div className="tbl-wrap">
        <div className="tbl-head">
          <span className="tbl-title">Derniers messages</span>
          <button onClick={() => setTab('messages')} style={{ display:'flex', alignItems:'center', gap:'5px', background:'#F0F9FF', border:'1.5px solid rgba(0,180,216,0.2)', borderRadius:'9px', padding:'7px 13px', fontFamily:'Inter,sans-serif', fontSize:'12px', fontWeight:600, color:'#0077A8', cursor:'pointer' }}>
            Voir tout <ChevronRight size={13}/>
          </button>
        </div>
        <div className="tbl-overflow">
          <table>
            <thead><tr><th>Contact</th><th>Service</th><th>Statut</th><th>Date</th></tr></thead>
            <tbody>
              {messages.slice(0, 6).map(m => (
                <tr key={m.id}>
                  <td><div style={{ fontWeight:600, color:'#0A0A0A' }}>{m.fullName}</div><div style={{ fontSize:'12px', color:'#9CA3AF' }}>{m.email}</div></td>
                  <td>{m.serviceDesired ? <Pill label={m.serviceDesired}/> : '—'}</td>
                  <td><StatusBadge status={m.status}/></td>
                  <td style={{ color:'#9CA3AF', fontSize:'13px' }}>{new Date(m.createdAt).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {messages.length === 0 && <Empty icon="📭" title="Aucun message" sub="Les messages apparaîtront ici"/>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MESSAGES
═══════════════════════════════════════════════════ */
function MessagesTab({ messages, api, reload }: { messages: ContactMsg[]; api: any; reload: () => void }) {
  const [filter, setFilter]   = useState('ALL');
  const [selected, setSelected] = useState<ContactMsg | null>(null);
  const [saving, setSaving]   = useState(false);

  const filtered = filter === 'ALL' ? messages : messages.filter(m => m.status === filter);

  const updateStatus = async (id: string, status: ContactStatus) => {
    setSaving(true);
    try {
      await api.patch(`/contact/admin/${id}/status`, { status });
      toast('success', 'Statut mis à jour', `Message marqué comme "${status}".`);
      reload();
      setSelected(null);
    } catch (e: any) {
      toast('error', 'Erreur', e.message);
    } finally { setSaving(false); }
  };

  const filters = [
    { key:'ALL',         label:'Tous',       count: messages.length },
    { key:'NEW',         label:'Nouveaux',   count: messages.filter(m => m.status==='NEW').length },
    { key:'IN_PROGRESS', label:'En cours',   count: messages.filter(m => m.status==='IN_PROGRESS').length },
    { key:'RESOLVED',    label:'Résolus',    count: messages.filter(m => m.status==='RESOLVED').length },
    { key:'SPAM',        label:'Spam',       count: messages.filter(m => m.status==='SPAM').length },
  ];

  return (
    <div>
      <div className="filter-bar">
        {filters.map(f => (
          <button key={f.key} className={`filter-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <div className="tbl-wrap">
        <div className="tbl-head"><span className="tbl-title">Messages ({filtered.length})</span></div>
        <div className="tbl-overflow">
          <table>
            <thead><tr><th>Contact</th><th>Sujet</th><th>Service</th><th>Statut</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td><div style={{ fontWeight:600, color:'#0A0A0A' }}>{m.fullName}</div><div style={{ fontSize:'12px', color:'#9CA3AF' }}>{m.email}</div></td>
                  <td style={{ maxWidth:'180px' }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontWeight:500 }}>{m.subject || 'Sans sujet'}</div></td>
                  <td>{m.serviceDesired ? <Pill label={m.serviceDesired}/> : '—'}</td>
                  <td><StatusBadge status={m.status}/></td>
                  <td style={{ color:'#9CA3AF', fontSize:'13px', whiteSpace:'nowrap' }}>{new Date(m.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td><Btn variant="outline" size="sm" onClick={() => setSelected(m)}><Eye size={13}/>Voir</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <Empty icon="📭" title="Aucun message" sub="Aucun message pour ce filtre"/>}
      </div>

      {selected && (
        <Modal title={`Message — ${selected.fullName}`} onClose={() => setSelected(null)}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px' }}>
            {[['Email', selected.email], ['Téléphone', selected.phone||'—'], ['Entreprise', selected.company||'—'], ['Pays', selected.country||'—'], ['Service', selected.serviceDesired||'—'], ['Budget', selected.budget||'—']].map(([l, v]) => (
              <div key={l} style={{ background:'#F8FAFC', borderRadius:'10px', padding:'12px', border:'1px solid #F0F4F8' }}>
                <div style={{ fontSize:'10px', fontWeight:700, color:'#9CA3AF', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'4px' }}>{l}</div>
                <div style={{ fontSize:'14px', fontWeight:500, color:'#1F2937' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'#F8FAFC', borderRadius:'12px', padding:'16px', border:'1px solid #F0F4F8', marginBottom:'20px' }}>
            <div style={{ fontSize:'10px', fontWeight:700, color:'#9CA3AF', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'8px' }}>Message</div>
            <p style={{ fontSize:'14px', color:'#374151', lineHeight:1.65, whiteSpace:'pre-wrap' }}>{selected.message}</p>
          </div>
          <div>
            <div style={{ fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'10px' }}>Changer le statut :</div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {(['NEW','IN_PROGRESS','RESOLVED','SPAM'] as ContactStatus[]).map(s => (
                <Btn key={s} variant={selected.status === s ? 'primary' : 'ghost'} size="sm"
                  disabled={saving} onClick={() => updateStatus(selected.id, s)}>
                  {s === 'NEW' ? 'Nouveau' : s === 'IN_PROGRESS' ? 'En cours' : s === 'RESOLVED' ? 'Résolu' : 'Spam'}
                </Btn>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════ */
const slugify = (t: string) => t.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/[\s_-]+/g,'-').replace(/^-+|-+$/g,'');

function ProjectsTab({ projects, api, reload }: { projects: Project[]; api: any; reload: () => void }) {
  const [modal, setModal]           = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editing, setEditing]       = useState<Project | null>(null);
  const [saving, setSaving]         = useState(false);
  const empty = { title:'', description:'', projectType:'MOBILE', isCommunityProject:false, techStack:'', repoUrl:'', liveUrl:'' };
  const [form, setForm] = useState(empty);
  const F = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const openNew  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({ title:p.title, description:p.description, projectType:p.projectType, isCommunityProject:p.isCommunityProject, techStack:p.techStack.join(', '), repoUrl:p.repoUrl||'', liveUrl:p.liveUrl||'' }); setModal(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.trim().length < 20) {
      toast('warning', 'Description trop courte', 'Minimum 20 caractères requis par le backend.'); return;
    }
    setSaving(true);
    const payload: any = {
      title: form.title.trim(),
      slug: editing ? editing.slug : slugify(form.title),
      description: form.description.trim(),
      projectType: form.projectType,
      isCommunityProject: form.isCommunityProject,
      techStack: form.techStack.split(',').map((t: string) => t.trim()).filter(Boolean),
    };
    if (form.repoUrl.startsWith('http')) payload.repoUrl = form.repoUrl.trim();
    if (form.liveUrl.startsWith('http')) payload.liveUrl = form.liveUrl.trim();
    try {
      if (editing) {
        await api.patch(`/projects/${editing.id}`, payload);
        toast('success', 'Projet mis à jour', `"${form.title}" a été modifié.`);
      } else {
        await api.post('/projects', payload);
        toast('success', 'Projet créé !', `"${form.title}" ajouté au catalogue.`);
      }
      setModal(false); setEditing(null); reload();
    } catch (e: any) {
      toast('error', 'Erreur', e.message);
    } finally { setSaving(false); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.del(`/projects/${deleteTarget}`);
      toast('success', 'Projet supprimé', 'Le projet a été retiré du catalogue.');
      setDeleteTarget(null); reload();
    } catch (e: any) {
      toast('error', 'Erreur suppression', e.message);
    }
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'20px', fontWeight:700 }}>Catalogue ({projects.length})</h2>
        <Btn variant="primary" onClick={openNew}><Plus size={16}/>Ajouter un projet</Btn>
      </div>

      <div className="tbl-wrap">
        <div className="tbl-overflow">
          <table>
            <thead><tr><th>Projet</th><th>Type</th><th>Mission Sociale</th><th>Stack</th><th>Liens</th><th></th></tr></thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td><div style={{ fontWeight:600, color:'#0A0A0A' }}>{p.title}</div><div style={{ fontSize:'12px', color:'#9CA3AF' }}>/{p.slug}</div></td>
                  <td><Pill label={p.projectType} color={p.projectType==='MOBILE'?'#00B4D8':'#7C3AED'}/></td>
                  <td>{p.isCommunityProject ? <Pill label="Communautaire" color="#059669"/> : <Pill label="Commercial" color="#9CA3AF"/>}</td>
                  <td><div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>{p.techStack.slice(0,3).map((t,i)=><span key={i} style={{ fontSize:'11px', background:'#F3F4F6', padding:'2px 7px', borderRadius:'5px' }}>{t}</span>)}{p.techStack.length>3&&<span style={{ fontSize:'11px', color:'#9CA3AF' }}>+{p.techStack.length-3}</span>}</div></td>
                  <td><div style={{ display:'flex', gap:'8px' }}>{p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color:'#00B4D8', display:'flex' }}><ExternalLink size={14}/></a>}{p.repoUrl&&<a href={p.repoUrl} target="_blank" rel="noopener noreferrer" style={{ color:'#6B7280', display:'flex' }}><Globe size={14}/></a>}</div></td>
                  <td><div style={{ display:'flex', gap:'6px' }}><Btn variant="ghost" size="sm" onClick={()=>openEdit(p)}><Edit3 size={13}/></Btn><Btn variant="danger" size="sm" onClick={()=>setDeleteTarget(p.id)}><Trash2 size={13}/></Btn></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {projects.length === 0 && <Empty icon="📁" title="Aucun projet" sub="Commencez à alimenter votre portfolio."/>}
      </div>

      {modal && (
        <Modal title={editing ? 'Modifier le projet' : 'Nouveau projet'} onClose={() => setModal(false)}>
          <form onSubmit={handleSubmit}>
            <Field label="Titre *"><Inp required value={form.title} onChange={e=>F('title',e.target.value)} placeholder="Ex: EVA App"/></Field>
            <Field label="Description * (min. 20 caractères)"><Txt required value={form.description} onChange={e=>F('description',e.target.value)} placeholder="Une application mobile pour..."/></Field>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 14px' }}>
              <Field label="Type *"><Sel value={form.projectType} onChange={e=>F('projectType',e.target.value)}><option value="MOBILE">MOBILE</option><option value="FULLSTACK">FULLSTACK</option></Sel></Field>
              <Field label="Stack (virgules)"><Inp value={form.techStack} onChange={e=>F('techStack',e.target.value)} placeholder="React, Node.js, ..."/></Field>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 14px' }}>
              <Field label="URL Live"><Inp value={form.liveUrl} onChange={e=>F('liveUrl',e.target.value)} placeholder="https://..."/></Field>
              <Field label="URL Repo"><Inp value={form.repoUrl} onChange={e=>F('repoUrl',e.target.value)} placeholder="https://github.com/..."/></Field>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <Toggle on={form.isCommunityProject as boolean} onClick={()=>F('isCommunityProject',!form.isCommunityProject)}/>
              <span style={{ fontSize:'14px', fontWeight:500, color:'#374151' }}>Projet à impact communautaire</span>
            </div>
            <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
              <Btn variant="ghost" type="button" onClick={()=>setModal(false)}>Annuler</Btn>
              <Btn variant="primary" type="submit" disabled={saving}>{saving?<><Spinner/>Enregistrement...</>:<><Save size={14}/>Enregistrer</>}</Btn>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Supprimer le projet"
          message="Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEAM
═══════════════════════════════════════════════════ */
function TeamTab({ api }: { api: any }) {
  const [members, setMembers]         = useState<TeamMember[]>([]);
  const [loading, setLoading]         = useState(true);
  const [modal, setModal]             = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editing, setEditing]         = useState<TeamMember | null>(null);
  const [saving, setSaving]           = useState(false);
  const empty = { fullName:'', role:'', techSpecialty:'', bio:'', linkedInUrl:'', githubUrl:'', order:0, isActive:true };
  const [form, setForm] = useState(empty);
  const F = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.get('/team/admin/all');
      if (Array.isArray(d)) setMembers(d);
    } catch { toast('error', 'Erreur', 'Impossible de charger l\'équipe.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (m: TeamMember) => { 
    setEditing(m); 
    setForm({ 
      fullName: m.fullName, 
      role: m.role, 
      techSpecialty: m.techSpecialty, 
      bio: m.bio || '', 
      linkedInUrl: m.linkedInUrl || '', 
      githubUrl: m.githubUrl || '', 
      order: m.order, 
      isActive: m.isActive 
    }); 
    setModal(true); 
  };

  // 🔧 FONCTION CORRIGÉE : Nettoie les données avant envoi
  const prepareFormData = () => {
    const data: any = {
      fullName: form.fullName,
      role: form.role,
      techSpecialty: form.techSpecialty,
      order: form.order,
      isActive: form.isActive,
    };
    
    // Bio : si chaîne vide → undefined (ne pas envoyer)
    if (form.bio && form.bio.trim() !== '') data.bio = form.bio.trim();
    
    // LinkedIn : si chaîne vide → null (supprimer la valeur en BDD)
    if (form.linkedInUrl && form.linkedInUrl.trim() !== '') {
      data.linkedInUrl = form.linkedInUrl.trim();
    } else {
      data.linkedInUrl = null;  // ← clé : envoyer null au lieu de ""
    }
    
    // GitHub : si chaîne vide → null
    if (form.githubUrl && form.githubUrl.trim() !== '') {
      data.githubUrl = form.githubUrl.trim();
    } else {
      data.githubUrl = null;  // ← clé : envoyer null au lieu de ""
    }
    
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSend = prepareFormData();
      
      if (editing) {
        await api.patch(`/team/${editing.id}`, dataToSend);
        toast('success', 'Membre mis à jour', `${form.fullName} a été modifié.`);
      } else {
        await api.post('/team', dataToSend);
        toast('success', 'Membre ajouté !', `${form.fullName} rejoint l'équipe.`);
      }
      setModal(false); setEditing(null); load();
    } catch (e: any) {
      toast('error', 'Erreur', e.message);
    } finally { setSaving(false); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.del(`/team/${deleteTarget}`);
      toast('success', 'Membre retiré', 'Le profil a été supprimé.');
      setDeleteTarget(null); load();
    } catch (e: any) {
      toast('error', 'Erreur suppression', e.message);
    }
  };

  const toggleActive = async (m: TeamMember) => {
    try {
      await api.patch(`/team/${m.id}`, { isActive: !m.isActive });
      toast('info', m.isActive ? 'Membre masqué' : 'Membre activé', `${m.fullName} ${m.isActive ? 'n\'est plus visible' : 'est maintenant visible'} sur le site.`);
      load();
    } catch (e: any) {
      toast('error', 'Erreur', e.message);
    }
  };

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'60px' }}>
      <div style={{ width:'32px', height:'32px', border:'3px solid #E0F4FA', borderTopColor:'#00B4D8', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}/>
    </div>
  );

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'20px', fontWeight:700 }}>Équipe ({members.length})</h2>
        <Btn variant="primary" onClick={openNew}><Plus size={16}/>Ajouter un membre</Btn>
      </div>

      <div className="tbl-wrap">
        <div className="tbl-overflow">
          <table>
            <thead>
              <tr><th>Membre</th><th>Rôle</th><th>Spécialité</th><th>Ordre</th><th>Visible</th><th></th></tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:'linear-gradient(135deg,#00B4D8,#0077A8)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Syne,sans-serif', fontSize:'15px', fontWeight:800, color:'white', flexShrink:0 }}>
                        {m.fullName.charAt(0)}
                      </div>
                      <div><div style={{ fontWeight:600, color:'#0A0A0A' }}>{m.fullName}</div><div style={{ fontSize:'12px', color:'#9CA3AF' }}>{m.role}</div></div>
                    </div>
                  </td>
                  <td style={{ fontSize:'13px', color:'#6B7280' }}>{m.role}</td>
                  <td><Pill label={m.techSpecialty}/></td>
                  <td style={{ fontSize:'13px', color:'#9CA3AF' }}>#{m.order}</td>
                  <td><Toggle on={m.isActive} onClick={() => toggleActive(m)}/></td>
                  <td><div style={{ display:'flex', gap:'6px' }}><Btn variant="ghost" size="sm" onClick={()=>openEdit(m)}><Edit3 size={13}/></Btn><Btn variant="danger" size="sm" onClick={()=>setDeleteTarget(m.id)}><Trash2 size={13}/></Btn></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {members.length === 0 && <Empty icon="👥" title="Aucun membre" sub="Ajoutez les membres de votre équipe."/>}
      </div>

      {modal && (
        <Modal title={editing ? 'Modifier le membre' : 'Nouveau membre'} onClose={() => setModal(false)}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 14px' }}>
              <Field label="Nom complet *"><Inp required value={form.fullName} onChange={e=>F('fullName',e.target.value)} placeholder="Amadou Barry"/></Field>
              <Field label="Rôle *"><Inp required value={form.role} onChange={e=>F('role',e.target.value)} placeholder="Développeur Backend"/></Field>
              <Field label="Spécialité *"><Inp required value={form.techSpecialty} onChange={e=>F('techSpecialty',e.target.value)} placeholder="Node.js, TypeScript"/></Field>
              <Field label="Ordre d'affichage"><Inp type="number" value={form.order} onChange={e=>F('order',parseInt(e.target.value)||0)}/></Field>
              <Field label="LinkedIn"><Inp value={form.linkedInUrl} onChange={e=>F('linkedInUrl',e.target.value)} placeholder="https://linkedin.com/in/..."/></Field>
              <Field label="GitHub"><Inp value={form.githubUrl} onChange={e=>F('githubUrl',e.target.value)} placeholder="https://github.com/..."/></Field>
            </div>
            <Field label="Bio"><Txt value={form.bio} onChange={e=>F('bio',e.target.value)} placeholder="Présentation courte..."/></Field>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <Toggle on={form.isActive as boolean} onClick={()=>F('isActive',!form.isActive)}/>
              <span style={{ fontSize:'14px', fontWeight:500, color:'#374151' }}>Visible sur le site public</span>
            </div>
            <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
              <Btn variant="ghost" type="button" onClick={()=>setModal(false)}>Annuler</Btn>
              <Btn variant="primary" type="submit" disabled={saving}>{saving?<><Spinner/>Enregistrement...</>:<><Save size={14}/>Enregistrer</>}</Btn>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Retirer un membre"
          message="Êtes-vous sûr de vouloir supprimer ce membre ? Ses informations ne seront plus visibles."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ADMINS
═══════════════════════════════════════════════════ */

function AdminsTab({ api }: { api: any }) {
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [me, setMe] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const empty = { email: '', password: '', fullName: '', role: 'ADMIN' };
  const [form, setForm] = useState(empty);
  const F = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const loadData = async () => {
    setLoading(true);
    try {
      const [meData, adminsData] = await Promise.all([
        api.get('/auth/me').catch(() => null),
        api.get('/auth/admins').catch(() => [])
      ]);
      setMe(meData);
      setAdmins(Array.isArray(adminsData) ? adminsData : []);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast('warning', 'Mot de passe trop court', 'Minimum 8 caractères requis.');
      return;
    }
    setSaving(true);
    try {
      await api.post('/auth/admins', { ...form, fullName: form.fullName || undefined });
      toast('success', 'Admin créé !', `Le compte ${form.email} a été créé.`);
      setModal(false);
      setForm(empty);
      loadData();
    } catch (e: any) {
      toast('error', 'Erreur création', e.message);
    } finally {
      setSaving(false);
    }
  };

  // ✅ Fonction pour activer/désactiver un admin
  const toggleAdminStatus = async (adminId: string, currentStatus: boolean) => {
    if (toggling) return;
    setToggling(adminId);
    try {
      const updated = await api.patch(`/auth/admins/${adminId}/toggle-status`);
      toast('success', currentStatus ? 'Admin désactivé' : 'Admin activé', 
        `${updated.fullName || updated.email} est maintenant ${updated.isActive ? 'actif' : 'inactif'}`);
      loadData();
    } catch (e: any) {
      toast('error', 'Erreur', e.message);
    } finally {
      setToggling(null);
    }
  };

  const canManageAdmins = me?.role === 'SUPER_ADMIN';

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid #E0F4FA', borderTopColor: '#00B4D8', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={20} /> Administrateurs ({admins.length})
        </h2>
        {canManageAdmins && (
          <Btn variant="primary" onClick={() => setModal(true)}>
            <Plus size={16} /> Nouvel admin
          </Btn>
        )}
      </div>

      <div className="tbl-wrap">
        <div className="tbl-overflow">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                {canManageAdmins && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} style={{ opacity: admin.isActive ? 1 : 0.6 }}>
                  <td style={{ fontWeight: admin.id === me?.id ? 700 : 400 }}>
                    {admin.fullName || '—'}
                    {admin.id === me?.id && <span style={{ marginLeft: '8px', fontSize: '10px', color: '#00B4D8' }}>(vous)</span>}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{admin.email}</td>
                  <td>
                    <Pill
                      label={admin.role}
                      color={admin.role === 'SUPER_ADMIN' ? '#DC2626' : '#00B4D8'}
                    />
                  </td>
                  <td>
                    <Pill
                      label={admin.isActive ? 'Actif' : 'Inactif'}
                      color={admin.isActive ? '#10B981' : '#9CA3AF'}
                    />
                  </td>
                  <td style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleDateString('fr-FR') : 'Jamais'}
                  </td>
                  {canManageAdmins && (
                    <td>
                      {admin.id !== me?.id && (
                        <Btn
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAdminStatus(admin.id, admin.isActive)}
                          disabled={toggling === admin.id}
                          style={{ color: admin.isActive ? '#EF4444' : '#10B981' }}
                        >
                          {toggling === admin.id ? (
                            <RefreshCw size={14} style={{ animation: 'spin 0.7s linear infinite' }} />
                          ) : admin.isActive ? (
                            <><PowerOff size={14} /> Désactiver</>
                          ) : (
                            <><Power size={14} /> Activer</>
                          )}
                        </Btn>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {admins.length === 0 && !loading && (
          <Empty icon="🛡️" title="Aucun administrateur" sub="Créez votre premier administrateur." />
        )}
      </div>

      {modal && (
        <Modal title="Créer un administrateur" onClose={() => setModal(false)}>
          <form onSubmit={handleSubmit}>
            <Field label="Nom complet">
              <Inp value={form.fullName} onChange={e => F('fullName', e.target.value)} placeholder="Prénom Nom" />
            </Field>
            <Field label="Email *">
              <Inp required type="email" value={form.email} onChange={e => F('email', e.target.value)} placeholder="admin@ngtech.com" />
            </Field>
            <Field label="Mot de passe * (min. 8 caractères)">
              <Inp required type="password" value={form.password} onChange={e => F('password', e.target.value)} placeholder="••••••••" />
            </Field>
            <Field label="Rôle">
              <Sel value={form.role} onChange={e => F('role', e.target.value)}>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </Sel>
            </Field>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Btn variant="ghost" type="button" onClick={() => setModal(false)}>Annuler</Btn>
              <Btn variant="primary" type="submit" disabled={saving}>
                {saving ? <><Spinner /> Création...</> : <><Plus size={14} /> Créer</>}
              </Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

