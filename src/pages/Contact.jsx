import React, { useState } from 'react';
import { courses } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function Contact({ selectedEnquiryCourse, setSelectedEnquiryCourse }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('Colombo');
  const [selectedCourse, setSelectedCourse] = useState(selectedEnquiryCourse || 'othm-l4-business');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      {/* Page Header */}
      <section className="section-navy" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Get in Touch
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0' }}>Contact Our Campuses</h1>
        </div>
      </section>

      {/* Campus Cards & Directions */}
      <section className="section">
        <div className="container">
          <div className="campus-layout" style={{ marginBottom: '4rem' }}>
            {/* Colombo Campus Card */}
            <div className="campus-card">
              <img 
                src="assets/campus_colombo.png" 
                alt="GCBT Colombo Campus Location" 
                className="campus-image"
              />
              <div className="campus-info">
                <div className="campus-title-bar">
                  <h3 style={{ fontSize: '1.35rem', margin: '0' }}>Colombo Main Campus</h3>
                  <span className="campus-badge">Main Hub</span>
                </div>
                
                <ul className="campus-details-list">
                  <li><MapPin size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>500 Galle Road, Colombo 06, Sri Lanka.</span></li>
                  <li><Phone size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>+94 77 344 7878 / +94 11 250 8802</span></li>
                  <li><Mail size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>colombo@gcbt.edu.lk</span></li>
                  <li><Clock size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>Mon - Sat: 08:30 AM - 05:30 PM (Sunday closed)</span></li>
                </ul>

                <div className="map-embed">
                  <div className="map-embed-placeholder">
                    <strong style={{ color: '#0a2540' }}>Colombo Campus Interactive Map</strong>
                    <span>500 Galle Road, Wellawatte, Colombo 06</span>
                    <a href="https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka" target="_blank" rel="noopener noreferrer">
                      Open Directions in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kandy Campus Card */}
            <div className="campus-card">
              <img 
                src="assets/campus_kandy.png" 
                alt="GCBT Kandy Campus Location" 
                className="campus-image"
              />
              <div className="campus-info">
                <div className="campus-title-bar">
                  <h3 style={{ fontSize: '1.35rem', margin: '0' }}>Kandy Branch Campus</h3>
                  <span className="campus-badge">Regional Branch</span>
                </div>
                
                <ul className="campus-details-list">
                  <li><MapPin size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>291 A9, Kandy 20000, Sri Lanka.</span></li>
                  <li><Phone size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>+94 77 344 7878 / +94 81 223 8812</span></li>
                  <li><Mail size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>kandy@gcbt.edu.lk</span></li>
                  <li><Clock size={18} style={{ color: '#e31c23', flexShrink: 0 }} /> <span>Mon - Sat: 08:30 AM - 05:30 PM (Sunday closed)</span></li>
                </ul>

                <div className="map-embed">
                  <div className="map-embed-placeholder">
                    <strong style={{ color: '#0a2540' }}>Kandy Campus Interactive Map</strong>
                    <span>291 A9 road, Kandy, Sri Lanka</span>
                    <a href="https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka" target="_blank" rel="noopener noreferrer">
                      Open Directions in Google Maps
                    </a>
                  </div>
                </div>
              </div>
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
                  <select 
                    id="contact-campus"
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                  >
                    <option value="Colombo">Colombo Registrar Office</option>
                    <option value="Kandy">Kandy Admissions Desk</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact-course">Subject Course Area *</label>
                  <select 
                    id="contact-course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
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
