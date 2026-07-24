import React, { useState, useEffect } from 'react';
import { testimonials, events } from '../data';
import { Clock, MapPin, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StudentLife() {
  const [lightboxImg, setLightboxImg] = useState(null);

  // 4-Review Page Slider State
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / reviewsPerPage);

  const nextPage = () => {
    setReviewPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setReviewPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto-scroll reviews every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const visibleTestimonials = testimonials.slice(
    reviewPage * reviewsPerPage,
    (reviewPage + 1) * reviewsPerPage
  );

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
              <img 
                src="assets/College.jpeg" 
                alt="GCBT Team & Student Community" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'assets/slide_show_1.jpeg';
                }}
                style={{ borderRadius: '16px', width: '100%', height: '320px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} 
              />
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

      {/* Alumni Testimonials Grid (4 per page with pagination & auto-scroll) */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Alumni Networks
              </span>
              <h2 className="title-medium" style={{ margin: 0 }}>Success Stories</h2>
            </div>

            {/* Navigation Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                onClick={prevPage}
                className="btn-circle-nav"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={20} />
              </button>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', padding: '0 0.5rem' }}>
                {reviewPage + 1} / {totalPages}
              </div>
              <button 
                onClick={nextPage}
                className="btn-circle-nav"
                aria-label="Next reviews"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {visibleTestimonials.map((t) => (
              <div 
                key={t.id}
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '14px', 
                  padding: '2.25rem', 
                  border: '1px solid #e2e8f0',
                  borderLeft: '4px solid #e31c23',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
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

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setReviewPage(idx)}
                style={{
                  width: idx === reviewPage ? '30px' : '10px',
                  height: '10px',
                  borderRadius: '10px',
                  backgroundColor: idx === reviewPage ? '#e31c23' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to page ${idx + 1}`}
              />
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
