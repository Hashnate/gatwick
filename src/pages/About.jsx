import React, { useState } from 'react';
import { Award, Target, BookOpen, Compass, ShieldCheck, Users, GraduationCap, Briefcase, Phone, Mail, Search } from 'lucide-react';
import { facultyStaff } from '../data';

export default function About({ onOpenPartnerModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredFaculty = facultyStaff.filter(item => {
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

  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '3rem 0 2rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Established Excellence
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0', color: '#0a2540' }}>About Our Institution</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          {/* Top Row: Story Text & Vision/Mission Cards */}
          <div className="grid-2" style={{ alignItems: 'stretch', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Academic Heritage
                </span>
                <h2 className="title-medium" style={{ marginTop: '0.25rem', marginBottom: '1.25rem' }}>Our Story & Mission</h2>
                <p style={{ color: '#475569', marginBottom: '1.25rem', fontSize: '1rem', lineHeight: '1.6' }}>
                  Gatwick College of Business and Technology (GCBT) was founded to bridge the gap between affordable local education and highly valued British university degrees. We operate as a premier regulated delivery center in Sri Lanka, enabling students to gain qualifications certified under the UK Regulated Qualifications Framework (RQF).
                </p>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                  Through robust partnerships with regulated awarding bodies such as OTHM and NCC Education, our graduates gain qualifications that bypass traditional credit boundaries, enabling them to complete their final degrees at leading institutions in the UK, Australia, and Canada.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
              {/* Vision Card */}
              <div style={{ flex: 1, background: '#f8fafc', padding: '1.6rem', borderRadius: '14px', borderLeft: '4px solid #e31c23', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <Target size={20} style={{ color: '#e31c23' }} /> Our Vision
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: '1.55' }}>
                  To be the leading hub for regulated transnational education in South Asia, cultivating globally employable professionals.
                </p>
              </div>

              {/* Mission Card */}
              <div style={{ flex: 1, background: '#f8fafc', padding: '1.6rem', borderRadius: '14px', borderLeft: '4px solid #0a2540', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <Compass size={20} style={{ color: '#e31c23' }} /> Our Mission
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: '1.55' }}>
                  To deliver affordable, structured, and flexible British qualifications in an environment that inspires excellence and integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Feature Banner: Full-Width Academic Council Photo */}
          <div>
            <img 
              src="assets/academic_council.jpg" 
              alt="Gatwick College Academic Council & Faculty Leadership Board" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/hero_campus.png';
              }}
              style={{ borderRadius: '20px', width: '100%', height: 'auto', display: 'block', boxShadow: '0 12px 32px rgba(10, 37, 64, 0.08)' }} 
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0a2540', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={16} style={{ color: '#e31c23' }} /> Gatwick College Academic Council & Leadership Board
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gatwick Group & Accreditation */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Governance & Frameworks
            </span>
            <h2 className="title-medium">Gatwick Group & Accreditation</h2>
            <p style={{ color: '#475569', maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem' }}>
              Unlike simple tuition centres, GCBT is governed under a strict quality management system audited by UK regulators. Click below to inspect our specific awarding frameworks.
            </p>
          </div>

          <div className="grid-3" style={{ marginBottom: '3rem' }}>
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#e31c23', marginBottom: '1rem' }}><Award size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Ofqual Regulatory Audits</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                All curricular syllabi, exam boards, and grading systems are regulated by the UK government's Office of Qualifications and Examinations Regulation (Ofqual).
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#e31c23', marginBottom: '1rem' }}><ShieldCheck size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Credit Equivalence (ECTS/RQF)</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                Qualifications mapped under the UK Regulated Qualifications Framework (RQF) align with the European Credit Transfer System (ECTS) for seamless global transfers.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#e31c23', marginBottom: '1rem' }}><BookOpen size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>University Progressions</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                GCBT graduates gain direct access to complete 'Top-up' bachelor's and master's degree programs at accredited international universities.
              </p>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            padding: '2.5rem', 
            border: '1px solid #e2e8f0', 
            textAlign: 'center' 
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



      {/* Faculty & Lecturer Directory */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Faculty & Lecturers
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 0.5rem 0' }}>Faculty & Staff Directory</h2>
            <p style={{ color: '#475569', maxWidth: '750px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Meet our UK-qualified academic lecturers, department specialists, and education facilitators across Gatwick College programs.
            </p>
          </div>

          {/* Search & Department Filters */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            {/* Search Input */}
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
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s ease'
                }}
              />
            </div>

            {/* Category Filter Pills */}
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
                    border: selectedDept === dept ? '1px solid #e31c23' : '1px solid #cbd5e1',
                    backgroundColor: selectedDept === dept ? '#e31c23' : '#ffffff',
                    color: selectedDept === dept ? '#ffffff' : '#475569',
                    cursor: 'pointer',
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
              <div 
                key={staff.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: '0 4px 16px rgba(10, 37, 64, 0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  {/* Photo or Initials Avatar Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.1rem' }}>
                    {staff.image ? (
                      <img 
                        src={staff.image} 
                        alt={staff.name} 
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #e31c23',
                          boxShadow: '0 4px 12px rgba(10, 37, 64, 0.12)',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#0a2540',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        boxShadow: '0 4px 12px rgba(10, 37, 64, 0.12)',
                        flexShrink: 0
                      }}>
                        {staff.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                    )}

                    <div>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        color: '#e31c23', 
                        backgroundColor: '#fff1f2', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '20px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.04em',
                        display: 'inline-block',
                        marginBottom: '0.35rem' 
                      }}>
                        {staff.program}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0a2540', margin: 0, lineHeight: '1.3' }}>
                        {staff.name}
                      </h3>
                    </div>
                  </div>

                  {/* Academic Qualifications */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem', color: '#475569', fontSize: '0.85rem', lineHeight: '1.45' }}>
                    <GraduationCap size={16} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.15rem' }} />
                    <span><strong>Qualifications:</strong> {staff.qualifications}</span>
                  </div>

                  {/* Areas of Expertise */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', color: '#475569', fontSize: '0.85rem', lineHeight: '1.45' }}>
                    <Briefcase size={16} style={{ color: '#0a2540', flexShrink: 0, marginTop: '0.15rem' }} />
                    <span><strong>Expertise:</strong> {staff.expertise}</span>
                  </div>
                </div>

                {/* Contact Footer */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <a 
                    href={`tel:${staff.mobile.replace(/\s+/g, '')}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#0a2540', fontWeight: 600, textDecoration: 'none' }}
                  >
                    <Phone size={14} style={{ color: '#e31c23', flexShrink: 0 }} />
                    <span>{staff.mobile}</span>
                  </a>
                  <a 
                    href={`mailto:${staff.email}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#64748b', textDecoration: 'none', wordBreak: 'break-all' }}
                  >
                    <Mail size={14} style={{ color: '#e31c23', flexShrink: 0 }} />
                    <span>{staff.email}</span>
                  </a>
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
      </section>
    </div>
  );
}

