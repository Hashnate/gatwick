import React, { useState, useEffect } from 'react';
import { 
  Award, Target, BookOpen, Compass, ShieldCheck, Users, GraduationCap, Briefcase, 
  Search, ChevronDown, ChevronUp, MapPin, ExternalLink, Globe, Star, Sparkles, Phone, Mail,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { facultyStaff, testimonials } from '../data';

export default function About({ onOpenPartnerModal, facultyStaff: propFacultyStaff, testimonials: propTestimonials }) {
  const activeFacultyStaff = propFacultyStaff || facultyStaff;
  const activeTestimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials : testimonials;
  // Search & Faculty Directory State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Testimonials Filter State
  const [selectedCampus, setSelectedCampus] = useState('All');

  // Accreditation Accordion State
  const [openAccordion, setOpenAccordion] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'about-campus') return 'campus';
    if (hash === 'about-accreditation') return 'accreditation';
    if (hash === 'about-testimonials') return 'testimonials';
    return 'story';
  });

  // Campus Image Carousel States
  const [kandyImageIndex, setKandyImageIndex] = useState(0);
  const [colomboImageIndex, setColomboImageIndex] = useState(0);

  const kandyImages = [
    "assets/kandy_1_lobby.webp",
    "assets/kandy_2_reception.webp",
    "assets/kandy_3_lounge.webp",
    "assets/kandy_4_classroom.webp"
  ];

  const colomboImages = [
    "assets/colombo_1_reception.webp",
    "assets/colombo_2_flags.webp",
    "assets/colombo_3_classroom.webp",
    "assets/colombo_4_lounge.webp"
  ];

  // Auto-playing the campus slideshows
  useEffect(() => {
    const kandyTimer = setInterval(() => {
      setKandyImageIndex((prev) => (prev + 1) % kandyImages.length);
    }, 5000);

    const colomboTimer = setInterval(() => {
      setColomboImageIndex((prev) => (prev + 1) % colomboImages.length);
    }, 5000);

    return () => {
      clearInterval(kandyTimer);
      clearInterval(colomboTimer);
    };
  }, [kandyImages.length, colomboImages.length]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about-campus') setActiveTab('campus');
      else if (hash === 'about-accreditation') setActiveTab('accreditation');
      else if (hash === 'about-testimonials') setActiveTab('testimonials');
      else if (hash === 'about-story' || hash === 'about') setActiveTab('story');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#about-${tabId}`);
  };

  const getBadgeStyle = (program) => {
    const p = program.toLowerCase();
    if (p.includes('psychology') || p.includes('education') || p.includes('teacher') || p.includes('needs')) {
      return { color: '#7c3aed', backgroundColor: '#f5f3ff', borderColor: '#ddd6fe' };
    }
    if (p.includes('business') || p.includes('finance') || p.includes('management') || p.includes('resource') || p.includes('hospitality')) {
      return { color: '#0d9488', backgroundColor: '#f0fdfa', borderColor: '#ccfbf1' };
    }
    if (p.includes('it') || p.includes('cyber') || p.includes('technology') || p.includes('engineering')) {
      return { color: '#2563eb', backgroundColor: '#eff6ff', borderColor: '#dbeafe' };
    }
    if (p.includes('english') || p.includes('language') || p.includes('fashion') || p.includes('designing')) {
      return { color: '#ea580c', backgroundColor: '#fff7ed', borderColor: '#ffedd5' };
    }
    return { color: '#475569', backgroundColor: '#f8fafc', borderColor: '#e2e8f0' };
  };

  // Toggle Accreditation Accordion
  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  // Filter Faculty
  const filteredFaculty = activeFacultyStaff.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.expertise.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedDept === 'All') return matchesSearch;
    if (selectedDept === 'Psychology & Education') {
      return matchesSearch && (item.program.includes('Psychology') || item.program.includes('Education') || item.program.includes('Teacher'));
    }
    if (selectedDept === 'Business & Finance') {
      return matchesSearch && (item.program.includes('Business') || item.program.includes('Financial') || item.program.includes('Resource'));
    }
    if (selectedDept === 'IT & Cyber Security') {
      return matchesSearch && (item.program.includes('I.T') || item.program.includes('Cyber') || item.program.includes('Technology'));
    }
    if (selectedDept === 'Languages & Design') {
      return matchesSearch && (item.program.includes('English') || item.program.includes('Fashion'));
    }
    return matchesSearch;
  });

  // Filter Testimonials
  const filteredTestimonials = activeTestimonials.filter(item => {
    if (selectedCampus === 'All') return true;
    return item.campus.toLowerCase() === selectedCampus.toLowerCase();
  });

  // 1. STORY SECTION RENDERING
  const renderStorySection = () => {
    return (
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          {/* Top Row: Story Text & Vision/Mission Cards */}
          <div className="grid-2" style={{ alignItems: 'stretch', marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div>
                <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Academic Heritage
                </span>
                <h2 className="title-medium" style={{ marginTop: '0.25rem', marginBottom: '1.25rem', color: '#0a2540' }}>About Gatwick College</h2>
                <p style={{ color: '#475569', marginBottom: '1.25rem', fontSize: '1rem', lineHeight: '1.6' }}>
                  Gatwick College of Business and Technology (GCBT) was founded to bridge the gap between affordable local education and highly valued British university degrees. We operate as a premier regulated delivery center in Sri Lanka, enabling students to gain qualifications certified under the UK Regulated Qualifications Framework (RQF).
                </p>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                  Through robust partnerships with regulated awarding bodies such as OTHM and NCC Education, our graduates gain qualifications that bypass traditional credit boundaries, enabling them to complete their final degrees at leading institutions in the UK, Australia, and Canada.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', justifyContent: 'center' }}>
              {/* Vision Card */}
              <div style={{ flex: 1, background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #e31c23', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <Target size={20} style={{ color: '#e31c23' }} /> Vision
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: '1.55' }}>
                  To be a premier hub of higher learning that transforms ambitious learners through globally recognized qualifications, accessible pathways, and industry-relevant education.
                </p>
              </div>

              {/* Mission Card */}
              <div style={{ flex: 1, background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #0a2540', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <Compass size={20} style={{ color: '#0a2540' }} /> Mission
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: '1.55' }}>
                  To deliver quality Sri Lankan, British and international academic programs by fostering critical thinking, practical skills, and accessible learning environments that empower students for global career success.
                </p>
              </div>

              {/* Brand Promise Card */}
              <div style={{ flex: 1, background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #eab308', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={20} style={{ color: '#eab308' }} /> Our Brand Promise
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: '1.55' }}>
                  We promise to bridge the gap between ambition and opportunity by providing accessible, internationally accredited education that prepares every student to thrive in a global marketplace.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Council Photo Banner */}
          <div style={{ marginBottom: '4rem' }}>
            <img 
              src="assets/academic_council.webp" 
              alt="Gatwick College Academic Council & Faculty Leadership Board" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/hero_campus.webp';
              }}
              style={{ borderRadius: '20px', width: '100%', height: 'auto', display: 'block', boxShadow: '0 12px 32px rgba(10, 37, 64, 0.08)' }} 
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0a2540', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={16} style={{ color: '#e31c23' }} /> Gatwick College Academic Council & Leadership Board
              </span>
            </div>
          </div>

          {/* Faculty & Lecturer Directory inside Story */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Academic Faculty & Lecturers
              </span>
              <h2 className="title-medium" style={{ margin: '0.25rem 0 0.5rem 0', color: '#0a2540' }}>Faculty & Staff Directory</h2>
              <p style={{ color: '#475569', maxWidth: '750px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Meet our UK-qualified academic lecturers, department specialists, and education facilitators across Gatwick College programs.
              </p>
            </div>

            {/* Search & Department Filters */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text"
                  placeholder="Search lecturer name, program, or qualification..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                    borderRadius: '30px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {['All', 'Psychology & Education', 'Business & Finance', 'IT & Cyber Security', 'Languages & Design'].map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: selectedDept === dept ? '1px solid #0a2540' : '1px solid #e2e8f0',
                      backgroundColor: selectedDept === dept ? '#0a2540' : '#ffffff',
                      color: selectedDept === dept ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      boxShadow: selectedDept === dept ? '0 2px 6px rgba(10, 37, 64, 0.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Faculty Cards Grid */}
            <div className="grid-3" style={{ gap: '1.5rem' }}>
              {filteredFaculty.map((staff) => (
                <div key={staff.id} className="faculty-dir-card">
                  <div className="faculty-dir-banner"></div>
                  
                  <div className="faculty-dir-header">
                    <div className="faculty-dir-avatar-container">
                      {staff.image ? (
                        <img 
                          src={staff.image} 
                          alt={staff.name} 
                          className="faculty-dir-avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="faculty-dir-avatar-fallback"
                        style={{ display: staff.image ? 'none' : 'flex' }}
                      >
                        {staff.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                    </div>

                    <span 
                      className="faculty-dir-program-badge"
                      style={getBadgeStyle(staff.program)}
                    >
                      {staff.program}
                    </span>
                    <h3 className="faculty-dir-name">
                      {staff.name}
                    </h3>
                  </div>

                  <div className="faculty-dir-body">
                    <div className="faculty-dir-info-section">
                      <div className="faculty-dir-info-icon-wrapper qualifications-icon">
                        <GraduationCap size={18} style={{ color: '#2563eb' }} />
                      </div>
                      <div className="faculty-dir-info-content">
                        <span className="faculty-dir-info-label">Qualifications</span>
                        <div className="faculty-dir-list">
                          {staff.qualifications.split('|').map((item, idx) => (
                            <div key={idx} className="faculty-dir-list-item">
                              <span className="faculty-dir-list-bullet qual-bullet">✓</span>
                              <p className="faculty-dir-info-text">{item.trim()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="faculty-dir-info-section">
                      <div className="faculty-dir-info-icon-wrapper expertise-icon">
                        <Briefcase size={18} style={{ color: '#16a34a' }} />
                      </div>
                      <div className="faculty-dir-info-content">
                        <span className="faculty-dir-info-label">Expertise & Focus</span>
                        <div className="faculty-dir-list">
                          {staff.expertise.split('|').map((item, idx) => (
                            <div key={idx} className="faculty-dir-list-item">
                              <span className="faculty-dir-list-bullet exp-bullet">•</span>
                              <p className="faculty-dir-info-text">{item.trim()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                <p style={{ fontSize: '1.05rem', margin: 0 }}>No faculty members found matching your search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  // 2. CAMPUS SECTION RENDERING
  const renderCampusSection = () => {
    return (
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Dual Locations
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 1rem 0', color: '#0a2540' }}>Campuses</h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              Gatwick College of Business & Technology operates dual campus locations in Sri Lanka—spanning both the central cultural hub of Kandy and the commercial capital of Colombo. Designed to cater to school leavers, working professionals, and higher education seekers, both branches deliver UK-standard, globally recognized qualifications through flexible on-campus, online, and hybrid learning pathways.
            </p>
          </div>

          <div className="campus-grid">
            {/* Kandy Campus Card */}
            <div className="campus-card">
              <div className="campus-image-wrapper" style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {kandyImages.map((imgSrc, idx) => (
                    <img 
                      key={idx}
                      src={imgSrc} 
                      alt={`Gatwick College Kandy Campus - Image ${idx + 1}`} 
                      className="campus-image"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: imgSrc === 'assets/kandy_1_lobby.webp' ? 'center top' : 'center',
                        opacity: idx === kandyImageIndex ? 1 : 0,
                        transition: 'opacity 0.6s ease-in-out',
                        zIndex: idx === kandyImageIndex ? 1 : 0,
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'assets/classroom_lecture.webp';
                      }}
                    />
                  ))}
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setKandyImageIndex((prev) => (prev - 1 + kandyImages.length) % kandyImages.length);
                    }}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(10, 37, 64, 0.6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'background 0.2s ease',
                      padding: 0
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setKandyImageIndex((prev) => (prev + 1) % kandyImages.length);
                    }}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(10, 37, 64, 0.6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'background 0.2s ease',
                      padding: 0
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Indicator Dots */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '6px',
                    zIndex: 10
                  }}>
                    {kandyImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          setKandyImageIndex(idx);
                        }}
                        style={{
                          width: idx === kandyImageIndex ? '16px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          background: idx === kandyImageIndex ? 'linear-gradient(90deg, #F59E0B, #fbbf24)' : 'rgba(255, 255, 255, 0.5)',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className="campus-badge flagship" style={{ zIndex: 11 }}>Flagship Campus</span>
              </div>
              <div className="campus-content">
                <h3 className="campus-title">Kandy Branch</h3>
                <p className="campus-desc">
                  As the founding hub of the college, the Kandy branch offers a central and accessible learning environment situated right in the heart of Kandy City.
                </p>
                <div className="campus-detail-list">
                  <div className="campus-detail-item">
                    <MapPin size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.1rem' }} />
                    <span><strong>Location:</strong> Hill Street, Kandy</span>
                  </div>
                  <div className="campus-detail-item">
                    <Award size={18} style={{ color: '#0a2540', flexShrink: 0, marginTop: '0.1rem' }} />
                    <span><strong>Focus:</strong> Academic foundation diplomas, undergraduate top-up degrees, professional skill certificates, and adult continuing education.</span>
                  </div>
                  <div className="campus-detail-item">
                    <Users size={18} style={{ color: '#eab308', flexShrink: 0, marginTop: '0.1rem' }} />
                    <span><strong>Campus Life:</strong> A modern, fully air-conditioned facility designed for interactive lectures, collaborative student spaces, and localized community-driven workshops.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colombo Campus Card */}
            <div className="campus-card">
              <div className="campus-image-wrapper" style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {colomboImages.map((imgSrc, idx) => (
                    <img 
                      key={idx}
                      src={imgSrc} 
                      alt={`Gatwick College Colombo Campus - Image ${idx + 1}`} 
                      className="campus-image"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: idx === colomboImageIndex ? 1 : 0,
                        transition: 'opacity 0.6s ease-in-out',
                        zIndex: idx === colomboImageIndex ? 1 : 0,
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'assets/hero_campus.webp';
                      }}
                    />
                  ))}
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setColomboImageIndex((prev) => (prev - 1 + colomboImages.length) % colomboImages.length);
                    }}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(10, 37, 64, 0.6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'background 0.2s ease',
                      padding: 0
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setColomboImageIndex((prev) => (prev + 1) % colomboImages.length);
                    }}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(10, 37, 64, 0.6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'background 0.2s ease',
                      padding: 0
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Indicator Dots */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '6px',
                    zIndex: 10
                  }}>
                    {colomboImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          setColomboImageIndex(idx);
                        }}
                        style={{
                          width: idx === colomboImageIndex ? '16px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          background: idx === colomboImageIndex ? 'linear-gradient(90deg, #F59E0B, #fbbf24)' : 'rgba(255, 255, 255, 0.5)',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className="campus-badge" style={{ zIndex: 11 }}>Commercial Hub Campus</span>
              </div>
              <div className="campus-content">
                <h3 className="campus-title">Colombo Branch</h3>
                <p className="campus-desc">
                  Situated along Galle Road in Colombo 06, the Colombo branch serves as the strategic urban gateway for students seeking corporate engagement, flexible evening/weekend studies, and direct industry connectivity.
                </p>
                <div className="campus-detail-list">
                  <div className="campus-detail-item">
                    <MapPin size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.1rem' }} />
                    <span><strong>Location:</strong> Galle Road, Colombo 06</span>
                  </div>
                  <div className="campus-detail-item">
                    <Award size={18} style={{ color: '#0a2540', flexShrink: 0, marginTop: '0.1rem' }} />
                    <span><strong>Focus:</strong> Advanced professional diplomas, postgraduate & executive MBAs, FinTech, and specialized business qualifications tailored for corporate workforce advancement.</span>
                  </div>
                  <div className="campus-detail-item">
                    <Users size={18} style={{ color: '#eab308', flexShrink: 0, marginTop: '0.1rem' }} />
                    <span><strong>Campus Life:</strong> Conveniently located along the main transport corridor, providing state-of-the-art hybrid classrooms, digital learning hubs, and networking platforms with industry leaders.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 3. ACCREDITATION SECTION RENDERING
  const renderAccreditationSection = () => {
    const affiliatesData = [
      {
        title: "OTHM Qualifications – UK",
        link: "https://othm.org.uk/",
        text: "Gatwick College is an approved and accredited delivery center for OTHM Qualifications UK, a premier British awarding body regulated by Ofqual (Office of Qualifications and Examinations Regulation) in England and recognized by Qualifications Wales. We offer more than 47 specialized programs spanning foundational pathways to postgraduate diplomas from UK Level 3 through Level 7 (PGD). Our accredited disciplines encompass Business and Strategic Management, Information Technology and Computing, Accounting and Finance, Health and Social Care Management, Psychology and Counseling, Education and Pedagogy, Engineering Management, and Law and Legal Studies.\n\nThe primary advantage for Gatwick College students studying the OTHM framework is the seamless academic progression it provides. Because OTHM qualifications are built on the UK Regulated Qualifications Framework (RQF), completing a Level 4 and Level 5 Diploma equates to the first two years of a UK Bachelor's degree, while a Level 7 Diploma mirrors the coursework of a Master's program. This enables Gatwick College graduates to gain direct top-up progression pathways into over 20 British and international universities, allowing them to complete a full UK Bachelor's or Master's degree at a fraction of the cost of studying abroad for all three or four years."
      },
      {
        title: "NCC Education – UK",
        link: "https://www.nccedu.com/study-centres/gatwick-college-of-business-and-technology/",
        text: "Our partnership with NCC Education UK, one of the oldest and most prestigious international awarding organizations in the United Kingdom, dates back decades. Originally established in 1966 as a British Government computing initiative under the National Computing Centre, NCC Education has spent over five decades building a global reputation for setting high academic standards in all fields.\n\nThrough this collaboration, Gatwick College delivers NCC Education’s endorsed and regulated programs locally in Sri Lanka. These qualifications are specially designed to bridge secondary education with international university standards. Upon completing NCC Education pathways at Gatwick College, students acquire recognized British credentials that feature advanced standing and direct articulation agreements with over 50 universities across the UK, Australia, Canada, the United States, and Europe. This provides local students with a secure, quality-assured, and highly flexible passport to global higher education."
      },
      {
        title: "London School of Business and Social Sciences (LSBSS) – UK",
        link: null,
        text: "Gatwick College is partnered with the London School of Business and Social Sciences (LSBSS) in the United Kingdom, an academic institution dedicated to providing accessible, high-quality British education in business, humanities, and social sciences. LSBSS focuses on practical scholarship, applied research methodologies, and flexible learning frameworks tailored to international students and working professionals.\n\nThrough this partnership, Sri Lankan students gain access to globally recognized diploma and higher diploma pathways in Business Management, Teacher Training and Education, Applied Psychology and Counseling, Information Technology, and Social Sciences. LSBSS emphasizes learner-centric education and continuous assessment, ensuring that Gatwick College students graduate with strong analytical capabilities, practical workplace competencies, and respected British academic credentials."
      },
      {
        title: "University of Rhône – France",
        link: null,
        text: "In addition to our British awarding body alliances, Gatwick College collaborates with the University of Rhône, a distinguished European higher education institution recognized for its excellence in applied business, digital innovation, and executive training. Operating under official Qualiopi certification—the national quality framework for training providers established under French labor law—the University of Rhône maintains rigorous European academic standards and structured quality assurance.\n\nThis partnership allows Gatwick College students to gain broader European academic exposure and access qualifications tailored directly to modern global market demands. Through validated programs and aligned academic criteria, the University of Rhône supports Gatwick College across applied disciplines including business management, digital technology, healthcare management systems, and environmental studies. Learners benefit from an international curriculum that blends theoretical knowledge with practical, employment-focused skills recognized across European and global corporate sectors."
      },
      {
        title: "PSB University – Cambodia",
        link: null,
        text: "Gatwick College works in academic partnership with PSB University, an institution established under Cambodian royal charter and recognized by the Ministry of Education, Youth and Sport in Cambodia. Named in honor of King Norodom Sihamoni, PSB University is committed to holistic higher education, combining academic rigor with ethical values, community development, and research excellence.\n\nThis partnership fosters inter-Asian academic exchange, joint educational research, cross-cultural initiatives, and expanded qualification pathways for students looking to excel in emerging Asian commercial markets. Through collaboration with PSB University, Gatwick College offers recognized degree programs across educational sciences, humanities, management, and technology, providing students with regional academic credentials and unique opportunities for cross-border academic mobility."
      },
      {
        title: "Geneva Nations Institute – Switzerland",
        link: null,
        text: "Gatwick College has established a strategic academic collaboration with the Geneva Nations Institute, a Swiss center of excellence headquartered in Geneva—the world capital of international diplomacy, human rights, and multilateral governance. Located near major international headquarters, the Institute specializes in diplomatic studies, international relations, public administration, and global leadership.\n\nThrough this alliance, Gatwick College and the Geneva Nations Institute collaborate on student and faculty exchange opportunities, joint international conferences, research initiatives, and executive training seminars. Students participating in these programs gain direct exposure to global policy frameworks, governance strategies, and international organizational standards. The curriculum emphasizes interactive learning led by experienced international scholars and policy experts, preparing Gatwick College graduates to lead initiatives across non-governmental organizations (NGOs), public policy bodies, and multinational enterprises."
      },
      {
        title: "Geneva School of Business and Economics (GSBE) – Switzerland",
        link: null,
        text: "Gatwick College connects students directly with modern European business education through its partnership with the Geneva School of Business and Economics (GSBE) in Switzerland. GSBE is a prominent private academic institution in Geneva that attracts a diverse student body representing over 30 nationalities across its undergraduate, Master's, and doctoral tracks in business, finance, and economics.\n\nFurthermore, through GSBE's affiliation with the Federation for EDucation in Europe (FEDE)—a global network of over 500 higher education institutions—Gatwick College stands as a primary partner in Sri Lanka offering accredited European Bachelor's and Master's degree pathways. GSBE’s curriculum places heavy emphasis on international commercial law, digital economy, financial analytics, and strategic management, equipping Sri Lankan learners with Swiss-quality qualifications designed for global corporate leadership."
      },
      {
        title: "Royal Academy of Middle East – UAE",
        link: null,
        text: "Gatwick College collaborates closely with the Royal Academy of Middle East (FZ LLC), located in Sharjah, United Arab Emirates, and licensed by the Sharjah SPC authority as a high-tech educational establishment and training provider. The Royal Academy specializes in digital learning technology, modern educational delivery platforms, and specialized career certifications tailored to Gulf regional workforce requirements.\n\nThrough this strategic Middle Eastern alliance, Gatwick College expands its delivery of cutting-edge, industry-relevant fields such as Financial Technology (FinTech), Business Analytics, and Neuromarketing. The partnership provides a crucial educational bridge between South Asia and the GCC region, facilitating student mobility, online and hybrid learning models, and professional development programs that align with the hiring demands of corporate markets across the UAE and Middle East."
      },
      {
        title: "Scholars Global Campus",
        link: "https://scholars.edu.lk/",
        text: "Scholars Global Campus is an official academic partner institution of Gatwick College of Business and Technology. As a leading higher education institution in Sri Lanka (scholars.edu.lk), Scholars Global Campus delivers student-centric, career-focused certificate, diploma, and degree pathways designed for school leavers, educators, and working professionals. Specializing in high-demand fields such as Early Childhood Education, Teacher Training, Special Needs Education, Applied Psychology, CyberPsychology, FinTech, Computerized Accounting, and Business Management, Scholars Global Campus offers flexible, fast-track 3-to-6-month programs alongside full diploma pathways. Through this strategic institutional partnership, Gatwick College and Scholars Global Campus collaborate on shared academic frameworks, dual-progression pathways, and joint educational delivery. This alliance ensures local students benefit from accessible, trilingual learning options backed by Gatwick College's international accreditation network, providing learners with a seamless transition into higher UK and European qualification tracks."
      }
    ];

    return (
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="affiliates-intro">
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Strategic Academic Alliances
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 1rem 0', color: '#0a2540' }}>Accreditation & Affiliates</h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6' }}>
              At Gatwick College of Business and Technology, we collaborate with globally respected universities, government-regulated awarding organizations, and international higher education institutes to bring world-class qualifications directly to students in Sri Lanka. Through these strategic academic alliances, our institution provides accessible, cost-effective pathways, Ofqual-regulated frameworks, and recognized progression routes into international undergraduate and postgraduate degree programs.
            </p>
          </div>

          <div className="affiliates-grid">
            {affiliatesData.map((affiliate, index) => {
              const isOpen = openAccordion === index;
              return (
                <div key={index} className={`affiliate-item ${isOpen ? 'open' : ''}`}>
                  <button className="affiliate-header" onClick={() => toggleAccordion(index)}>
                    <div className="affiliate-title-group">
                      <ShieldCheck size={20} style={{ color: isOpen ? '#e31c23' : '#0a2540', flexShrink: 0 }} />
                      <h3 className="affiliate-title">{affiliate.title}</h3>
                    </div>
                    <span className="affiliate-arrow">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  <div className="affiliate-body">
                    <div className="affiliate-content">
                      {affiliate.text.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} style={{ marginBottom: pIdx === 0 && affiliate.text.includes('\n\n') ? '1rem' : 0 }}>
                          {para}
                        </p>
                      ))}
                      {affiliate.link && (
                        <a href={affiliate.link} target="_blank" rel="noopener noreferrer" className="affiliate-link">
                          <Globe size={15} />
                          <span>Visit Official Website</span>
                          <ExternalLink size={12} style={{ marginLeft: '0.2rem' }} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verify Center Modal Shortcuts */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '16px', 
            padding: '2.5rem', 
            border: '1px solid #e2e8f0', 
            textAlign: 'center',
            marginTop: '3.5rem'
          }}>
            <h4 style={{ fontSize: '1.15rem', color: '#0a2540', marginBottom: '1rem', fontWeight: 700 }}>
              Verify Center Accreditations
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              Click on any of our affiliated partner tags to review specific license numbers, credit systems, and academic equivalence tables.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => onOpenPartnerModal('othm')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>OTHM UK</button>
              <button onClick={() => onOpenPartnerModal('ncc')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>NCC Education</button>
              <button onClick={() => onOpenPartnerModal('gsbe')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>GSBE Geneva</button>
              <button onClick={() => onOpenPartnerModal('wes')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>WES Evaluation</button>
              <button onClick={() => onOpenPartnerModal('cpd')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>CPD Certified</button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 4. TESTIMONIALS SECTION RENDERING
  const renderTestimonialsSection = () => {
    return (
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Success Stories
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 1rem 0', color: '#0a2540' }}>Student Testimonials</h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              Hear directly from our graduates and current students about how Gatwick College's flexible learning, global curricula, and accredited pathways helped elevate their career progressions.
            </p>
          </div>



          {/* Testimonials Grid */}
          <div className="testimonials-grid">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div>
                  <div className="testimonial-header">
                    <div 
                      className="testimonial-avatar" 
                      style={{ backgroundColor: testimonial.avatarBg || '#e31c23' }}
                    >
                      {testimonial.initial || testimonial.name[0]}
                    </div>
                    <div className="testimonial-info">
                      <h3>{testimonial.name}</h3>
                      <p className="testimonial-course">{testimonial.course}</p>
                    </div>
                  </div>

                  <p className="testimonial-quote">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="testimonial-footer">
                  <span className="testimonial-campus-badge">
                    {testimonial.campus} Campus
                  </span>
                  <div className="testimonial-stars" aria-label={`Rating: ${testimonial.rating} stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < (testimonial.rating || 5) ? '#eab308' : 'none'} 
                        stroke="#eab308" 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
              <p style={{ fontSize: '1.05rem', margin: 0 }}>No student testimonials found for this campus.</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '3rem 0 2rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            About Gatwick College
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0', color: '#0a2540' }}>
            {activeTab === 'story' && 'Our Story & Faculty'}
            {activeTab === 'campus' && 'Our Dual Campus Locations'}
            {activeTab === 'accreditation' && 'Accreditation & Academic Alliances'}
            {activeTab === 'testimonials' && 'What Our Students Say'}
          </h1>
        </div>
      </section>

      {/* Tabs Sub-Navigation Bar */}
      <div className="about-tabs-wrapper">
        <div className="about-tabs-container">
          <button 
            className={`about-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
            onClick={() => handleTabChange('story')}
          >
            Our Story
          </button>
          <button 
            className={`about-tab-btn ${activeTab === 'campus' ? 'active' : ''}`}
            onClick={() => handleTabChange('campus')}
          >
            Campuses
          </button>
          <button 
            className={`about-tab-btn ${activeTab === 'accreditation' ? 'active' : ''}`}
            onClick={() => handleTabChange('accreditation')}
          >
            Accreditation & Affiliates
          </button>
          <button 
            className={`about-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => handleTabChange('testimonials')}
          >
            Student Testimonials
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="about-content-sections" style={{ minHeight: '400px' }}>
        {activeTab === 'story' && renderStorySection()}
        {activeTab === 'campus' && renderCampusSection()}
        {activeTab === 'accreditation' && renderAccreditationSection()}
        {activeTab === 'testimonials' && renderTestimonialsSection()}
      </div>
    </div>
  );
}
