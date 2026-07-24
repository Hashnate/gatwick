import React from 'react';
import { ShieldCheck, FileText, CheckCircle } from 'lucide-react';

export default function Legal() {
  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '3rem 0 2rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Compliance & Policies
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0', color: '#0a2540' }}>Institutional Legal Policies</h1>
        </div>
      </section>

      {/* Policies Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Privacy Policy */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', color: '#0a2540' }}>
                <ShieldCheck size={24} style={{ color: '#e31c23' }} />
                <h2 style={{ fontSize: '1.5rem', margin: '0' }}>1. Privacy Policy</h2>
              </div>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                At Gatwick College of Business and Technology (GCBT), we are committed to protecting the privacy of our students, staff, and website visitors. This privacy statement outlines how we collect, process, and secure user information.
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We collect personal information through admission enquiry forms, portal registration forms, and standard browser cookie logs. This information is utilized solely for academic counseling, course registrations, and internal service delivery. We do not disclose student records to unauthorized third parties, except as required for compliance audits by UK awarding bodies.
              </p>
            </div>

            {/* Terms & Conditions */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', color: '#0a2540' }}>
                <FileText size={24} style={{ color: '#e31c23' }} />
                <h2 style={{ fontSize: '1.5rem', margin: '0' }}>2. Terms & Conditions</h2>
              </div>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                By accessing this website, student portals, and regional academic libraries, you agree to comply with GCBT's terms of service and code of conduct.
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                All academic materials, lectures, syllabi, software licenses, and website designs are protected under intellectual property laws. Students are prohibited from sharing portal authentication credentials, plagiarizing content, or violating the academic integrity standards of OTHM/NCC qualifications.
              </p>
            </div>

            {/* Accessibility Statement */}
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', color: '#0a2540' }}>
                <CheckCircle size={24} style={{ color: '#e31c23' }} />
                <h2 style={{ fontSize: '1.5rem', margin: '0' }}>3. Accessibility Statement</h2>
              </div>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                GCBT is dedicated to providing an inclusive learning experience. We continuously audit our digital campus platforms and website to comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Our website utilizes high contrast color pallets, descriptive alt text for images, and keyboard accessible navigation links to assist students using screen-readers. If you face any technical accessibility barriers, please contact student support services.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
