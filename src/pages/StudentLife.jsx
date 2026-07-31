import React, { useState, useEffect, useRef } from 'react';
import { testimonials, events } from '../data';
import { Clock, MapPin, Search, X, ChevronLeft, ChevronRight, Film, Sparkles, ShieldCheck, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function StudentLife({ events: propEvents, testimonials: propTestimonials }) {
  const activeEvents = propEvents || events;
  const activeTestimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials : testimonials;
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeMapUrl, setActiveMapUrl] = useState(null);
  const iframeRef = useRef(null);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            if (entry.isIntersecting) {
              // Play and unmute (auto sound)
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), 
                '*'
              );
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'unMute', args: [] }), 
                '*'
              );
              setIsPlaying(true);
              setIsMuted(false);
            } else {
              // Pause and mute (auto mute)
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), 
                '*'
              );
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'mute', args: [] }), 
                '*'
              );
              setIsPlaying(false);
              setIsMuted(true);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  // Listen for YouTube player state changes to detect ended state
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.event === 'infoDelivery' && data.info && data.info.playerState !== undefined) {
          const state = data.info.playerState;
          if (state === 0) { // ENDED
            setIsPlaying(false);
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), 
                '*'
              );
            }
          }
        }
      } catch (e) {
        // Not a JSON message or not from YouTube
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const togglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }), 
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }), 
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  // 4-Review Page Slider State
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(activeTestimonials.length / reviewsPerPage));

  const nextPage = () => {
    setReviewPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setReviewPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto-scroll reviews every 5 seconds
  useEffect(() => {
    if (activeTestimonials.length === 0) return;
    const timer = setInterval(() => {
      setReviewPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages, activeTestimonials.length]);

  const visibleTestimonials = activeTestimonials.slice(
    reviewPage * reviewsPerPage,
    (reviewPage + 1) * reviewsPerPage
  );

  const galleryImages = [
    { src: "assets/gallery_grad_stage.webp", caption: "GCBT Convocation 2024 Stage & Academic Procession" },
    { src: "assets/gallery_discussion.webp", caption: "Interactive Student & Faculty Workshop" },
    { src: "assets/gallery_oil_lamp.webp", caption: "Traditional Inaugural Oil Lamp Lighting Ceremony" },
    { src: "assets/gallery_dignitaries.webp", caption: "GCBT Academic Council & Convocation Dignitaries" },
    { src: "assets/gallery_plaques.webp", caption: "GCBT Plaques of Recognition — Chief Guests & Guests of Honour" },
    { src: "assets/gallery_grad_speaker.webp", caption: "Graduation 2024 Stage Keynote & Ceremonial Address" }
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
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <img 
                src="assets/classroom_lecture.webp" 
                alt="GCBT Interactive Classroom Lecture" 
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover', 
                  objectPosition: 'center',
                  display: 'block'
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Premium Featured Campus Video Spotlight */}
      <section ref={videoSectionRef} style={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #030b17 0%, #0a2540 50%, #0d325a 100%)',
        color: '#ffffff',
        padding: '5rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Ambient Glows & Background Accents */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(227, 28, 35, 0.18) 0%, rgba(227, 28, 35, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(46, 163, 242, 0.15) 0%, rgba(46, 163, 242, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: 'rgba(227, 28, 35, 0.12)', 
                color: '#ff4d4d', 
                padding: '0.4rem 1rem', 
                borderRadius: '30px', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                letterSpacing: '0.06em', 
                textTransform: 'uppercase',
                border: '1px solid rgba(227, 28, 35, 0.3)',
                boxShadow: '0 4px 15px rgba(227, 28, 35, 0.15)',
                marginBottom: '1rem'
              }}>
                <Film size={15} style={{ color: '#e31c23' }} />
                <span>Official Campus Spotlight</span>
              </div>
              
              <h2 className="title-medium" style={{ 
                color: '#ffffff', 
                fontSize: '2.3rem', 
                lineHeight: 1.2, 
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                Inside Gatwick College: Student Experience & Learning
              </h2>
              
              <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                Take an exclusive video tour inside GCBT Sri Lanka. Watch interactive lectures, student community activities, and our modern educational campus environment in action.
              </p>

              {/* Glassmorphic Feature Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.85rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  backdropFilter: 'blur(10px)',
                  padding: '0.75rem 1.1rem', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>UK Ofqual-Regulated Academic Standards</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>100% assignment-based assessment under direct British quality benchmarks</span>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.85rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  backdropFilter: 'blur(10px)',
                  padding: '0.75rem 1.1rem', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Interactive Classrooms & Modern IT Labs</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>State-of-the-art facilities across Colombo Galle Road & Kandy campuses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smartphone Device Frame Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '350px', 
                margin: '0 auto',
                aspectRatio: '9/18', 
                borderRadius: '46px', 
                padding: '11px',
                background: 'linear-gradient(165deg, #1f2937 0%, #030712 40%, #000000 80%, #111827 100%)', 
                boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(0, 0, 0, 0.6), inset 0 0 2px 1.5px rgba(255, 255, 255, 0.15)', 
                border: '2.5px solid #111827',
                transition: 'all 0.4s ease'
              }}>
                {/* Physical Hardware Volume & Power Buttons on Sides */}
                <div style={{ position: 'absolute', top: '110px', left: '-5px', width: '4px', height: '42px', backgroundColor: '#1f2937', borderRadius: '3px 0 0 3px', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }} />
                <div style={{ position: 'absolute', top: '162px', left: '-5px', width: '4px', height: '42px', backgroundColor: '#1f2937', borderRadius: '3px 0 0 3px', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }} />
                <div style={{ position: 'absolute', top: '130px', right: '-5px', width: '4px', height: '65px', backgroundColor: '#1f2937', borderRadius: '0 3px 3px 0', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }} />

                {/* Inner Screen Display */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '36px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#000000',
                  boxShadow: 'inset 0 0 0 2px #000000, 0 0 0 1px rgba(255, 255, 255, 0.15)'
                }}>
                  {/* Dynamic Island Pill Notch */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '94px',
                    height: '26px',
                    backgroundColor: '#000000',
                    borderRadius: '20px',
                    zIndex: 25,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)'
                  }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#090d16', borderRadius: '50%', border: '1px solid #1e293b', position: 'relative' }}>
                      <div style={{ width: '3px', height: '3px', backgroundColor: '#1d4ed8', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', opacity: 0.8 }} />
                    </div>
                    <div style={{ width: '7px', height: '7px', backgroundColor: '#0c121e', borderRadius: '50%' }} />
                  </div>

                  {/* Glass Sheen Gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 60%)',
                    pointerEvents: 'none',
                    zIndex: 20
                  }} />

                  <iframe 
                    ref={iframeRef}
                    src="https://www.youtube.com/embed/rIl9tDRMnhE?enablejsapi=1&autoplay=1&mute=1&playsinline=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&start=2" 
                    title="Gatwick College Campus Life Video" 
                    style={{ 
                      width: '135%', 
                      height: '135%', 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      border: 'none',
                      display: 'block',
                      pointerEvents: 'none'
                    }} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />

                  {/* iOS Home Indicator Bar at Bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '110px',
                    height: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    borderRadius: '3px',
                    zIndex: 25,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.5)'
                  }} />

                  {/* Sound On / Mute Toggle Button at Bottom Right */}
                  <button 
                    onClick={toggleMute}
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '16px',
                      zIndex: 30,
                      backgroundColor: 'rgba(10, 37, 64, 0.85)',
                      color: '#ffffff',
                      border: '1.5px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: '50%',
                      width: '42px',
                      height: '42px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
                    title={isMuted ? "Click to Turn On Audio" : "Click to Mute Audio"}
                  >
                    {isMuted ? <VolumeX size={18} style={{ color: '#ef4444' }} /> : <Volume2 size={18} style={{ color: '#4ade80' }} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      {activeEvents && activeEvents.length > 0 && (
        <section className="section section-grey">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                College Timeline
              </span>
              <h2 className="title-medium">Events & Assemblies</h2>
            </div>

            <div className="grid-3">
              {activeEvents.map((e) => (
                <div className="event-card" key={e.id}>
                  <div style={{ padding: '1.5rem 1.5rem 1.25rem 1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="event-date-pill">
                          <span className="event-day-text">{e.day}</span>{' '}
                          <span className="event-month-text">{e.month}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e31c23', backgroundColor: '#fff1f2', padding: '0.25rem 0.65rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Assembly
                        </span>
                      </div>

                      <h3 className="event-card-title">{e.title}</h3>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem' }}>
                        <Clock size={14} style={{ color: '#e31c23', flexShrink: 0 }} />
                        <span>{e.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
                        <MapPin size={14} style={{ color: '#e31c23', flexShrink: 0 }} />
                        <span>{e.venue}</span>
                        {e.mapUrl && (
                          <button 
                            onClick={() => setActiveMapUrl(e.mapUrl)}
                            style={{ marginLeft: '0.4rem', border: 'none', background: 'none', color: '#e31c23', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontWeight: 600 }}
                          >
                            (View Map)
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alumni Testimonials Grid (4 per page with pagination & auto-scroll) */}
      {activeTestimonials && activeTestimonials.length > 0 && (
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
      )}

      {/* Campus Gallery */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="title-medium">Campus Gallery</h2>
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

      {/* Map Lightbox Modal */}
      {activeMapUrl && (
        <div className="modal-overlay" onClick={() => setActiveMapUrl(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0a2540', margin: 0 }}>Event Venue Location Map</h3>
              <button className="modal-close-btn" onClick={() => setActiveMapUrl(null)} style={{ position: 'static' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', height: '350px' }}>
              <iframe
                title="Event Venue Map"
                src={activeMapUrl.includes('output=embed') || activeMapUrl.includes('google.com/maps/embed') 
                  ? activeMapUrl 
                  : `https://maps.google.com/maps?q=${encodeURIComponent(activeMapUrl)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
