import React, { useState, useEffect } from 'react';
import { schools, courses, testimonials, events } from '../data';
import { 
  Award, Globe, CheckCircle, GraduationCap, ChevronLeft, ChevronRight, 
  Search, ArrowRight, BookOpen, Clock, MapPin, Users, Calendar, HelpCircle, X 
} from 'lucide-react';

export default function Home({ setCurrentPage, setFilterState, onOpenPartnerModal }) {
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image: "assets/slide_show_1.jpeg",
      headline: "UK Ofqual-Regulated Higher Education",
      subline: "Gain globally recognised qualifications right here in Sri Lanka. Direct pathways to final-year UK top-up degrees.",
      cta: "Explore Programs",
      page: "programs"
    },
    {
      image: "assets/slide_show_2.jpeg",
      headline: "Flexible & Blended Study Modes",
      subline: "Design your education around your lifestyle. Choose between full-time On-Campus, Hybrid, or self-paced Distance Learning.",
      cta: "How to Apply",
      page: "admissions"
    },
    {
      image: "assets/slide_show_3.jpeg",
      headline: "Vibrant Campus & Student Environment",
      subline: "Join an active, diverse student body with networking events, leadership seminars, and career mentorship.",
      cta: "Student Life",
      page: "student-life"
    },
    {
      image: "assets/slide_show_4.jpeg",
      headline: "Dedicated Faculty & Global Guidance",
      subline: "Our experienced faculty and student counselors support you at every stage of your higher education journey.",
      cta: "Contact Us",
      page: "contact"
    },
    {
      image: "assets/slide_show_5.jpeg",
      headline: "Two Campuses. One Global Standard.",
      subline: "Access modern learning resources, interactive classrooms, and expert faculty at our Colombo and Kandy campuses.",
      cta: "About GCBT",
      page: "about"
    }
  ];

  // Auto-scroll slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
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

  // Gallery Lightbox State
  const [lightboxImage, setLightboxImage] = useState(null);
  const galleryImages = [
    { src: "assets/hero_campus.png", caption: "Colombo Campus Learning Center" },
    { src: "assets/hero_graduation.png", caption: "GCBT Convocation Ceremony" },
    { src: "assets/campus_colombo.png", caption: "IT Engineering Laboratory" },
    { src: "assets/campus_kandy.png", caption: "Kandy Campus Executive Lounge" },
    { src: "assets/student_portrait_1.png", caption: "Student Counseling Session" },
    { src: "assets/student_portrait_2.png", caption: "Annual Sports Meet Assembly" }
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
            style={{ backgroundImage: `url("${slide.image}")` }}
          >
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

      {/* 2. Accreditation & Partner Logos Strip (Placed directly under hero slideshow) */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-title-container">
            <div className="trust-title-badge">
              <Award size={14} style={{ color: '#e31c23' }} />
              Accredited Academic Partners & Global Affiliations
            </div>
          </div>
          
          <div className="partner-logos-grid">
            {/* 1. VERITAS University College */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('veritas')} title="VERITAS University College">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0085ca', letterSpacing: '-0.02em', lineHeight: 1 }}>VERITAS</span>
                <span style={{ fontSize: '0.48rem', fontWeight: 700, color: '#475569', letterSpacing: '0.08em', marginTop: '2px' }}>UNIVERSITY COLLEGE</span>
                <div style={{ width: '100%', height: '2px', backgroundColor: '#0f172a', marginTop: '2px' }} />
              </div>
            </button>

            {/* 2. THE CPD GROUP */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('cpd')} title="The CPD Group — Accredited Provider">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f59e0b', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#ffffff', 
                  fontSize: '0.4rem', 
                  fontWeight: 800, 
                  lineHeight: 1
                }}>
                  <span>CPD</span>
                </div>
                <div style={{ width: '1px', height: '20px', backgroundColor: '#cbd5e1' }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.04em', lineHeight: 1 }}>ACCREDITED</span>
                  <span style={{ fontSize: '0.55rem', fontWeight: 600, color: '#64748b', marginTop: '1px' }}>PROVIDER #780005</span>
                </div>
              </div>
            </button>

            {/* 3. Geneva Nations Institute */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('gni')} title="Geneva Nations Institute">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="28" height="28" viewBox="0 0 100 100">
                  <path d="M 50 5 L 85 20 V 55 C 85 75 50 95 50 95 C 50 95 15 75 15 55 V 20 Z" fill="#1e3a8a" />
                  <path d="M 50 12 L 78 24 V 52 C 78 68 50 85 50 85 C 50 85 22 68 22 52 V 24 Z" fill="#ffffff" />
                  <path d="M 50 20 L 72 30 V 50 C 72 63 50 78 50 78 C 50 78 28 63 28 50 V 30 Z" fill="#1d4ed8" />
                  <circle cx="50" cy="42" r="12" fill="#ffffff" />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e3a8a', lineHeight: 1 }}>Geneva</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', lineHeight: 1 }}>Nations</span>
                  <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.1em', marginTop: '1px' }}>INSTITUTE</span>
                </div>
              </div>
            </button>

            {/* 4. UCAS Registered Centre */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('ucas')} title="UCAS Registered Centre">
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>UC</span>
                  <svg width="18" height="18" viewBox="0 0 100 100" style={{ margin: '0 1px' }}>
                    <path d="M 15 85 L 50 15 L 85 85" fill="none" stroke="#e11d48" strokeWidth="22" strokeLinecap="square" />
                  </svg>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>S</span>
                </div>
                <span style={{ fontSize: '0.48rem', fontWeight: 600, color: '#475569' }}>UCAS Registered Centre</span>
              </div>
            </button>

            {/* 5. OTHM Qualifications */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('othm')} title="OTHM Qualifications (UK)">
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#006666', letterSpacing: '-0.03em', lineHeight: 1 }}>othm</span>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#006666', marginTop: '-0.5rem' }} />
                </div>
                <span style={{ fontSize: '0.52rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>qualifications</span>
              </div>
            </button>

            {/* 6. NCC Education (UK) */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('ncc')} title="NCC Education (UK)">
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e3a8a', letterSpacing: '-0.02em', lineHeight: 1 }}>NCC</span>
                <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#2563eb', letterSpacing: '0.05em' }}>Education</span>
                <span style={{ fontSize: '0.44rem', fontWeight: 600, color: '#64748b' }}>Great British Education</span>
              </div>
            </button>

            {/* 7. GSBE Geneva */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('gsbe')} title="Geneva School of Business and Economics">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div style={{ backgroundColor: '#dc2626', color: '#ffffff', width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>+</div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>GSBE</span>
                  <span style={{ fontSize: '0.48rem', fontWeight: 700, color: '#dc2626', letterSpacing: '0.06em', marginTop: '1px' }}>GENEVA SWITZERLAND</span>
                </div>
              </div>
            </button>

            {/* 8. World Education Services (WES) */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('wes')} title="World Education Services (WES Approved)">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0284c7', letterSpacing: '-0.03em' }}>WES</span>
                <div style={{ width: '1px', height: '18px', backgroundColor: '#cbd5e1' }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#0369a1', lineHeight: 1 }}>CREDENTIAL</span>
                  <span style={{ fontSize: '0.48rem', fontWeight: 700, color: '#64748b' }}>APPROVED</span>
                </div>
              </div>
            </button>

            {/* 9. QUALIFI Awarding Organisation */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('qualifi')} title="QUALIFI Regulated Awarding Organisation">
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#7e22ce', letterSpacing: '-0.02em', lineHeight: 1 }}>QUALIFI</span>
                <span style={{ fontSize: '0.48rem', fontWeight: 700, color: '#6b21a8', letterSpacing: '0.06em' }}>SUCCESS THROUGH LEARNING</span>
              </div>
            </button>

            {/* 10. Ofqual UK Regulator */}
            <button className="partner-logo-card" onClick={() => onOpenPartnerModal('ofqual')} title="Ofqual — UK Government Regulator">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <svg width="22" height="22" viewBox="0 0 100 100">
                  <path d="M 50 10 L 80 30 V 70 L 50 90 L 20 70 V 30 Z" fill="none" stroke="#0f172a" strokeWidth="10" />
                  <circle cx="50" cy="50" r="15" fill="#e31c23" />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>ofqual</span>
                  <span style={{ fontSize: '0.46rem', fontWeight: 700, color: '#64748b', marginTop: '1px' }}>UK REGULATED</span>
                </div>
              </div>
            </button>
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
              <select 
                id="home-school"
                value={searchSchool}
                onChange={(e) => setSearchSchool(e.target.value)}
              >
                <option value="all">All Schools</option>
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="finder-input-group">
              <label htmlFor="home-mode">Study Mode</label>
              <select 
                id="home-mode"
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
              >
                <option value="all">All Modes</option>
                <option value="On-Campus">On-Campus</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Distance">Distance</option>
              </select>
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
          <div className="grid-2">
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

            <div className="why-image-wrapper">
              <img src="assets/campus_kandy.png" alt="GCBT Campus classrooms" style={{ width: '100%', height: '480px', objectFit: 'cover' }} />
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

      {/* 6. Popular Courses */}
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
                    <span className="course-badge">{course.level}</span>
                  </div>
                  <div className="course-body">
                    <div className="course-school">{schoolObj ? schoolObj.name : course.school}</div>
                    <h3 className="course-title">{course.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>{course.desc}</p>
                    
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
                      style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', gap: '0.5rem' }}
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

      {/* 7. Testimonials */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-wrapper">
            {testimonials.map((t, idx) => (
              <div key={t.id} className={`testimonial-slide ${idx === currentTestimonial ? 'active' : ''}`}>
                <div className="testimonial-flex">
                  <img src={t.image} alt={t.name} className="testimonial-image" />
                  <div className="testimonial-quote-block">
                    <p className="testimonial-quote">"{t.quote}"</p>
                    <div className="testimonial-author">{t.name}</div>
                    <div className="testimonial-role">{t.course} ({t.campus} Campus)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-nav">
            <button className="testimonial-nav-btn" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <button className="testimonial-nav-btn" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Campus Life Gallery */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Hub
            </span>
            <h2 className="title-medium">Campus Life & Galleries</h2>
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

      {/* 10. Enquiry / Admissions Form Section */}
      <section className="section" id="admission-enquiry">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="form-card">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Admissions 2026
              </span>
              <h2 className="title-medium" style={{ margin: '0' }}>Online Admission Enquiry</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Submit this enquiry form and our academic counselor will contact you within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="alert-success">
                <CheckCircle size={20} />
                <div>
                  <strong>Enquiry Submitted Successfully!</strong> Your application routing code has been registered. Our counselor will contact you shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="form-grid">
                {/* Honeypot Field */}
                <input 
                  type="text" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  className="honeypot-field" 
                  placeholder="Leave empty" 
                />

                <div className="form-group">
                  <label htmlFor="enquiry-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="enquiry-name"
                    required
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="enquiry-email"
                    required
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-phone">Contact Number *</label>
                  <input 
                    type="tel" 
                    id="enquiry-phone"
                    required
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-campus">Preferred Campus *</label>
                  <select 
                    id="enquiry-campus"
                    value={enquiryCampus}
                    onChange={(e) => setEnquiryCampus(e.target.value)}
                  >
                    <option value="Colombo">Colombo Main Campus (500 Galle Road)</option>
                    <option value="Kandy">Kandy Branch Campus (291 A9, Kandy)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="enquiry-course">Intended Program of Study *</label>
                  <select 
                    id="enquiry-course"
                    value={enquiryCourse}
                    onChange={(e) => setEnquiryCourse(e.target.value)}
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
                    {loading ? 'Processing enquiry...' : 'Submit Admission Enquiry'}
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
