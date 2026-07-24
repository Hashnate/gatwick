import React, { useState } from 'react';
import { courses } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle, ExternalLink, Navigation } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

export default function Contact({ selectedEnquiryCourse, setSelectedEnquiryCourse }) {
  const [activeMapTab, setActiveMapTab] = useState('colombo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('Colombo');
  const [selectedCourse, setSelectedCourse] = useState(selectedEnquiryCourse || 'othm-l4-business');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const mapsData = {
    colombo: {
      name: 'Colombo Main Campus',
      address: '500 Galle Road, Colombo 06, Sri Lanka',
      embedUrl: 'https://maps.google.com/maps?q=6.883582,79.860076&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka'
    },
    kandy: {
      name: 'Kandy Branch Campus',
      address: '291 A9, Kandy 20000, Sri Lanka',
      embedUrl: 'https://maps.google.com/maps?q=7.293041,80.635012&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) return; // ignore bots
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setSelectedEnquiryCourse(''); // Clear the globally selected course
    }, 1500);
  };

  return (
    <div>
      {/* Premium Page Header */}
      <section className="section-page-header" style={{ padding: '3.5rem 0 2.5rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            backgroundColor: '#fff0f1', 
            color: '#e31c23', 
            padding: '0.35rem 0.9rem', 
            borderRadius: '30px', 
            fontSize: '0.8rem', 
            fontWeight: 800, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            <Navigation size={13} />
            Institutional Contact Directory
          </div>
          <h1 className="title-medium" style={{ margin: '0', color: '#0a2540', fontSize: '2.25rem' }}>Connect with Gatwick College</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '620px', margin: '0.5rem auto 0', lineHeight: '1.5' }}>
            Reach our admissions registrars, academic counselors, and campus administration across our Colombo headquarters and Kandy branch.
          </p>
        </div>
      </section>

      {/* Campus Executive Showcase Cards Section */}
      <section className="section">
        <div className="container">
          
          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '4rem' }}>
            
            {/* 1. Colombo Campus Card */}
            <div className="campus-showcase-card" style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 12px 35px -10px rgba(10, 37, 64, 0.07)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img 
                    src="assets/campus_colombo.png" 
                    alt="Colombo Campus" 
                    decoding="async"
                    fetchpriority="high"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: '#059669',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '30px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                    Colombo Main Hub
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.45rem', color: '#0a2540', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    Colombo Main Campus
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Address</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>500 Galle Road, Colombo 06, Sri Lanka</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Hotlines</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>+94 77 344 7878 / +94 11 250 8802</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Registry Email</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>colombo@gcbt.edu.lk</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Clock size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Operating Hours</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Mon - Sat: 08:30 AM - 05:30 PM (Sunday Closed)</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ padding: '0 2rem 2rem 2rem', display: 'flex', gap: '0.75rem' }}>
                <a 
                  href="https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.8rem 1rem', fontSize: '0.88rem', gap: '0.4rem', justifyContent: 'center' }}
                >
                  Get Directions <ExternalLink size={14} />
                </a>
                <a 
                  href="tel:+94773447878" 
                  className="btn btn-secondary"
                  style={{ padding: '0.8rem 1rem', fontSize: '0.88rem', gap: '0.4rem' }}
                >
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>

            {/* 2. Kandy Campus Card */}
            <div className="campus-showcase-card" style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 12px 35px -10px rgba(10, 37, 64, 0.07)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img 
                    src="assets/campus_kandy.png" 
                    alt="Kandy Campus" 
                    decoding="async"
                    fetchpriority="high"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: '#2563eb',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '30px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'inline-block' }}></span>
                    Kandy Regional Branch
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.45rem', color: '#0a2540', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    Kandy Branch Campus
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Address</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>291 A9, Kandy 20000, Sri Lanka</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Hotlines</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>+94 77 344 7878 / +94 81 223 8812</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Registry Email</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>kandy@gcbt.edu.lk</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Clock size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Operating Hours</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Mon - Sat: 08:30 AM - 05:30 PM (Sunday Closed)</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ padding: '0 2rem 2rem 2rem', display: 'flex', gap: '0.75rem' }}>
                <a 
                  href="https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.8rem 1rem', fontSize: '0.88rem', gap: '0.4rem', justifyContent: 'center' }}
                >
                  Get Directions <ExternalLink size={14} />
                </a>
                <a 
                  href="tel:+94773447878" 
                  className="btn btn-secondary"
                  style={{ padding: '0.8rem 1rem', fontSize: '0.88rem', gap: '0.4rem' }}
                >
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Full-Width Map Dashboard */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #cbd5e1',
            boxShadow: '0 20px 50px -10px rgba(10, 37, 64, 0.12), 0 0 0 1px rgba(10, 37, 64, 0.04)',
            overflow: 'hidden',
            marginBottom: '4.5rem'
          }}>
            {/* Ultra-Premium Glassmorphic Dark Blue Header Bar */}
            <div style={{
              padding: '1.5rem 2.25rem',
              background: 'linear-gradient(135deg, #06182c 0%, #0a2540 50%, #1e293b 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              borderBottom: '2px solid #e31c23',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(227, 28, 35, 0.15)', border: '1px solid rgba(227, 28, 35, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23' }}>
                  <Navigation size={20} />
                </div>
                <div>
                  <span style={{ color: '#e31c23', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                    Interactive Campus Navigator
                  </span>
                  <h3 style={{ margin: '0.1rem 0 0', fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.01em' }}>
                    {mapsData[activeMapTab].name} Map
                  </h3>
                </div>
              </div>

              {/* Ultra-Premium Campus Switcher Pill Buttons (Aligned Flush Right) */}
              <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '0.35rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.12)', marginLeft: 'auto' }}>
                <button
                  onClick={() => setActiveMapTab('colombo')}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: activeMapTab === 'colombo' ? 'linear-gradient(135deg, #e31c23 0%, #b91c1c 100%)' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: activeMapTab === 'colombo' ? '0 4px 15px rgba(227, 28, 35, 0.4)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeMapTab === 'colombo' ? '#ffffff' : '#10b981', display: 'inline-block' }}></span>
                  Colombo Campus
                </button>
                <button
                  onClick={() => setActiveMapTab('kandy')}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: activeMapTab === 'kandy' ? 'linear-gradient(135deg, #e31c23 0%, #b91c1c 100%)' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: activeMapTab === 'kandy' ? '0 4px 15px rgba(227, 28, 35, 0.4)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeMapTab === 'kandy' ? '#ffffff' : '#3b82f6', display: 'inline-block' }}></span>
                  Kandy Campus
                </button>
              </div>
            </div>

            {/* Map Frame Container with Floating Ultra-Premium Action CTA */}
            <div style={{ position: 'relative', height: '480px', backgroundColor: '#f1f5f9' }}>
              
              {/* Floating Ultra-Premium Map CTA Button */}
              <a 
                href={mapsData[activeMapTab].directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.35rem',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #e31c23 0%, #b91c1c 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(227, 28, 35, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <Navigation size={15} />
                Open Directions in Google Maps <ExternalLink size={14} />
              </a>

              {/* Preloaded Instant-Switching Google Maps (Zero Lag / Zero Load Flicker) */}
              <iframe 
                title="Colombo Main Campus Google Map"
                src={mapsData.colombo.embedUrl} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 0, 
                  display: activeMapTab === 'colombo' ? 'block' : 'none' 
                }}
                referrerPolicy="no-referrer-when-downgrade"
              />
              <iframe 
                title="Kandy Branch Campus Google Map"
                src={mapsData.kandy.embedUrl} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 0, 
                  display: activeMapTab === 'kandy' ? 'block' : 'none' 
                }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Dynamic routed contact form */}
          <div className="form-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Enquiry Desk
              </span>
              <h2 className="title-medium" style={{ margin: '0' }}>Submit Your Course Inquiry</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Specify your campus location preference to route your enquiry to the appropriate registrar desk.
              </p>
            </div>

            {isSubmitted ? (
              <div className="alert-success">
                <CheckCircle size={20} />
                <div>
                  <strong>Enquiry routed to the {selectedCampus} Campus desk!</strong> An advisor from our registry has received your message and will reach out to you within 24 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-grid">
                <input 
                  type="text" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  className="honeypot-field" 
                />

                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="contact-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">Contact Number *</label>
                  <input 
                    type="tel" 
                    id="contact-phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-campus">Route To Campus *</label>
                  <CustomSelect
                    id="contact-campus"
                    value={selectedCampus}
                    onChange={setSelectedCampus}
                    options={[
                      { value: 'Colombo', label: 'Colombo Registrar Office' },
                      { value: 'Kandy', label: 'Kandy Admissions Desk' }
                    ]}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact-course">Subject Course Area *</label>
                  <CustomSelect
                    id="contact-course"
                    value={selectedCourse}
                    onChange={setSelectedCourse}
                    options={courses.map(c => ({ value: c.id, label: c.title }))}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact-message">Additional Questions / Message</label>
                  <textarea 
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your educational background or any queries you have..."
                  />
                </div>

                <div className="form-group full-width" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
                    {loading ? 'Routing message to registry...' : `Send Inquiry to ${selectedCampus} Campus`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
