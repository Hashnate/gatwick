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
  const [inaugIndex, setInaugIndex] = useState(0);
  const [expoIndex, setExpoIndex] = useState(0);
  const [forensicIndex, setForensicIndex] = useState(0);
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

  // 2-Review Page Slider State (2 per page)
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 2;
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
      { src: "assets/grad_2026_18.jpg", title: "Graduates Seated in Auditorium", caption: "Gatwick College Graduation Ceremony 2026 at BMICH Colombo — Graduates Seated in Auditorium" },
      { src: "assets/grad_2026_13.jpg", title: "Ceremonial Entrance Gate", caption: "Gatwick College Graduation Ceremony 2026 at BMICH Colombo — Ceremonial Entrance Arch" },
      { src: "assets/grad_2026_14.jpg", title: "Academic Council Stage Seating", caption: "Gatwick College Graduation Ceremony 2026 at BMICH Colombo — Academic Council Stage Seating & Flags" },
      { src: "assets/grad_2026_15.jpg", title: "Traditional Procession Dignitaries", caption: "Gatwick College Graduation Ceremony 2026 at BMICH Colombo — Traditional Kandyan Procession" },
      { src: "assets/grad_2026_16.jpg", title: "Graduating Class Auditorium Seating", caption: "Gatwick College Graduation Ceremony 2026 at BMICH Colombo — Graduating Class Seated in Auditorium" },
      { src: "assets/grad_2026_17.jpg", title: "Academic Council Stage Dignitaries", caption: "Gatwick College Graduation Ceremony 2026 at BMICH Colombo — Academic Council Stage Dignitaries" },
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
      { src: "assets/grad_2025_18.jpg", title: "Stage Scroll Presentation Ceremonial Honor", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Stage Scroll Presentation Honor" },
      { src: "assets/grad_2025_13.jpg", title: "Academic Procession & Faculty", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Academic Procession & Faculty" },
      { src: "assets/grad_2025_14.jpg", title: "Traditional Procession Dignitaries", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Traditional Procession & Dignitaries" },
      { src: "assets/grad_2025_15.jpg", title: "Academic Council Stage Seating", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Academic Council Stage Seating" },
      { src: "assets/grad_2025_16.jpg", title: "Special Memento Award Presentation", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Special Memento Award Presentation" },
      { src: "assets/grad_2025_17.jpg", title: "Degree Scroll Award Presentation", caption: "Gatwick College Graduation 2025 Episode 4 at BMICH Colombo — Degree Scroll Award Presentation" },
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
      { src: "assets/grad_2024_20.jpg", title: "Overhead Auditorium & Stage View", caption: "Gatwick College Graduation 2024 Episode 3 — Full Auditorium Assembly & Stage View" },
      { src: "assets/grad_2024_15.jpg", title: "Full Auditorium Assembly", caption: "Gatwick College Graduation 2024 Episode 3 — Grand Auditorium Assembly" },
      { src: "assets/grad_2024_16.png", title: "Stage Host & Ceremony Presenter", caption: "Gatwick College Graduation 2024 Episode 3 — Stage Host & Ceremony Presenter" },
      { src: "assets/grad_2024_17.jpg", title: "Stage Opening & Address", caption: "Gatwick College Graduation 2024 Episode 3 — Stage Opening & Ceremonial Address" },
      { src: "assets/grad_2024_18.jpg", title: "Academic Council & Dignitaries", caption: "Gatwick College Graduation 2024 Episode 3 — Academic Council & Dignitaries" },
      { src: "assets/grad_2024_19.jpg", title: "Graduate Stage Procession", caption: "Gatwick College Graduation 2024 Episode 3 — Graduate Stage Procession" },
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
      { src: "assets/grad_2023_17.jpg", title: "Traditional Cultural Procession", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Traditional Kandyan Procession & Dignitaries" },
      { src: "assets/grad_2023_18.jpg", title: "Honor Guard & Dancers", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Traditional Honor Guard & Ceremonial Performance" },
      { src: "assets/grad_2023_13.jpg", title: "Degree Scroll Presentation", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Degree Scroll Award Presentation" },
      { src: "assets/grad_2023_14.jpg", title: "Graduating Class & Auditorium", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Main Hall Convocation Assembly" },
      { src: "assets/grad_2023_15.jpg", title: "Academic Award Ceremony", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Academic Honor Award Ceremony" },
      { src: "assets/grad_2023_16.jpg", title: "Grand Convocation Hall", caption: "Gatwick College Graduation Ceremony 2023 at BMICH — Main Auditorium Assembly" },
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
        <section id="events" className="section section-grey">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Campus Experience
              </span>
              <h2 className="title-medium">Campus Life & Events</h2>
              <p style={{ color: '#64748b', maxWidth: '640px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.65 }}>
                Life across our Kandy and Colombo campuses is rich with cultural, social, and professional activities.
              </p>
            </div>

            <div className="grid-3" style={{ marginBottom: '3rem' }}>
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

            {/* ── DEGREE PROGRAMMES INAUGURATION 2024 FEATURE SHOWCASE ──── */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(10, 37, 64, 0.06)',
              marginBottom: '3rem'
            }}>
              {/* Top Header Flow */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e31c23', background: '#fff5f5', border: '1px solid #fecdd3', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    🎓 Academic Convocation & Launch
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    Mandhu College & University of Rhone
                  </span>
                </div>

                <h3 style={{ color: '#0a2540', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>
                  Degree Programmes Inauguration — 2024
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.94rem', margin: 0, width: '100%', lineHeight: 1.65 }}>
                  Official launch and academic welcome ceremony for Gatwick College of Business & Technology undergraduate and postgraduate degree cohorts, organized in collaboration with our esteemed international academic partners <strong>Mandhu College</strong> and <strong>University of Rhone</strong>. Celebrating student achievements, global degree pathways, and faculty leadership.
                </p>
              </div>

              {/* 4-Photo View Slider with Floating Side Navigation Buttons */}
              <div style={{ position: 'relative', width: '100%', padding: '0 0.5rem' }}>
                {/* Previous (❮) Button - Left Floating Side */}
                <button
                  onClick={() => setInaugIndex((prev) => (prev > 0 ? prev - 1 : 3))}
                  className="btn-circle-nav"
                  style={{
                    position: 'absolute',
                    left: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0a2540',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(10,37,64,0.15)',
                    zIndex: 10,
                    transition: 'all 0.25s ease'
                  }}
                  aria-label="Previous photos"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* 4-Photo View Grid - 4 Columns Flush Layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  width: '100%'
                }}>
                  {[
                    { src: 'assets/inauguration_2024_1.jpg', title: 'Degree Programmes Inauguration Banner', caption: 'Degree Programmes Inauguration 2024 Official Banner — Gatwick College of Business & Technology, Mandhu College & University of Rhone' },
                    { src: 'assets/inauguration_2024_5.jpg', title: 'Senior Faculty & Guests of Honor', caption: 'Gatwick College Degree Programmes Inauguration 2024 — Senior Faculty Delegation & Guests of Honor' },
                    { src: 'assets/inauguration_2024_6.jpg', title: 'Degree Academic Committee', caption: 'Gatwick College Degree Programmes Inauguration 2024 — Academic Committee Delegation' },
                    { src: 'assets/inauguration_2024_2.jpg', title: 'Student & Faculty Cohort', caption: 'Gatwick College Degree Programmes Inauguration 2024 — Full Student Cohort & Faculty Delegation' },
                    { src: 'assets/inauguration_2024_3.jpg', title: 'Women Faculty & Graduate Delegation', caption: 'Gatwick College Degree Programmes Inauguration 2024 — Women Faculty & Student Delegation' },
                    { src: 'assets/inauguration_2024_4.jpg', title: 'Academic Leadership Council', caption: 'Gatwick College Degree Programmes Inauguration 2024 — Academic Leadership Council & Faculty Dignitaries' },
                    { src: 'assets/inauguration_2024_7.jpg', title: 'Auditorium Interactive Session', caption: 'Gatwick College Degree Programmes Inauguration 2024 — Auditorium Interactive Assembly & Table Discussion' }
                  ].slice(inaugIndex, inaugIndex + 4).map((imgObj, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setLightboxImg(imgObj);
                      }}
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid #cbd5e1',
                        boxShadow: '0 6px 18px rgba(10,37,64,0.08)',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                        <img
                          src={imgObj.src}
                          alt={imgObj.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next (❯) Button - Right Floating Side */}
                <button
                  onClick={() => setInaugIndex((prev) => (prev < 3 ? prev + 1 : 0))}
                  className="btn-circle-nav"
                  style={{
                    position: 'absolute',
                    right: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0a2540',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(10,37,64,0.15)',
                    zIndex: 10,
                    transition: 'all 0.25s ease'
                  }}
                  aria-label="Next photos"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* ── EDUEXPO PARTICIPATIONS FEATURE SHOWCASE ──── */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(10, 37, 64, 0.06)',
              marginBottom: '3rem'
            }}>
              {/* Top Header Flow */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e31c23', background: '#fff5f5', border: '1px solid #fecdd3', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    🎓 Education Fair & Career Expo
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    Direct Student Advisory & Outreach
                  </span>
                </div>

                <h3 style={{ color: '#0a2540', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>
                  Eduexpo Participations
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.94rem', margin: 0, width: '100%', lineHeight: 1.65 }}>
                  Gatwick College of Business & Technology actively participates in major national and regional Higher Education Expos, connecting prospective students and families directly with academic counselors for personalized degree pathway planning, course enrollment, and career guidance.
                </p>
              </div>

              {/* 4-Photo View Slider with Floating Side Navigation Buttons */}
              <div style={{ position: 'relative', width: '100%', padding: '0 0.5rem' }}>
                {/* Previous (❮) Button - Left Floating Side */}
                <button
                  onClick={() => setExpoIndex((prev) => (prev > 0 ? prev - 1 : 2))}
                  className="btn-circle-nav"
                  style={{
                    position: 'absolute',
                    left: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0a2540',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(10,37,64,0.15)',
                    zIndex: 10,
                    transition: 'all 0.25s ease'
                  }}
                  aria-label="Previous photos"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* 4-Photo View Grid - 4 Columns Flush Layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  width: '100%'
                }}>
                  {[
                    { src: 'assets/edu_fair_1.jpg', title: 'EduExpo Student Advisory', caption: 'Gatwick College EduExpo Stall — One-on-One Student Advisory Session' },
                    { src: 'assets/edu_fair_2.jpg', title: 'EduExpo Enrollment Guidance', caption: 'Gatwick College EduExpo Stall — Program Enrollment & Admissions Guidance' },
                    { src: 'assets/edu_fair_3.jpg', title: 'EduExpo Family Consultation', caption: 'Gatwick College EduExpo Stall — Family Consultation & Course Selection' },
                    { src: 'assets/edu_fair_4.jpg', title: 'EduExpo Academic Counseling', caption: 'Gatwick College EduExpo Stall — Academic Counseling & Student Support' },
                    { src: 'assets/edu_fair_5.jpg', title: 'EduExpo Laptop Advisory', caption: 'Gatwick College EduExpo Stall — Higher Education Advisory & Laptop Session' },
                    { src: 'assets/edu_fair_6.jpg', title: 'EduExpo Outreach Team', caption: 'Gatwick College EduExpo Stall — Academic Outreach Team & Stall Operations' }
                  ].slice(expoIndex, expoIndex + 4).map((imgObj, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setLightboxImg(imgObj);
                      }}
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid #cbd5e1',
                        boxShadow: '0 6px 18px rgba(10,37,64,0.08)',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                        <img
                          src={imgObj.src}
                          alt={imgObj.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next (❯) Button - Right Floating Side */}
                <button
                  onClick={() => setExpoIndex((prev) => (prev < 2 ? prev + 1 : 0))}
                  className="btn-circle-nav"
                  style={{
                    position: 'absolute',
                    right: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0a2540',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(10,37,64,0.15)',
                    zIndex: 10,
                    transition: 'all 0.25s ease'
                  }}
                  aria-label="Next photos"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* ── SINHALA & TAMIL NEW YEAR CELEBRATIONS FEATURE SHOWCASE ──── */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(10, 37, 64, 0.06)',
              marginBottom: '3rem'
            }}>
              {/* Top Header Flow */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e31c23', background: '#fff5f5', border: '1px solid #fecdd3', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    🌾 Cultural Harmony & Festivities
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#15803d', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    Annual Campus Avurudu Celebrations
                  </span>
                </div>

                <h3 style={{ color: '#0a2540', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>
                  Sinhala Tamil New Year Celebrations
                </h3>

                <p style={{ color: '#64748b', fontSize: '0.94rem', margin: 0, width: '100%', lineHeight: 1.65 }}>
                  Gatwick College celebrates Sinhala and Tamil New Year with traditional customs, cultural festivities, traditional sweet tables (Avurudu Kevili Mesaya), traditional milk boiling rituals (Kiri Ithiraweema), and active participation from students, faculty, and leadership.
                </p>
              </div>

              {/* 4-Photo Grid Layout */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                width: '100%'
              }}>
                {[
                  { src: 'assets/avurudu_1.jpg', title: 'GCBT Logo Cake & Oil Lamp', caption: 'Sinhala & Tamil New Year — Custom GCBT Logo Cake, Traditional Oil Lamp & Kokis' },
                  { src: 'assets/avurudu_2.png', title: 'Traditional Milk Boiling', caption: 'Sinhala & Tamil New Year — Kiri Ithiraweema Traditional Milk Boiling Ritual' },
                  { src: 'assets/avurudu_3.jpg', title: 'Staff & Student Attire', caption: 'Sinhala & Tamil New Year — Staff & Students in Traditional Cultural Attire' },
                  { src: 'assets/avurudu_4.jpg', title: 'Avurudu Kevili Mesaya', caption: 'Sinhala & Tamil New Year — Traditional Avurudu Sweet Table Spread' },
                ].map((imgObj, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLightboxImg(imgObj);
                    }}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #cbd5e1',
                      boxShadow: '0 6px 18px rgba(10,37,64,0.08)',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                      <img
                        src={imgObj.src}
                        alt={imgObj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
                      {t.course} ({t.campus.toLowerCase().includes('learning') || t.campus.toLowerCase().includes('online') || t.campus.toLowerCase().includes('campus') ? t.campus : `${t.campus} Campus`})
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
      <section id="clubs-societies" className="section" style={{ paddingTop: '1.25rem', scrollMarginTop: '100px' }}>
        <div className="container">
          <div className="clubs-header-grid">
            <div className="clubs-header-text">
              <div>
                <div className="entry-requirements-pill" style={{ marginBottom: '0.6rem' }}>
                  <Sparkles size={14} /> Campus Life & Student Leadership
                </div>
                <h2 className="entry-requirements-title" style={{ margin: '0 0 0.5rem' }}>
                  Clubs & Societies
                </h2>
                <p className="entry-requirements-subtitle" style={{ maxWidth: '100%', margin: 0 }}>
                  Enrich your university experience through student-led organizations, global networking, leadership councils, and community outreach across both campuses.
                </p>
              </div>

              <div className="clubs-header-features">
                <div className="clubs-feature-point">
                  <div className="clubs-feature-point-dot" />
                  <div>
                    <strong>Student Leadership Council:</strong> Elected student officers organizing campus events, academic forums & student welfare.
                  </div>
                </div>
                <div className="clubs-feature-point">
                  <div className="clubs-feature-point-dot" />
                  <div>
                    <strong>Global Immersion Tours:</strong> Cross-cultural exchanges, international study trips & peer networking.
                  </div>
                </div>
                <div className="clubs-feature-point">
                  <div className="clubs-feature-point-dot" />
                  <div>
                    <strong>CSR & Volunteer Projects:</strong> Annual charity drives, environmental cleanups & community mentorship programs.
                  </div>
                </div>
              </div>

              <div className="clubs-header-highlights">
                <div className="clubs-highlight-item">
                  <div className="clubs-highlight-icon" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
                    <Users size={16} />
                  </div>
                  <span>15+ Active Societies</span>
                </div>
                <div className="clubs-highlight-item">
                  <div className="clubs-highlight-icon" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                    <Globe size={16} />
                  </div>
                  <span>Global Student Tours</span>
                </div>
                <div className="clubs-highlight-item">
                  <div className="clubs-highlight-icon" style={{ background: '#fff1f2', color: '#e31c23', border: '1px solid #fecdd3' }}>
                    <Heart size={16} />
                  </div>
                  <span>Community Leadership</span>
                </div>
              </div>
            </div>

            <div
              className="clubs-header-image-card"
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 14px 36px rgba(10, 37, 64, 0.09)',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              onClick={() => setLightboxImg({
                src: "assets/thailand_exchange_1.jpg",
                title: "International students exchange program - Thailand",
                caption: "Gatwick College students and faculty participating in the International Students Exchange Program in Thailand."
              })}
            >
              {/* Pure Clean Photo Frame */}
              <div style={{ position: 'relative', flex: 1, minHeight: '270px', overflow: 'hidden' }}>
                <img
                  src="assets/thailand_exchange_1.jpg"
                  alt="International students exchange program - Thailand"
                  className="clubs-header-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                />
              </div>

              {/* Executive Light Footer Banner */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '1.25rem 1.35rem',
                textAlign: 'left',
                borderTop: '1px solid #f1f5f9'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#e31c23',
                  backgroundColor: '#fff1f2',
                  border: '1px solid #fecdd3',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.6rem'
                }}>
                  <span>✈️</span> Student Exchange Tour
                </div>
                
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: '#0a2540',
                  lineHeight: 1.35,
                  margin: '0 0 0.25rem',
                  letterSpacing: '-0.01em'
                }}>
                  International students exchange program - Thailand
                </h3>

                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  📍 Suvarnabhumi International Airport, Bangkok
                </div>
              </div>
            </div>
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
          <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
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

          {/* Community Service & Outreach Showcase Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(10, 37, 64, 0.04)',
            marginBottom: '1.75rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 340px) 1fr',
              gap: '1.75rem',
              alignItems: 'center'
            }}>
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 22px rgba(10, 37, 64, 0.08)',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxImg({
                  src: 'assets/community_service_certificate_1.jpg',
                  caption: 'Community Service & Youth Empowerment Workshop Certificate Award Ceremony at Gatwick College'
                })}
              >
                <img 
                  src="assets/community_service_certificate_1.jpg" 
                  alt="Community Service & Outreach Certificate Award"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.85rem 1rem'
                }}>
                  <span style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🔍 Click to Enlarge Photo
                  </span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e31c23', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: '#fff5f5', padding: '0.25rem 0.65rem', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                  Student Leadership & CSR
                </span>
                <h3 style={{ color: '#0a2540', fontSize: '1.35rem', fontWeight: 800, margin: '0.6rem 0 0.5rem' }}>
                  Youth Leadership & Community Outreach Certificate Awards
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                  Gatwick College students actively participate in social responsibility campaigns, youth leadership workshops, and community development programs. Upon successfully completing their community outreach initiatives, students receive formal certificates of commendation for their leadership and social impact.
                </p>
              </div>
            </div>
          </div>

          {/* Community Services Projects with Psychology Students Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(10, 37, 64, 0.04)',
            marginBottom: '2rem'
          }}>
            {/* Top Category Badges */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#e31c23', background: '#fff5f5', border: '1px solid #fecdd3', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                Mental Health CSR & Field Outreach
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                Applied Psychology Delegation
              </span>
            </div>

            {/* Title */}
            <h3 style={{ color: '#0a2540', fontSize: '1.45rem', fontWeight: 800, margin: '0 0 0.65rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Community Services Projects with Psychology Students
            </h3>

            {/* Description */}
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, marginTop: 0, marginBottom: '1.5rem', maxWidth: '100%' }}>
              Gatwick College <strong>Applied Psychology & Counseling</strong> students actively engage in community mental health outreach projects in collaboration with leading non-profit counseling centers, including <strong>Sri Lanka Sumithrayo & Mel Medura</strong>. These field initiatives connect theoretical psychology knowledge with community crisis intervention, addiction counseling awareness, and public mental wellness support.
            </p>

            {/* Middle Grid: Left Photo Gallery + Right Feature Points Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 360px) 1fr',
              gap: '1.5rem',
              alignItems: 'stretch',
              marginBottom: '1.5rem'
            }}>
              {/* Left: Studio Framed Photo */}
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(10, 37, 64, 0.08)',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                  height: '210px'
                }}
                onClick={() => setLightboxImg({
                  src: 'assets/psychology_community_service_1.jpg',
                  title: 'Community Services Projects with Psychology Students',
                  caption: 'Gatwick College Psychology Students & Faculty Delegation visiting Sri Lanka Sumithrayo / Mel Medura for Community Mental Health Outreach'
                })}
              >
                <img 
                  src="assets/psychology_community_service_1.jpg" 
                  alt="Community Services Projects with Psychology Students - Sri Lanka Sumithrayo Visit"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                  padding: '0.4rem 0.5rem',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}>
                  🔍 Sri Lanka Sumithrayo Outreach Delegation
                </div>
              </div>

              {/* Right: 2x2 Feature Matrix Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', alignContent: 'center' }}>
                {[
                  { title: 'Mental Health Outreach', desc: 'Crisis support & community awareness' },
                  { title: 'Mel Medura Field Visit', desc: 'Addiction counseling & rehabilitation insights' },
                  { title: 'Public Welfare Engagement', desc: 'Community mental health advocacy' },
                  { title: 'Faculty & Student Leadership', desc: 'Joint academic & social impact delegation' }
                ].map((feat, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#e31c23', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.05rem', flexShrink: 0 }}>✓</span>
                    <div>
                      <strong style={{ color: '#0a2540', fontSize: '0.86rem', display: 'block', lineHeight: 1.3, marginBottom: '0.2rem' }}>{feat.title}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', lineHeight: 1.35 }}>{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Width Takeaway Box at Bottom */}
            <div style={{ background: '#fff5f5', padding: '0.85rem 1.15rem', borderRadius: '12px', border: '1px solid #fecdd3', borderLeft: '4px solid #e31c23', width: '100%', boxSizing: 'border-box' }}>
              <span style={{ color: '#991b1b', fontWeight: 700, fontSize: '0.75rem', display: 'block', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Social Impact & Community Leadership
              </span>
              <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                Direct engagement with non-governmental mental health centers empowers Gatwick College psychology students to apply counseling principles for compassionate, real-world community impact.
              </p>
            </div>
          </div>

          {/* ── ACADEMIC & APPLIED WORKSHOPS SECTION ─────────────────────── */}
          <div id="workshops" style={{ scrollMarginTop: '130px', marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', background: '#fff5f5', padding: '0.35rem 0.85rem', borderRadius: '20px', border: '1px solid #fecdd3' }}>
                Practical Training & Hands-On Experience
              </span>
              <h2 className="title-medium" style={{ marginTop: '0.75rem', color: '#0a2540' }}>
                Academic & Applied Workshops
              </h2>
              <p style={{ color: '#64748b', maxWidth: '680px', margin: '0.6rem auto 0', fontSize: '0.95rem', lineHeight: 1.65 }}>
                Gatwick College integrates hands-on practical workshops, interactive group activities, case studies, and community awareness programs directly into diploma and degree learning.
              </p>
            </div>



            {/* Field Visit — Psychology Students Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              boxShadow: '0 8px 24px rgba(10, 37, 64, 0.04)',
              marginBottom: '1.75rem'
            }}>
              {/* Top Category Badges */}
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                  Practical Field Learning
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                  Applied Psychology Cohort
                </span>
              </div>

              {/* Title */}
              <h3 style={{ color: '#0a2540', fontSize: '1.45rem', fontWeight: 800, margin: '0 0 0.65rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                Field Visit & Interactive Case-Study Session — Psychology Students
              </h3>

              {/* Description */}
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, marginTop: 0, marginBottom: '1.5rem', maxWidth: '100%' }}>
                Gatwick College <strong>Diploma & Higher Diploma in Applied Psychology</strong> students participate in experiential field visits and clinical case-study workshops. During these sessions, students attend expert-led presentations in specialized resource centers and collaborate in interactive small-group exercises—mapping psychological risk factors, environmental influences, and therapeutic intervention pathways.
              </p>

              {/* Middle Grid: Left Photo Gallery + Right Feature Points Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 360px) 1fr',
                gap: '1.5rem',
                alignItems: 'stretch',
                marginBottom: '1.5rem'
              }}>
                {/* Left: 2 Photos Side-by-Side in Proportional Frames */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div 
                    style={{
                      position: 'relative',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 6px 18px rgba(10, 37, 64, 0.08)',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      height: '210px'
                    }}
                    onClick={() => setLightboxImg({
                      src: 'assets/psychology_field_visit_1.png',
                      caption: 'Field Visit & Interactive Seminar Session — Applied Psychology Students at Gatwick College'
                    })}
                  >
                    <img 
                      src="assets/psychology_field_visit_1.png" 
                      alt="Field Visit Psychology Students Seminar"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                      padding: '0.4rem 0.5rem',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}>
                      🔍 Seminar Session
                    </div>
                  </div>

                  <div 
                    style={{
                      position: 'relative',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 6px 18px rgba(10, 37, 64, 0.08)',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      height: '210px'
                    }}
                    onClick={() => setLightboxImg({
                      src: 'assets/psychology_field_visit_2.png',
                      caption: 'Interactive Group Poster & Mental Health Stress Mapping Activity — Applied Psychology Students'
                    })}
                  >
                    <img 
                      src="assets/psychology_field_visit_2.png" 
                      alt="Psychology Students Case Study Group Exercise"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                      padding: '0.4rem 0.5rem',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}>
                      🔍 Stress Mapping
                    </div>
                  </div>
                </div>

                {/* Right: 2x2 Feature Matrix Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', alignContent: 'center' }}>
                  {[
                    { title: 'Clinical Library Session', desc: 'Resource-rich environment learning' },
                    { title: 'Group Stress Mapping', desc: 'Interactive poster & case-study analysis' },
                    { title: 'Diagnostic Case Studies', desc: 'Real-world psychological scenarios' },
                    { title: 'Faculty Mentorship', desc: 'Direct guidance from practicing counselors' }
                  ].map((feat, i) => (
                    <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.05rem', flexShrink: 0 }}>✓</span>
                      <div>
                        <strong style={{ color: '#0a2540', fontSize: '0.86rem', display: 'block', lineHeight: 1.3, marginBottom: '0.2rem' }}>{feat.title}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block', lineHeight: 1.35 }}>{feat.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Width Takeaway Box at Bottom */}
              <div style={{ background: '#f0fdf4', padding: '0.85rem 1.15rem', borderRadius: '12px', border: '1px solid #bbf7d0', borderLeft: '4px solid #16a34a', width: '100%', boxSizing: 'border-box' }}>
                <span style={{ color: '#15803d', fontWeight: 700, fontSize: '0.75rem', display: 'block', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Experiential Learning Impact
                </span>
                <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                  Combining field observations with active peer discussions builds critical analytical skills and prepares psychology learners for professional clinical practice and post-graduate studies.
                </p>
              </div>
            </div>

            {/* Forensic Psychology Workshop Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
              boxShadow: '0 8px 24px rgba(10, 37, 64, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#faf5ff', color: '#9333ea', border: '1px solid #f3e8ff', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                      School of Psychology
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                      Criminal Profiling & Analysis
                    </span>
                  </div>
                  <h3 style={{ color: '#0a2540', fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                    Forensic Psychology & Criminal Profiling Workshop
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', margin: '0.4rem 0 0', lineHeight: 1.6 }}>
                    Specialized practical training on psychological evaluation tools, criminal behavior profiling techniques, and forensic assessment methods led by expert faculty, featuring official workshop certificate conferrals for Gatwick College School of Psychology students.
                  </p>
                </div>
              </div>

              {/* 4-Photo View Slider with Floating Side Navigation Buttons */}
              <div style={{ position: 'relative', width: '100%', padding: '0 0.5rem' }}>
                {/* Previous (❮) Button - Left Floating Side */}
                <button
                  onClick={() => setForensicIndex((prev) => (prev > 0 ? prev - 1 : 4))}
                  className="btn-circle-nav"
                  style={{
                    position: 'absolute',
                    left: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0a2540',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(10,37,64,0.15)',
                    zIndex: 10,
                    transition: 'all 0.25s ease'
                  }}
                  aria-label="Previous photos"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* 4-Photo View Grid - 4 Columns Layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  width: '100%'
                }}>
                  {[
                    { src: 'assets/workshop_forensic_1.jpg', title: 'Certificate Award', caption: 'Forensic Psychology Workshop - Student Certificate Award' },
                    { src: 'assets/workshop_forensic_2.jpg', title: 'Certificate Presentation', caption: 'Forensic Psychology Workshop - Certificate Presentation' },
                    { src: 'assets/workshop_forensic_3.jpg', title: 'Certificate Conferring', caption: 'Forensic Psychology Workshop - Certificate Conferring' },
                    { src: 'assets/workshop_forensic_4.jpg', title: 'Faculty Certificate Handover', caption: 'Forensic Psychology Workshop - Faculty Certificate Handover' },
                    { src: 'assets/workshop_forensic_5.jpg', title: 'Certificate Presentation', caption: 'Forensic Psychology Workshop - Certificate Presentation' },
                    { src: 'assets/workshop_forensic_6.jpg', title: 'Certificate Award', caption: 'Forensic Psychology Workshop - Certificate Award' },
                    { src: 'assets/workshop_forensic_7.jpg', title: 'Certificate Conferral', caption: 'Forensic Psychology Workshop - Certificate Conferral' },
                    { src: 'assets/workshop_forensic_8.jpg', title: 'Certificate Recognition', caption: 'Forensic Psychology Workshop - Certificate Recognition' },
                  ].slice(forensicIndex, forensicIndex + 4).map((imgObj, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImg(imgObj)}
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid #cbd5e1',
                        boxShadow: '0 6px 18px rgba(10, 37, 64, 0.08)',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                        <img
                          src={imgObj.src}
                          alt={imgObj.caption}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.4s ease'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next (❯) Button - Right Floating Side */}
                <button
                  onClick={() => setForensicIndex((prev) => (prev < 4 ? prev + 1 : 0))}
                  className="btn-circle-nav"
                  style={{
                    position: 'absolute',
                    right: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0a2540',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(10,37,64,0.15)',
                    zIndex: 10,
                    transition: 'all 0.25s ease'
                  }}
                  aria-label="Next photos"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
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
