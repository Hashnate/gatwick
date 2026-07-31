import React, { useState, useEffect } from 'react';
import { courses } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle, ExternalLink, Navigation, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { addInquiry } from '../services/adminStorage';

export default function Contact({ selectedEnquiryCourse, setSelectedEnquiryCourse, selectedEnquiryCampus, setSelectedEnquiryCampus, courses: propCourses }) {
  const activeCourses = propCourses || courses;
  const [activeMapTab, setActiveMapTab] = useState('colombo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCampus, setSelectedCampus] = useState(selectedEnquiryCampus || 'Colombo');
  const [selectedCourse, setSelectedCourse] = useState(selectedEnquiryCourse || 'othm-l4-business');

  useEffect(() => {
    if (selectedEnquiryCampus) {
      setSelectedCampus(selectedEnquiryCampus);
    }
  }, [selectedEnquiryCampus]);

  useEffect(() => {
    if (selectedEnquiryCourse) {
      setSelectedCourse(selectedEnquiryCourse);
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

  const colomboPhotos = [
    {
      src: 'assets/campus_colombo.webp',
      title: 'Colombo Campus Main Building',
      fallback: 'assets/campus_facade.webp',
      objectPosition: 'center center'
    },
    {
      src: 'assets/colombo_1_reception.webp',
      title: 'Executive Reception Desk Office',
      fallback: 'assets/campus_colombo.webp',
      objectPosition: 'center top'
    },
    {
      src: 'assets/colombo_2_flags.webp',
      title: 'Executive Counseling Suite with International Flags',
      fallback: 'assets/campus_colombo.webp',
      objectPosition: 'center top'
    },
    {
      src: 'assets/colombo_3_classroom.webp',
      title: 'Modern IT & Lecture Classroom',
      fallback: 'assets/campus_colombo.webp',
      objectPosition: 'center center'
    },
    {
      src: 'assets/colombo_4_lounge.webp',
      title: 'Global Student Lounge & International Flags',
      fallback: 'assets/campus_colombo.webp',
      objectPosition: 'center top'
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
      src: 'assets/campus_kandy.webp',
      title: 'Kandy Branch Campus Exterior',
      fallback: 'assets/campus_kandy.webp',
      objectPosition: 'center center'
    },
    {
      src: 'assets/kandy_1_lobby.webp',
      title: 'Executive Reception & Consultation Lobby',
      fallback: 'assets/campus_kandy.webp',
      objectPosition: 'center center'
    },
    {
      src: 'assets/kandy_2_reception.webp',
      title: 'Main Entrance & Study Consultation Tables',
      fallback: 'assets/campus_kandy.webp',
      objectPosition: 'center center'
    },
    {
      src: 'assets/kandy_3_lounge.webp',
      title: 'Global Student Lounge & International Partner Flags',
      fallback: 'assets/campus_kandy.webp',
      objectPosition: 'center center'
    },
    {
      src: 'assets/kandy_4_classroom.webp',
      title: 'Interactive IT & Computer Architecture Lecture Room',
      fallback: 'assets/campus_kandy.webp',
      objectPosition: 'center center'
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
      embedUrl: 'https://maps.google.com/maps?q=6.883582,79.860076&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka'
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
    
    // Find course title
    const courseObj = activeCourses.find(c => c.id === selectedCourse);
    const courseTitle = courseObj ? courseObj.title : selectedCourse;

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
          
          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '4rem' }}>
            
            {/* 1. Colombo Campus Card */}
            <div className="campus-showcase-card">
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Multiple Photo Slider Container */}
                <div style={{ position: 'relative', height: '420px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
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

                  {/* Photo Counter Pill Badge */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '14px', 
                    right: '14px', 
                    backgroundColor: 'rgba(15, 23, 42, 0.75)', 
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    padding: '0.3rem 0.75rem', 
                    borderRadius: '20px', 
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Camera size={13} color="#e31c23" /> {colomboPhotoIndex + 1} / {colomboPhotos.length}
                  </div>

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
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {colomboPhotos[colomboPhotoIndex].title}
                    </span>
                  </div>

                  {/* Slider Prev / Next Arrows */}
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
                      zIndex: 15,
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
                      zIndex: 15,
                      transition: 'all 0.2s ease'
                    }}
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Multiple Photo Thumbnails Selection Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colomboPhotos.length}, 1fr)`, gap: '0.45rem', padding: '0.6rem 0.75rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {colomboPhotos.map((photo, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setColomboPhotoIndex(index)}
                      style={{
                        height: '58px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: colomboPhotoIndex === index ? '2.5px solid #e31c23' : '2px solid transparent',
                        opacity: colomboPhotoIndex === index ? 1 : 0.6,
                        cursor: 'pointer',
                        padding: 0,
                        background: '#0f172a',
                        transition: 'all 0.2s ease'
                      }}
                      title={photo.title}
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>

                <div style={{ padding: '1.75rem 1.75rem 1.25rem 1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0a2540', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    Colombo Main Campus
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem', flexGrow: 1 }}>
                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Address</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>500 Galle Road, Colombo 06, Sri Lanka</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Hotlines</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>+94 77 344 7878 / +94 11 250 8802</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Registry Email</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>colombo@gcbt.edu.lk</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Clock size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Operating Hours</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Mon - Sat: 08:30 AM - 05:30 PM (Sunday Closed)</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a 
                  href="https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka" 
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

                  {/* Photo Counter Pill Badge */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '14px', 
                    right: '14px', 
                    backgroundColor: 'rgba(15, 23, 42, 0.75)', 
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    padding: '0.3rem 0.75rem', 
                    borderRadius: '20px', 
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Camera size={13} color="#e31c23" /> {kandyPhotoIndex + 1} / {kandyPhotos.length}
                  </div>

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
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {kandyPhotos[kandyPhotoIndex].title}
                    </span>
                  </div>

                  {/* Slider Prev / Next Arrows */}
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
                </div>

                {/* Multiple Photo Thumbnails Selection Strip */}
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
                        src={photo.src} 
                        alt={photo.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>

                <div style={{ padding: '1.75rem 1.75rem 1.25rem 1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0a2540', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    Kandy Branch Campus
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem', flexGrow: 1 }}>
                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Address</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>291 A9, Kandy 20000, Sri Lanka</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Hotlines</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>+94 77 344 7878 / +94 81 223 8812</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Registry Email</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>kandy@gcbt.edu.lk</span>
                      </div>
                    </li>

                    <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e31c23', flexShrink: 0 }}>
                        <Clock size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Operating Hours</span>
                        <span style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 600 }}>Mon - Sat: 08:30 AM - 05:30 PM (Sunday Closed)</span>
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
                      { value: 'Colombo', label: 'Colombo Registrar Office' },
                      { value: 'Kandy', label: 'Kandy Admissions Desk' }
                    ]}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact-course">Subject Course Area *</label>
                  <CustomSelect
                    id="contact-course"
                    value={selectedCourse}
                    onChange={setSelectedCourse}
                    options={activeCourses.map(c => ({ value: c.id, label: c.title, badge: c.level }))}
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
