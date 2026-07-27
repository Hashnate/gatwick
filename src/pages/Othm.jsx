import React, { useState } from 'react';
import { 
  Award, CheckCircle, BookOpen, Clock, ArrowRight, ShieldCheck, 
  ChevronRight, ExternalLink, GraduationCap, FileText, Globe, Layers, UserCheck 
} from 'lucide-react';

export default function Othm({ setCurrentPage, setSelectedEnquiryCourse, onOpenPartnerModal }) {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const othmCourses = [
    // Level 3
    {
      id: 'othm-l3-hes',
      title: 'OTHM Level 3 Foundation Diploma in Higher Education Studies',
      level: 'Level 3',
      levelTag: 'University Access / Foundation',
      duration: '6 Months',
      credits: '60 RQF Credits',
      mode: 'On-Campus / Distance',
      ofqualNum: '603/5223/8',
      summary: 'Provides direct entry into Level 4 undergraduate diploma programs for O/L or A/L students needing academic foundation.',
      modules: ['Academic English & Study Skills', 'Foundation Mathematics', 'Introduction to Business & Management', 'IT & Digital Literacy']
    },
    {
      id: 'othm-l3-bs',
      title: 'OTHM Level 3 Diploma in Business Studies',
      level: 'Level 3',
      levelTag: 'University Access / Foundation',
      duration: '6 Months',
      credits: '60 RQF Credits',
      mode: 'On-Campus / Hybrid',
      ofqualNum: '603/2171/4',
      summary: 'Essential foundation bridging core business principles, management concepts, and professional communication skills.',
      modules: ['Business Environment', 'Introduction to Marketing', 'Human Resource Essentials', 'Business Communication']
    },
    {
      id: 'othm-l3-bit',
      title: 'OTHM Level 3 Diploma in Information Technology',
      level: 'Level 3',
      levelTag: 'University Access / Foundation',
      duration: '6 Months',
      credits: '60 RQF Credits',
      mode: 'On-Campus / Hybrid',
      ofqualNum: '603/5224/0',
      summary: 'Essential foundation bridging computing fundamentals, software principles, and digital literacy skills.',
      modules: ['Fundamentals of Computing', 'Web Design Basics', 'Software Applications', 'Professional IT Skills']
    },

    // Level 4 & 5
    {
      id: 'othm-l45-bm',
      title: 'OTHM Level 4 & 5 Extended Diploma in Business Management',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Hybrid / Distance',
      ofqualNum: '603/3329/7 & 603/3330/3',
      summary: 'Direct equivalent to the first two years of a UK Bachelor (BBA/BA) degree in Business Management.',
      modules: ['Business Environment', 'Marketing Essentials', 'Human Resource Management', 'Financial Accounting', 'Strategic Management', 'Business Operations']
    },
    {
      id: 'othm-l45-it',
      title: 'OTHM Level 4 & 5 Extended Diploma in Information Technology & Cyber Security',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Hybrid / Distance',
      ofqualNum: '603/4722/X & 603/4723/1',
      summary: 'Comprehensive computing diploma covering software engineering, database design, networking, and cyber defense.',
      modules: ['Cyber Security Fundamentals', 'Software Programming', 'Database Systems', 'Network Engineering', 'Web Development', 'IT Project Management']
    },
    {
      id: 'othm-l45-thm',
      title: 'OTHM Level 4 & 5 Diploma in Tourism & Hospitality Management',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Hybrid',
      ofqualNum: '603/4987/2 & 603/4988/4',
      summary: 'Industry-oriented management program for global careers in luxury hotel, resort, and event management.',
      modules: ['Contemporary Hospitality Operations', 'Customer Relationship Management', 'Tourism Planning', 'Event Management', 'Hospitality Finance']
    },
    {
      id: 'othm-l45-af',
      title: 'OTHM Level 4 & 5 Diploma in Accounting & Finance',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Hybrid / Distance',
      ofqualNum: '603/4523/4 & 603/4524/6',
      summary: 'Specialized accounting qualification providing exemptions toward ACCA and UK accounting degree top-ups.',
      modules: ['Financial Accounting', 'Management Accounting', 'Corporate Finance', 'Taxation Principles', 'Auditing & Assurance']
    },
    {
      id: 'othm-l45-hsc',
      title: 'OTHM Level 4 & 5 Diploma in Health & Social Care Management',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Distance',
      ofqualNum: '603/5155/6 & 603/5156/8',
      summary: 'Prepares healthcare professionals and administrators for leadership roles in public and private health sectors.',
      modules: ['Promoting Health in Society', 'Healthcare Policy & Practice', 'Managing Resources in Health Care', 'Leadership in Social Care']
    },
    {
      id: 'othm-l45-psy',
      title: 'OTHM Level 4 & 5 Diploma in Applied Psychology & Counselling',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Hybrid',
      ofqualNum: '603/6122/7',
      summary: 'Detailed study of psychological theories, human behavior, developmental psychology, and therapeutic counselling techniques.',
      modules: ['Developmental Psychology', 'Cognitive Psychology', 'Counselling Skills & Ethics', 'Social Psychology', 'Research Methods']
    },
    {
      id: 'othm-l45-scm',
      title: 'OTHM Level 4 & 5 Diploma in Logistics & Supply Chain Management',
      level: 'Level 4 & 5',
      levelTag: 'Undergraduate Diploma (Year 1 & 2 HND)',
      duration: '18 - 24 Months',
      credits: '240 RQF Credits',
      mode: 'On-Campus / Distance',
      ofqualNum: '603/5660/8',
      summary: 'Prepares students for global careers in procurement, inventory control, freight management, and international trade logistics.',
      modules: ['Supply Chain Principles', 'Logistics Management', 'Procurement Strategies', 'Inventory & Operations Management']
    },

    // Level 6
    {
      id: 'othm-l6-bm',
      title: 'OTHM Level 6 Graduate Diploma in Business Management',
      level: 'Level 6',
      levelTag: 'Graduate Diploma (Final Year Equivalent)',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'On-Campus / Hybrid / Distance',
      ofqualNum: '603/3331/5',
      summary: 'Equivalent to the final year of a UK Bachelor degree, granting direct access to Master/MBA programs.',
      modules: ['Leadership & Strategic Change', 'Global Business Strategy', 'Corporate Governance & Ethics', 'Research Project']
    },
    {
      id: 'othm-l6-it',
      title: 'OTHM Level 6 Graduate Diploma in Information Technology',
      level: 'Level 6',
      levelTag: 'Graduate Diploma (Final Year Equivalent)',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'On-Campus / Distance',
      ofqualNum: '603/4724/3',
      summary: 'Advanced computer science & system architecture qualification for senior software developers and system managers.',
      modules: ['Advanced Software Engineering', 'Cloud Computing Architecture', 'Enterprise Systems', 'IT Capstone Research']
    },
    {
      id: 'othm-l6-hsc',
      title: 'OTHM Level 6 Graduate Diploma in Health & Social Care Management',
      level: 'Level 6',
      levelTag: 'Graduate Diploma (Final Year Equivalent)',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'On-Campus / Distance',
      ofqualNum: '603/5157/X',
      summary: 'Strategic health system management qualification for senior nursing staff, health officers, and social service administrators.',
      modules: ['Strategic Health Management', 'Public Health Policy', 'Quality Assurance in Care', 'Healthcare Leadership']
    },

    // Level 7
    {
      id: 'othm-l7-sml',
      title: 'OTHM Level 7 Postgraduate Diploma in Strategic Management & Leadership',
      level: 'Level 7',
      levelTag: 'Postgraduate / Master Coursework Level',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'Hybrid / Distance',
      ofqualNum: '603/5090/4',
      summary: 'Postgraduate qualification allowing direct entry to MBA top-up thesis at UK partner universities (e.g. Chichester, Portsmouth).',
      modules: ['Strategic Management', 'Strategic Leadership', 'Strategic HR Management', 'Advanced Business Research', 'Strategic Financial Management']
    },
    {
      id: 'othm-l7-pm',
      title: 'OTHM Level 7 Postgraduate Diploma in Project Management',
      level: 'Level 7',
      levelTag: 'Postgraduate / Master Coursework Level',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'Hybrid / Distance',
      ofqualNum: '603/5661/X',
      summary: 'Designed for project directors and engineering managers seeking advanced UK postgraduate credentials.',
      modules: ['Planning & Governance', 'Risk & Quality Management', 'Agile Project Leadership', 'Research Methods for Project Managers']
    },
    {
      id: 'othm-l7-hrm',
      title: 'OTHM Level 7 Postgraduate Diploma in Human Resource Management',
      level: 'Level 7',
      levelTag: 'Postgraduate / Master Coursework Level',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'Hybrid / Distance',
      ofqualNum: '603/5091/6',
      summary: 'Advanced HR qualification focusing on organizational development, talent strategy, and strategic employee relations.',
      modules: ['Strategic HR Development', 'Talent Management Strategy', 'Employment Law', 'Performance Management Systems']
    },
    {
      id: 'othm-l7-cs',
      title: 'OTHM Level 7 Postgraduate Diploma in Cyber Security',
      level: 'Level 7',
      levelTag: 'Postgraduate / Master Coursework Level',
      duration: '12 Months',
      credits: '120 RQF Credits',
      mode: 'Hybrid / Distance',
      ofqualNum: '603/5662/1',
      summary: 'Master-level qualification for information security officers covering threat intelligence, cryptography, and digital forensics.',
      modules: ['Information Security Governance', 'Cyber Threat Intelligence', 'Digital Forensics', 'Security Risk Assessment']
    }
  ];

  const filteredCourses = selectedLevel === 'all' 
    ? othmCourses 
    : othmCourses.filter(c => c.level.includes(selectedLevel));

  const handleApplyClick = (courseTitle) => {
    setSelectedEnquiryCourse(courseTitle);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. Page Hero - Dark Blue Section with Official OTHM UK Website Background Image */}
      <section style={{ 
        backgroundImage: 'url("assets/othm_header_bg.png?v=6")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff', 
        padding: '6.5rem 0 6rem 0',
        minHeight: '460px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        imageRendering: '-webkit-optimize-contrast'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '850px' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '0.45rem 1.1rem', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', marginBottom: '1.25rem' }}>
              <img src="assets/partner_othm.png" alt="OTHM UK Official Logo" style={{ height: '28px', width: 'auto', display: 'block' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Regulated UK Awarding Organization
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 900, 
              color: '#ffffff', 
              lineHeight: 1.15, 
              marginBottom: '1.1rem', 
              letterSpacing: '-0.02em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
            }}>
              OTHM Qualifications (UK) Hub
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#cbd5e1', 
              lineHeight: 1.65, 
              marginBottom: '2.25rem',
              textShadow: '0 1px 5px rgba(0, 0, 0, 0.6)'
            }}>
              Earn globally recognized British diplomas from <strong>RQF Level 3 to Level 7</strong> at Gatwick College Sri Lanka. 
              Enjoy 100% assignment-based assessment with direct top-up pathways to final-year Bachelor&apos;s and Master&apos;s degrees at top UK, Australian, and Canadian universities.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.6rem 1.1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.85rem', backdropFilter: 'blur(4px)' }}>
                <ShieldCheck size={16} style={{ color: '#38bdf8' }} />
                <span>Ofqual Regulated: <strong>RN5244</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.6rem 1.1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.85rem', backdropFilter: 'blur(4px)' }}>
                <CheckCircle size={16} style={{ color: '#4ade80' }} />
                <span>100% Coursework & Assignments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.6rem 1.1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.85rem', backdropFilter: 'blur(4px)' }}>
                <Globe size={16} style={{ color: '#f43f5e' }} />
                <span>WES Approved Equivalence</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href="https://othm.org.uk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.5rem', fontSize: '0.92rem' }}
              >
                Visit Official OTHM UK Site <ExternalLink size={16} />
              </a>
              <button
                onClick={onOpenPartnerModal}
                className="btn btn-secondary"
                style={{ gap: '0.5rem', padding: '0.8rem 1.5rem', fontSize: '0.92rem', backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)' }}
              >
                <Award size={16} /> Check UK Verification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OTHM Level Framework Selector */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '3rem 0 2rem 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="title-medium" style={{ margin: 0 }}>Explore OTHM Qualification Levels</h2>
            <p className="subtitle" style={{ marginTop: '0.5rem' }}>Filter courses by your current academic or professional entry point</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All OTHM Courses' },
              { id: 'Level 3', label: 'Level 3 (Foundation)' },
              { id: 'Level 4 & 5', label: 'Level 4 & 5 (Undergraduate)' },
              { id: 'Level 6', label: 'Level 6 (Graduate)' },
              { id: 'Level 7', label: 'Level 7 (Postgraduate)' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setSelectedLevel(btn.id)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: selectedLevel === btn.id ? '2px solid #e31c23' : '1px solid #cbd5e1',
                  backgroundColor: selectedLevel === btn.id ? '#e31c23' : '#ffffff',
                  color: selectedLevel === btn.id ? '#ffffff' : '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedLevel === btn.id ? '0 4px 12px rgba(227, 28, 35, 0.25)' : 'none'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OTHM Courses Directory Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="program-card-hover"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      backgroundColor: '#0f172a', 
                      color: '#ffffff', 
                      fontWeight: 800, 
                      fontSize: '0.72rem', 
                      padding: '0.3rem 0.65rem', 
                      borderRadius: '6px',
                      letterSpacing: '0.05em'
                    }}>
                      {course.level}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      Ofqual: {course.ofqualNum}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {course.summary}
                  </p>

                  <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                      Key Modules Covered:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {course.modules.map((m, idx) => (
                        <span key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="course-meta" style={{ marginBottom: '1.25rem' }}>
                    <div className="course-meta-item">
                      <Clock size={14} style={{ color: '#e31c23' }} /> <span>{course.duration}</span>
                    </div>
                    <div className="course-meta-item">
                      <BookOpen size={14} style={{ color: '#2563eb' }} /> <span>{course.credits}</span>
                    </div>
                    <div className="course-meta-item">
                      <Globe size={14} style={{ color: '#16a34a' }} /> <span>{course.mode}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleApplyClick(course.title)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                  >
                    Enquire / Apply for Course <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OTHM Degree Progression Pathway */}
      <section className="section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#e31c23', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Direct Degree Progression
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 0.75rem 0' }}>How OTHM Qualifications Work</h2>
            <p className="subtitle">From diploma enrollment to final-year UK Bachelor&apos;s or Master&apos;s degree completion</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Enroll at GCBT Sri Lanka</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Begin your OTHM Level 4 & 5 Extended Diploma in Colombo, Kandy, or online with flexible payment plans.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e31c23', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Complete Assignments</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Submit practical assignments & project reports assessed directly under Ofqual quality benchmarks. No written exams.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Receive Official Transcripts</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Receive verified OTHM diploma certificates & 240 RQF credits recognized worldwide.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                4
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Top-Up to UK Degree</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Enter directly into the final year (BSc / BA / MBA) at top UK universities on campus or remotely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
