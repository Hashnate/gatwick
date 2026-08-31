import React, { useState, useEffect } from 'react';
import { courses } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle, ExternalLink, Navigation, ChevronLeft, ChevronRight, Camera, Film, Play, Pause, Volume2, VolumeX, Award, Users } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { addInquiry } from '../services/adminStorage';

export default function Contact({ selectedEnquiryCourse, setSelectedEnquiryCourse, selectedEnquiryCampus, setSelectedEnquiryCampus, courses: propCourses }) {
  const activeCourses = propCourses || courses;

  // Guaranteed Language School options to ensure all newly added language courses appear in the Subject Course Area dropdown
  const guaranteedLanguageCourses = [
    { id: 'lang-general', title: '🌐 Language School — General Inquiry (English, French & Japanese)', level: 'All Language Pathways', school: 'linguistics' },
    // English Language Centre
    { id: 'lang-english-centre', title: 'English Language Centre (IELTS, PTE & Communicative Fluency)', level: 'Native Speaker Instruction', school: 'linguistics' },
    { id: 'lang-ielts', title: 'IELTS Academic & General Training (Band 7.5+ Targeted Coaching)', level: 'Exam Certification', school: 'linguistics' },
    { id: 'lang-pte', title: 'PTE Academic Masterclass (Automated Scored Mocks & Strategy)', level: 'Exam Certification', school: 'linguistics' },
    { id: 'lang-spoken-english', title: 'Spoken & Communicative English Fluency (Speech & Grammar)', level: 'Professional Fluency', school: 'linguistics' },
    { id: 'lang-young-learners', title: 'Young Learners & School English Curriculum (Edexcel / Cambridge / Local)', level: 'School Curriculum', school: 'linguistics' },
    // French Language Centre
    { id: 'lang-french-centre', title: 'French Language Centre (DELF/DALF, TEF/TCF & School Curricula)', level: 'Migration & Academic', school: 'linguistics' },
    { id: 'lang-tef-tcf', title: 'TEF / TCF Canada Migration Pathway (Express Entry NCLC 7+ Drills)', level: 'Canada / France Migration', school: 'linguistics' },
    { id: 'lang-delf-dalf', title: 'DELF & DALF Official Certification (CEFR Levels A1–C2)', level: 'Lifetime French Diploma', school: 'linguistics' },
    { id: 'lang-french-school', title: 'Edexcel, Cambridge & National O/L & A/L French Curricula', level: 'School Curriculum', school: 'linguistics' },
    { id: 'lang-french-conversational', title: 'Conversational French & Francophonie Cultural Immersion', level: 'Language Certification', school: 'linguistics' },
    // Japanese Language Centre
    { id: 'lang-japanese-centre', title: 'Japanese Language Centre (JLPT, NAT-TEST & Migration Pathways)', level: 'Academic & Employment', school: 'linguistics' },
    { id: 'lang-jlpt-n5-n4', title: 'JLPT N5 & N4 Beginner Foundation (Essential Grammar, Kanji & Spoken)', level: 'Visa Eligibility Track', school: 'linguistics' },
    { id: 'lang-jlpt-n3-n2', title: 'JLPT N3 & N2 Intermediate/Professional Japanese (Business Keigo)', level: 'Professional Fluency', school: 'linguistics' },
    { id: 'lang-ssw-japan', title: 'Specified Skilled Worker (SSW) Japan Employment Track', level: 'Vocational Japanese Track', school: 'linguistics' },
    { id: 'lang-japan-student-visa', title: 'Student Visa & Japanese University Interview Simulation', level: 'University Pathway', school: 'linguistics' },
    // Linguistics / TESOL Higher Qualifications
    { id: 'ba-tesol', title: 'Bachelor of Arts in TESOL (BA TESOL — UK Level 6)', level: "Bachelor's Degree", school: 'linguistics' },
    { id: 'ma-tesol', title: 'Master of Arts in TESOL (MA in TESOL — UK Level 7)', level: "Master's Degree", school: 'linguistics' },
    { id: 'dip-tesol', title: 'Diploma in TESOL (Teaching English to Speakers of Other Languages)', level: 'UK RQF Level 3', school: 'linguistics' }
  ];

  // Merge active courses with guaranteed language courses so none are missed
  const mergedCourses = [...activeCourses];
  guaranteedLanguageCourses.forEach(lc => {
    if (!mergedCourses.some(c => c.id === lc.id)) {
      mergedCourses.push(lc);
    }
  });

  // Build grouped, deduplicated course options for the dropdown
  const buildGroupedCourseOptions = (courseList) => {
    const seen = new Set();
    const groups = [
      { label: '🎓 Master Level — OTHM Level 7 (Postgraduate)', filter: c => c.level && (c.level.includes('L7') || c.level.includes('Level 7') || c.level.includes("Master's")) },
      { label: '🎓 Bachelor Level — OTHM Level 6 (Graduate)', filter: c => c.level && (c.level.includes('L6') || c.level.includes('Level 6') || c.level.includes("Bachelor's")) },
      { label: '📘 Diploma — OTHM Level 4 & 5 (Undergraduate)', filter: c => c.level && (c.level.includes('L4') || c.level.includes('L5') || c.level.includes('Level 4') || c.level.includes('Level 5')) },
      { label: '📗 Foundation — OTHM Level 3', filter: c => c.level && (c.level.includes('L3') || c.level.includes('Level 3')) },
    ];
    const result = [];
    groups.forEach(group => {
      const groupItems = courseList.filter(c => {
        if (seen.has(c.id)) return false;
        return group.filter(c);
      });
      if (groupItems.length > 0) {
        result.push({ isGroup: true, label: group.label });
        groupItems.forEach(c => {
          seen.add(c.id);
          result.push({ value: c.id, label: c.title, badge: c.level });
        });
      }
    });
    // Append any ungrouped courses at the bottom
    const rest = courseList.filter(c => !seen.has(c.id));
    if (rest.length > 0) {
      result.push({ isGroup: true, label: '📋 Other Programs' });
      rest.forEach(c => result.push({ value: c.id, label: c.title, badge: c.level }));
    }
    return result;
  };

  const groupedCourseOptions = buildGroupedCourseOptions(mergedCourses);
  const [activeMapTab, setActiveMapTab] = useState('colombo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCampus, setSelectedCampus] = useState(selectedEnquiryCampus || 'Colombo');

  const resolveCourseId = (courseId) => {
    if (!courseId) return '';
    if (courseId === 'lang-english' || courseId === 'english') return 'lang-english-centre';
    if (courseId === 'lang-french' || courseId === 'french') return 'lang-french-centre';
    if (courseId === 'lang-japanese' || courseId === 'japanese') return 'lang-japanese-centre';
    if (courseId === 'lang-all' || courseId === 'languages' || courseId === 'linguistics') return 'lang-general';
    return courseId;
  };

  const [selectedCourse, setSelectedCourse] = useState(() => resolveCourseId(selectedEnquiryCourse));

  useEffect(() => {
    if (selectedEnquiryCampus) {
      setSelectedCampus(selectedEnquiryCampus);
    }
  }, [selectedEnquiryCampus]);

  useEffect(() => {
    if (selectedEnquiryCourse) {
      setSelectedCourse(resolveCourseId(selectedEnquiryCourse));
    }
  }, [selectedEnquiryCourse]);

  // Automatically scroll to inquiry form when entering Contact page with course/campus inquiry
  useEffect(() => {
    const timer = setTimeout(() => {
      const formEl = document.getElementById('inquiry-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [selectedEnquiryCourse, selectedEnquiryCampus]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const colomboVideoRef = React.useRef(null);
  const kandyVideoRef = React.useRef(null);
  const [isColomboMuted, setIsColomboMuted] = useState(true);
  const [isColomboPlaying, setIsColomboPlaying] = useState(true);

  const colomboPhotos = [
    {
      isVideo: true,
      src: 'assets/colombo_branch.mp4',
      title: 'Colombo Campus',
      poster: 'assets/campus_colombo.webp'
    }
  ];

  const [colomboPhotoIndex, setColomboPhotoIndex] = useState(0);

  const nextColomboPhoto = () => {
    setColomboPhotoIndex((prev) => (prev + 1) % colomboPhotos.length);
  };

  const prevColomboPhoto = () => {
    setColomboPhotoIndex((prev) => (prev - 1 + colomboPhotos.length) % colomboPhotos.length);
  };

  const kandyPhotos = [
    {
      isVideo: true,
      src: 'assets/kandy_branch.mp4',
      title: 'Kandy Branch Campus',
      poster: 'assets/campus_kandy.webp'
    }
  ];

  const [kandyPhotoIndex, setKandyPhotoIndex] = useState(0);

  const nextKandyPhoto = () => {
    setKandyPhotoIndex((prev) => (prev + 1) % kandyPhotos.length);
  };

  const prevKandyPhoto = () => {
    setKandyPhotoIndex((prev) => (prev - 1 + kandyPhotos.length) % kandyPhotos.length);
  };

  const mapsData = {
    colombo: {
      name: 'Colombo Main Campus',
      address: '500 Galle Road, Colombo 06, Sri Lanka',
      embedUrl: 'https://maps.google.com/maps?q=6.8643103,79.8632363&t=&z=17&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.app.goo.gl/EEjLDHDch2LjMH538'
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
    
    // Find course title from mergedCourses (covers all academic and language programs)
    const courseObj = mergedCourses.find(c => c.id === selectedCourse);
    const courseTitle = courseObj ? courseObj.title : (selectedCourse || 'General Course Inquiry');

    // Save inquiry in admin storage
    addInquiry({
      name,
      email,
      phone,
      campus: selectedCampus,
      course: courseTitle,
      message
    });

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setSelectedEnquiryCourse(''); // Clear the globally selected course
    }, 1200);
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
          
          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '4rem', alignItems: 'stretch' }}>
            
            {/* 1. Colombo Campus Card */}
            <div className="campus-showcase-card">
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Multiple Photo & Video Slider Container */}
                <div style={{ position: 'relative', height: '420px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                  {colomboPhotos[colomboPhotoIndex].isVideo ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <video
                        ref={colomboVideoRef}
                        src={colomboPhotos[colomboPhotoIndex].src}
                        poster={colomboPhotos[colomboPhotoIndex].poster}
                        loop
                        playsInline
                        autoPlay
                        muted={isColomboMuted}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <img 
                      key={colomboPhotoIndex}
                      src={colomboPhotos[colomboPhotoIndex].src} 
                      alt={colomboPhotos[colomboPhotoIndex].title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = colomboPhotos[colomboPhotoIndex].fallback;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: colomboPhotos[colomboPhotoIndex].objectPosition || 'center center', transition: 'all 0.3s ease' }}
                    />
                  )}

                  {/* Title Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0) 100%)',
                    padding: '2.5rem 1.25rem 1rem 1.25rem',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    zIndex: 10
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {colomboPhotos[colomboPhotoIndex].title}
                    </span>
                  </div>

                  {/* Slider Prev / Next Arrows */}
                  {colomboPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevColomboPhoto}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '12px',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(8px)',
                          zIndex: 20,
                          transition: 'all 0.2s ease'
                        }}
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={nextColomboPhoto}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '12px',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(8px)',
                          zIndex: 20,
                          transition: 'all 0.2s ease'
                        }}
                        aria-label="Next photo"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Multiple Photo & Video Thumbnails Selection Strip */}
                {colomboPhotos.length > 1 && (
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colomboPhotos.length}, 1fr)`, gap: '0.45rem', padding: '0.6rem 0.75rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {colomboPhotos.map((photo, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setColomboPhotoIndex(index);
                          if (photo.isVideo) {
                            setIsColomboPlaying(true);
                            setTimeout(() => {
                              if (colomboVideoRef.current) colomboVideoRef.current.play().catch(() => {});
                            }, 50);
                          }
                        }}
                        style={{
                          height: '58px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: colomboPhotoIndex === index ? '2.5px solid #e31c23' : '2px solid transparent',
                          opacity: colomboPhotoIndex === index ? 1 : 0.65,
                          cursor: 'pointer',
                          padding: 0,
                          background: '#0f172a',
                          position: 'relative',
                          transition: 'all 0.2s ease'
                        }}
                        title={photo.title}
                      >
                        <img 
                          src={photo.isVideo ? photo.poster : photo.src} 
                          alt={photo.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {photo.isVideo && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(15, 23, 42, 0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff'
                          }}>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: '#e31c23',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                            }}>
                              <Play size={12} fill="#ffffff" color="#ffffff" style={{ marginLeft: '1px' }} />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ padding: '1.75rem 1.75rem 1.25rem 1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0a2540', fontWeight: 800, marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    Colombo Branch (Commercial Hub Campus)
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    Situated along Galle Road in Colombo 06, the Colombo branch serves as the strategic urban gateway for students seeking corporate engagement, flexible evening/weekend studies, and direct industry connectivity.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem', flexGrow: 1 }}>
                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e31c23', textTransform: 'uppercase', display: 'block', letterSpacing: '0.05em' }}>Location</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Galle Road, Colombo 06</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a2540', flexShrink: 0 }}>
                        <Award size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', display: 'block', letterSpacing: '0.05em' }}>Focus</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Advanced professional diplomas, postgraduate & executive MBAs, FinTech, and specialized business qualifications tailored for corporate workforce advancement.</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', flexShrink: 0 }}>
                        <Users size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', display: 'block', letterSpacing: '0.05em' }}>Campus Life</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Conveniently located along the main transport corridor, providing state-of-the-art hybrid classrooms, digital learning hubs, and networking platforms with industry leaders.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a 
                  href="https://maps.app.goo.gl/EEjLDHDch2LjMH538" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.82rem', gap: '0.35rem', justifyContent: 'center' }}
                >
                  Get Directions <ExternalLink size={13} />
                </a>
                <a 
                  href="tel:+94773447878" 
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.82rem', gap: '0.35rem', justifyContent: 'center' }}
                >
                  <Phone size={13} /> Call
                </a>
              </div>
            </div>

            {/* 2. Kandy Campus Card */}
            <div className="campus-showcase-card">
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Multiple Photo Slider Container */}
                <div style={{ position: 'relative', height: '420px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                  {kandyPhotos[kandyPhotoIndex].isVideo ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <video
                        ref={kandyVideoRef}
                        src={kandyPhotos[kandyPhotoIndex].src}
                        poster={kandyPhotos[kandyPhotoIndex].poster}
                        loop
                        playsInline
                        autoPlay
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <img 
                      key={kandyPhotoIndex}
                      src={kandyPhotos[kandyPhotoIndex].src} 
                      alt={kandyPhotos[kandyPhotoIndex].title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = kandyPhotos[kandyPhotoIndex].fallback;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: kandyPhotos[kandyPhotoIndex].objectPosition || 'center center', transition: 'all 0.3s ease' }}
                    />
                  )}

                  {/* Photo Title Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0) 100%)',
                    padding: '2.5rem 1.25rem 1rem 1.25rem',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    zIndex: 10
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {kandyPhotos[kandyPhotoIndex].title}
                    </span>
                  </div>

                  {/* Slider Prev / Next Arrows */}
                  {kandyPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevKandyPhoto}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '12px',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(8px)',
                          zIndex: 15,
                          transition: 'all 0.2s ease'
                        }}
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={nextKandyPhoto}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '12px',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(8px)',
                          zIndex: 15,
                          transition: 'all 0.2s ease'
                        }}
                        aria-label="Next photo"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Multiple Photo Thumbnails Selection Strip */}
                {kandyPhotos.length > 1 && (
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${kandyPhotos.length}, 1fr)`, gap: '0.45rem', padding: '0.6rem 0.75rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {kandyPhotos.map((photo, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setKandyPhotoIndex(index)}
                        style={{
                          height: '58px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: kandyPhotoIndex === index ? '2.5px solid #e31c23' : '2px solid transparent',
                          opacity: kandyPhotoIndex === index ? 1 : 0.6,
                          cursor: 'pointer',
                          padding: 0,
                          background: '#0f172a',
                          transition: 'all 0.2s ease'
                        }}
                        title={photo.title}
                      >
                        <img 
                          src={photo.isVideo ? photo.poster : photo.src} 
                          alt={photo.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ padding: '1.75rem 1.75rem 1.25rem 1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0a2540', fontWeight: 800, marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    Kandy Branch (Flagship Campus)
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    As the founding hub of the college, the Kandy branch offers a central and accessible learning environment situated right in the heart of Kandy City.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem', flexGrow: 1 }}>
                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e31c23', textTransform: 'uppercase', display: 'block', letterSpacing: '0.05em' }}>Location</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Hill Street, Kandy</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a2540', flexShrink: 0 }}>
                        <Award size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', display: 'block', letterSpacing: '0.05em' }}>Focus</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Academic foundation diplomas, undergraduate top-up degrees, professional skill certificates, and adult continuing education.</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', flexShrink: 0 }}>
                        <Users size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', display: 'block', letterSpacing: '0.05em' }}>Campus Life</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>A modern, fully air-conditioned facility designed for interactive lectures, collaborative student spaces, and localized community-driven workshops.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a 
                  href="https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.82rem', gap: '0.35rem', justifyContent: 'center' }}
                >
                  Get Directions <ExternalLink size={13} />
                </a>
                <a 
                  href="tel:+94773447878" 
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.82rem', gap: '0.35rem', justifyContent: 'center' }}
                >
                  <Phone size={13} /> Call
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
            {/* Attractive & Matching Campus Map Header Bar */}
            <div style={{
              padding: '1.25rem 2rem',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}>
              {/* Left: Icon & Title Stack */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '10px', 
                  backgroundColor: '#fff0f1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#e31c23',
                  flexShrink: 0 
                }}>
                  <Navigation size={18} />
                </div>
                <div>
                  <span style={{ 
                    color: '#e31c23', 
                    fontWeight: 800, 
                    fontSize: '0.72rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.06em', 
                    display: 'block' 
                  }}>
                    Interactive Campus Navigator
                  </span>
                  <h3 style={{ margin: '0.1rem 0 0', fontSize: '1.25rem', color: '#0a2540', fontWeight: 800 }}>
                    {mapsData[activeMapTab].name} Map
                  </h3>
                </div>
              </div>

              {/* Right: Attractive & Matching Campus Switcher Pill Track */}
              <div style={{ 
                display: 'flex', 
                gap: '0.25rem', 
                backgroundColor: '#f8fafc', 
                padding: '0.25rem', 
                borderRadius: '30px',
                border: '1px solid #e2e8f0',
                marginLeft: 'auto' 
              }}>
                <button
                  onClick={() => setActiveMapTab('colombo')}
                  style={{
                    padding: '0.55rem 1.3rem',
                    borderRadius: '25px',
                    border: 'none',
                    background: activeMapTab === 'colombo' ? 'linear-gradient(135deg, #e31c23 0%, #d31920 100%)' : 'transparent',
                    color: activeMapTab === 'colombo' ? '#ffffff' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    boxShadow: activeMapTab === 'colombo' ? '0 4px 14px rgba(227, 28, 35, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <span style={{ 
                    width: '7px', 
                    height: '7px', 
                    borderRadius: '50%', 
                    backgroundColor: activeMapTab === 'colombo' ? '#ffffff' : '#cbd5e1', 
                    display: 'inline-block' 
                  }}></span>
                  Colombo Campus
                </button>

                <button
                  onClick={() => setActiveMapTab('kandy')}
                  style={{
                    padding: '0.55rem 1.3rem',
                    borderRadius: '25px',
                    border: 'none',
                    background: activeMapTab === 'kandy' ? 'linear-gradient(135deg, #e31c23 0%, #d31920 100%)' : 'transparent',
                    color: activeMapTab === 'kandy' ? '#ffffff' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    boxShadow: activeMapTab === 'kandy' ? '0 4px 14px rgba(227, 28, 35, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <span style={{ 
                    width: '7px', 
                    height: '7px', 
                    borderRadius: '50%', 
                    backgroundColor: activeMapTab === 'kandy' ? '#ffffff' : '#cbd5e1', 
                    display: 'inline-block' 
                  }}></span>
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
          <div id="inquiry-form" className="form-card" style={{ maxWidth: '850px', margin: '0 auto', scrollMarginTop: '90px' }}>
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
                    onChange={(val) => {
                      setSelectedCampus(val);
                      if (setSelectedEnquiryCampus) setSelectedEnquiryCampus(val);
                    }}
                    options={[
                      { value: 'Colombo', label: 'Colombo Branch' },
                      { value: 'Kandy', label: 'Kandy Branch' }
                    ]}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact-course">Subject Course Area *</label>
                  <CustomSelect
                    id="contact-course"
                    value={selectedCourse}
                    onChange={setSelectedCourse}
                    options={groupedCourseOptions}
                    placeholder="Select a Course or Subject Area..."
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
