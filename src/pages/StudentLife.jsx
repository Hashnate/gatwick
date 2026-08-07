import React, { useState, useEffect, useRef } from 'react';
import { testimonials, events } from '../data';
import { Clock, MapPin, Search, X, ChevronLeft, ChevronRight, Film, Sparkles, ShieldCheck, Play, Pause, Volume2, VolumeX, Users, Heart, Briefcase, GraduationCap, Globe, BookOpen, Music, Lock, Mail, CheckCircle2, Award, Camera, Image, Eye } from 'lucide-react';
import { addConvocationRegistration } from '../services/adminStorage';

export default function StudentLife({ events: propEvents, testimonials: propTestimonials }) {
  const activeEvents = Array.isArray(propEvents) && propEvents.length > 0 ? propEvents : (Array.isArray(events) ? events : []);
  const activeTestimonials = Array.isArray(propTestimonials) && propTestimonials.length > 0 ? propTestimonials : (Array.isArray(testimonials) ? testimonials : []);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeMapUrl, setActiveMapUrl] = useState(null);
  const [convocationFormSubmitted, setConvocationFormSubmitted] = useState(false);
  const [convocationData, setConvocationData] = useState({
    fullName: '',
    studentId: '',
    program: 'Higher National Diploma in Computing',
    cohortYear: '2026 Convocation Gala (Upcoming)',
    email: '',
    phone: '',
    tickets: '2 Tickets (Graduate + 1 Guest)',
    gownSize: 'Medium (5\'5" - 5\'9")'
  });
  const [selectedGradYear, setSelectedGradYear] = useState('2026');
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure video element is in DOM
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.load();
      }
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                setIsPlaying(true);
                setIsMuted(true);
              }).catch(() => {
                // Retry once after short delay
                setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().then(() => {
                      setIsPlaying(true);
                      setIsMuted(true);
                    }).catch(() => {});
                  }
                }, 300);
              });
            }
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    // Unmute on first user gesture while video is in view
    const handleUserGesture = () => {
      if (videoRef.current && videoSectionRef.current) {
        const rect = videoSectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          videoRef.current.muted = false;
          setIsMuted(false);
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        }
      }
    };

    window.addEventListener('scroll', handleUserGesture, { passive: true });
    window.addEventListener('click', handleUserGesture, { passive: true });
    window.addEventListener('touchstart', handleUserGesture, { passive: true });

    return () => {
      clearTimeout(timer);
      if (videoSectionRef.current) observer.unobserve(videoSectionRef.current);
      window.removeEventListener('scroll', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };
  }, []);

  // Listen for anchor scroll events from the header mega-menu
  useEffect(() => {
    const handler = (e) => {
      if (!e.detail || !e.detail.anchor) return;
      setTimeout(() => {
        const el = document.getElementById(e.detail.anchor);
        if (el) {
          const yOffset = -140;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 120);
    };
    window.addEventListener('gcbt:scrollToAnchor', handler);
    return () => window.removeEventListener('gcbt:scrollToAnchor', handler);
  }, []);

  // Handle direct hash navigation on mount / hashchange
  useEffect(() => {
    const checkHashAndScroll = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) return;
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const yOffset = -140;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 180);
    };

    checkHashAndScroll();
    window.addEventListener('hashchange', checkHashAndScroll);
    return () => window.removeEventListener('hashchange', checkHashAndScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
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

  const safeReviewPage = Math.min(reviewPage, Math.max(0, totalPages - 1));
  const visibleTestimonials = activeTestimonials.slice(
    safeReviewPage * reviewsPerPage,
    (safeReviewPage + 1) * reviewsPerPage
  );

  const graduationGalleryByYear = {
    '2026': [
      { src: "assets/grad_2026_1.png", title: "Degree Conferring", caption: "Annual Graduation Ceremony 2026 — Degree Conferring (Graduate #367)" },
      { src: "assets/grad_2026_2.jpg", title: "Scroll Presentation", caption: "Annual Graduation Ceremony 2026 — Scroll Presentation (Graduate #354)" },
      { src: "assets/grad_2026_3.png", title: "Academic Award", caption: "Annual Graduation Ceremony 2026 — Academic Award (Graduate #290)" },
      { src: "assets/grad_2026_4.png", title: "Honor Scroll", caption: "Annual Graduation Ceremony 2026 — Honor Scroll (Graduate #254)" },
      { src: "assets/grad_2026_5.jpg", title: "Degree Conferring", caption: "Annual Graduation Ceremony 2026 — Degree Conferring (Graduate #245)" },
      { src: "assets/grad_2026_6.jpg", title: "Scroll Presentation", caption: "Annual Graduation Ceremony 2026 — Scroll Presentation (Graduate #251)" },
      { src: "assets/grad_2026_7.jpg", title: "Academic Award", caption: "Annual Graduation Ceremony 2026 — Academic Award (Graduate #264)" },
      { src: "assets/grad_2026_8.png", title: "Honor Scroll", caption: "Annual Graduation Ceremony 2026 — Honor Scroll (Graduate #275)" },
      { src: "assets/grad_2026_9.png", title: "Degree Parchment", caption: "Annual Graduation Ceremony 2026 — Degree Parchment (Graduate #283)" },
      { src: "assets/grad_2026_10.png", title: "Scroll Presentation", caption: "Annual Graduation Ceremony 2026 — Scroll Presentation (Graduate #303)" },
      { src: "assets/grad_2026_11.jpg", title: "Degree Scroll Presentation", caption: "Annual Graduation Ceremony 2026 — Degree Scroll Award (Graduate #341)" },
      { src: "assets/grad_2026_12.jpg", title: "Scroll Conferring", caption: "Annual Graduation Ceremony 2026 — Scroll Presentation (Graduate #282)" },
    ],
    '2025': [
      { src: "assets/grad_2025_1.jpg", title: "Scroll Conferring", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Scroll Conferring" },
      { src: "assets/grad_2025_2.jpg", title: "Degree Presentation", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Degree Presentation" },
      { src: "assets/grad_2025_3.jpg", title: "Academic Award", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Academic Honor Award" },
      { src: "assets/grad_2025_4.jpg", title: "Graduate Honor", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Graduate Scroll Presentation" },
      { src: "assets/grad_2025_5.jpg", title: "Parchment Conferring", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Parchment Conferring" },
      { src: "assets/grad_2025_6.jpg", title: "Scroll Presentation", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Scroll Presentation" },
      { src: "assets/grad_2025_7.jpg", title: "Degree Conferring", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Degree Conferring" },
      { src: "assets/grad_2025_8.jpg", title: "Academic Honor", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Academic Honor Award" },
      { src: "assets/grad_2025_9.jpg", title: "Graduate Award", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Graduate Scroll Presentation" },
      { src: "assets/grad_2025_10.jpg", title: "Degree Parchment", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Degree Parchment Presentation" },
      { src: "assets/grad_2025_11.jpg", title: "Scroll Presentation Ceremony", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Scroll Presentation Ceremony" },
      { src: "assets/grad_2025_12.jpg", title: "Graduate Honor Award", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Graduate Honor Award" },
    ],
    '2024': [
      { src: "assets/grad_2024_1.jpg", title: "Degree Conferring", caption: "Gatwick College Graduation 2024 — Degree Scroll Conferring" },
      { src: "assets/grad_2024_2.jpg", title: "Scroll Presentation", caption: "Gatwick College Graduation 2024 — Scroll Presentation Ceremony" },
      { src: "assets/grad_2024_3.jpg", title: "Academic Award", caption: "Gatwick College Graduation 2024 — Academic Honor Award" },
      { src: "assets/grad_2024_4.jpg", title: "Graduate Honor", caption: "Gatwick College Graduation 2024 — Graduate Parchment Award" },
      { src: "assets/grad_2024_5.jpg", title: "Parchment Conferring", caption: "Gatwick College Graduation 2024 — Parchment Conferring" },
      { src: "assets/grad_2024_6.jpg", title: "Scroll Presentation", caption: "Gatwick College Graduation 2024 — Scroll Presentation" },
      { src: "assets/grad_2024_7.jpg", title: "Degree Conferring", caption: "Gatwick College Graduation 2024 — Degree Scroll Award" },
      { src: "assets/grad_2024_9.jpg", title: "Graduate Award", caption: "Gatwick College Graduation 2024 — Graduate Parchment Award" },
      { src: "assets/grad_2024_11.jpg", title: "Degree Scroll Presentation", caption: "Gatwick College Graduation 2024 — Scroll Presentation Ceremony" },
      { src: "assets/grad_2024_12.jpg", title: "Graduate Honor Award", caption: "Gatwick College Graduation 2024 — Graduate Honor Award" },
      { src: "assets/grad_2024_13.jpg", title: "Academic Conferring", caption: "Gatwick College Graduation 2024 — Academic Parchment Conferring" },
      { src: "assets/grad_2024_14.jpg", title: "Degree Parchment Award", caption: "Gatwick College Graduation 2024 — Degree Parchment Award" },
    ],
    '2023': [
      { src: "assets/grad_2023_1.jpg", title: "Diploma Conferring", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Diploma Conferring" },
      { src: "assets/grad_2023_2.jpg", title: "Degree Scroll Presentation", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Degree Scroll Presentation" },
      { src: "assets/grad_2023_3.jpg", title: "Academic Award", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Academic Honor Award" },
      { src: "assets/grad_2023_4.jpg", title: "Graduate Honor", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Graduate Parchment Award" },
      { src: "assets/grad_2023_5.jpg", title: "Parchment Conferring", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Parchment Conferring" },
      { src: "assets/grad_2023_6.jpg", title: "Scroll Award Ceremony", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Scroll Award Ceremony" },
      { src: "assets/grad_2023_7.jpg", title: "Graduate Scroll Presentation", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Graduate Scroll Presentation" },
      { src: "assets/grad_2023_8.jpg", title: "Academic Honor Award", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Academic Honor Award" },
      { src: "assets/grad_2023_9.jpg", title: "Degree Parchment Award", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Degree Parchment Award" },
      { src: "assets/grad_2023_10.jpg", title: "Diploma Scroll Conferring", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Diploma Scroll Conferring" },
      { src: "assets/grad_2023_11.jpg", title: "Degree Scroll Presentation", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Degree Scroll Presentation" },
      { src: "assets/grad_2023_12.jpg", title: "Graduate Parchment Award", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Graduate Parchment Award" },
    ],
    '2022': [
      { src: "assets/grad_2022_1.jpg", title: "Memento Honor Award", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Special Memento Award" },
      { src: "assets/grad_2022_2.jpg", title: "Academic Plaque Presentation", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Academic Plaque Presentation" },
      { src: "assets/grad_2022_3.jpg", title: "Scroll Presentation", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Scroll Presentation" },
      { src: "assets/grad_2022_4.jpg", title: "Degree Scroll Conferring", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Degree Scroll Conferring" },
      { src: "assets/grad_2022_5.jpg", title: "Parchment Conferring", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Parchment Conferring" },
      { src: "assets/grad_2022_6.jpg", title: "Scroll Presentation Ceremony", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Scroll Presentation Ceremony" },
      { src: "assets/grad_2022_7.jpg", title: "Graduate Scroll Award", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Graduate Scroll Award" },
      { src: "assets/grad_2022_8.jpg", title: "Academic Conferring", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Academic Conferring" },
      { src: "assets/grad_2022_9.jpg", title: "Degree Parchment Award", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Degree Parchment Award" },
      { src: "assets/grad_2022_10.jpg", title: "Graduate Parchment Conferring", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Graduate Parchment Conferring" },
      { src: "assets/grad_2022_11.jpg", title: "Degree Scroll Honor", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Degree Scroll Honor" },
      { src: "assets/grad_2022_12.jpg", title: "Parchment Presentation", caption: "Gatwick College Graduation Ceremony 2022 at BMICH — Parchment Presentation" },
    ]
  };

  const activeGradPhotos = graduationGalleryByYear[selectedGradYear] || graduationGalleryByYear['2026'];

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
              {visibleTestimonials.filter(Boolean).map((t) => (
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

      {/* ── CLUBS & SOCIETIES ───────────────────────────────────────────── */}
      <section id="clubs-societies" className="section" style={{ scrollMarginTop: '100px' }}>
        <div className="container">
          <div className="entry-requirements-header">
            <div className="entry-requirements-pill">
              <Sparkles size={14} /> Campus Life & Student Leadership
            </div>
            <h2 className="entry-requirements-title">Clubs & Societies</h2>
            <p className="entry-requirements-subtitle">
              Enrich your university experience through student-led organizations, global networking, leadership councils, and community outreach across both campuses.
            </p>
          </div>

          <div className="club-showcase-grid">
            {[
              {
                icon: BookOpen,
                color: '#2563eb',
                bg: '#eff6ff',
                border: '#bfdbfe',
                gradient: 'linear-gradient(90deg, #2563eb, #60a5fa)',
                tag: 'Academic Mentorship',
                title: 'Academic Societies',
                desc: 'Subject-specific societies for Business Management, Information Technology, and Psychology — led by elected student officers with faculty guidance.'
              },
              {
                icon: Music,
                color: '#9333ea',
                bg: '#faf5ff',
                border: '#f3e8ff',
                gradient: 'linear-gradient(90deg, #9333ea, #c084fc)',
                tag: 'Arts & Culture',
                title: 'Cultural & Arts Clubs',
                desc: 'Vibrant music, dance, drama, and fine arts groups celebrating traditional Sri Lankan festivals and international multicultural showcases.'
              },
              {
                icon: Globe,
                color: '#0891b2',
                bg: '#ecfeff',
                border: '#a5f3fc',
                gradient: 'linear-gradient(90deg, #0891b2, #38bdf8)',
                tag: 'Global Cohort',
                title: 'International Student Circle',
                desc: 'A dedicated peer integration network connecting international learners from Maldives, India, Malaysia, Nepal, Canada, and East Africa.'
              },
              {
                icon: Users,
                color: '#16a34a',
                bg: '#f0fdf4',
                border: '#bbf7d0',
                gradient: 'linear-gradient(90deg, #16a34a, #4ade80)',
                tag: 'Student Governance',
                title: 'Student Council',
                desc: 'The official democratically elected student representative body organizing campus sports, excursions, student welfare, and leadership forums.'
              },
              {
                icon: Heart,
                color: '#e31c23',
                bg: '#fff1f2',
                border: '#fecdd3',
                gradient: 'linear-gradient(90deg, #e31c23, #fb7185)',
                tag: 'Social Impact',
                title: 'Community Service Club',
                desc: 'Active CSR initiative group organizing annual charity drives, blood donation camps, environmental cleanups, and rural school outreach.'
              },
              {
                icon: Briefcase,
                color: '#d97706',
                bg: '#fffbeb',
                border: '#fde68a',
                gradient: 'linear-gradient(90deg, #d97706, #fbbf24)',
                tag: 'Career Development',
                title: 'Career & Entrepreneurship Society',
                desc: 'Corporate networking events, CEO guest speaker sessions, startup pitch competitions, and resume building workshops.'
              }
            ].map((club) => {
              const Icon = club.icon;
              return (
                <div
                  key={club.title}
                  className="club-showcase-card"
                  style={{ borderTop: `4px solid ${club.color}` }}
                >
                  <div className="club-card-top">
                    <div
                      className="club-icon-wrap"
                      style={{ background: club.bg, border: `1px solid ${club.border}` }}
                    >
                      <Icon size={24} color={club.color} />
                    </div>
                    <span
                      className="club-tag-chip"
                      style={{ background: club.bg, color: club.color, borderColor: club.border }}
                    >
                      {club.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="club-title">{club.title}</h3>
                    <p className="club-desc">{club.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Executive Facilities Banner */}
          <div className="campus-facilities-banner">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff1f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={24} color="#e31c23" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.35rem', color: '#0a2540', fontWeight: 800, fontSize: '1rem' }}>
                Sports Facilities & Student Amenities
              </h4>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.65 }}>
                Access co-partnered sports grounds and fitness facilities in partnership with both Kandy and Colombo Municipalities. Dedicated spaces for personal reflection and Friday prayers are also available on both campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMPUS LIFE & EVENTS ────────────────────────────────────────────── */}
      <section id="campus-life" className="section section-grey" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campus Experience</span>
            <h2 className="title-medium" style={{ marginTop: '0.4rem' }}>Campus Life & Events</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0.75rem auto 0', fontSize: '0.95rem' }}>Life across our Kandy and Colombo campuses is rich with cultural, social, and professional activities.</p>
          </div>
          <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(10,37,64,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={20} color="#e31c23" /></div>
                <h3 style={{ margin: 0, color: '#0a2540', fontWeight: 700 }}>Kandy Campus Highlights</h3>
              </div>
              <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Open Days & Career Fairs: Connect with top employers, industry recruiters, and academic advisors.',
                  'Cultural & Religious Celebrations: Community almsgiving initiatives during religious holidays and festive gatherings.',
                  'Open Air & Student Community Events: Active campus environment set in the heart of Sri Lanka\'s hill capital.',
                  'Kandy Perehera: Students can witness the most fabulous international cultural event — the Kandy Perehera — from our four-story building.',
                ].map((item, i) => <li key={i} style={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.65 }}>{item}</li>)}
              </ul>
            </div>
            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(10,37,64,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={20} color="#1d4ed8" /></div>
                <h3 style={{ margin: 0, color: '#0a2540', fontWeight: 700 }}>Colombo Campus Highlights</h3>
              </div>
              <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Industry & Corporate Visits: Gain firsthand experience with visits to leading IT firms, financial institutions, and corporate headquarters.',
                  'Specialized Clinical Visits: Exposure tours and practical visits to psychological counseling centers and health institutions for social science students.',
                  'Annual Student Talent Showcase: Highlights featuring music, dance performances, and stand-up comedy.',
                  'Social Gatherings: Student-led cultural festivals, networking mixers, and end-of-term celebrations.',
                ].map((item, i) => <li key={i} style={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.65 }}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDENT SERVICES ────────────────────────────────────────────────── */}
      <section id="student-services" className="section" style={{ scrollMarginTop: '100px' }}>
        <div className="container">
          <div className="entry-requirements-header">
            <div className="entry-requirements-pill">
              <Sparkles size={14} /> Comprehensive Learner Support Ecosystem
            </div>
            <h2 className="entry-requirements-title">Student Services & Support</h2>
            <p className="entry-requirements-subtitle">
              Dedicated academic guidance, personal welfare, and 24/7 digital student portal access designed to empower enrollees worldwide.
            </p>
          </div>

          <div className="student-services-grid">
            {/* Academic & Personal Support 2x3 Grid */}
            <div className="support-services-container">
              <h3 className="support-services-h3">
                <Users size={22} color="#e31c23" /> Academic & Personal Support
              </h3>
              <div className="support-cards-grid">
                {[
                  { icon: BookOpen, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Enrollment & Registration', desc: 'Step-by-step assistance with class selection and administrative onboarding.' },
                  { icon: GraduationCap, color: '#9333ea', bg: '#faf5ff', border: '#f3e8ff', title: 'Orientation & Settling In', desc: 'Welcome sessions for in-person classes; online orientation for distance learners.' },
                  { icon: ShieldCheck, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', title: 'Academic & Writing Support', desc: 'Dedicated academic writing assistance, study skills workshops, and assignment guidance.' },
                  { icon: Globe, color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', title: 'English Language Development', desc: 'Targeted support for students enhancing their professional and academic English proficiency.' },
                  { icon: Heart, color: '#e31c23', bg: '#fff1f2', border: '#fecdd3', title: 'Welfare & Attendance Support', desc: 'Proactive support to ensure your well-being, mental health, and academic consistency.' },
                  { icon: Briefcase, color: '#d97706', bg: '#fffbeb', border: '#fde68a', title: 'Disability & Inclusion Support', desc: 'Specialized learning support. Contact studentaffairs@gcbt.edu.lk for assistance.' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="support-item-card">
                      <div className="support-icon-row">
                        <div className="support-icon-box" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                          <Icon size={18} color={item.color} />
                        </div>
                      </div>
                      <div>
                        <strong className="support-title">{item.title}</strong>
                        <p className="support-desc">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Digital Student Portal Card */}
            <div className="digital-portal-card">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                  <Globe size={14} /> 24/7 Virtual Learning Environment (VLE)
                </div>
                <h3 style={{ color: '#0a2540', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                  Digital Student Portal Access
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Upon enrollment, every student receives 24/7 credentials to the Gatwick College Moodle Online Portal, featuring:
                </p>

                <div className="portal-feature-list">
                  {[
                    'Personalized academic timetables, class links, and assignment deadlines.',
                    'Virtual library access, recorded lecture notes, and downloadable study modules.',
                    'Direct communication channels with academic heads, faculty, and student representatives.',
                    'Extracurricular announcements, student council news, and campus event alerts.'
                  ].map((feat, idx) => (
                    <div key={idx} className="portal-feature-item">
                      <div className="portal-feature-icon">✓</div>
                      <span style={{ color: '#334155', fontSize: '0.86rem', lineHeight: 1.5, fontWeight: 600 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://lms.gcbt.edu.lk/login/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', justifyContent: 'center', marginTop: '1.25rem', textDecoration: 'none' }}
              >
                <Lock size={16} /> Access Student Portal (Moodle)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY SERVICES ──────────────────────────────────────────────── */}
      <section id="community-services" className="section section-grey" style={{ scrollMarginTop: '120px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSR & Social Impact</span>
            <h2 className="title-medium" style={{ marginTop: '0.4rem' }}>Community Services & Outreach</h2>
            <p style={{ color: '#64748b', maxWidth: '640px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.65 }}>
              As part of our core commitment to corporate social responsibility, Gatwick College empowers students to lead meaningful community development, charity, and public education initiatives.
            </p>
          </div>
          <div className="grid-3">
            {[
              { icon: Heart, color: '#e31c23', bg: '#fff5f5', border: '#fecdd3', tag: '1,200+ Beneficiaries', title: 'Charity Drives & Health Camps', desc: 'Student-led annual initiatives supporting local hospitals, emergency medical relief, and blood donation campaigns.' },
              { icon: Users, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', tag: '15+ Rural Schools', title: 'School Outreach & Mentorship', desc: 'Community engagement programs supporting rural school development, IT lab setup, and youth literacy workshops.' },
              { icon: BookOpen, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', tag: '5,000+ Attendees', title: 'Free Academic Webinars', desc: 'Open-access public workshops hosted by Gatwick faculty covering research methodologies, essay writing, and AI skills.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem 1.75rem', border: '1px solid #e2e8f0', borderTop: `4px solid ${item.color}`, boxShadow: '0 4px 16px rgba(10,37,64,0.04)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={24} color={item.color} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: item.color, background: item.bg, padding: '0.25rem 0.65rem', borderRadius: '20px', border: `1px solid ${item.border}` }}>
                        {item.tag}
                      </span>
                    </div>
                    <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Forensic Psychology Workshop Gallery */}
          <div style={{
            marginTop: '3.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            padding: '2rem 1.75rem',
            boxShadow: '0 10px 35px rgba(10, 37, 64, 0.05)'
          }}>
            <h3 style={{ color: '#0a2540', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }}>
              Forensic Psychology Workshop
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}>
              {[
                'assets/workshop_forensic_1.jpg',
                'assets/workshop_forensic_2.jpg',
                'assets/workshop_forensic_3.jpg',
                'assets/workshop_forensic_4.jpg',
              ].map((imgSrc, idx) => (
                <div 
                  key={idx}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 6px 18px rgba(10, 37, 64, 0.06)',
                    backgroundColor: '#ffffff',
                    width: '100%',
                    aspectRatio: '4 / 3'
                  }}
                >
                  <img 
                    src={imgSrc} 
                    alt={`Forensic Psychology Workshop ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERNSHIPS ─────────────────────────────────────────────────────── */}
      <section id="internships" className="section" style={{ scrollMarginTop: '120px' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start', gap: '2.5rem' }}>
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Career Development & Placements
              </span>
              <h2 className="title-medium" style={{ marginTop: '0.4rem' }}>Internships & Industry Placements</h2>
              <p style={{ color: '#475569', marginBottom: '1.75rem', fontSize: '0.95rem', lineHeight: 1.65 }}>
                Practical industry experience is central to Gatwick College's learning model. We bridge classroom knowledge with corporate opportunities through our corporate partner network in Sri Lanka and abroad.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Briefcase, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', title: 'Corporate Partner Placements', desc: 'Arranged internship opportunities across top IT, Business, and Finance firms in Colombo and Kandy.' },
                  { icon: GraduationCap, color: '#9333ea', bg: '#faf5ff', border: '#f3e8ff', title: 'On-Campus Traineeships', desc: 'Hands-on administrative, technical, and research traineeships within Gatwick College operational departments.' },
                  { icon: Award, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', title: 'CV & Interview Coaching', desc: 'One-on-one sessions with career officers for LinkedIn optimization, resume building, and mock interviews.' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: `1px solid ${item.border}`, boxShadow: '0 2px 8px rgba(10,37,64,0.03)' }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={22} color={item.color} />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.35rem', color: '#0a2540', fontWeight: 700, fontSize: '0.98rem' }}>{item.title}</h4>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.86rem', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Executive Career Hub Card */}
            <div className="career-placement-hub">
              <div>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Briefcase size={28} color="#16a34a" />
                </div>
                <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                  Student Placement Desk
                </h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  Have questions about available internship opportunities, corporate partnerships, or CV reviews? Connect directly with our Student Affairs office.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[
                    'Guaranteed internship interview referrals for high-performing graduates.',
                    'Flexible part-time traineeship hours synchronized with lecture schedules.',
                    'Formal recommendation letters and verified experience certificates.'
                  ].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#334155', fontSize: '0.86rem', fontWeight: 600 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a href="mailto:studentaffairs@gcbt.edu.lk" className="career-contact-chip">
                  <Mail size={18} /> studentaffairs@gcbt.edu.lk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRADUATION ──────────────────────────────────────────────────────── */}
      <section id="graduation" className="section section-grey" style={{ scrollMarginTop: '120px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ANNUAL CONVOCATION
            </span>
            <h2 className="title-medium" style={{ marginTop: '0.4rem' }}>Graduation Ceremony</h2>
            <p style={{ color: '#64748b', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Graduation is the pinnacle of the academic journey at Gatwick College. Each year, we host a grand physical convocation ceremony in Sri Lanka to celebrate the achievements of our local and international graduates alongside family, faculty, and distinguished university guests.
            </p>
          </div>

          {/* 5 Horizontal Cohort Cards */}
          <div className="prof-cohort-grid">
            {[
              { year: '2026', venue: 'Upcoming Gala', count: '850+ Candidates', label: '2026 Convocation' },
              { year: '2025', venue: 'Galadari Hall', count: '700+ Graduates', label: '2025 Convocation' },
              { year: '2024', venue: 'Shangri-La Ballroom', count: '620+ Graduates', label: '2024 Convocation' },
              { year: '2023', venue: "Water's Edge", count: '580+ Graduates', label: '2023 Convocation' },
              { year: '2022', venue: 'BMICH Main Hall', count: '450+ Graduates', label: '2022 Convocation' },
            ].map((c) => {
              const isSelected = selectedGradYear === c.year;
              return (
                <div
                  key={c.year}
                  className={`prof-cohort-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedGradYear(c.year);
                    const galleryEl = document.getElementById('grad-photo-gallery');
                    if (galleryEl) {
                      galleryEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #e31c23' : '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    transform: isSelected ? 'translateY(-6px)' : 'none',
                    boxShadow: isSelected ? '0 12px 30px rgba(227,28,35,0.2)' : '0 4px 12px rgba(10,37,64,0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    borderRadius: '18px',
                    padding: '1.6rem 1rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    overflow: 'hidden'
                  }}
                >
                  {/* Active Gradient Top Accent Bar */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #e31c23 0%, #ff4d4d 100%)'
                      }}
                    />
                  )}

                  <div>
                    <div className="prof-year" style={{ color: isSelected ? '#e31c23' : '#0a2540', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
                      {c.year}
                    </div>
                  </div>

                  {/* High-End Attractive Rounded Action Button */}
                  <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                    {isSelected ? (
                      <button
                        type="button"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 1.15rem',
                          borderRadius: '30px',
                          background: 'linear-gradient(135deg, #e31c23 0%, #b91c1c 100%)',
                          color: '#ffffff',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          border: 'none',
                          boxShadow: '0 4px 14px rgba(227, 28, 35, 0.4)',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <Camera size={15} />
                        <span>View Gallery</span>
                        <ChevronRight size={14} style={{ marginLeft: '1px' }} />
                      </button>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.45rem 0.95rem',
                          borderRadius: '30px',
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <Image size={13} color="#64748b" />
                        <span>{c.label}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2 Executive Cards */}
          <div className="prof-conv-grid">
            <div className="prof-conv-card">
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff1f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <GraduationCap size={26} color="#e31c23" />
                </div>
                <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.65rem' }}>
                  Physical Convocation & Degree Conferring
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Students awarded Higher Diplomas and Bachelor Degrees participate in a formal physical ceremony with traditional academic regalia, scroll presentation, and faculty honors.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    'Dual UK-accredited degree parchment conferring.',
                    'Chief guest addresses from visiting UK university deans.',
                    'Professional portrait photography and robing desk.'
                  ].map((bullet, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#e31c23" style={{ flexShrink: 0 }} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="prof-conv-card">
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Globe size={26} color="#1d4ed8" />
                </div>
                <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.65rem' }}>
                  International Distance-Learner Delegation
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Overseas distance-learning graduates are warmly invited to travel to Sri Lanka to participate in the physical ceremony alongside peers, family, and faculty.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    'Complimentary visa support & partner hotel accommodation guidance.',
                    'Official academic invitation letters for student and family travel.',
                    'Annual alumni gala networking dinner in Colombo.'
                  ].map((bullet, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#1d4ed8" style={{ flexShrink: 0 }} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <a
                  href="#convocation-form"
                  onClick={(e) => {
                    e.preventDefault();
                    const formEl = document.getElementById('convocation-form');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    else window.location.hash = 'convocation-form';
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                >
                  Register for Convocation
                </a>
              </div>
            </div>
          </div>

          {/* ── DEDICATED CONVOCATION REGISTRATION FORM ────────────────── */}
          <div id="convocation-form" style={{ scrollMarginTop: '120px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', borderTop: '5px solid #e31c23', padding: '2.25rem 2rem', boxShadow: '0 10px 30px rgba(10,37,64,0.06)', margin: '3.5rem auto', maxWidth: '720px' }}>
            <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 1.75rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '20px', background: '#fff1f2', color: '#e31c23', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <GraduationCap size={16} /> Official Convocation Desk
              </div>
              <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>
                Convocation Registration Form
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                Graduating students and distance learners must register below to confirm seating, family guest passes, and academic gown fitting for the upcoming physical convocation ceremony.
              </p>
            </div>

            {convocationFormSubmitted ? (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '2rem', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ color: '#166534', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  Convocation Registration Received!
                </h4>
                <p style={{ color: '#15803d', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Thank you, <strong>{convocationData.fullName || 'Graduate'}</strong>. Your registration for <strong>{convocationData.program}</strong> has been submitted to the Student Affairs Registrar. An official invitation pass and gown fitting schedule will be sent to <strong>{convocationData.email || 'your email'}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setConvocationFormSubmitted(false)}
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                >
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await addConvocationRegistration(convocationData);
                  } catch (err) {
                    console.error("Error saving convocation registration:", err);
                  }
                  setConvocationFormSubmitted(true);
                }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', width: '100%' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Full Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anura Perera"
                    value={convocationData.fullName}
                    onChange={(e) => setConvocationData({ ...convocationData, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Student Registration ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GCBT-2024-8841"
                    value={convocationData.studentId}
                    onChange={(e) => setConvocationData({ ...convocationData, studentId: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Academic Program Completed *
                  </label>
                  <select
                    value={convocationData.program}
                    onChange={(e) => setConvocationData({ ...convocationData, program: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="Higher National Diploma in Computing">Higher National Diploma in Computing</option>
                    <option value="BSc (Hons) Computer Science">BSc (Hons) Computer Science</option>
                    <option value="Higher National Diploma in Business Management">Higher National Diploma in Business Management</option>
                    <option value="MBA Transnational Program">MBA Transnational Program</option>
                    <option value="Foundation Studies in IT & Business">Foundation Studies in IT & Business</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Convocation Cohort / Year *
                  </label>
                  <select
                    value={convocationData.cohortYear}
                    onChange={(e) => setConvocationData({ ...convocationData, cohortYear: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="2026 Convocation Gala (Upcoming)">2026 Convocation Gala (Upcoming)</option>
                    <option value="2025 Retrospective Registration">2025 Retrospective Registration</option>
                    <option value="Distance Learning Delegate">Distance Learning Overseas Delegate</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={convocationData.email}
                    onChange={(e) => setConvocationData({ ...convocationData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={convocationData.phone}
                    onChange={(e) => setConvocationData({ ...convocationData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Guest Tickets Needed *
                  </label>
                  <select
                    value={convocationData.tickets}
                    onChange={(e) => setConvocationData({ ...convocationData, tickets: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="1 Ticket (Graduate Only)">1 Ticket (Graduate Only)</option>
                    <option value="2 Tickets (Graduate + 1 Guest)">2 Tickets (Graduate + 1 Guest)</option>
                    <option value="3 Tickets (Graduate + 2 Guests)">3 Tickets (Graduate + 2 Guests)</option>
                    <option value="VIP Family Box (4 Tickets)">VIP Family Box (4 Tickets)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Gown Fitting Size *
                  </label>
                  <select
                    value={convocationData.gownSize}
                    onChange={(e) => setConvocationData({ ...convocationData, gownSize: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="Small (5'0&quot; - 5'4&quot;)">Small (5'0" - 5'4")</option>
                    <option value="Medium (5'5&quot; - 5'9&quot;)">Medium (5'5" - 5'9")</option>
                    <option value="Large (5'10&quot; - 6'2&quot;)">Large (5'10" - 6'2")</option>
                    <option value="Extra Large (6'3&quot;+)">Extra Large (6'3"+)</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '0.75rem' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 700, justifyContent: 'center' }}
                  >
                    <GraduationCap size={20} /> Submit Convocation Registration
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Year-Wise Convocation Photo Gallery */}
          <div id="grad-photo-gallery" style={{ scrollMarginTop: '130px', marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CONVOCATION MEMORIES
              </span>
              <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.6rem', marginTop: '0.25rem' }}>
                Year-Wise Convocation Gallery
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '600px', margin: '0.4rem auto 0' }}>
                Select a graduation cohort year below to view official ceremony highlights, scroll presentations, and honors.
              </p>

              {/* Year Filter Tabs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
                {[
                  { year: '2026', label: '2026 Convocation' },
                  { year: '2025', label: '2025 Convocation' },
                  { year: '2024', label: '2024 Convocation' },
                  { year: '2023', label: '2023 Convocation' },
                  { year: '2022', label: '2022 Convocation' },
                ].map((tab) => {
                  const isActive = selectedGradYear === tab.year;
                  return (
                    <button
                      key={tab.year}
                      type="button"
                      onClick={() => setSelectedGradYear(tab.year)}
                      style={{
                        padding: '0.65rem 1.35rem',
                        borderRadius: '30px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: isActive ? 'none' : '1px solid #cbd5e1',
                        background: isActive ? 'linear-gradient(135deg, #e31c23 0%, #b91c1c 100%)' : '#ffffff',
                        color: isActive ? '#ffffff' : '#475569',
                        boxShadow: isActive ? '0 6px 18px rgba(227,28,35,0.35)' : '0 2px 6px rgba(10,37,64,0.03)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <Camera size={15} color={isActive ? '#ffffff' : '#e31c23'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Year Photo Grid */}
            <div className="gallery-grid" style={{ gap: '1.5rem' }}>
              {activeGradPhotos.map((img, idx) => (
                <div
                  key={idx}
                  className="gallery-item"
                  onClick={() => setLightboxImg(img)}
                  style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(10,37,64,0.06)', position: 'relative', cursor: 'pointer' }}
                >
                  <img src={img.src} alt={img.caption} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
                  <div className="gallery-overlay" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                    <Search size={26} color="#ffffff" />
                    <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>{img.caption}</span>
                  </div>
                </div>
              ))}
            </div>
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
