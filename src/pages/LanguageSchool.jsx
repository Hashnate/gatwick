import React, { useState, useEffect } from 'react';
import { 
  Globe, Award, BookOpen, Users, CheckCircle2, 
  ArrowRight, Sparkles, GraduationCap, Compass, ChevronRight
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppButton';

export default function LanguageSchool({ setCurrentPage, setSelectedEnquiryCourse, initialLanguage = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialLanguage);

  useEffect(() => {
    if (initialLanguage && initialLanguage !== 'all') {
      setActiveTab(initialLanguage);
      const targetId = `lang-${initialLanguage}`;
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [initialLanguage]);

  useEffect(() => {
    const handleSetTab = (e) => {
      if (e.detail && e.detail.tab) {
        setActiveTab(e.detail.tab);
        const targetId = `lang-${e.detail.tab}`;
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };
    window.addEventListener('gcbt:setLanguageTab', handleSetTab);
    return () => window.removeEventListener('gcbt:setLanguageTab', handleSetTab);
  }, []);

  const handleEnquire = (courseId) => {
    if (setSelectedEnquiryCourse) {
      setSelectedEnquiryCourse(courseId);
    }
    setCurrentPage('contact');
    setTimeout(() => {
      const formEl = document.getElementById('inquiry-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 120);
  };

  const languageCentres = [
    {
      id: 'english',
      name: 'English Language Centre',
      flag: '🇬🇧',
      badge: 'Native English Speaker Instruction',
      lead: 'Taught by a native English speaker, our English programs prioritize practical, real-world communication skills alongside academic rigor.',
      courseId: 'lang-english-centre',
      targetAudience: 'School children, working professionals, and individuals planning for overseas migration.',
      focus: 'Everyday fluency, professional vocabulary, public speaking, and communicative grammar.',
      examPrep: 'Comprehensive training for IELTS (Academic & General Training) and PTE Academic.',
      deliveryModes: ['Colombo Campus', 'Kandy Campus', 'Live Online Batches'],
      colorAccent: '#0a2540',
      keyHighlights: [
        'Interactive communicative sessions focusing on real-life accent and pronunciation',
        'Academic writing, corporate presentation & business correspondence workshops',
        'Tailored modular tracks for young learners and busy corporate executives',
        'Full-length mock exam simulations with personalized diagnostic feedback'
      ],
      tracks: [
        { title: 'IELTS Academic & General', desc: 'Band 7.5+ targeted coaching with intensive writing & speaking drills.' },
        { title: 'PTE Academic Masterclass', desc: 'Algorithm-focused scoring strategies, automated scoring mocks & tips.' },
        { title: 'Spoken & Communicative English', desc: 'Fluency, voice modulation, idioms, and impromptu speaking practice.' },
        { title: 'Young Learners & School Curriculum', desc: 'Structured grammar, vocabulary, reading comprehension, and creative writing.' }
      ]
    },
    {
      id: 'french',
      name: 'French Language Centre',
      flag: '🇫🇷',
      badge: 'Curriculum Standards & Migration Pathways',
      lead: 'Our French programs are tailored to meet both academic curriculum standards and international relocation requirements.',
      courseId: 'lang-french-centre',
      targetAudience: 'School students preparing for local O/L and A/L examinations, international curriculum students (Edexcel / Cambridge O/L and A/L), and migration applicants.',
      focus: 'Curriculum-aligned grammar, literature, conversational proficiency, and cultural context.',
      examPrep: 'Official preparation for DELF / DALF certifications (CEFR levels A1–C2) and TEF / TCF (for Canada/France migration pathways).',
      deliveryModes: ['Colombo Campus', 'Kandy Campus', 'Online Hybrid'],
      colorAccent: '#1d4ed8',
      keyHighlights: [
        'Curriculum-aligned syllabus for Edexcel, Cambridge, and Sri Lankan National O/L & A/L',
        'TEF Canada & TCF preparation tailored for Express Entry bonus CRS immigration points',
        'CEFR-mapped progression across Beginner (A1/A2), Intermediate (B1/B2), and Advanced (C1/C2)',
        'Oral expression, listening comprehension, and French Francophonie cultural immersion'
      ],
      tracks: [
        { title: 'TEF / TCF Canada Migration', desc: 'Dedicated fast-track coaching to secure NCLC 7+ for Canada immigration.' },
        { title: 'DELF & DALF Certification', desc: 'Internationally valid lifetime diplomas accredited by France Éducation International.' },
        { title: 'Edexcel / Cambridge O/L & A/L', desc: 'Complete textbook coverage, past paper analysis, oral examination drills.' },
        { title: 'Conversational French', desc: 'Everyday dialogue, travel vocabulary, pronunciation, and social communication.' }
      ]
    },
    {
      id: 'japanese',
      name: 'Japanese Language Centre',
      flag: '🇯🇵',
      badge: 'Academic & Employment Pathways in Japan',
      lead: 'Designed for individuals seeking academic and employment opportunities in Japan, this program builds core competency in reading, writing, and spoken Japanese.',
      courseId: 'lang-japanese-centre',
      targetAudience: 'Students and professionals planning to migrate to Japan for university admission, vocational pathways, or direct employment.',
      focus: 'Core competency in spoken Japanese, reading and writing (Hiragana, Katakana, Kanji), and Japanese workplace etiquette.',
      examPrep: 'Preparation for JLPT (N5, N4, N3, N2) and NAT-TEST certifications, alongside visa interview readiness.',
      deliveryModes: ['Colombo Campus', 'Kandy Campus', 'Online Batches'],
      colorAccent: '#dc2626',
      keyHighlights: [
        'Complete mastery of 3 Japanese writing systems: Hiragana, Katakana, and essential Kanji',
        'Business Japanese manners (Keigo), workplace communication & corporate cultural training',
        'Direct assistance and guidance for Japanese university admissions & SSW / work visa categories',
        'Mock tests and timed exercises for JLPT N5 through N2 proficiency'
      ],
      tracks: [
        { title: 'JLPT N5 & N4 Beginner Foundation', desc: 'Essential grammar, 300+ Kanji, daily conversation for visa eligibility.' },
        { title: 'JLPT N3 & N2 Intermediate/Professional', desc: 'Professional fluency, complex reading, and workplace technical vocabulary.' },
        { title: 'Specified Skilled Worker (SSW) Track', desc: 'Vocational Japanese targeted for hospitality, caregiving, IT, and manufacturing.' },
        { title: 'Student Visa & University Prep', desc: 'University interview simulations, statement of purpose, and Embassy Q&A.' }
      ]
    }
  ];

  const visibleCentres = activeTab === 'all' 
    ? languageCentres 
    : languageCentres.filter(c => c.id === activeTab);

  return (
    <div className="language-school-page" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* ── Page Hero Header ────────────────────────────────────────────── */}
      <section style={{ 
        backgroundColor: '#0a2540',
        backgroundImage: 'linear-gradient(rgba(10, 37, 64, 0.60), rgba(10, 37, 64, 0.72)), url("assets/language_school_hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff', 
        padding: '3.5rem 0 3.25rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 25, 47, 0.85)', padding: '0.45rem 1rem', borderRadius: '30px', backdropFilter: 'blur(8px)', marginBottom: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.25)', boxShadow: '0 4px 15px rgba(0,0,0,0.25)' }}>
              <Globe size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff' }}>
                Academic & Migration Linguistic Academy
              </span>
            </div>

            <h1 style={{ fontSize: '2.65rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 1rem 0', color: '#ffffff', letterSpacing: '-0.02em', textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)' }}>
              Gatwick Language School
            </h1>

            <p style={{ fontSize: '1.05rem', color: '#f1f5f9', lineHeight: 1.65, margin: '0 0 1.75rem 0', textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)' }}>
              Empowering global ambitions with native speaker excellence, international exam preparation, and curriculum-aligned language certifications in <strong style={{ color: '#ffffff' }}>English</strong>, <strong style={{ color: '#ffffff' }}>French</strong>, and <strong style={{ color: '#ffffff' }}>Japanese</strong>.
            </p>

            {/* Key Metric Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 25, 47, 0.82)', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <Sparkles size={16} color="#f43f5e" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Native Speaker Instruction</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 25, 47, 0.82)', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <Award size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>IELTS • PTE • DELF/DALF • TEF • JLPT</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 25, 47, 0.82)', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <Compass size={16} color="#4ade80" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Migration & University Pathways</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Filter Navigation Bar ────────────────────────────── */}
      <div style={{ 
        position: 'sticky', 
        top: '68px', 
        zIndex: 90, 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
      }}>
        <div className="container" style={{ padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                border: activeTab === 'all' ? '2px solid #0a2540' : '1px solid #cbd5e1',
                backgroundColor: activeTab === 'all' ? '#0a2540' : '#ffffff',
                color: activeTab === 'all' ? '#ffffff' : '#334155',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              🌐 All Language Centres
            </button>

            <button
              onClick={() => setActiveTab('english')}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                border: activeTab === 'english' ? '2px solid #e31c23' : '1px solid #cbd5e1',
                backgroundColor: activeTab === 'english' ? '#fff5f5' : '#ffffff',
                color: activeTab === 'english' ? '#e31c23' : '#334155',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🇬🇧</span> English Language Centre
            </button>

            <button
              onClick={() => setActiveTab('french')}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                border: activeTab === 'french' ? '2px solid #1d4ed8' : '1px solid #cbd5e1',
                backgroundColor: activeTab === 'french' ? '#eff6ff' : '#ffffff',
                color: activeTab === 'french' ? '#1d4ed8' : '#334155',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🇫🇷</span> French Language Centre
            </button>

            <button
              onClick={() => setActiveTab('japanese')}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                border: activeTab === 'japanese' ? '2px solid #dc2626' : '1px solid #cbd5e1',
                backgroundColor: activeTab === 'japanese' ? '#fef2f2' : '#ffffff',
                color: activeTab === 'japanese' ? '#dc2626' : '#334155',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🇯🇵</span> Japanese Language Centre
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {visibleCentres.map((centre) => (
            <div 
              key={centre.id} 
              id={`lang-${centre.id}`}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(10, 37, 64, 0.06)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Centre Card Top Header */}
              <div style={{
                padding: '1.75rem 2rem',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{centre.flag}</span>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: centre.colorAccent, fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                      <Sparkles size={14} />
                      {centre.badge}
                    </div>
                    <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0a2540', margin: 0 }}>
                      {centre.name}
                    </h2>
                  </div>
                </div>

                {/* Direct Action Enquire */}
                <button
                  onClick={() => handleEnquire(centre.courseId)}
                  className="btn"
                  style={{
                    backgroundColor: '#e31c23',
                    color: '#ffffff',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(227, 28, 35, 0.25)'
                  }}
                >
                  <span>Enquire Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Centre Body Details */}
              <div style={{ padding: '2rem' }}>
                {/* Official Lead Statement */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderLeft: `4px solid ${centre.colorAccent}`,
                  padding: '1.15rem 1.5rem',
                  borderRadius: '0 8px 8px 0',
                  marginBottom: '2rem'
                }}>
                  <p style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                    {centre.lead}
                  </p>
                </div>

                {/* Detailed 3-Box Attribute Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {/* 1. Target Audience */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                      <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.45rem', borderRadius: '8px', display: 'flex' }}>
                        <Users size={20} />
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0a2540' }}>
                        Target Audience
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                      {centre.targetAudience}
                    </p>
                  </div>

                  {/* 2. Focus */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                      <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.45rem', borderRadius: '8px', display: 'flex' }}>
                        <BookOpen size={20} />
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0a2540' }}>
                        Curriculum Focus
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                      {centre.focus}
                    </p>
                  </div>

                  {/* 3. Exam Preparation */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                      <div style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '0.45rem', borderRadius: '8px', display: 'flex' }}>
                        <Award size={20} />
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0a2540' }}>
                        Exam Preparation
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                      {centre.examPrep}
                    </p>
                  </div>
                </div>

                {/* Specialized Tracks & Modules */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GraduationCap size={18} color="#e31c23" />
                    Specialized Program Tracks
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1rem'
                  }}>
                    {centre.tracks.map((track, i) => (
                      <div key={i} style={{
                        backgroundColor: '#f8fafc',
                        padding: '1.15rem',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ fontWeight: 700, color: '#0a2540', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                          {track.title}
                        </div>
                        <div style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.45 }}>
                          {track.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pedagogy & Methodology Highlights */}
                <div style={{
                  backgroundColor: '#f1f5f9',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Key Centre Advantages & Delivery Methods
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {centre.keyHighlights.map((hl, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.87rem', color: '#334155', lineHeight: 1.45 }}>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Options & Action Footer */}
                <div style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Available Modes:</span>
                    {centre.deliveryModes.map((dm, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.8rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        fontWeight: 600,
                        color: '#334155'
                      }}>
                        {dm}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <a
                      href={`https://wa.me/94773447878?text=Hello%20Gatwick%20College%2C%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(centre.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{
                        backgroundColor: '#25D366',
                        color: '#ffffff',
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <WhatsAppIcon size={16} color="#ffffff" />
                      <span>WhatsApp Consult</span>
                    </a>

                    <button
                      onClick={() => handleEnquire(centre.courseId)}
                      className="btn"
                      style={{
                        backgroundColor: '#0a2540',
                        color: '#ffffff',
                        padding: '0.55rem 1.15rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <span>Apply / Inquiry</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Why Choose Gatwick Language School Banner ──────────────────────── */}
        <section style={{
          marginTop: '3.5rem',
          backgroundColor: '#0a2540',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          boxShadow: '0 12px 35px rgba(10, 37, 64, 0.15)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Distinctive Pedagogy
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.35rem 0 0.75rem 0', color: '#ffffff' }}>
              Why Study at Gatwick Language School?
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Whether you are preparing for international university migration, seeking overseas employment, or aiming for school examination excellence, our dedicated language faculty deliver certified outcomes.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ color: '#e31c23', marginBottom: '0.75rem' }}>
                <Sparkles size={26} />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Native & Certified Faculty</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                Learn with authentic pronunciation, linguistic subtleties, and cultural immersion led by native English and certified multilingual educators.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ color: '#2ea3f2', marginBottom: '0.75rem' }}>
                <Award size={26} />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Official Exam Readiness</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                Rigorous preparation for IELTS, PTE Academic, DELF/DALF, TEF/TCF, and JLPT with test-taking techniques and simulated mock tests.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ color: '#22c55e', marginBottom: '0.75rem' }}>
                <Compass size={26} />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Migration & Career Pathways</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                Tailored language training designed to satisfy immigration visa point systems for Canada, the UK, Australia, Europe, and Japan.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ color: '#f59e0b', marginBottom: '0.75rem' }}>
                <Users size={26} />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Small Interactive Batches</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                Limited cohort sizes guarantee personalized instructor attention, individual speech evaluation, and comprehensive speaking feedback.
              </p>
            </div>
          </div>

          {/* Bottom Consultation Box */}
          <div style={{
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                Ready to begin your language journey?
              </div>
              <div style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                Speak with our language academic advisors to choose the right batch and schedule.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/94773447878?text=Hello%20Gatwick%20College%2C%20I%20would%20like%20to%20inquire%20about%20your%20Language%20School%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  padding: '0.7rem 1.35rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <WhatsAppIcon size={18} color="#ffffff" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => handleEnquire('lang-general')}
                className="btn"
                style={{
                  backgroundColor: '#e31c23',
                  color: '#ffffff',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Submit Admission Inquiry</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
