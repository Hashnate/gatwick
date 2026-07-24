import React, { useState } from 'react';
import { testimonials, events } from '../data';
import { Clock, MapPin, Search, X } from 'lucide-react';

export default function StudentLife() {
  const [lightboxImg, setLightboxImg] = useState(null);

  const galleryImages = [
    { src: "assets/slide_show_1.jpeg", caption: "Annual Graduation Convocation Ceremonies" },
    { src: "assets/slide_show_2.jpeg", caption: "Interactive Student Leadership Assemblies" },
    { src: "assets/slide_show_3.jpeg", caption: "Student Council Cultural & Social Gatherings" },
    { src: "assets/slide_show_4.jpeg", caption: "Technical Seminars & Guest Lecture Assemblies" },
    { src: "assets/slide_show_5.jpeg", caption: "Interactive IT & Business Classrooms" },
    { src: "assets/campus_kandy.png", caption: "Kandy Campus Reading Library & Executive Lounge" }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '3rem 0 2rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            GCBT Community
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0', color: '#0a2540' }}>Student Life & Community</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Beyond Academics
              </span>
              <h2 className="title-medium" style={{ marginTop: '0.25rem' }}>A Vibrant Student Environment</h2>
              <p style={{ color: '#475569', marginBottom: '1.25rem' }}>
                Education at Gatwick College goes far beyond lecture halls. We promote a collaborative, diverse environment where students build strong leadership skills, engage in critical debate, and network with global academic peers.
              </p>
              <p style={{ color: '#475569' }}>
                From annual sports meets and student council excursions to technical IT seminars and career guidance fairs, we provide student support activities designed to cultivate well-rounded global candidates.
              </p>
            </div>
            <div>
              <img src="assets/slide_show_1.jpeg" alt="GCBT Graduates" style={{ borderRadius: '12px', width: '100%', height: '320px', objectFit: 'cover', boxShadow: 'var(--shadow-md)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              College Timeline
            </span>
            <h2 className="title-medium">Events & Assemblies</h2>
          </div>

          <div className="grid-3">
            {events.map((e) => (
              <div className="event-card" key={e.id}>
                <div className="event-card-flex">
                  <div className="event-date-badge">
                    <span className="event-day">{e.day}</span>
                    <span className="event-month">{e.month}</span>
                  </div>
                  <div className="event-details">
                    <h3>{e.title}</h3>
                    <div className="event-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={12} /> {e.time}</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: '#64748b' }}>
                  <MapPin size={12} style={{ color: '#e31c23' }} /> Venue: {e.venue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Testimonials Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Alumni Networks
            </span>
            <h2 className="title-medium">Success Stories</h2>
          </div>

          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {testimonials.map((t) => (
              <div 
                key={t.id}
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '12px', 
                  padding: '2.5rem', 
                  border: '1px solid #e2e8f0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start'
                }}
              >
                <img 
                  src={t.image} 
                  alt={t.name} 
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e31c23' }} 
                />
                <div>
                  <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    "{t.quote}"
                  </p>
                  <strong style={{ color: '#0a2540', display: 'block', fontSize: '1.05rem' }}>{t.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#e31c23', fontWeight: 600 }}>
                    {t.course} ({t.campus} Campus)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Gallery */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Visual Tour
            </span>
            <h2 className="title-medium">Campus Life Gallery</h2>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="gallery-item"
                onClick={() => setLightboxImg(img)}
              >
                <img src={img.src} alt={img.caption} />
                <div className="gallery-overlay">
                  <Search size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '800px', background: 'transparent', boxShadow: 'none' }}
          >
            <button 
              className="modal-close-btn" 
              onClick={() => setLightboxImg(null)}
              style={{ color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '0.5rem', top: '10px', right: '10px' }}
            >
              <X size={20} />
            </button>
            <img src={lightboxImg.src} alt={lightboxImg.caption} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            <p style={{ color: '#ffffff', textAlign: 'center', marginTop: '1rem', fontSize: '1rem', fontWeight: 500 }}>
              {lightboxImg.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
