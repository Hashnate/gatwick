import React, { useState, useEffect } from 'react';
import { Phone, Mail, Lock, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Facebook = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Linkedin = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const Instagram = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const Youtube = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);

export default function Header({ currentPage, setCurrentPage, onOpenPortal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { 
      id: 'about', 
      label: 'About Us',
      subMenu: [
        { id: 'about-story', label: 'Our Story' },
        { id: 'about-campus', label: 'Campuses' },
        { id: 'about-accreditation', label: 'Accreditation & Affiliates' },
        { id: 'about-testimonials', label: 'Student Testimonials' }
      ]
    },
    { id: 'programs', label: 'Programs' },
    { id: 'othm', label: 'OTHM Qualifications' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId) => {
    const targetPage = pageId.startsWith('about-') ? 'about' : pageId;
    setCurrentPage(targetPage);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#${pageId}`);
  };

  return (
    <div className="header-wrapper">
      {/* Main Header - compact nav bar */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" onClick={() => handleNavClick('home')} className="logo-container" style={{ textDecoration: 'none' }}>
            <Logo height={42} />
          </a>

          <ul className="nav-menu">
            {navItems.map((item) => (
              <li 
                key={item.id} 
                className={item.subMenu ? "nav-item-dropdown" : ""}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
                {item.subMenu && (
                  <div className="nav-dropdown-menu">
                    {item.subMenu.map((sub) => (
                      <a
                        key={sub.id}
                        href={`#${sub.id}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick(sub.id); }}
                        className="nav-dropdown-item"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginLeft: 'auto', flexShrink: 0 }}>
            <a 
              href="https://lms.gcbt.edu.lk/login/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="portal-login-nav-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '8px',
                backgroundColor: '#0a2540',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                boxShadow: '0 3px 8px rgba(10, 37, 64, 0.18)'
              }}
              aria-label="Moodle Login"
            >
              <Lock size={15} />
              <span>Moodle Login</span>
            </a>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open mobile navigation drawer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <button
          className="mobile-drawer-close"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Close mobile navigation drawer"
        >
          <X size={26} />
        </button>

        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.subMenu ? (
                <li style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                    className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                  <ul style={{ listStyle: 'none', paddingLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    {item.subMenu.map((sub) => (
                      <li key={sub.id}>
                        <a
                          href={`#${sub.id}`}
                          onClick={(e) => { e.preventDefault(); handleNavClick(sub.id); }}
                          className="mobile-nav-link"
                          style={{ fontSize: '0.9rem', fontWeight: 500, padding: '0.2rem 0', color: '#64748b' }}
                        >
                          • {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.id}>
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

        <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
          <a
            href="https://lms.gcbt.edu.lk/login/index.php"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsDrawerOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', gap: '0.5rem', marginBottom: '1rem', textDecoration: 'none', justifyContent: 'center', backgroundColor: '#0a2540' }}
          >
            <Lock size={16} /> Moodle Login
          </a>
          <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>Hotline: +94 77 344 7878</div>
            <div>Email: admission@gcbt.edu.lk</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="https://www.facebook.com/gatwickcollege/" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/company/gatwick-college-of-business-technology" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/gatwickcollege/" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.youtube.com/@gatwickcollege" target="_blank" rel="noopener noreferrer" style={{ color: '#0a2540' }} aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}