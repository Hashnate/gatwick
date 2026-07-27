import React, { useState, useEffect, useRef } from 'react';
import { schools, courses, testimonials, events } from '../data';
import { 
  Award, Globe, CheckCircle, GraduationCap, ChevronLeft, ChevronRight, 
  Search, ArrowRight, BookOpen, Clock, MapPin, Users, Calendar, HelpCircle, X, Star, Quote,
  Film, Sparkles, ShieldCheck, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

export default function Home({ setCurrentPage, setFilterState, onOpenPartnerModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            const func = entry.isIntersecting ? 'playVideo' : 'pauseVideo';
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func, args: [] }), 
              '*'
            );
            setIsPlaying(entry.isIntersecting);
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
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image: "assets/slide_show_1.jpeg",
      headline: "UK Ofqual-Regulated Higher Education",
      subline: "Gain globally recognised qualifications right here in Sri Lanka. Direct pathways to final-year UK top-up degrees.",
      cta: "Explore Programs",
      page: "programs",
      bgPosition: "center 30%"
    },
    {
      image: "assets/slide_show_2.jpeg",
      headline: "Flexible & Blended Study Modes",
      subline: "Design your education around your lifestyle. Choose between full-time On-Campus, Hybrid, or self-paced Distance Learning.",
      cta: "How to Apply",
      page: "admissions",
      bgPosition: "center 30%"
    },
    {
      image: "assets/slide_show_3.jpeg",
      headline: "Vibrant Campus & Student Environment",
      subline: "Join an active, diverse student body with networking events, leadership seminars, and career mentorship.",
      cta: "Student Life",
      page: "student-life",
      bgPosition: "center 30%"
    },
    {
      image: "assets/slide_show_4.jpeg",
      headline: "Dedicated Faculty & Global Guidance",
      subline: "Our experienced faculty and student counselors support you at every stage of your higher education journey.",
      cta: "Contact Us",
      page: "contact",
      bgPosition: "center 30%"
    },
    {
      image: "assets/slide_show_5.jpeg",
      headline: "Two Campuses. One Global Standard.",
      subline: "Access modern learning resources, interactive classrooms, and expert faculty at our Colombo and Kandy campuses.",
      cta: "About GCBT",
      page: "about",
      bgPosition: "center 60%"
    }
  ];

  // Auto-scroll slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Quick Search Widget State
  const [searchWord, setSearchWord] = useState('');
  const [searchSchool, setSearchSchool] = useState('all');
  const [searchMode, setSearchMode] = useState('all');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    setFilterState({
      search: searchWord,
      school: searchSchool,
      mode: searchMode,
      campus: 'all'
    });
    setCurrentPage('programs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Testimonials Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll testimonials smoothly every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Gallery Lightbox State
  const [lightboxImage, setLightboxImage] = useState(null);
  const galleryImages = [
    { src: "assets/gallery_grad_stage.jpg", caption: "GCBT Convocation 2024 Stage & Academic Procession" },
    { src: "assets/gallery_discussion.jpg", caption: "Interactive Student & Faculty Workshop" },
    { src: "assets/gallery_oil_lamp.jpg", caption: "Traditional Inaugural Oil Lamp Lighting Ceremony" },
    { src: "assets/gallery_dignitaries.jpg", caption: "GCBT Academic Council & Convocation Dignitaries" },
    { src: "assets/gallery_plaques.jpg", caption: "GCBT Plaques of Recognition — Chief Guests & Guests of Honour" },
    { src: "assets/gallery_grad_speaker.jpg", caption: "Graduation 2024 Stage Keynote & Ceremonial Address" }
  ];

  // Enquiry Form State
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryCampus, setEnquiryCampus] = useState('Colombo');
  const [enquiryCourse, setEnquiryCourse] = useState('othm-l4-business');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (honeypot) {
      console.log('Bot detected');
      return; // Ignore spam bots
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div>
      {/* 1. Hero Slider */}
      <section className="hero-slider">
        {heroSlides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url("${slide.image}")`,
              backgroundPosition: slide.bgPosition || 'center 30%'
            }}
          >
            <img src={slide.image} alt="" style={{ display: 'none' }} decoding="async" fetchpriority={idx === 0 ? "high" : "low"} />
            <div className="hero-overlay" />
            <div className="container">
              <div className="hero-content">
                <h1>{slide.headline}</h1>
                <p>{slide.subline}</p>
                <button 
                  onClick={() => {
                    setCurrentPage(slide.page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="btn btn-primary"
                >
                  {slide.cta} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="slider-dots">
          {heroSlides.map((_, idx) => (
            <button 
              key={idx} 
              className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Accredited Partners & Global Affiliations — Infinite Marquee Slideshow */}
      <section className="trust-strip">
        <div className="container" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div className="trust-title-badge">
            <Award size={14} style={{ color: '#e31c23' }} />
            Accredited Academic Partners & Global Affiliations
          </div>
        </div>

        <div className="partners-marquee-wrapper">
          <div className="partners-marquee-track">
            {[1, 2].map((setIndex) => (
              <React.Fragment key={setIndex}>
                {/* 1. VERITAS University College */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('veritas')} title="VERITAS University College">
                  <img src="assets/partner_veritas.png" alt="VERITAS University College" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 2. THE CPD GROUP */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('cpd')} title="The CPD Group — Accredited Provider">
                  <img src="assets/partner_cpd.png" alt="The CPD Group Accredited Provider" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 3. GSBE Geneva */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('gsbe')} title="Geneva School of Business & Economics">
                  <img src="assets/partner_gsbe.png" alt="GSBE Geneva School of Business & Economics" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 4. Geneva Nations Institute */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('gni')} title="Geneva Nations Institute">
                  <img src="assets/partner_gni.png" alt="Geneva Nations Institute" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 5. UCAS Registered Centre */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('ucas')} title="UCAS Registered Centre">
                  <img src="assets/partner_ucas.png" alt="UCAS Registered Centre" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 6. OTHM Qualifications */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('othm')} title="OTHM Qualifications (UK)">
                  <img src="assets/partner_othm.png" alt="OTHM Qualifications" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 7. Trinity College London */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('qualifi')} title="Trinity College London">
                  <img src="assets/partner_trinity.png" alt="Trinity College London" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 8. UGC Recognized */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('ofqual')} title="UGC Recognized">
                  <img src="assets/partner_ugc.png" alt="UGC Recognized" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 9. WES (World Education Services) */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('wes')} title="World Education Services (WES Approved)">
                  <img src="assets/partner_wes.png" alt="World Education Services (WES)" style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }} />
                </button>

                {/* 10. University of Rhone */}
                <button className="partner-logo-card" onClick={() => onOpenPartnerModal('veritas')} title="University of Rhone">
                  <img src="assets/partner_rhone.png" alt="University of Rhone" style={{ height: '56px', width: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', objectFit: 'contain', transform: 'scale(1.12)' }} />
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quick Finder Search Widget Overlay */}
      <section className="container" style={{ position: 'relative', zIndex: 12 }}>
        <form onSubmit={handleQuickSearch} className="search-widget-card" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
          <div className="finder-inputs-row">
            <div className="finder-input-group">
              <label htmlFor="home-search">Study Interest</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  id="home-search"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  placeholder="What course are you looking for?"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="finder-input-group">
              <label htmlFor="home-school">Select School</label>
              <CustomSelect
                id="home-school"
                value={searchSchool}
                onChange={setSearchSchool}
                options={[
                  { value: 'all', label: 'All Schools' },
                  ...schools.map(s => ({ value: s.id, label: s.name }))
                ]}
              />
            </div>

            <div className="finder-input-group">
              <label htmlFor="home-mode">Study Mode</label>
              <CustomSelect
                id="home-mode"
                value={searchMode}
                onChange={setSearchMode}
                options={[
                  { value: 'all', label: 'All Modes' },
                  { value: 'On-Campus', label: 'On-Campus' },
                  { value: 'Hybrid', label: 'Hybrid' },
                  { value: 'Distance', label: 'Distance' }
                ]}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
                Search Courses
              </button>
            </div>
          </div>
        </form>
      </section>


      {/* 4. Why Choose GCBT */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="why-choose-left">
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Globally Affiliated Institution
              </span>
              <h2 className="title-medium" style={{ margin: '0' }}>Why Choose Gatwick College?</h2>
              <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '1rem' }}>
                We provide premium higher education that merges rigorous British academic standards with flexible learning schedules tailored to support local Sri Lankan student development.
              </p>

              <div className="why-item">
                <div className="why-icon"><Award size={20} /></div>
                <div>
                  <h3 className="why-title">Regulated UK Qualifications</h3>
                  <p className="why-text">Diplomas regulated by Ofqual (UK Gov) with Direct undergraduate and postgraduate credit progression equivalences.</p>
                </div>
              </div>

              <div className="why-item">
                <div className="why-icon"><Globe size={20} /></div>
                <div>
                  <h3 className="why-title">Global Progression Pathways</h3>
                  <p className="why-text">Transfer credits directly to leading partner universities across the UK, USA, Canada, and Australia.</p>
                </div>
              </div>

              <div className="why-item">
                <div className="why-icon"><CheckCircle size={20} /></div>
                <div>
                  <h3 className="why-title">Modern Blended Campus Systems</h3>
                  <p className="why-text">High-tech IT laboratory rooms, rich learning libraries, and weekend hybrid tracks for corporate professionals.</p>
                </div>
              </div>
            </div>

            <div className="why-image-wrapper" style={{ alignSelf: 'center', width: '100%', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', overflow: 'hidden' }}>
              <img 
                src="assets/campus_building_original.jpg" 
                alt="Gatwick College of Management & Technology Building" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'assets/hero_campus.png';
                }}
                style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center center', borderRadius: '20px', display: 'block', border: 'none', boxShadow: '0 12px 32px rgba(10, 37, 64, 0.12)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Subject Areas / Schools Grid */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Schools
            </span>
            <h2 className="title-medium">Explore Our Subject Disciplines</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Choose a discipline that matches your aspirations. Each school delivers specialized courses aligned with corporate expectations.
            </p>
          </div>

          <div className="grid-4">
            {schools.map((school) => (
              <button 
                key={school.id} 
                className="category-card"
                onClick={() => {
                  setFilterState({ search: '', school: school.id, mode: 'all', campus: 'all' });
                  setCurrentPage('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="category-icon">
                  <BookOpen size={24} />
                </div>
                <h3>{school.name}</h3>
                <p>{school.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ultra-Premium Testimonials Showcase */}
      <section className="testimonial-section">
        <div className="testimonial-bg-decor"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="testimonial-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="testimonial-badge-pill">
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span>OFFICIAL STUDENT REVIEWS</span>
            </div>
            <h2 className="testimonial-main-title">
              What Our Students Say About GCBT
            </h2>
            <p className="testimonial-sub-title">
              Real experiences from UK Ofqual & Higher Education diploma students across Sri Lanka
            </p>
          </div>

          <div className="testimonial-wrapper">
            {testimonials.map((t, idx) => (
              <div key={t.id} className={`testimonial-slide ${idx === currentTestimonial ? 'active' : ''}`}>
                <div className="premium-testimonial-card">
                  <div className="card-top-bar">
                    <div className="student-profile-group">
                      <div>
                        <h4 className="premium-author-name">{t.name}</h4>
                        <div className="premium-campus-tag">
                          <MapPin size={12} />
                          <span>{t.campus} Campus</span>
                        </div>
                      </div>
                    </div>

                    <div className="rating-pill-container">
                      <div className="stars-row">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                      <span className="rating-score-text">5.0 / 5.0 Rating</span>
                    </div>
                  </div>

                  <blockquote className="premium-quote-text">
                    "{t.quote}"
                  </blockquote>

                  <div className="card-bottom-bar">
                    <div className="program-badge-pill">
                      <GraduationCap size={15} />
                      <span>{t.course}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-nav-controls">
            <button className="premium-nav-arrow" onClick={prevTestimonial} aria-label="Previous review">
              <ChevronLeft size={22} />
            </button>

            <div className="premium-dots-pill">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`dot-pill ${idx === currentTestimonial ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button className="premium-nav-arrow" onClick={nextTestimonial} aria-label="Next review">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Ultra-Premium Featured Campus Video Spotlight */}
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
                <span>Campus Video Spotlight</span>
              </div>
              
              <h2 className="title-medium" style={{ 
                color: '#ffffff', 
                fontSize: '2.3rem', 
                lineHeight: 1.2, 
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                Experience Life & Learning at Gatwick College
              </h2>
              
              <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                Watch our video spotlight showcasing modern lecture halls, interactive learning sessions, and the vibrant campus community across our Colombo and Kandy centres.
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
                    <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>UK Ofqual Regulated Diploma Delivery</strong>
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

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => {
                    setCurrentPage('student-life');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="btn btn-primary"
                  style={{ gap: '0.5rem', boxShadow: '0 4px 20px rgba(227, 28, 35, 0.4)' }}
                >
                  Explore Student Community <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Smartphone Device Frame Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '300px', 
                aspectRatio: '9/19', 
                borderRadius: '48px', 
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
                  borderRadius: '38px',
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
                    src="https://www.youtube.com/embed/rIl9tDRMnhE?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=rIl9tDRMnhE&playsinline=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0" 
                    title="Gatwick College Campus Life Video" 
                    style={{ 
                      width: '135%', 
                      height: '135%', 
                      position: 'absolute',
                      top: '-17.5%',
                      left: '-17.5%',
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

      {/* 8. Popular Courses */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Academic Pathways
              </span>
              <h2 className="title-medium" style={{ margin: '0' }}>Popular Programs</h2>
            </div>
            <button 
              onClick={() => {
                setFilterState({ search: '', school: 'all', mode: 'all', campus: 'all' });
                setCurrentPage('programs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="btn btn-secondary"
            >
              Browse All Courses <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {courses.slice(0, 3).map((course) => {
              const schoolObj = schools.find(s => s.id === course.school);
              return (
                <div className="course-card" key={course.id}>
                  <div className="course-image-wrapper">
                    <img src={course.image} alt={course.title} className="course-img" />
                  </div>
                  <div className="course-body">
                    <div className="course-school">{schoolObj ? schoolObj.name : course.school}</div>
                    <h3 className="course-title">{course.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>{course.desc}</p>
                    
                    <div className="course-meta">
                      <div className="course-meta-item"><Clock size={14} /> <span>{course.duration}</span></div>
                      <div className="course-meta-item"><MapPin size={14} /> <span>{course.campus.join(', ')}</span></div>
                    </div>

                    <button 
                      onClick={() => {
                        setFilterState({ search: course.title, school: 'all', mode: 'all', campus: 'all' });
                        setCurrentPage('programs');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-navy" 
                      style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', gap: '0.5rem' }}
                    >
                      Enquire Course <ArrowRight size={16} />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Campus Life Gallery */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="title-medium">Campus Gallery</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Take a visual tour through graduation ceremonies, student sports meets, classrooms, and social life events.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => setLightboxImage(img)}
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
      {lightboxImage && (
        <div className="modal-overlay" onClick={() => setLightboxImage(null)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '800px', background: 'transparent', boxShadow: 'none' }}
          >
            <button 
              className="modal-close-btn" 
              onClick={() => setLightboxImage(null)}
              style={{ color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '0.5rem', top: '10px', right: '10px' }}
            >
              <X size={20} />
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.caption} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            <p style={{ color: '#ffffff', textAlign: 'center', marginTop: '1rem', fontSize: '1rem', fontWeight: 500 }}>
              {lightboxImage.caption}
            </p>
          </div>
        </div>
      )}

      {/* 9. Events Strip */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Events calendar
              </span>
              <h2 className="title-medium" style={{ margin: '0' }}>Upcoming Assemblies</h2>
            </div>
            <button 
              onClick={() => {
                setCurrentPage('student-life');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="btn btn-secondary"
            >
              All Events <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {events.map((e) => (
              <div className="event-card" key={e.id}>
                <div className="event-card-inner">
                  {/* Standard Calendar Date Badge */}
                  <div className="event-calendar-box">
                    <span className="event-calendar-month">{e.month}</span>
                    <span className="event-calendar-day">{e.day}</span>
                  </div>

                  {/* Event Details */}
                  <div className="event-card-content">
                    <div>
                      <div>
                        <span className="event-category-badge">Assembly</span>
                      </div>
                      <h3 className="event-card-title">{e.title}</h3>
                    </div>

                    <div>
                      <div className="event-meta-list">
                        <div className="event-meta-item">
                          <Clock size={14} className="event-meta-icon" />
                          <span>{e.time}</span>
                        </div>
                        <div className="event-meta-item">
                          <MapPin size={14} className="event-meta-icon" />
                          <span>{e.venue}</span>
                        </div>
                      </div>

                      <div className="event-action-link">
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Admissions CTA Banner */}
      <section className="section" id="admission-enquiry">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="form-card" style={{ textAlign: 'center', padding: '3.5rem 2.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admissions 2026
            </span>
            <h2 className="title-medium" style={{ margin: '0.5rem 0 1rem 0' }}>Ready to Take the Next Step in Your Education?</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Submit an online admission enquiry on our Admissions page and our academic counselors will contact you within 24 hours.
            </p>
            <button 
              onClick={() => {
                setCurrentPage('admissions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="btn btn-primary"
              style={{ padding: '0.9rem 2.5rem', fontSize: '1rem', gap: '0.5rem' }}
            >
              Go to Online Admission Enquiry <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
