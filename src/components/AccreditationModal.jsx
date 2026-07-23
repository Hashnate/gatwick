import React from 'react';
import { X, Award, ExternalLink, ShieldCheck } from 'lucide-react';

const ACCREDITATIONS_DATA = {
  othm: {
    name: "OTHM Qualifications (UK)",
    title: "UK Regulated Awarding Organisation",
    logo: "https://www.othm.org.uk/images/othm-logo.png", // We will link standard public URL or just display text
    ofqualNum: "RN5244",
    equivalence: "Qualifications are approved and regulated by Ofqual (Office of Qualifications and Examinations Regulation) which equates directly to UK framework levels (e.g. Level 4/5 = Undergraduate Years 1/2, Level 6 = Final Year, Level 7 = Postgraduate).",
    description: "OTHM is an established UK awarding organisation regulated by Ofqual. GCBT is an approved delivery centre, permitting local delivery of diplomas that allow students to top-up to final years at UK, Australian, and Canadian universities.",
    link: "https://www.othm.org.uk"
  },
  ncc: {
    name: "NCC Education (UK)",
    title: "Global Provider of British Education",
    logo: "",
    ofqualNum: "RN5007",
    equivalence: "Provides standard UK degree pathway systems with full credit compatibility for computing and business domains.",
    description: "Originally part of the National Computing Centre, NCC Education was established in 1966 by the UK government. It offers a direct pathway to computing and business degrees from various UK universities.",
    link: "https://www.nccedu.com"
  },
  gsbe: {
    name: "Geneva School of Business and Economics (GSBE)",
    title: "Swiss Educational Quality Standards",
    logo: "",
    ofqualNum: "N/A",
    equivalence: "Offers Swiss certification and European Credit Transfer System (ECTS) compatibility.",
    description: "GSBE offers partnership programs that integrate Swiss business education frameworks, promoting international mobility, corporate skills, and academic research collaboration.",
    link: "https://genevasbe.ch"
  },
  wes: {
    name: "World Education Services (WES)",
    title: "US & Canada Credential Evaluation",
    logo: "",
    ofqualNum: "N/A",
    equivalence: "Recognizes Ofqual qualifications delivered at GCBT for equivalence to US/Canadian university degrees.",
    description: "WES evaluates academic credentials for students planning to study or work in the US and Canada. Because GCBT's diplomas are UK Ofqual-regulated, WES routinely evaluates them as equivalent to regional university credits, easing visa pathways.",
    link: "https://www.wes.org"
  },
  cpd: {
    name: "CPD Certification Service & The CPD Group (UK)",
    title: "Continuing Professional Development — Accredited Provider #780005",
    logo: "",
    ofqualNum: "Provider #780005",
    equivalence: "Certifies technical executive classes and higher education modules for independent international CPD credits.",
    description: "The CPD Group provides recognized independent CPD accreditation compatible with global professional occupational standards, ensuring GCBT executive programs enhance career resumes.",
    link: "https://thecpd.group"
  },
  veritas: {
    name: "VERITAS University College",
    title: "Global Higher Education Partner",
    logo: "",
    ofqualNum: "N/A",
    equivalence: "Direct degree completion and credit transfer arrangements for GCBT diploma graduates.",
    description: "VERITAS University College partners with GCBT to provide flexible undergraduate top-up degrees and dual-qualification opportunities for students in Sri Lanka.",
    link: "https://www.veritas.edu.my"
  },
  gni: {
    name: "Geneva Nations Institute (GNI)",
    title: "International Educational & Vocational Affiliation",
    logo: "",
    ofqualNum: "N/A",
    equivalence: "European curriculum standards and international vocational mobility frameworks.",
    description: "Geneva Nations Institute provides academic quality assurance and international certification frameworks for Gatwick College students seeking global career pathways.",
    link: "https://genevanations.org"
  },
  ucas: {
    name: "UCAS (Universities and Colleges Admissions Service)",
    title: "UK University Admissions Registered Centre",
    logo: "",
    ofqualNum: "Centre #83401",
    equivalence: "Official UK university application submission and tariff point verification.",
    description: "GCBT is a registered UCAS centre in Sri Lanka. Students can apply directly through GCBT to any UK university for undergraduate and postgraduate placement.",
    link: "https://www.ucas.com"
  },
  qualifi: {
    name: "QUALIFI Awarding Organisation (UK)",
    title: "UK Regulated Awarding Organisation",
    logo: "",
    ofqualNum: "RN5168",
    equivalence: "Ofqual-regulated Level 4, 5, 6, and 7 diplomas directly equivalent to UK Higher Education Credits.",
    description: "QUALIFI is a recognized UK awarding body regulated by Ofqual. Diplomas earned through GCBT carry full academic equivalence for final-year UK top-up degrees.",
    link: "https://www.qualifi.net"
  },
  ofqual: {
    name: "Ofqual (Office of Qualifications and Examinations Regulation)",
    title: "UK Government Qualifications Regulator",
    logo: "",
    ofqualNum: "UK Regulated",
    equivalence: "Official UK government benchmark for academic levels 3 through 8.",
    description: "Ofqual regulates qualifications, examinations, and assessments in England. GCBT's UK awarding partner qualifications strictly adhere to Ofqual quality assurance.",
    link: "https://www.gov.uk/government/organisations/ofqual"
  }
};

export default function AccreditationModal({ activePartner, onClose }) {
  if (!activePartner) return null;
  const partner = ACCREDITATIONS_DATA[activePartner];
  if (!partner) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '10px', 
            backgroundColor: '#f7f4f0', 
            color: '#e31c23', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Award size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.15rem' }}>{partner.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#e31c23', fontWeight: 600 }}>{partner.title}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#0a2540', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Academic Equivalence & Regulation
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#475569' }}>
              {partner.equivalence}
            </p>
          </div>

          {partner.ofqualNum !== "N/A" && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: '#f1f5f9', 
              padding: '0.75rem 1rem', 
              borderRadius: '6px', 
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#0a2540'
            }}>
              <ShieldCheck size={16} style={{ color: '#10b981' }} />
              Ofqual Recognition Number: <span style={{ fontWeight: 700 }}>{partner.ofqualNum}</span>
            </div>
          )}

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#0a2540', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              GCBT Center Partnership Info
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#475569' }}>
              {partner.description}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          <a 
            href={partner.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ width: '100%', gap: '0.5rem' }}
          >
            Visit Official Website <ExternalLink size={16} />
          </a>
          <button onClick={onClose} className="btn btn-secondary" style={{ width: '120px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

