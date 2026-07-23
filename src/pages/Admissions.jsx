import React, { useState } from 'react';
import { faqs } from '../data';
import { ChevronDown, FileText, CheckSquare, BadgeInfo, CreditCard } from 'lucide-react';

export default function Admissions() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const toggleFaq = (idx) => {
    if (openFaqIdx === idx) {
      setOpenFaqIdx(null);
    } else {
      setOpenFaqIdx(idx);
    }
  };

  const steps = [
    {
      num: "01",
      title: "Course Selection",
      desc: "Explore our academic disciplines using the Course Finder. Identify the Ofqual qualification Level matching your current level."
    },
    {
      num: "02",
      title: "Submit Enquiry",
      desc: "Submit your basic details via our online form, indicating your campus preference (Colombo or Kandy)."
    },
    {
      num: "03",
      title: "Registry Audit",
      desc: "Provide academic transcripts, GCE certificates, and identification. Our registry reviews credentials within 48 hours."
    },
    {
      num: "04",
      title: "Enrollment & Registry",
      desc: "Receive your formal Offer Letter. Select your preferred installment structure and register with the UK awarding body."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="section-navy" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Future Students
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0' }}>Admissions & Guidelines</h1>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Enrolment Process
            </span>
            <h2 className="title-medium">Four Steps to Enroll</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              We've streamlined our admission procedure to ensure clear communication and speed. Follow these steps to secure your path.
            </p>
          </div>

          <div className="grid-4">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: '#ffffff', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: '#e31c23', 
                  opacity: 0.3,
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', marginTop: '1rem', color: '#0a2540' }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees & Funding */}
      <section className="section section-grey">
        <div className="container">
          <div className="grid-2">
            <div>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tuition Framework
              </span>
              <h2 className="title-medium" style={{ marginTop: '0.25rem' }}>Fees & Structured Payments</h2>
              <p style={{ color: '#475569', marginBottom: '1.25rem' }}>
                At GCBT, we believe financial constraints should not block access to premium education. We deliver identical British academic curriculum locally at a fraction of UK onshore costs.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#e31c23', marginTop: '0.25rem' }}><CreditCard size={18} /></div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: '#0a2540', fontSize: '0.95rem' }}>Installment Pathways</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Interest-free monthly installment programs available for all UK diplomas.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#e31c23', marginTop: '0.25rem' }}><CheckSquare size={18} /></div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: '#0a2540', fontSize: '0.95rem' }}>Awarding Body Direct Payment</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Student registry fees are paid directly to OTHM / NCC in UK Pounds for absolute transparency.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#e31c23', marginTop: '0.25rem' }}><BadgeInfo size={18} /></div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: '#0a2540', fontSize: '0.95rem' }}>Bank Support Loans</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Academic loan schemes supported by leading local commercial banking partners.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: '#0a2540' }}>International Entry Guidelines</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', color: '#475569' }}>
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                  <strong style={{ color: '#0a2540', display: 'block', marginBottom: '0.25rem' }}>English Competency</strong>
                  Applicants must show IELTS Academic 5.5 equivalent or pass our internal GCBT English evaluation.
                </div>
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                  <strong style={{ color: '#0a2540', display: 'block', marginBottom: '0.25rem' }}>Visa Operations</strong>
                  We assist international applicants in routing study-permit documentation to the Sri Lanka Immigration Dept.
                </div>
                <div>
                  <strong style={{ color: '#0a2540', display: 'block', marginBottom: '0.25rem' }}>Transcripts & Credits</strong>
                  Prior academic diplomas must be submitted with official English translations for equivalence verification.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Accordion Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Help
            </span>
            <h2 className="title-medium">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${openFaqIdx === idx ? 'open' : ''}`}
                style={{ borderBottom: '1px solid #e2e8f0' }}
              >
                <button 
                  className="faq-header"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIdx === idx}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-icon" size={18} />
                </button>
                <div className="faq-body">
                  <div className="faq-content">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
