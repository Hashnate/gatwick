import React, { useState } from 'react';
import { faqs, courses } from '../data';
import { 
  ChevronDown, FileText, CheckSquare, BadgeInfo, CreditCard, CheckCircle, 
  Search, ShieldCheck, GraduationCap 
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

export default function Admissions() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Online Admission Enquiry Form State
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryCampus, setEnquiryCampus] = useState('Colombo');
  const [enquiryCourse, setEnquiryCourse] = useState('othm-l4-business');
  const [honeypot, setHoneypot] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (honeypot) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1500);
  };

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
      icon: Search,
      title: "Course Selection",
      desc: "Explore our academic disciplines using the Course Finder. Identify the Ofqual qualification Level matching your current level."
    },
    {
      num: "02",
      icon: FileText,
      title: "Submit Enquiry",
      desc: "Submit your basic details via our online form, indicating your campus preference (Colombo or Kandy)."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Registry Audit",
      desc: "Provide academic transcripts, GCE certificates, and identification. Our registry reviews credentials within 48 hours."
    },
    {
      num: "04",
      icon: GraduationCap,
      title: "Enrollment & Registry",
      desc: "Receive your formal Offer Letter. Select your preferred installment structure and register with the UK awarding body."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '3rem 0 2rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Future Students
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0', color: '#0a2540' }}>Admissions & Guidelines</h1>
        </div>
      </section>

      {/* Online Admission Enquiry Form Section */}
      <section className="section" id="admission-enquiry" style={{ padding: '3.5rem 0 1.5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="form-card">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Admissions 2026
              </span>
              <h2 className="title-medium" style={{ margin: '0' }}>Online Admission Enquiry</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Submit this enquiry form and our academic counselor will contact you within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="alert-success">
                <CheckCircle size={20} />
                <div>
                  <strong>Enquiry Submitted Successfully!</strong> Your application routing code has been registered. Our counselor will contact you shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="form-grid">
                <input 
                  type="text" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  className="honeypot-field" 
                  placeholder="Leave empty" 
                />

                <div className="form-group">
                  <label htmlFor="enquiry-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="enquiry-name"
                    required
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="enquiry-email"
                    required
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-phone">Contact Number *</label>
                  <input 
                    type="tel" 
                    id="enquiry-phone"
                    required
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-campus">Preferred Campus *</label>
                  <CustomSelect
                    id="enquiry-campus"
                    value={enquiryCampus}
                    onChange={setEnquiryCampus}
                    options={[
                      { value: 'Colombo', label: 'Colombo Main Campus (500 Galle Road)' },
                      { value: 'Kandy', label: 'Kandy Branch Campus (291 A9, Kandy)' }
                    ]}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="enquiry-course">Intended Program of Study *</label>
                  <CustomSelect
                    id="enquiry-course"
                    value={enquiryCourse}
                    onChange={setEnquiryCourse}
                    options={courses.map(c => ({ value: c.id, label: c.title }))}
                  />
                </div>

                <div className="form-group full-width" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
                    {loading ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
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
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div className="process-step-card" key={idx}>
                  <div className="step-card-header">
                    <div className="step-icon-wrapper">
                      <StepIcon size={22} />
                    </div>
                    <span className="step-number-badge">Step {step.num}</span>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              );
            })}
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
