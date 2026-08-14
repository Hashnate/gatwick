import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  Users, 
  Lock, 
  BookOpen, 
  CheckCircle2 
} from 'lucide-react';

export default function Policies() {
  const categories = [
    {
      id: 1,
      title: "1. Academic Integrity & Quality Management",
      icon: <ShieldCheck size={24} style={{ color: '#e31c23' }} />,
      policies: [
        {
          name: "Malpractice, Maladministration, and Plagiarism Policy",
          description: "Defines clear procedures for identifying, reporting, investigating, and sanctioning instances of academic dishonesty (such as plagiarism, cheating, or collusion) as well as administrative non-compliance by staff or learners."
        },
        {
          name: "Conflicts of Interest Policy",
          description: "Establishes mechanisms to identify, log, monitor, and mitigate potential or actual conflicts of interest among assessors, internal quality assurers (IQAs), administrators, and management."
        },
        {
          name: "Staff Development Policy",
          description: "Outlines requirements for continuous professional development (CPD), industry currency, and regular training for teaching, assessment, and internal verification staff."
        },
        {
          name: "Risk Management & Adverse Effect Policy",
          description: "Mandates processes to identify, monitor, and notify awarding organizations and Ofqual of events that could potentially disrupt delivery, harm learners, or undermine qualification integrity."
        },
        {
          name: "Whistleblowing Policy",
          description: "Provides a safe, confidential channel for staff, learners, and external stakeholders to report illegal practices, regulatory non-compliance, or systemic operational failures."
        }
      ]
    },
    {
      id: 2,
      title: "2. Admissions, Delivery & Learner Experience",
      icon: <GraduationCap size={24} style={{ color: '#e31c23' }} />,
      policies: [
        {
          name: "Learner Recruitment and Admissions Policy",
          description: "Ensures fair, transparent, and non-discriminatory admission criteria, entry requirements evaluation, and guidance for prospective students."
        },
        {
          name: "Blended and Distance Learning Policy",
          description: "Governs the delivery standards, online learning platform management, virtual student engagement, remote monitoring, and support structures for non-traditional learning modes."
        },
        {
          name: "Recognition of Prior Learning (RPL) & Credit Transfer Policy",
          description: "Outlines the formal criteria and processes for assessing, verifying, and awarding credit for a learner’s prior formal, non-formal, or experiential learning."
        }
      ]
    },
    {
      id: 3,
      title: "3. Assessment, Moderation & Certification",
      icon: <Award size={24} style={{ color: '#e31c23' }} />,
      policies: [
        {
          name: "Assessment & Internal Quality Assurance (IQA) Policy",
          description: "Sets standardized protocols for fair, valid, and reliable assessment design, internal verification/moderation, sampling, and standardization across all assessors."
        },
        {
          name: "Reasonable Adjustments and Special Considerations Policy",
          description: "Outlines arrangements to accommodate learners with specific learning needs, disabilities, or temporary adverse circumstances without compromising assessment standards."
        },
        {
          name: "Direct Claims Status (DCS) & Certification Policy",
          description: "Regulates procedures for claiming certificates from awarding bodies, managing internal sign-offs, and protecting certification integrity."
        }
      ]
    },
    {
      id: 4,
      title: "4. Student Rights, Safeguarding & Welfare",
      icon: <Users size={24} style={{ color: '#e31c23' }} />,
      policies: [
        {
          name: "Equality, Diversity, and Inclusion (EDI) Policy",
          description: "Guarantees equal access to learning and assessment opportunities, actively preventing discrimination across protected characteristics in compliance with equalities legislation."
        },
        {
          name: "Appeals and Complaints Policy",
          description: "A combined, transparent framework providing structured, multi-stage procedures for learners to lodge general complaints or appeal against internal assessment decisions and grading outcomes."
        },
        {
          name: "Health and Safety Policy",
          description: "Establishes standards and procedures to ensure a safe, secure physical and digital environment for learners, staff, and campus visitors."
        },
        {
          name: "Safeguarding and Prevent Policy",
          description: "Outlines operational measures to protect young learners and vulnerable adults from harm, abuse, neglect, or radicalization."
        }
      ]
    },
    {
      id: 5,
      title: "5. Information Security, Data & Governance",
      icon: <Lock size={24} style={{ color: '#e31c23' }} />,
      policies: [
        {
          name: "Data Protection & Privacy Policy (GDPR Compliance)",
          description: "Governs how personal data belonging to learners, staff, and external stakeholders is legally collected, processed, used, and protected."
        },
        {
          name: "Documentation Retention and Secure Storage Policy",
          description: "Defines strict timeframes and physical/digital security controls for storing assessment evidence, learner records, grades, and administrative data securely."
        },
        {
          name: "Confidentiality and Assessment Material Security Policy",
          description: "Ensures secure storage, handling, transmission, and disposal of confidential examination papers, assignment briefs, and sensitive student files."
        },
        {
          name: "Information & Marketing Accuracy Policy",
          description: "Ensures all public marketing material, website details, fee structures, and regulatory status claims are clear, accurate, and compliant."
        },
        {
          name: "Qualification Withdrawal Policy",
          description: "Establishes emergency and planned operational steps to safeguard enrolled learners' progression if a program or delivery center approval is phased out."
        }
      ]
    }
  ];

  return (
    <div>
      {/* Standalone Page Header */}
      <section className="section-page-header" style={{ padding: '4rem 0 3rem 0', textAlign: 'center', backgroundColor: '#0a192f', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
            Institutional Governance & Compliance
          </span>
          <h1 className="title-medium" style={{ margin: '0.25rem 0 0.75rem', color: '#ffffff', fontSize: '2.5rem', fontWeight: 800 }}>
            College Policies & Regulatory Framework
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: '1.5', fontWeight: 500 }}>
            Commitment to Academic Excellence, Quality Assurance, and Regulatory Integrity
          </p>
        </div>
      </section>

      {/* Main Policies Content */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Welcome Hub Overview */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '16px', 
            padding: '2.5rem', 
            marginBottom: '3rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <BookOpen size={22} style={{ color: '#e31c23' }} />
              Welcome to the Policies & Governance Hub
            </h2>
            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              As an approved delivery center committed to maintaining the highest standards of international education and Ofqual-regulated qualifications, Gatwick College of Business and Technology (GCBT) operates under a robust framework of policies designed to ensure transparency, fairness, and academic rigor.
            </p>
            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.65', margin: 0 }}>
              These policies govern our everyday practices—from learner admissions and curriculum delivery to assessment standards, student support, and data privacy—safeguarding the rights and well-being of our students, staff, and stakeholders. Whether you are studying on-campus or via our blended and distance learning platforms, our comprehensive regulatory guidelines ensure that your educational journey meets recognized global benchmarks of quality and accountability.
            </p>
          </div>

          {/* Policy Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '2rem', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', marginBottom: '1.5rem' }}>
                  {cat.icon}
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0a2540', margin: 0 }}>
                    {cat.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cat.policies.map((pol, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        padding: '1.25rem', 
                        borderRadius: '10px', 
                        backgroundColor: '#f8fafc',
                        borderLeft: '4px solid #e31c23',
                        transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                      }}
                    >
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={16} style={{ color: '#e31c23', flexShrink: 0 }} />
                        {pol.name}
                      </h3>
                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                        {pol.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
