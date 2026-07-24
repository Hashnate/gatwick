import React from 'react';
import { Award, Target, BookOpen, Compass, ShieldCheck, Users } from 'lucide-react';

export default function About({ onOpenPartnerModal }) {
  const leaders = [
    {
      name: "Mr. Muzakkir",
      initial: "M",
      role: "Managing Director & CEO",
      desc: "Directs strategic growth, institutional governance, and international UK academic partnerships across Sri Lanka campuses."
    },
    {
      name: "Sir Zamrin Zarook",
      initial: "Z",
      role: "Head of Psychology & Senior Lecturer",
      desc: "Leads the School of Psychology & Teacher Training. Renowned educator guiding UK Ofqual higher education diploma students."
    },
    {
      name: "Mrs. Shazna Nazeer",
      initial: "S",
      role: "Registrar & Director of Student Affairs",
      desc: "Directs student registry operations, UK awarding body compliance, and multi-campus enrollment services."
    },
    {
      name: "Dr. Richard Hamilton",
      initial: "H",
      role: "Chairman of Academic Advisory Council",
      desc: "Oversees UK curriculum alignment, quality assurance audits, and British university credit progression pathways."
    }
  ];

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

      {/* College Leadership & Academic Council Staff */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Council & Faculty
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 0.5rem 0' }}>College Leadership & Staff</h2>
            <p style={{ color: '#475569', maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem' }}>
              Our executive council, UK-qualified senior lecturers, registry officers, and campus directors leading Gatwick College of Business & Technology.
            </p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '1.25rem', boxShadow: '0 12px 32px rgba(10, 37, 64, 0.06)' }}>
            <img 
              src="assets/academic_council.jpg" 
              alt="Gatwick College Academic Council & Faculty Leadership Board" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/hero_campus.png';
              }}
              style={{ borderRadius: '14px', width: '100%', height: 'auto', display: 'block' }} 
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0a2540', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={18} style={{ color: '#e31c23' }} /> Gatwick College Academic Council & Faculty Leadership Board
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

