import React, { useState, useEffect, useRef } from 'react';
import { faqs, courses } from '../data';
import {
  ChevronDown, ChevronLeft, ChevronRight, FileText, CheckSquare, BadgeInfo, CreditCard, CheckCircle, CheckCircle2,
  Search, ShieldCheck, GraduationCap, BookOpen, Globe, DollarSign,
  ClipboardList, Users, MapPin, Wifi, Award, Sparkles, ArrowRight, UserCheck, Languages, Zap
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { addInquiry } from '../services/adminStorage';

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'entry-requirements', label: 'Entry Requirements',        icon: BookOpen },
  { id: 'diploma',            label: 'Diploma Programs',          icon: Award },
  { id: 'othm',               label: 'OTHM Programs',             icon: ShieldCheck },
  { id: 'undergraduate',      label: 'Undergraduate',             icon: GraduationCap },
  { id: 'postgraduate',       label: 'Postgraduate',              icon: GraduationCap },
  { id: 'tuition',            label: 'Tuition & Scholarships',    icon: DollarSign },
  { id: 'how-to-apply',       label: 'How to Apply',              icon: ClipboardList },
  { id: 'international',      label: 'International Students',    icon: Globe },
];

export default function Admissions({ courses: propCourses }) {
  const activeCourses = Array.isArray(propCourses) && propCourses.length > 0 ? propCourses : (Array.isArray(courses) ? courses : []);
  const [activeTab, setActiveTab] = useState('entry-requirements');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Enquiry form
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryCampus, setEnquiryCampus] = useState('Colombo');
  const [enquiryCourse, setEnquiryCourse] = useState('othm-l4-business');
  const [honeypot, setHoneypot] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Listen for tab-change events from header / CTA buttons
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.tab) setActiveTab(e.detail.tab);
    };
    window.addEventListener('gcbt:setAdmissionsTab', handler);
    return () => window.removeEventListener('gcbt:setAdmissionsTab', handler);
  }, []);

  // Listen for scrollToAnchor events from header mega menu
  useEffect(() => {
    const handleAnchorScroll = (e) => {
      if (e.detail && e.detail.anchor) {
        const anchorId = e.detail.anchor;
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) {
            const yOffset = -140;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 150);
      }
    };
    window.addEventListener('gcbt:scrollToAnchor', handleAnchorScroll);
    return () => window.removeEventListener('gcbt:scrollToAnchor', handleAnchorScroll);
  }, []);

  // Handle direct hash navigation on mount / hashchange
  useEffect(() => {
    const checkHashAndScroll = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) return;

      if (hash === 'how-to-apply' || hash === 'inquiry-form' || hash === 'enquiry-form') {
        setActiveTab('how-to-apply');
      } else if (hash === 'global-footprint' || hash === 'english-requirements' || hash === 'international-section') {
        setActiveTab('international');
      }

      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const yOffset = -140;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 200);
    };

    checkHashAndScroll();
    window.addEventListener('hashchange', checkHashAndScroll);
    return () => window.removeEventListener('hashchange', checkHashAndScroll);
  }, []);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (honeypot) return;
    setLoading(true);
    const courseObj = activeCourses.find(c => c.id === enquiryCourse);
    addInquiry({
      name: enquiryName, email: enquiryEmail, phone: enquiryPhone,
      campus: enquiryCampus, course: courseObj ? courseObj.title : enquiryCourse,
      message: 'Admission enquiry submitted via Admissions page.'
    });
    setTimeout(() => { setLoading(false); setFormSubmitted(true); }, 1500);
  };

  const EnquiryFormCard = ({ customRef }) => (
    <div className="form-card" ref={customRef} id="inquiry-form" style={{ marginTop: '2.5rem', scrollMarginTop: '150px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Online Admissions</span>
        <h2 className="title-medium" style={{ margin: '0.5rem 0 0' }}>Submit Your Admission Enquiry</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>Our academic counselor will contact you within 24 hours.</p>
      </div>
      {formSubmitted ? (
        <div className="alert-success">
          <CheckCircle size={20} />
          <div><strong>Enquiry Submitted Successfully!</strong> Our counselor will contact you shortly.</div>
        </div>
      ) : (
        <form onSubmit={handleEnquirySubmit} className="form-grid">
          <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="honeypot-field" placeholder="Leave empty" />
          <div className="form-group"><label htmlFor="enq-name">Full Name *</label><input type="text" id="enq-name" required value={enquiryName} onChange={(e) => setEnquiryName(e.target.value)} placeholder="Enter your name" /></div>
          <div className="form-group"><label htmlFor="enq-email">Email Address *</label><input type="email" id="enq-email" required value={enquiryEmail} onChange={(e) => setEnquiryEmail(e.target.value)} placeholder="Enter email" /></div>
          <div className="form-group"><label htmlFor="enq-phone">Contact Number *</label><input type="tel" id="enq-phone" required value={enquiryPhone} onChange={(e) => setEnquiryPhone(e.target.value)} placeholder="+94 77 123 4567" /></div>
          <div className="form-group">
            <label htmlFor="enq-campus">Preferred Campus *</label>
            <CustomSelect id="enq-campus" value={enquiryCampus} onChange={setEnquiryCampus} options={[{ value: 'Colombo', label: 'Colombo Main Campus (500 Galle Road)' }, { value: 'Kandy', label: 'Kandy Branch Campus (291 A9, Kandy)' }]} />
          </div>
          <div className="form-group full-width">
            <label htmlFor="enq-course">Intended Program *</label>
            <CustomSelect id="enq-course" value={enquiryCourse} onChange={setEnquiryCourse} options={activeCourses.map(c => ({ value: c.id, label: c.title, badge: c.level }))} />
          </div>
          <div className="form-group full-width" style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Admission Enquiry'}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const toggleFaq = (idx) => setOpenFaqIdx(openFaqIdx === idx ? null : idx);

  // ─── Section: Entry Requirements ──────────────────────────────────────────
  const DiplomaTable = () => (
    <div>
      <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>International Diploma</span>
      <h2 className="title-medium" style={{ margin: '0.5rem 0 1.5rem' }}>Diploma Entry Requirements</h2>
      <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(10,37,64,0.06)' }}>
        <table className="entry-table">
          <thead>
            <tr>
              <th>Diploma Level</th>
              <th>Higher Education Equivalent</th>
              <th>Standard Entry Requirements</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['UK Level 3 / University Foundation Diploma', 'Pre-University / Foundation', 'G.C.E. O/L OR IGCSE'],
              ['Higher National Diploma (HND)', 'Pre-University / Foundation Level Entry', 'UK Level 3 Diploma OR University Foundation Diploma'],
              ['UK Level 4 / University Level 4', '1st Year of Bachelor\'s Degree', 'G.C.E. A/L OR International A/L OR High School Diploma'],
              ['UK Level 5 / University Level 5', '2nd Year of Bachelor\'s Degree', 'UK Level 4 Diploma OR 1st Year of a University Bachelor\'s Degree'],
              ['UK Level 6 / University Level 6', 'Final Year of Bachelor\'s Degree', 'UK Level 5 Diploma OR 2nd Year of a University Bachelor\'s Degree'],
              ['UK Level 7 / Postgraduate Diploma (PGD)', 'Master\'s Level / Postgraduate', 'Recognized University Bachelor\'s Degree OR UK Level 6 Diploma'],
            ].map(([level, equiv, req]) => (
              <tr key={level}>
                <td>{level}</td>
                <td>{equiv}</td>
                <td>{req}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mature-entry-banner" style={{ marginTop: '2rem' }}>
        <div className="mature-entry-icon-wrap">
          <UserCheck size={24} />
        </div>
        <div className="mature-entry-content">
          <div className="mature-entry-pill">
            <Zap size={12} /> Special / Non-Standard Entry Route
          </div>
          <h4 className="mature-entry-title">
            Mature Student Entry (21+ Years)
          </h4>
          <p className="mature-entry-text">
            Exceptional entry is available for applicants aged 21 and above with relevant work experience, subject to formal evaluation and approval by the university or diploma awarding body.
          </p>
        </div>
      </div>
    </div>
  );

  const OthmTable = () => (
    <div>
      <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OTHM Qualifications</span>
      <h2 className="title-medium" style={{ margin: '0.5rem 0 1.5rem' }}>OTHM Entry Requirements</h2>
      <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(10,37,64,0.06)' }}>
        <table className="entry-table">
          <thead>
            <tr>
              <th>Qualification Level</th>
              <th>Standard Entry Requirement</th>
              <th>Alternative / Mature Entry Route</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Level 3 (Foundation Diplomas)', 'Secondary Education / GCSEs / G.C.E. O/L (or equivalent 5 GCSEs). Minimum age 16+.', 'Open entry route based on literacy, language competency, and initial Gatwick Colleges own assessment approved by OTHM.'],
              ['Level 4 (Undergraduate Year 1 / HNC)', 'Relevant Level 3 Qualification (e.g., OTHM Level 3 Diploma, G.C.E. A/Ls). Minimum age 18+.', 'Mature Learners (21+) with relevant work or management experience evaluated by Gatwick Colleges own assessment approved by OTHM.'],
              ['Level 5 (Undergraduate Year 2 / HND)', 'Relevant Level 4 Qualification (e.g., OTHM Level 4 Diploma or UK Higher National Certificate).', 'Mature Learners (21+) with relevant work or management experience evaluated by Gatwick Colleges own assessment approved by OTHM.'],
              ['Level 6 (Undergraduate Final Year / Bachelor Degree Level)', 'Relevant Level 5 Qualification (e.g., OTHM Level 5 Diploma, Higher National Diploma). Minimum age 18+.', 'Mature Learners (21+) with relevant managerial/supervisory work experience.'],
              ['Level 7 (Postgraduate / Master\'s Level)', 'Honours Degree in a related subject OR a relevant UK Level 6 Diploma. Minimum age 21+.', 'Mature Learners (21+) with substantial management experience, CV evaluation, and interview.'],
              ['Level 8 (Doctoral / DBA Level)', 'Master\'s Degree (taught mainly in English) OR a relevant UK Level 7 Diploma.', 'Assessment based on detailed CV, personal statement, two professional/academic references, and interview.'],
            ].map(([level, std, alt]) => (
              <tr key={level}>
                <td>{level}</td>
                <td>{std}</td>
                <td>{alt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UndergraduateSection = () => (
    <div>
      <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bachelor's Degree</span>
      <h2 className="title-medium" style={{ margin: '0.5rem 0 1.5rem' }}>Undergraduate Entry Requirements</h2>
      {[
        {
          num: '01', title: 'Direct Entry – Year 1', subtitle: 'Standard 3-Year Degree Pathway',
          body: 'Applicants must fulfill at least one of the following academic criteria:',
          items: [
            'Sri Lankan A/Ls: Minimum of 3 Passes in the G.C.E. Advanced Level examination.',
            'International A/Ls: Minimum of 3 Passes in Pearson Edexcel, Cambridge, or equivalent UK International A-Level examinations.',
            'High School Diploma: Successful completion of a recognized U.S. High School Diploma (12 years of formal schooling).',
            'Foundation Diploma: Successful completion of a government-regulated Foundation Diploma from a recognized institution.',
            'Alternative Qualifications: Any other equivalent qualification subject to formal evaluation and approval by the University Senate.',
          ]
        },
        {
          num: '02', title: 'Advanced Entry – Year 2', subtitle: '2-Year Completion Pathway',
          body: 'To qualify for direct entry into Year 2, candidates must satisfy the following dual criteria:',
          items: [
            'General Eligibility: Meet at least one of the Year 1 Direct Entry qualifications listed above.',
            'Academic Credit Transfer: Successfully complete a recognized 1-year full-time Diploma in a relevant subject area (minimum 24 SLQF Credits or 120 UK Credits, RQF Level 4).',
          ]
        },
        {
          num: '03', title: 'Final Year Direct Entry', subtitle: "Bachelor's Degree Top-Up",
          body: 'To qualify for direct entry into the Final Year, candidates must satisfy:',
          items: [
            'General Eligibility: Meet at least one of the Year 1 Direct Entry qualifications listed above.',
            'Academic Credit Transfer: Successfully complete a recognized 2-year full-time Higher Diploma (minimum 48 SLQF Credits or 240 UK Credits, RQF Level 4 and 5 combined).',
          ]
        }
      ].map((section) => (
        <div key={section.num} style={{ marginBottom: '2rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(10,37,64,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0a2540', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{section.num}</div>
            <div>
              <h3 style={{ margin: 0, color: '#0a2540', fontSize: '1.05rem', fontWeight: 700 }}>{section.title}</h3>
              <span style={{ color: '#e31c23', fontSize: '0.8rem', fontWeight: 600 }}>{section.subtitle}</span>
            </div>
          </div>
          <p style={{ color: '#475569', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{section.body}</p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {section.items.map((item, i) => (
              <li key={i} style={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const PostgraduateSection = () => (
    <div>
      <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Master's & PGD</span>
      <h2 className="title-medium" style={{ margin: '0.5rem 0 1.5rem' }}>Postgraduate Entry Requirements</h2>
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(10,37,64,0.04)', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#0a2540', fontWeight: 700, marginBottom: '1rem' }}>Standard Academic Entry Routes</h3>
        <p style={{ color: '#475569', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Applicants seeking admission to Master's degree programs and Postgraduate Diplomas must fulfill at least one of the following criteria:</p>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            "Bachelor's Degree: A Bachelor's Degree in a relevant field from a recognized university (equivalent to UK Level 6 / SLQF Level 5 or 6).",
            'Postgraduate Diploma: A recognized Postgraduate Diploma (UK RQF Level 7 / SLQF Level 8) in a relevant field from an accredited institution.',
            'Alternative Qualifications: Any other professional or academic qualification deemed equivalent and acceptable to the University Senate.',
          ].map((item, i) => (
            <li key={i} style={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.6 }}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.75rem' }}>
        <h3 style={{ color: '#15803d', fontWeight: 700, marginBottom: '1rem' }}>⚡ Non-Standard & Executive Entry Route (Mature Applicants)</h3>
        <p style={{ color: '#166534', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          <strong>Executive Master's Pathway:</strong> Applicants who do not possess a formal Bachelor's Degree may be considered for Executive Master's programs provided they:
        </p>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li style={{ color: '#166534', fontSize: '0.875rem' }}>Hold a recognized Diploma AND</li>
          <li style={{ color: '#166534', fontSize: '0.875rem' }}>Possess a minimum of 5 years of relevant managerial or professional work experience.</li>
          <li style={{ color: '#166534', fontSize: '0.875rem' }}>Note: Subject to formal profile evaluation, CV review, and final approval by the University Senate.</li>
        </ul>
      </div>
      {/* English Language */}
      <div style={{ marginTop: '1.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.75rem' }}>
        <h3 style={{ color: '#1e40af', fontWeight: 700, marginBottom: '1rem' }}>English Language Proficiency</h3>
        <p style={{ color: '#1e3a8a', fontSize: '0.9rem', marginBottom: '0.75rem' }}>All programs are offered in English medium only. Applicants whose primary language is not English must demonstrate competence through one of the following:</p>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            'Pass in GCE O/L English',
            'English medium education',
            'Standardized Testing: An overall IELTS score of 5.5 (or equivalent) across all bands.',
            'Professional Experience: Documented proof of working in an English-speaking professional environment.',
          ].map((item, i) => (
            <li key={i} style={{ color: '#1e3a8a', fontSize: '0.875rem', lineHeight: 1.6 }}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const TuitionSection = () => (
    <div>
      <div className="entry-requirements-header">
        <div className="entry-requirements-pill">
          <DollarSign size={14} /> Fees & Funding
        </div>
        <h2 className="entry-requirements-title">Tuition Fees & Financial Support</h2>
        <p className="entry-requirements-subtitle">
          Gatwick College provides flexible installment options, interest-free student financing, and merit scholarships to ensure quality UK education is accessible to all.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '1.75rem', marginBottom: '2rem' }}>
        {/* Card 1: Flexible Payment Plans */}
        <div className="payment-plan-card">
          <div>
            <div className="payment-card-top">
              <div className="payment-card-icon blue">
                <CreditCard size={22} />
              </div>
              <div className="payment-card-badge blue">
                0% Interest Options
              </div>
            </div>

            <h3 className="payment-card-title">Flexible Payment Plans</h3>
            <p className="payment-card-desc">
              To support our students, tuition can be structured into flexible installment arrangements tailored to your monthly budget:
            </p>

            <div className="payment-options-grid">
              <div className="payment-option-box">
                <div className="payment-option-head">
                  <CheckCircle2 size={16} className="text-blue" />
                  <strong>Upfront Payment Waiver</strong>
                </div>
                <p>Enrollees paying full tuition upfront are eligible for special fee waivers and discounts.</p>
              </div>

              <div className="payment-option-box">
                <div className="payment-option-head">
                  <CheckCircle2 size={16} className="text-blue" />
                  <strong>Structured Installments</strong>
                </div>
                <p>Initial enrollment deposit followed by flexible, agreed-upon monthly installment schedules.</p>
              </div>
            </div>
          </div>

          <div className="payment-card-footer">
            <Users size={16} />
            <span>Your admissions counselor will tailor a custom payment schedule for your budget.</span>
          </div>
        </div>

        {/* Card 2: Study Now Pay Later (SNPL) */}
        <div className="payment-plan-card featured">
          <div>
            <div className="payment-card-top">
              <div className="payment-card-icon gold">
                <Sparkles size={22} />
              </div>
              <div className="payment-card-badge gold">
                Financed via Myfees.lk
              </div>
            </div>

            <h3 className="payment-card-title light">Study Now, Pay Later (SNPL)</h3>
            <p className="payment-card-desc light">
              In exclusive partnership with <strong>Myfees.lk</strong>, Gatwick College offers an innovative student financing solution:
            </p>

            <div className="payment-options-grid">
              <div className="payment-option-box dark">
                <div className="payment-option-head">
                  <ShieldCheck size={16} className="text-cyan" />
                  <strong className="light">0% Interest Loans</strong>
                </div>
                <p className="light">Qualified students gain immediate access to 100% interest-free loan facilities.</p>
              </div>

              <div className="payment-option-box dark">
                <div className="payment-option-head">
                  <ShieldCheck size={16} className="text-cyan" />
                  <strong className="light">Focus On Studies</strong>
                </div>
                <p className="light">Start learning today while spreading tuition payments conveniently over time.</p>
              </div>
            </div>
          </div>

          <div className="payment-card-footer dark">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Official Partner:</span>
              <strong style={{ color: '#38bdf8' }}>Myfees.lk</strong>
            </div>
            <span className="verified-badge"><CheckCircle2 size={13} /> Verified Partner</span>
          </div>
        </div>
      </div>

      {/* Scholarship Banner */}
      <div className="scholarship-banner">
        <div className="scholarship-banner-icon">
          <Award size={24} />
        </div>
        <div>
          <h4 style={{ margin: '0 0 0.2rem', color: '#0a2540', fontWeight: 700, fontSize: '0.98rem' }}>
            Merit & Need-Based Scholarships Available
          </h4>
          <p style={{ margin: 0, color: '#475569', fontSize: '0.86rem', lineHeight: 1.55 }}>
            A limited number of partial scholarships or fee waivers are awarded each academic intake. Contact Student Affairs for eligibility and application requirements.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
          Frequently Asked Questions
        </h3>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaqIdx === idx ? 'open' : ''}`} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <button className="faq-header" onClick={() => toggleFaq(idx)} aria-expanded={openFaqIdx === idx}>
                <span>{faq.question}</span>
                <ChevronDown className="faq-icon" size={18} />
              </button>
              <div className="faq-body"><div className="faq-content">{faq.answer}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HowToApplySection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedPathway, setSelectedPathway] = useState(0);
    const stepperRef = useRef(null);
    const formRef = useRef(null);

    const handleStepChange = (newStep) => {
      setActiveStep(newStep);
      if (stepperRef.current) {
        const yOffset = -140; // Leave clear margin below sticky navbar
        const element = stepperRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    const scrollToForm = (e) => {
      if (e) e.preventDefault();
      if (formRef.current) {
        const yOffset = -140; // Leave space for sticky tab bar
        const element = formRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    const steps = [
      {
        num: '01',
        title: 'Identify Your Academic Goal',
        shortTitle: 'Identify Goal',
        badge: 'Career Guidance',
        time: '5 min consultation',
        icon: Search,
        color: '#2563eb',
        bg: '#eff6ff',
        desc: 'Select the study pathway that aligns with your current qualifications and long-term career aspirations:',
        pathways: [
          { title: 'School Leavers', desc: 'O/L & A/L Graduates: Foundation or Undergraduate Diploma', icon: GraduationCap },
          { title: 'Global Transfer', desc: '2-Yr Higher Diploma → Top-Up Degree in UK, AU, NZ, CA', icon: Globe },
          { title: 'Working Professionals', desc: 'Flexible Master\'s & Executive Leadership Qualifications', icon: Users },
          { title: 'Migration & Further Study', desc: 'UK Level 7 Postgraduate Diploma for career & migration', icon: Award }
        ]
      },
      {
        num: '02',
        title: 'Complete the Online Application',
        shortTitle: 'Application Form',
        badge: 'Online Registration',
        time: '10 min form',
        icon: FileText,
        color: '#16a34a',
        bg: '#f0fdf4',
        desc: 'Fill out the official application form provided by your admissions officer and attach digital copies of required documents:',
        requirements: [
          'G.C.E. O/L or A/L Examination Results Transcripts',
          'National Identity Card (NIC) or Passport Copy',
          'Updated Resume / CV (for Mature & Executive applicants)',
          'Proof of English Proficiency (if applicable)'
        ]
      },
      {
        num: '03',
        title: 'Offer Letter & Fee Confirmation',
        shortTitle: 'Offer & Deposit',
        badge: 'Evaluation Phase',
        time: '24-48 hr evaluation',
        icon: ShieldCheck,
        color: '#d97706',
        bg: '#fffbeb',
        desc: 'Upon successful assessment of your application, our admissions board will issue your official Offer Letter:',
        benefits: [
          'Formal Offer Letter issued by Gatwick College & Awarding Body',
          'Guaranteed seat allocation upon initial deposit payment',
          'Flexible monthly payment plan setup with student counselor',
          'Scholarship eligibility confirmation & fee waiver application'
        ]
      },
      {
        num: '04',
        title: 'Commence Your Studies',
        shortTitle: 'Start Studies',
        badge: 'Orientation & Classes',
        time: 'Intake kickoff',
        icon: GraduationCap,
        color: '#9333ea',
        bg: '#faf5ff',
        desc: 'Receive your welcome orientation packet, student portal access, and start your academic journey:',
        highlights: [
          'Access to Virtual Learning Environment (VLE) & Digital Library',
          'Personal Academic Advisor assignment & Timetable distribution',
          'Welcome Orientation Session (On-Campus or Live Virtual)',
          'Official Student ID Card issuance'
        ]
      }
    ];

    const currentStep = steps[activeStep];
    const StepIcon = currentStep.icon;

    return (
      <div>
        <div className="entry-requirements-header" ref={stepperRef}>
          <div className="entry-requirements-pill">
            <Sparkles size={14} /> Interactive Admissions Journey
          </div>
          <h2 className="entry-requirements-title">How to Apply</h2>
          <p className="entry-requirements-subtitle">
            Experience our interactive 4-step enrollment roadmap designed for school leavers, global transfer students, and working professionals.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="innovative-stepper-bar">
          <div className="stepper-track-line">
            <div
              className="stepper-progress-fill"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={step.num}
                className={`stepper-node-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleStepChange(idx)}
              >
                <div className="stepper-node-circle">
                  {isCompleted ? <CheckCircle2 size={16} /> : <IconComponent size={16} />}
                </div>
                <div className="stepper-node-text">
                  <span className="stepper-node-num">Step {step.num}</span>
                  <span className="stepper-node-title">{step.shortTitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Card */}
        <div className="innovative-stage-card">
          <div className="stage-card-header">
            <div className="stage-badge-group">
              <div
                className="stage-num-badge"
                style={{ background: currentStep.bg, color: currentStep.color }}
              >
                <StepIcon size={22} />
              </div>
              <div>
                <span className="stage-pill-tag" style={{ color: currentStep.color, background: currentStep.bg }}>
                  {currentStep.badge}
                </span>
                <h3 className="stage-title">{currentStep.title}</h3>
              </div>
            </div>

            <div className="stage-time-chip">
              <Zap size={13} color="#f59e0b" />
              <span>{currentStep.time}</span>
            </div>
          </div>

          <p className="stage-desc">{currentStep.desc}</p>

          {/* Dynamic Content based on Active Step */}
          {activeStep === 0 && (
            <div className="stage-pathways-grid">
              {currentStep.pathways.map((item, pIdx) => {
                const PathwayIcon = item.icon;
                const isSelected = selectedPathway === pIdx;
                return (
                  <div
                    key={pIdx}
                    className={`stage-pathway-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedPathway(pIdx)}
                  >
                    <div className="stage-pathway-icon">
                      <PathwayIcon size={20} />
                    </div>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeStep === 1 && (
            <div className="stage-checklist-grid">
              {currentStep.requirements.map((req, rIdx) => (
                <div key={rIdx} className="stage-checklist-item">
                  <CheckCircle2 size={18} color="#16a34a" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          )}

          {activeStep === 2 && (
            <div className="stage-checklist-grid">
              {currentStep.benefits.map((ben, bIdx) => (
                <div key={bIdx} className="stage-checklist-item">
                  <ShieldCheck size={18} color="#d97706" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          )}

          {activeStep === 3 && (
            <div className="stage-checklist-grid">
              {currentStep.highlights.map((hl, hIdx) => (
                <div key={hl} className="stage-checklist-item">
                  <Award size={18} color="#9333ea" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Footer Navigation */}
          <div className="stage-card-footer">
            <button
              className="stage-nav-btn prev"
              disabled={activeStep === 0}
              onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
            >
              ← Previous Step
            </button>

            <div className="stage-step-dots">
              {steps.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`stage-dot ${activeStep === dotIdx ? 'active' : ''}`}
                  onClick={() => handleStepChange(dotIdx)}
                />
              ))}
            </div>

            {activeStep < steps.length - 1 ? (
              <button
                className="stage-nav-btn next"
                onClick={() => handleStepChange(Math.min(steps.length - 1, activeStep + 1))}
              >
                Next Step →
              </button>
            ) : (
              <button type="button" onClick={scrollToForm} className="stage-nav-btn apply-now">
                Apply Now <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Enquiry Form */}
        <EnquiryFormCard customRef={formRef} />
      </div>
    );
  };

  const InternationalSection = () => {
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [currentIntlSlide, setCurrentIntlSlide] = useState(0);
    const regions = ['All', 'Asia', 'Africa', 'North America'];

    const countries = [
      { code: 'MV', flag: '🇲🇻', name: 'Maldives', region: 'Asia', tag: 'South Asia', bg: '#eff6ff', color: '#2563eb' },
      { code: 'IN', flag: '🇮🇳', name: 'India', region: 'Asia', tag: 'South Asia', bg: '#eff6ff', color: '#2563eb' },
      { code: 'MY', flag: '🇲🇾', name: 'Malaysia', region: 'Asia', tag: 'Southeast Asia', bg: '#eff6ff', color: '#2563eb' },
      { code: 'NP', flag: '🇳🇵', name: 'Nepal', region: 'Asia', tag: 'South Asia', bg: '#eff6ff', color: '#2563eb' },
      { code: 'MM', flag: '🇲🇲', name: 'Myanmar', region: 'Asia', tag: 'Southeast Asia', bg: '#eff6ff', color: '#2563eb' },
      { code: 'KE', flag: '🇰🇪', name: 'Kenya', region: 'Africa', tag: 'East Africa', bg: '#f0fdf4', color: '#16a34a' },
      { code: 'MU', flag: '🇲🇺', name: 'Mauritius', region: 'Africa', tag: 'East Africa', bg: '#f0fdf4', color: '#16a34a' },
      { code: 'BW', flag: '🇧🇼', name: 'Botswana', region: 'Africa', tag: 'Southern Africa', bg: '#f0fdf4', color: '#16a34a' },
      { code: 'CA', flag: '🇨🇦', name: 'Canada', region: 'North America', tag: 'North America', bg: '#faf5ff', color: '#9333ea' },
    ];

    const intlGradPhotos = [
      { src: 'assets/intl_monks_group.jpg', title: 'BMICH Convocation 2026', caption: 'International Monk Graduates at BMICH Colombo', pos: 'center 15%' },
      { src: 'assets/intl_monks_trio.jpg', title: 'Gatwick Graduates Cohort', caption: 'International Monks at Gatwick Convocation Backdrop', pos: 'center center' },
    ];

    const nextIntlSlide = (e) => {
      if (e) e.stopPropagation();
      setCurrentIntlSlide((prev) => (prev + 1) % intlGradPhotos.length);
    };

    const prevIntlSlide = (e) => {
      if (e) e.stopPropagation();
      setCurrentIntlSlide((prev) => (prev - 1 + intlGradPhotos.length) % intlGradPhotos.length);
    };

    const filteredCountries = selectedRegion === 'All'
      ? countries
      : countries.filter((c) => c.region === selectedRegion);

    return (
      <div id="international-section" style={{ scrollMarginTop: '150px' }}>
        <div className="entry-requirements-header">
          <div className="entry-requirements-pill">
            <Globe size={14} /> Global Student Network
          </div>
          <h2 className="entry-requirements-title">International Students</h2>
          <p className="entry-requirements-subtitle">
            At Gatwick College, we welcome a vibrant international community of learners across Asia, Africa, and North America enrolled in flexible UK-aligned pathways.
          </p>
        </div>

        {/* Attractive Light-Themed International Convocation Showcase Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 35px rgba(10, 37, 64, 0.07)',
          marginBottom: '2.5rem',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          {/* Left Content Column */}
          <div style={{ padding: '0.75rem 1rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#fef2f2',
              color: '#e31c23',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.85rem',
              border: '1px solid #fecdd3',
              width: 'fit-content'
            }}>
              <GraduationCap size={15} /> International Convocation Spotlight
            </div>

            <h3 style={{
              color: '#0a2540',
              fontSize: '1.45rem',
              fontWeight: 800,
              margin: '0 0 0.6rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.28
            }}>
              Celebrating Diversity at Gatwick Convocation 2026
            </h3>

            <p style={{
              color: '#475569',
              fontSize: '0.9rem',
              lineHeight: 1.65,
              margin: '0 0 1.2rem'
            }}>
              Gatwick College takes immense pride in welcoming international scholars, Buddhist monks, and distance learners from across Asia, Africa, and North America to our grand physical convocation ceremony held at BMICH Colombo.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600 }}>BMICH Colombo</span>
              <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600 }}>UK Accredited Degrees</span>
              <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600 }}>Global Alumni Network</span>
            </div>
          </div>

          {/* Right Photo Column - Interactive Multi-Photo Carousel with Scroll Buttons */}
          <div style={{
            position: 'relative',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 8px 25px rgba(10, 37, 64, 0.1)',
            border: '1px solid #e2e8f0',
            width: '100%',
            height: '280px',
            backgroundColor: '#0a2540',
            userSelect: 'none',
            alignSelf: 'center'
          }}>
            {/* Ambient Blurred Background for Zoomed Out Mode */}
            <img 
              src={intlGradPhotos[currentIntlSlide].src} 
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(24px)',
                opacity: 0.55,
                transform: 'scale(1.25)',
                pointerEvents: 'none'
              }}
            />

            {/* Active Foreground Image */}
            <img 
              src={intlGradPhotos[currentIntlSlide].src} 
              alt={intlGradPhotos[currentIntlSlide].title}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: intlGradPhotos[currentIntlSlide].pos || 'center center',
                display: 'block',
                zIndex: 5,
                transition: 'all 0.3s ease'
              }}
            />

            {/* Slide Info Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(3, 7, 18, 0.88) 0%, rgba(3, 7, 18, 0.4) 60%, rgba(0,0,0,0) 100%)',
              padding: '1.25rem 1.25rem 0.85rem',
              color: '#ffffff',
              pointerEvents: 'none',
              zIndex: 10
            }}>
              <strong style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {intlGradPhotos[currentIntlSlide].title}
              </strong>
              <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                {intlGradPhotos[currentIntlSlide].caption}
              </span>
            </div>

            {/* Scroll Left Button (<) */}
            <button
              onClick={prevIntlSlide}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(10, 37, 64, 0.85)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                zIndex: 25,
                transition: 'all 0.2s ease'
              }}
              aria-label="Previous Photo"
              title="Previous Photo"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Scroll Right Button (>) */}
            <button
              onClick={nextIntlSlide}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(10, 37, 64, 0.85)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                zIndex: 25,
                transition: 'all 0.2s ease'
              }}
              aria-label="Next Photo"
              title="Next Photo"
            >
              <ChevronRight size={20} />
            </button>

            {/* Photo Counter Badge Top Right */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(10, 37, 64, 0.85)',
              color: '#ffffff',
              padding: '0.25rem 0.65rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              zIndex: 20
            }}>
              {currentIntlSlide + 1} / {intlGradPhotos.length}
            </div>

            {/* Slide Indicator Dots at Bottom */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              zIndex: 20
            }}>
              {intlGradPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIntlSlide(idx); }}
                  style={{
                    width: currentIntlSlide === idx ? '20px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    backgroundColor: currentIntlSlide === idx ? '#e31c23' : 'rgba(255, 255, 255, 0.6)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Impressive Global Hero */}
        <div className="impressive-global-hero" id="global-footprint" style={{ scrollMarginTop: '150px' }}>
          {/* Top Metrics Row */}
          <div className="global-metrics-strip">
            <div className="global-metric-item">
              <div className="global-metric-icon">
                <Globe size={20} />
              </div>
              <div>
                <strong className="global-metric-val">9+ Nations</strong>
                <span className="global-metric-lbl">Global Cohort Presence</span>
              </div>
            </div>

            <div className="global-metric-item">
              <div className="global-metric-icon gold">
                <Award size={20} />
              </div>
              <div>
                <strong className="global-metric-val">UK Aligned</strong>
                <span className="global-metric-lbl">OTHM & Degree Pathways</span>
              </div>
            </div>

            <div className="global-metric-item">
              <div className="global-metric-icon green">
                <Users size={20} />
              </div>
              <div>
                <strong className="global-metric-val">100% Online</strong>
                <span className="global-metric-lbl">Distance & Hybrid Learning</span>
              </div>
            </div>
          </div>

          {/* Header & Filter Controls */}
          <div className="global-hero-nav">
            <div>
              <h3 className="global-hero-title">Our Global Student Footprint</h3>
              <p className="global-hero-desc">Explore Gatwick College's international learner network across Asia, Africa, and North America.</p>
            </div>

            {/* Region Filter Buttons */}
            <div className="global-region-tabs">
              {regions.map((reg) => {
                const count = reg === 'All' ? countries.length : countries.filter(c => c.region === reg).length;
                return (
                  <button
                    key={reg}
                    className={`region-tab-btn ${selectedRegion === reg ? 'active' : ''}`}
                    onClick={() => setSelectedRegion(reg)}
                  >
                    <span>{reg}</span>
                    <span className="region-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Country Grid */}
          <div className="impressive-country-grid">
            {filteredCountries.map((c) => (
              <div key={c.name} className="impressive-country-card">
                <div className="country-flag-box">
                  <img
                    src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                    alt={`${c.name} Flag`}
                    className="country-flag-img"
                    loading="lazy"
                  />
                </div>

                <div className="country-info">
                  <h4 className="country-title">{c.name}</h4>
                  <div className="country-tag-row">
                    <span className="country-sub-tag">{c.tag}</span>
                    <span className="country-status-dot" title="Active Intake Available" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* English Language & Academic Requirements Table */}
        <div id="english-requirements" style={{ scrollMarginTop: '150px', marginBottom: '2.5rem' }}>
          <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
            Academic & English Language Requirements
          </h3>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,37,64,0.04)' }}>
            <table className="entry-table">
              <thead><tr><th>Category</th><th>Policy & Standard Requirements</th></tr></thead>
              <tbody>
                <tr>
                  <td>Academic Prerequisites</td>
                  <td>International applicant qualifications (high school diploma, higher diploma, or degree) mirror standard local entry prerequisites detailed on specific course pages.</td>
                </tr>
                <tr>
                  <td>English Language Proficiency</td>
                  <td>Applicants must demonstrate English proficiency via G.C.E. O/L English pass, IELTS 5.5+, or documented completion of prior studies in English medium.</td>
                </tr>
                <tr>
                  <td>International Fee Parity</td>
                  <td>Equal fee parity is offered for all online and distance-learning international enrollees without surcharge.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose Gatwick College */}
        <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
          Why Choose Gatwick College?
        </h3>
        <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: DollarSign, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', title: 'Globally Competitive Tuition', desc: 'Access UK-aligned pathways and OTHM programs at significantly lower fee tiers compared to Western institutions.' },
            { icon: Wifi, color: '#1d4ed8', bg: '#eff6ff', border: '#dbeafe', title: '100% Flexible Distance Learning', desc: 'Complete your entire diploma or postgraduate pathway remotely from your home country with full LMS access.' },
            { icon: Users, color: '#9333ea', bg: '#faf5ff', border: '#f3e8ff', title: 'Strong Alumni Referral Network', desc: 'A significant portion of our international cohort enrolls through direct recommendations from our global alumni network.' },
            { icon: Award, color: '#d97706', bg: '#fffbeb', border: '#fef3c7', title: 'In-Person Graduation Ceremony', desc: 'Distance-learning students are warmly invited to travel to Sri Lanka to participate in our grand physical graduation ceremony.' },
            { icon: ShieldCheck, color: '#0891b2', bg: '#f0f9ff', border: '#cff4fc', title: 'Dedicated 6-Day Academic Support', desc: 'Our International Student Services team provides dedicated assistance 6 days a week for admissions, LMS navigation, and academic guidance.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.35rem', boxShadow: '0 4px 15px rgba(10,37,64,0.03)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={item.color} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem', color: '#0a2540', fontWeight: 800, fontSize: '0.98rem' }}>{item.title}</h4>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.86rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unique Learning Opportunities */}
        <h3 style={{ color: '#0a2540', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
          Global Learning Opportunities
        </h3>
        <div className="grid-2" style={{ gap: '1.5rem' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 15px rgba(10,37,64,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} color="#e31c23" />
              </div>
              <h4 style={{ margin: 0, color: '#0a2540', fontWeight: 800, fontSize: '1rem' }}>Educational Tourism & Credit Transfer</h4>
            </div>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
              In collaboration with educational authorities, Gatwick College offers specialized Educational Tourism tracks. International students can visit Sri Lanka for short-term residency, complete intensive modules on-campus, experience the culture, and seamlessly transfer earned credits to international partner universities.
            </p>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 15px rgba(10,37,64,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} color="#e31c23" />
              </div>
              <h4 style={{ margin: 0, color: '#0a2540', fontWeight: 800, fontSize: '1rem' }}>On-Site Internships & Industry Placements</h4>
            </div>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
              Fulfill your program's practical requirements through hands-on internships arranged directly at Gatwick College or with our network of affiliated corporate and institutional partners in Sri Lanka.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Entry overview cards definition with luxury branding & icons
  const entryCards = [
    {
      tab: 'diploma',
      color: '#2563eb',
      iconBg: '#eff6ff',
      border: '#bfdbfe',
      icon: Award,
      title: 'International Diploma Programs',
      subtitle: 'UK Level 3 – Level 7',
      summary: 'Foundation to Postgraduate Diploma pathways based on O/L, A/L, HND or equivalent qualifications.',
      badge: '6 Levels'
    },
    {
      tab: 'othm',
      color: '#7c3aed',
      iconBg: '#f5f3ff',
      border: '#ddd6fe',
      icon: ShieldCheck,
      title: 'OTHM Qualifications',
      subtitle: 'Level 3 – Level 8',
      summary: 'Ofqual-regulated OTHM qualifications from Foundation to Doctoral level. Mature learner routes available.',
      badge: '6 Levels'
    },
    {
      tab: 'undergraduate',
      color: '#059669',
      iconBg: '#ecfdf5',
      border: '#a7f3d0',
      icon: GraduationCap,
      title: 'Undergraduate Degree Entry',
      subtitle: 'Year 1, 2 & Top-Up',
      summary: 'Direct entry via A/Ls. Year 2 advanced entry with Level 4 credit. Final-year Top-Up with HND or Level 5.',
      badge: '3 Pathways'
    },
    {
      tab: 'postgraduate',
      color: '#d97706',
      iconBg: '#fffbeb',
      border: '#fde68a',
      icon: BookOpen,
      title: "Postgraduate & Master's Entry",
      subtitle: "PGD & Master's",
      summary: "Bachelor's degree for standard entry. Executive Master's pathway for professionals with 5+ years experience.",
      badge: '2 Routes'
    },
    {
      tab: 'international',
      color: '#0891b2',
      iconBg: '#ecfeff',
      border: '#a5f3fc',
      icon: Globe,
      title: 'International Student Entry',
      subtitle: 'All Countries Welcome',
      summary: 'Entry criteria mirrors local requirements. IELTS 5.5+ or equivalent English proficiency required.',
      badge: 'Global'
    },
    {
      tab: 'postgraduate',
      color: '#e31c23',
      iconBg: '#fff1f2',
      border: '#fecdd3',
      icon: Languages,
      title: 'English Language Requirements',
      subtitle: 'All Programs – English Medium',
      summary: 'GCE O/L English pass, IELTS 5.5+, or documented experience in an English-speaking professional environment.',
      badge: 'All Levels'
    },
  ];

  // Map tab ID to content
  const tabContent = {
    'entry-requirements': (
      <div>
        <div className="entry-requirements-header">
          <div className="entry-requirements-pill">
            <Sparkles size={14} /> Quick Reference
          </div>
          <h2 className="entry-requirements-title">Entry Requirements Overview</h2>
          <p className="entry-requirements-subtitle">
            Select a pathway below to view detailed entry criteria and qualification levels. We accept a wide range of academic and professional qualifications.
          </p>
        </div>

        <div className="entry-pathway-grid">
          {entryCards.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div
                key={i}
                className="entry-pathway-card"
                onClick={() => setActiveTab(item.tab)}
                style={{
                  '--card-theme-color': item.color,
                  '--card-icon-bg': item.iconBg,
                  '--card-theme-border': item.border,
                }}
              >
                <div>
                  <div className="entry-card-header">
                    <div className="entry-card-icon-box">
                      <IconComponent size={22} />
                    </div>
                    <span className="entry-card-badge">{item.badge}</span>
                  </div>
                  <div className="entry-card-subtitle">{item.subtitle}</div>
                  <h3 className="entry-card-title">{item.title}</h3>
                  <p className="entry-card-summary">{item.summary}</p>
                </div>
                <div className="entry-card-cta">
                  <span>View Details</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mature-entry-banner">
          <div className="mature-entry-icon-wrap">
            <UserCheck size={24} />
          </div>
          <div className="mature-entry-content">
            <div className="mature-entry-pill">
              <Zap size={12} /> Special / Non-Standard Entry Route
            </div>
            <h4 className="mature-entry-title">
              Mature Student Entry (21+ Years)
            </h4>
            <p className="mature-entry-text">
              Exceptional entry is available for applicants aged 21 and above with relevant work experience, subject to formal evaluation and approval by the university or diploma awarding body.
            </p>
          </div>
        </div>
      </div>
    ),
    'diploma':            <DiplomaTable />,
    'othm':               <OthmTable />,
    'undergraduate':      <UndergraduateSection />,
    'postgraduate':       <PostgraduateSection />,
    'tuition':            <TuitionSection />,
    'how-to-apply':       <HowToApplySection />,
    'international':      <InternationalSection />,
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '3rem 0 2rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Students</span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0', color: '#0a2540' }}>Admissions & Entry</h1>
          <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem' }}>Everything you need to know about joining Gatwick College</p>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="admissions-tabs-wrapper">
        <div className="admissions-tabs-container">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`admissions-tab-${tab.id}`}
                className={`admissions-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          {tabContent[activeTab] || tabContent['entry-requirements']}
          {activeTab !== 'how-to-apply' && <EnquiryFormCard />}
        </div>
      </section>
    </div>
  );
}
