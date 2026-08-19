import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Lock, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { WhatsAppIcon } from './WhatsAppButton';

const Facebook = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Linkedin = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const Instagram = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const Youtube = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);



// ─── ChevronDown icon ─────────────────────────────────────────────────────────
const ChevronDown = ({ size = 12, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, ...style }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function Header({ currentPage, setCurrentPage, onOpenPortal, activeAboutTab, setActiveAboutTab, setFilterState }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock document scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.documentElement.classList.add('drawer-open');
      document.body.classList.add('drawer-open');
    } else {
      document.documentElement.classList.remove('drawer-open');
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.documentElement.classList.remove('drawer-open');
      document.body.classList.remove('drawer-open');
    };
  }, [isDrawerOpen]);

  // ── Navigation items ────────────────────────────────────────────────────────
  const navItems = [
    { id: 'home', label: 'Home' },
    {
      id: 'about',
      label: 'About Us',
      subMenu: [
        { id: 'about-story',         label: 'Our Story' },
        { id: 'about-campus',        label: 'Campuses' },
        { id: 'about-accreditation', label: 'Accreditation & Affiliates' },
        { id: 'about-testimonials',  label: 'Student Testimonials' }
      ]
    },
    {
      id: 'programs',
      label: 'Programs',
      subMenu: [
        { id: 'programs-postgraduate',        label: 'Postgraduate Programs' },
        { id: 'programs-undergraduate',       label: 'Undergraduate Programs' },
        { id: 'programs-foundation_diploma', label: 'Diploma Programs' },
      ]
    },
    {
      id: 'new-students',
      label: 'New Students',
      subMenu: [
        { id: 'ns-admissions',    label: 'Admissions & Entry' },
        { id: 'ns-international', label: 'International Students' },
        { id: 'ns-student-life',  label: 'Student Life' }
      ]
    },
    { id: 'contact', label: 'Contact Us' }
  ];

  // ── Click handler ───────────────────────────────────────────────────────────
  const handleNavClick = (pageId, options = {}) => {
    const { tab, anchor } = options;

    setIsDrawerOpen(false);
    setMobileExpandedId(null);

    if (pageId.startsWith('ns-')) {
      if (pageId === 'ns-admissions') {
        setCurrentPage('admissions');
        setTimeout(() => window.dispatchEvent(new CustomEvent('gcbt:setAdmissionsTab', { detail: { tab: 'diploma' } })), 80);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (pageId === 'ns-international') {
        setCurrentPage('admissions');
        setTimeout(() => window.dispatchEvent(new CustomEvent('gcbt:setAdmissionsTab', { detail: { tab: 'international' } })), 80);
        setTimeout(() => window.dispatchEvent(new CustomEvent('gcbt:scrollToAnchor', { detail: { anchor: 'international-section' } })), 150);
      } else if (pageId === 'ns-student-life') {
        setCurrentPage('student-life');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (pageId.startsWith('programs-')) {
      const levelKey = pageId.replace('programs-', '');
      if (setFilterState) {
        setFilterState(prev => ({ ...prev, level: levelKey }));
      }
      setCurrentPage('programs');
      window.history.pushState(null, '', '#programs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageId.startsWith('about-')) {
      setCurrentPage('about');
      const tabMap = {
        'about-story': 'story',
        'about-campus': 'campus',
        'about-accreditation': 'accreditation',
        'about-testimonials': 'testimonials',
      };
      setActiveAboutTab(tabMap[pageId] || 'story');
      window.history.pushState(null, '', `#${pageId}`);
    } else {
      setCurrentPage(pageId);
      window.history.pushState(null, '', `#${anchor || pageId}`);
    }

    // Signal tab switch
    if (tab) {
      setTimeout(() => window.dispatchEvent(new CustomEvent('gcbt:setAdmissionsTab', { detail: { tab } })), 80);
    }
    if (anchor) {
      setTimeout(() => window.dispatchEvent(new CustomEvent('gcbt:scrollToAnchor', { detail: { anchor } })), 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isNewStudentsActive = currentPage === 'admissions' || currentPage === 'student-life';
  const isProgramsActive = currentPage === 'programs';

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="header-wrapper">
      {/* ── Desktop header ─────────────────────────────────────────────────── */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="logo-container" style={{ textDecoration: 'none' }}>
            <Logo height={42} />
          </a>

          {/* Nav */}
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={item.subMenu ? 'nav-item-dropdown' : item.isMega ? 'nav-item-mega' : ''}
              >
                {/* Top-level link */}
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!item.subMenu && !item.isMega) handleNavClick(item.id);
                  }}
                  className={`nav-link ${
                    item.isMega
                      ? isNewStudentsActive ? 'active' : ''
                      : currentPage === item.id ? 'active' : ''
                  }`}
                >
                  {item.label}
                  {(item.subMenu || item.isMega) && <ChevronDown size={12} style={{ marginLeft: '4px' }} />}
                </a>

                {/* Standard sub-menu */}
                {item.subMenu && (
                  <div className="nav-dropdown-menu" style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
                    {item.subMenu.map((sub) => {
                      const tabMap = { 'about-story': 'story', 'about-campus': 'campus', 'about-accreditation': 'accreditation', 'about-testimonials': 'testimonials' };
                      const isActive = currentPage === 'about' && activeAboutTab === tabMap[sub.id];
                      return (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          onClick={(e) => { e.preventDefault(); handleNavClick(sub.id); }}
                          className={`nav-dropdown-item ${isActive ? 'active' : ''}`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {sub.label}
                        </a>
                      );
                    })}
                  </div>
                )}


              </li>
            ))}
          </ul>

          {/* Right-side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            <a
              href="https://lms.gcbt.edu.lk/login/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="portal-login-nav-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.95rem', borderRadius: '8px', backgroundColor: '#0a2540', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.25s ease', boxShadow: '0 3px 8px rgba(10, 37, 64, 0.18)' }}
              aria-label="Moodle Login"
            >
              <Lock size={15} />
              <span>Moodle Login</span>
            </a>

            <button className="mobile-menu-btn" onClick={() => setIsDrawerOpen(true)} aria-label="Open mobile navigation drawer">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer overlay & drawer (rendered via Portal) ────────────── */}
      {typeof document !== 'undefined' && createPortal(
        <>
          <div
            className={`mobile-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
            onClick={() => setIsDrawerOpen(false)}
            onTouchMove={(e) => { if (e.cancelable) e.preventDefault(); }}
          />

          <div
            className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-close-wrap">
              <button className="mobile-drawer-close" onClick={() => setIsDrawerOpen(false)} aria-label="Close mobile navigation drawer">
                <X size={26} />
              </button>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <React.Fragment key={item.id}>
                  {/* About Us – standard sub-menu */}
                  {item.subMenu && (
                    <li style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <button
                        onClick={() => setMobileExpandedId(mobileExpandedId === item.id ? null : item.id)}
                        className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
                        style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        {item.label}
                        <ChevronDown style={{ transform: mobileExpandedId === item.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                      </button>
                      {mobileExpandedId === item.id && (
                        <ul style={{ listStyle: 'none', paddingLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                          {item.subMenu.map((sub) => (
                            <li key={sub.id}>
                              <a href={`#${sub.id}`} onClick={(e) => { e.preventDefault(); handleNavClick(sub.id); }} className="mobile-nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, padding: '0.2rem 0', color: '#64748b' }}>
                                • {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )}

              {/* Plain link items */}
                  {!item.subMenu && (
                    <li>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                        className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {/* Drawer footer */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <a href="https://lms.gcbt.edu.lk/login/index.php" target="_blank" rel="noopener noreferrer" onClick={() => setIsDrawerOpen(false)} className="btn btn-primary" style={{ width: '100%', gap: '0.5rem', marginBottom: '1rem', textDecoration: 'none', justifyContent: 'center', backgroundColor: '#0a2540' }}>
                <Lock size={16} /> Moodle Login
              </a>
              <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <a 
                  href="https://wa.me/94773447878?text=Hello%20Gatwick%20College%2C%20I%20would%20like%20to%20inquire%20about%20your%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25D366', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <WhatsAppIcon size={16} color="#25D366" />
                  <span>WhatsApp: 077 344 7878</span>
                </a>
                <div>Hotline: +94 77 344 7878</div>
                <div>Email: admission@gcbt.edu.lk</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a href="https://www.facebook.com/gatwickcollege/" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="Facebook"><Facebook size={20} /></a>
                <a href="https://www.linkedin.com/company/gatwick-college-of-business-technology" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="https://www.instagram.com/gatwickcollege/" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="Instagram"><Instagram size={20} /></a>
                <a href="https://www.youtube.com/@gatwickcollege" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="YouTube"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}