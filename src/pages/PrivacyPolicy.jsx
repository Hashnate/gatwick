import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Sliders, 
  Share2, 
  Server, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div>
      {/* Standalone Page Header */}
      <section className="section-page-header" style={{ padding: '4rem 0 3rem 0', textAlign: 'center', backgroundColor: '#0a192f', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
            Data Protection & Privacy
          </span>
          <h1 className="title-medium" style={{ margin: '0.25rem 0 0.75rem', color: '#ffffff', fontSize: '2.5rem', fontWeight: 800 }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: '1.5', fontWeight: 500 }}>
            Gatwick College of Business and Technology — Effective Date: July 2026
          </p>
        </div>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>

          {/* Intro Box */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '16px', 
            padding: '2.5rem', 
            marginBottom: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fff0f1', color: '#e31c23', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0a2540', margin: 0 }}>Gatwick College Privacy Statement</h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>GCBT Institutional Data Protection</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#e31c23', backgroundColor: '#fff0f1', padding: '0.4rem 0.9rem', borderRadius: '20px', border: '1px solid #fed7aa' }}>
                <Calendar size={14} />
                Effective Date: July 2026
              </div>
            </div>

            <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              At Gatwick College of Business and Technology (<strong>"Gatwick College," "we," "us," or "our"</strong>), we respect your privacy and are committed to protecting the personal information you share with us through Meta Platforms (including Facebook and Instagram Ads, Lead Forms, and integrated tools) as well as our official website.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
              This Privacy Policy explains how we collect, use, process, and safeguard your data when you interact with our advertisements or submit inquiry forms on Meta platforms and institutional digital portals.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.25rem', marginBottom: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Eye size={20} style={{ color: '#e31c23' }} />
              1. Information We Collect
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              When you interact with Gatwick College via Facebook/Instagram Lead Ads or our website, we may collect personal details that you voluntarily provide to us:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #e31c23' }}>
                <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Contact Information:</strong>
                <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5' }}>Full Name, Email Address, Phone / WhatsApp Number, and City / Region.</span>
              </div>
              <div style={{ padding: '1.1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #0284c7' }}>
                <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Academic & Professional Information:</strong>
                <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5' }}>Highest educational qualification, intended field of study/major, current employment status, or work experience (where relevant for entry evaluations).</span>
              </div>
              <div style={{ padding: '1.1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Technical Data:</strong>
                <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5' }}>Information automatically shared via Meta platforms, such as IP address, device type, browser data, and ad interaction metrics via the Meta Pixel or Conversions API.</span>
              </div>
            </div>
          </div>

          {/* 2. How We Use Your Information */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.25rem', marginBottom: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sliders size={20} style={{ color: '#e31c23' }} />
              2. How We Use Your Information
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              We collect your information for specific academic and administrative purposes, including:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.2rem' }} />
                <span style={{ color: '#334155', fontSize: '0.94rem', lineHeight: '1.55' }}><strong>Counseling & Enquiries:</strong> Contacting you via phone, WhatsApp, or email to answer questions regarding our degree, diploma, and certificate programs.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.2rem' }} />
                <span style={{ color: '#334155', fontSize: '0.94rem', lineHeight: '1.55' }}><strong>Admissions & Processing:</strong> Assessing entry eligibility (including standard, top-up, or advanced standing pathways) and providing relevant course brochures/fee structures.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.2rem' }} />
                <span style={{ color: '#334155', fontSize: '0.94rem', lineHeight: '1.55' }}><strong>Event Notifications:</strong> Inviting you to academic webinars, workshops, information sessions, or campus open days.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.2rem' }} />
                <span style={{ color: '#334155', fontSize: '0.94rem', lineHeight: '1.55' }}><strong>Marketing & Communications:</strong> Sending personalized educational updates and promotional content, provided you have consented to such communications.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.2rem' }} />
                <span style={{ color: '#334155', fontSize: '0.94rem', lineHeight: '1.55' }}><strong>Ad Performance Analytics:</strong> Analyzing campaign effectiveness to refine our educational outreach.</span>
              </li>
            </ul>
          </div>

          {/* 3. Third-Party Sharing & Data Protection */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.25rem', marginBottom: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Share2 size={20} style={{ color: '#e31c23' }} />
              3. Third-Party Sharing & Data Protection
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>Non-Disclosure:</strong>
                <span style={{ color: '#475569', fontSize: '0.93rem', lineHeight: '1.6' }}>Gatwick College does not sell, rent, or trade your personal information to any third party for commercial marketing purposes.</span>
              </div>
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>Educational & Service Partners:</strong>
                <span style={{ color: '#475569', fontSize: '0.93rem', lineHeight: '1.6' }}>Data may be shared strictly with authorized academic awarding bodies, partner universities (for degree registration purposes), or trusted IT/communication service providers (e.g., CRM systems) bound by strict confidentiality agreements.</span>
              </div>
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>Data Security:</strong>
                <span style={{ color: '#475569', fontSize: '0.93rem', lineHeight: '1.6' }}>We implement standard technical and organizational security measures to protect your personal information against unauthorized access, loss, or misuse.</span>
              </div>
            </div>
          </div>

          {/* 4. Meta / Facebook Tools & Cookies */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.25rem', marginBottom: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Server size={20} style={{ color: '#e31c23' }} />
              4. Meta / Facebook Tools & Cookies
            </h3>
            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '0.85rem' }}>
              Our website and landing pages utilize the Meta Pixel and related tracking technology. These tools allow us to measure ad performance, build custom target audiences, and show relevant course offerings based on your previous activity.
            </p>
            <p style={{ color: '#475569', fontSize: '0.93rem', lineHeight: '1.6', margin: 0 }}>
              You can manage your ad preferences or opt out of personalized tracking directly through your Facebook / Meta Account Settings under <em>Ad Preferences</em>.
            </p>
          </div>

          {/* 5. Your Data Rights & Consent */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.25rem', marginBottom: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={20} style={{ color: '#e31c23' }} />
              5. Your Data Rights & Consent
            </h3>
            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1rem' }}>
              You retain complete control over your personal data:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '0.9rem 1.15rem', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #e31c23' }}>
                <strong style={{ color: '#0a2540' }}>Opt-Out:</strong> <span style={{ color: '#475569', fontSize: '0.92rem' }}>You may opt out of receiving promotional calls, messages, or marketing emails at any time by replying "STOP" or using the unsubscribe link provided in our emails.</span>
              </div>
              <div style={{ padding: '0.9rem 1.15rem', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #0284c7' }}>
                <strong style={{ color: '#0a2540' }}>Access & Correction:</strong> <span style={{ color: '#475569', fontSize: '0.92rem' }}>You have the right to request access to the personal data we hold about you, or ask us to update, correct, or delete your information from our database.</span>
              </div>
            </div>
          </div>

          {/* 6. Contact Us */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.25rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Mail size={20} style={{ color: '#e31c23' }} />
              6. Contact Us & Data Rights Requests
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              If you have any questions regarding this Privacy Policy or wish to exercise your data protection rights, please contact our admissions office:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <strong style={{ color: '#0a2540', display: 'block', fontSize: '1.05rem', marginBottom: '0.6rem', fontWeight: 700 }}>
                  Gatwick College of Business and Technology
                </strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.92rem', marginBottom: '0.6rem' }}>
                  <Mail size={16} style={{ color: '#e31c23', flexShrink: 0 }} />
                  <a href="mailto:admission@gcbt.edu.lk" style={{ color: '#e31c23', textDecoration: 'none', fontWeight: 600 }}>admission@gcbt.edu.lk</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.92rem', marginBottom: '0.6rem' }}>
                  <Phone size={16} style={{ color: '#e31c23', flexShrink: 0 }} />
                  <a href="tel:+94773447878" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 600 }}>+94 77 344 7878</a> <span style={{ color: '#94a3b8' }}>/</span> <a href="tel:+94775667878" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 600 }}>+94 77 566 7878</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569', fontSize: '0.92rem' }}>
                  <Globe size={16} style={{ color: '#e31c23', flexShrink: 0 }} />
                  <a href="http://www.gcbt.edu.lk" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>www.gcbt.edu.lk</a>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
                <strong style={{ color: '#0a2540', display: 'block', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Campus Locations
                </strong>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#334155', fontSize: '0.9rem', marginBottom: '0.85rem' }}>
                  <MapPin size={17} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong style={{ color: '#0a2540' }}>Colombo Campus:</strong><br />
                    <span style={{ color: '#64748b' }}>No. 500, Galle Road, Colombo 06, Sri Lanka</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#334155', fontSize: '0.9rem' }}>
                  <MapPin size={17} style={{ color: '#e31c23', flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong style={{ color: '#0a2540' }}>Kandy Campus:</strong><br />
                    <span style={{ color: '#64748b' }}>No. 26, Hill Street, Kandy, Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
