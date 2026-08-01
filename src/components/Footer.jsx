import React from 'react';
import { Phone, Mail, MapPin, Award } from 'lucide-react';
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

export default function Footer({ setCurrentPage }) {
  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#${pageId}`);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid-4" style={{ gap: '2rem' }}>
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <Logo isDark={true} height={40} />
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.45', marginBottom: '1rem' }}>
              Gatwick College of Business and Technology (GCBT) delivers internationally accredited UK diplomas under Ofqual regulation, providing direct progression pathways to world-class university degrees.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <a href="https://www.facebook.com/gatwickcollege/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }} aria-label="Facebook" className="social-icon-link">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/company/gatwick-college-of-business-technology" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }} aria-label="LinkedIn" className="social-icon-link">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/gatwickcollege/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }} aria-label="Instagram" className="social-icon-link">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@gatwickcollege" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s ease' }} aria-label="YouTube" className="social-icon-link">
                <Youtube size={18} />
              </a>
            </div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.75rem', 
              color: '#2ea3f2', 
              fontWeight: 600, 
              border: '1px solid rgba(46, 163, 242, 0.3)',
              padding: '0.4rem 0.75rem',
              borderRadius: '4px'
            }}>
              <Award size={14} /> Ofqual Regulated Delivery Centre
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home Page</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About Institution</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Academic Programs</a></li>
              <li><a href="#admissions" onClick={(e) => { e.preventDefault(); handleNavClick('admissions'); }}>Apply & Admissions</a></li>
              <li><a href="#student-life" onClick={(e) => { e.preventDefault(); handleNavClick('student-life'); }}>Student Life</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact Campus</a></li>
            </ul>
          </div>

          {/* Column 3: Subject areas */}
          <div>
            <h3>Academic Schools</h3>
            <ul className="footer-links">
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Business & Finance</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Information Technology</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Applied Psychology</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Education & Training</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Health & Social Care</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs'); }}>Tourism & Hospitality</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3>Campuses & Contacts</h3>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin size={24} style={{ color: '#2ea3f2', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.85rem' }}>Colombo Campus</strong>
                  <span style={{ fontSize: '0.8rem' }}>500 Galle Road, Colombo 06, Sri Lanka.</span>
                </div>
              </div>
              
              <div className="footer-contact-item">
                <MapPin size={24} style={{ color: '#2ea3f2', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.85rem' }}>Kandy Campus</strong>
                  <span style={{ fontSize: '0.8rem' }}>291 A9, Kandy 20000, Sri Lanka.</span>
                </div>
              </div>

              <div className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
                <Phone size={16} style={{ color: '#2ea3f2', flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>+94 77 344 7878</span>
              </div>

              <div className="footer-contact-item">
                <Mail size={16} style={{ color: '#2ea3f2', flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem' }}>admission@gcbt.edu.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Legal Section */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Gatwick College of Business and Technology. All Rights Reserved. 
            <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '0.25rem', color: '#64748b' }}>
              Approved Centre Reg ID: OTHM-DC-268802 / NCC-DC-8812
            </span>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Developed by{' '}
            <a 
              href="https://hashnate.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hashnate-link"
              style={{ color: '#2ea3f2', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
            >
              Hashnate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

