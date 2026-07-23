import React from 'react';
import { Award, Target, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export default function About({ onOpenPartnerModal }) {
  const leaders = [
    {
      name: "Dr. Richard Hamilton",
      role: "Dean of Academics",
      desc: "PhD in Education from the University of London. Oversees curriculum alignment and UK validation audits."
    },
    {
      name: "Mr. Muzakkir Buytoday",
      role: "Managing Director",
      desc: "Chartered Administrator with over 15 years in international education management. Directs strategic growth."
    },
    {
      name: "Mrs. Shazna Nazeer",
      role: "Registrar & Student Affairs",
      desc: "Directs enrollment procedures, partner compliance operations, and multi-campus registry coordination."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="section-navy" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Established Excellence
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0' }}>About Our Institution</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Academic Heritage
              </span>
              <h2 className="title-medium" style={{ marginTop: '0.25rem' }}>Our Story & Mission</h2>
              <p style={{ color: '#475569', marginBottom: '1.25rem' }}>
                Gatwick College of Business and Technology (GCBT) was founded to bridge the gap between affordable local education and highly valued British university degrees. We operate as a premier regulated delivery center in Sri Lanka, enabling students to gain qualifications certified under the UK Regulated Qualifications Framework (RQF).
              </p>
              <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                Through robust partnerships with regulated awarding bodies such as OTHM and NCC Education, our graduates gain qualifications that bypass traditional credit boundaries, enabling them to complete their final degrees at leading institutions in the UK, Australia, and Canada.
              </p>

              <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <Target size={18} style={{ color: '#e31c23' }} /> Vision
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                    To be the leading hub for regulated transnational education in South Asia, cultivating globally employable professionals.
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0a2540', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <Compass size={18} style={{ color: '#e31c23' }} /> Mission
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                    To deliver affordable, structured, and flexible British qualifications in an environment that inspires excellence and integrity.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img src="assets/hero_campus.png" alt="GCBT lecture hall" style={{ borderRadius: '12px', width: '100%', height: '380px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
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

      {/* Leadership Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Council
            </span>
            <h2 className="title-medium">College Leadership</h2>
          </div>

          <div className="grid-3">
            {leaders.map((leader, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '2rem', 
                  border: '1px solid #e2e8f0', 
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#0a2540',
                  color: '#e31c23',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  margin: '0 auto 1.25rem'
                }}>
                  {leader.name.split(' ').pop().charAt(0)}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{leader.name}</h3>
                <span style={{ fontSize: '0.85rem', color: '#e31c23', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                  {leader.role}
                </span>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                  {leader.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

