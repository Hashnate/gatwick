// Master's Progression Options Data
// File: /var/www/gatwick/src/services/masterProgression.js

// Shared MBA constants — used across all MBA entries in the modal
export const MBA_MAJORS = [
  "MBA in Strategic Management & Leadership",
  "MBA in Accounting & Finance",
  "MBA in Information Technology Management",
  "MBA in Human Resource Management",
  "MBA in Strategic Marketing",
  "MBA in Healthcare & Social Care Management",
  "MBA in Project & Operations Management",
  "MBA in Tourism & Hospitality Management",
  "MBA in Educational Leadership & Management"
];

export const MBA_CORE_MODULES = [
  "Strategic Leadership & Human Capital Management",
  "Corporate Financial Decision Making & Governance",
  "Strategic Marketing & Brand Positioning",
  "Operations, Supply Chain & Project Management",
  "Research Methodology & Business Analytics",
  "Executive Capstone Project / Master's Dissertation"
];

export const MASTERS_RECOGNITION = "All degrees offered through our partner universities hold full institutional recognition by the University Grants Commission (UGC) Sri Lanka and are approved by World Education Services (WES) for foreign credential evaluation (USA, Canada, UK, Australia, New Zealand).";

export const MASTERS_SNPL = "Study Now, Pay Later (SNPL) available in partnership with Myfees.lk — access interest-free loan facilities. Upfront payment enrollees are eligible for special fee discounts. Flexible installment plans also available.";

export const masterProgressionData = {
  // 1. MBA in Strategic Management & Leadership
  "othm-l7-strategic": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Strategic Management & Leadership",
    overview: "Delivered through flexible on-campus, hybrid, and distance-learning modes, this program bridges theoretical management frameworks with practical, real-world business execution. The Strategic Management & Leadership major focuses on enterprise growth, corporate governance, global market expansion, and C-suite decision-making. Ideal for prospective CEOs, managing directors, and senior consultants.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 2. MBA in Accounting & Finance
  "othm-l7-af-d": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Accounting & Finance",
    overview: "This advanced MBA major emphasizes corporate financial strategy, risk management, investment banking, capital markets, and managerial accounting. Designed for finance managers, controllers, and corporate accountants who want to transition into C-suite executive financial roles.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 3. MBA in Information Technology Management
  "othm-l7-ds": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Information Technology Management",
    overview: "Bridges corporate management with cutting-edge IT strategy, cybersecurity governance, enterprise software deployment, and digital transformation. Tailored for IT directors, technology leads, and systems consultants.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 4. MBA in Human Resource Management
  "othm-l7-hrm-d": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Human Resource Management",
    overview: "Explores strategic talent acquisition, organizational behavior, global HR policy, performance management, and labor law. Tailored for HR managers, organizational development leads, and corporate trainers.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 5. MBA in Strategic Marketing
  "othm-l7-sm": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Strategic Marketing",
    overview: "Covers global brand strategy, digital marketing analytics, consumer behavior, and integrated marketing communications. Built for marketing directors, brand managers, and commercial leads seeking to build international market presence.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 6. MBA in Healthcare & Social Care Management
  "othm-l7-hsc-d": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Healthcare & Social Care Management",
    overview: "Focuses on health system governance, quality management in care services, healthcare economics, and social care policy. Designed for hospital administrators, clinical leads, and health service managers.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 7. MBA in Project & Operations Management
  "othm-l7-pm-d": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Project & Operations Management",
    overview: "Covers Agile/Scrum methodologies, supply chain optimization, risk mitigation, and enterprise resource planning. Ideal for project managers, operations heads, and supply chain directors.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 8. MBA in Tourism & Hospitality Management
  "othm-l7-thm-d": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Tourism & Hospitality Management",
    overview: "Addresses destination management, sustainable tourism development, luxury hospitality operations, and global service marketing. Tailored for hotel managers, resort owners, and tourism board executives.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // 9. Special Education Management Case (othm-l7-eml)
  "othm-l7-eml": {
    courseType: "multi-education",
    title: "Postgraduate Master's Progression Options",
    subcourses: {
      mba: {
        title: "Master of Business Administration (MBA)",
        major: "Major in Educational Leadership & Management",
        overview: "Focuses on institutional governance, academic quality assurance, curriculum development policy, and educational technology integration. Designed for school principals, academic directors, and higher education administrators.",
        duration: "12 to 18 Months",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 7 / Master’s Degree Pathway",
        assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
        fees: {
          local: "LKR 345,000",
          international: "USD 2,500",
          note: "Fees vary based on partners. Interest-free installment plans available."
        },
        whyChoose: [
          "Dual / Globally Recognized Credentials aligned with UK Level 7 frameworks.",
          "Flexibility for Working Executives: Weekend and evening lectures.",
          "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost.",
          "Network & Industry Connection: Connect with academic leaders across the region."
        ],
        modules: [
          "Strategic Leadership & Human Capital Management (Core)",
          "Corporate Financial Decision Making & Governance (Core)",
          "Strategic Marketing & Brand Positioning (Core)",
          "Operations, Supply Chain & Project Management (Core)",
          "Research Methodology & Business Analytics (Core)",
          "Executive Capstone Project / Master’s Dissertation (Major Focus)"
        ],
        requirements: {
          academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
          mature: "Age 21 or older with a minimum of 5 years of relevant teaching, administrative, or supervisory experience.",
          english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution."
        }
      },
      ma_edu: {
        title: "Master of Arts in Education (MA in Education)",
        major: "Generalist Education Leadership Pathway",
        overview: "A comprehensive, intensive, and flexible postgraduate program designed for education professionals aspiring to become critical, research-informed leaders and scholars. The generalist pathway allows educators, school leaders, and academic administrators to craft a holistic understanding of educational theory, policy, and practice.",
        duration: "12 to 18 Months",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 7 / Master’s Degree Pathway",
        assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation (No formal written exams).",
        fees: {
          local: "LKR 345,000",
          international: "USD 2,500",
          note: "Fees vary based on partners. Interest-free installment plans available."
        },
        whyChoose: [
          "Global Recognition & Migration Pathways: Recognized by UGC Sri Lanka and approved by WES for foreign credential evaluation (USA, Canada, UK, Australia).",
          "Flexible Learning Schedule: Weekend live online lectures (3–4 hours per week) with LMS recorded access.",
          "European Pathways: Access to European progression through the GNI Education Network (Geneva) and global graduation options."
        ],
        modules: [
          "Foundations of Education Sciences (20 Credits)",
          "Advanced Pedagogical Theories and Practices (20 Credits)",
          "Introduction to Educational Research Methods (20 Credits)",
          "Critical Issues in Global Education and Policy (20 Credits)",
          "The Digital Educator: Technology, Learning, and Society (20 Credits)",
          "Advanced Assessment and Data for Educational Improvement (20 Credits)",
          "Dissertation in Education (60 Credits)"
        ],
        requirements: {
          academic: "Bachelor's Degree (SLQF Level 5/RQF level 6), Honors Degree, or Postgraduate Diploma in a relevant field.",
          mature: "Age 21 or older with a minimum of 5 years of relevant teaching or educational supervisory experience.",
          english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution."
        }
      },
      ma_ece: {
        title: "Master of Arts in Early Childhood Education",
        major: "Specialization in ECE (Birth to 8 Years)",
        overview: "A specialized postgraduate program designed for early years practitioners, educational leaders, and policy professionals. Focused on children from birth to eight years, this program moves beyond foundational theories to address complex, contemporary debates shaping global early childhood practice. Grounded in a socio-constructivist and rights-based philosophy.",
        duration: "12 to 18 Months",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 7 / Master’s Degree Pathway",
        assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation (No formal written exams).",
        fees: {
          local: "LKR 345,000",
          international: "USD 2,500",
          note: "Fees vary based on partners. Interest-free installment plans available."
        },
        whyChoose: [
          "Global Recognition & Migration Pathways: Recognized by UGC Sri Lanka and approved by WES for foreign credential evaluation (USA, Canada, UK, Australia).",
          "Flexible Learning Schedule: Weekend live online lectures (3–4 hours per week) with LMS recorded access.",
          "Pedagogical Leadership Focus: Designed to equip graduates to lead pedagogical change and design progressive early childhood curricula."
        ],
        modules: [
          "Foundations of Education Sciences (20 Credits)",
          "Advanced Pedagogical Theories and Practices (20 Credits)",
          "Introduction to Educational Research Methods (20 Credits)",
          "Advanced Studies in Early Childhood Development & Contemporary Theories (20 Credits)",
          "Pedagogical Leadership & Curriculum Innovation in ECE (20 Credits)",
          "Policy, Advocacy, and Leadership in Early Childhood Ecosystems (20 Credits)",
          "Dissertation in Education (60 Credits)"
        ],
        requirements: {
          academic: "Bachelor's Degree (SLQF Level 5/RQF level 6), Honors Degree, or Postgraduate Diploma in a relevant field.",
          mature: "Age 21 or older with a minimum of 5 years of relevant early-years teaching or supervisory experience.",
          english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution."
        }
      },
      ma_tesol: {
        title: "Master of Arts in TESOL",
        major: "Specialization in Teaching English to Speakers of Other Languages",
        overview: "A specialist, practice-oriented program designed for both aspiring and experienced English language educators who seek to deepen their theoretical knowledge, refine their pedagogical skills, and advance their careers in a global context. Prepares graduates to be critical, reflective, and highly effective practitioners.",
        duration: "12 to 18 Months",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 7 / Master’s Degree Pathway",
        assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation (No formal written exams).",
        fees: {
          local: "LKR 345,000",
          international: "USD 2,500",
          note: "Fees vary based on partners. Interest-free installment plans available."
        },
        whyChoose: [
          "Global Recognition & Migration Pathways: Recognized by UGC Sri Lanka and approved by WES for foreign credential evaluation (USA, Canada, UK, Australia).",
          "Flexible Learning Schedule: Weekend live online lectures (3–4 hours per week) with LMS recorded access.",
          "Global Lingua Franca Focus: Addresses the complex and dynamic realities of 21st-century language teaching across diverse cultural settings."
        ],
        modules: [
          "Foundations of Education Sciences (20 Credits)",
          "Advanced Pedagogical Theories and Practices (20 Credits)",
          "Introduction to Educational Research Methods (20 Credits)",
          "The Systems of English and Second Language Acquisition (20 Credits)",
          "Methodology, Curriculum, and Materials Design in TESOL (20 Credits)",
          "Assessment, Digital Literacies, and Critical Pedagogies in TESOL (20 Credits)",
          "Dissertation in Education (60 Credits)"
        ],
        requirements: {
          academic: "Bachelor's Degree (SLQF Level 5/RQF level 6), Honors Degree, or Postgraduate Diploma in a relevant field.",
          mature: "Age 21 or older with a minimum of 5 years of relevant language teaching experience.",
          english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution."
        }
      },
      ma_sne: {
        title: "Master of Arts in Special Needs Education (MA in SNE)",
        major: "Specialization in Inclusive & Special Needs Education",
        overview: "A specialist, transformative program designed for educators, therapists, support staff, and aspiring leaders who are committed to advancing equity, access, and participation for all learners, particularly those with diverse learning needs and disabilities. Grounded in critical pedagogy and social justice.",
        duration: "12 to 18 Months",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 7 / Master’s Degree Pathway",
        assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation (No formal written exams).",
        fees: {
          local: "LKR 345,000",
          international: "USD 2,500",
          note: "Fees vary based on partners. Interest-free installment plans available."
        },
        whyChoose: [
          "Global Recognition & Migration Pathways: Recognized by UGC Sri Lanka and approved by WES for foreign credential evaluation (USA, Canada, UK, Australia).",
          "Flexible Learning Schedule: Weekend live online lectures (3–4 hours per week) with LMS recorded access.",
          "Inclusive Ecosystem Focus: Equips graduates to act as advocates, innovators, and change agents within their educational communities."
        ],
        modules: [
          "Foundations of Education Sciences (20 Credits)",
          "Advanced Pedagogical Theories and Practices (20 Credits)",
          "Introduction to Educational Research Methods (20 Credits)",
          "Critical Perspectives on Policy, Theory, and Models in Inclusion (20 Credits)",
          "Assessment, Curriculum Adaptation, and Inclusive Pedagogies (20 Credits)",
          "Collaborative Partnerships and Systemic Support for Inclusion (20 Credits)",
          "Dissertation in Education (60 Credits)"
        ],
        requirements: {
          academic: "Bachelor's Degree (SLQF Level 5/RQF level 6), Honors Degree, or Postgraduate Diploma in a relevant field.",
          mature: "Age 21 or older with a minimum of 5 years of relevant teaching or special needs support experience.",
          english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution."
        }
      }
    }
  },

  // 10. Master of Science in Psychology (othm-l7-bop)
  "othm-l7-bop": {
    courseType: "psychology",
    title: "Master of Science in Psychology (MSc in Psychology)",
    major: "MSc Psychology with Specialization Pathways",
    overview: "An advanced, post-graduate program specifically engineered to provide a thorough transition into the scientific study of human behavior, cognition, and emotion. The program accommodates both psychology graduates seeking deep, specialized training and non-psychology graduates pivoting into the field.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Global Recognition & Migration Pathways: Recognized by UGC Sri Lanka and approved by WES for foreign credential evaluation (USA, Canada, UK, Australia).",
      "Flexible Learning Schedule: Weekend live online lectures (3–4 hours per week) with LMS recorded access.",
      "Core Conversion + Specialist Pathways: Allows branching into industry-specific domains without sacrificing core psychological literacy."
    ],
    modules: [
      "Foundations of Psychological Theory (20 Credits)",
      "Lifespan Development & Social Behavior (20 Credits)",
      "Cognitive & Biological Bases of Mind (20 Credits)",
      "Essentials of Research Methods (20 Credits)",
      "Professional Ethics & Applied Practice (20 Credits)",
      "Research Dissertation (60 Credits)",
      "Specialization Track Elective Module (20 Credits)"
    ],
    tracks: [
      "Track 1: Business Psychology (Covers consumer behavior, workforce strategy, and organizational change)",
      "Track 2: Educational Psychology (Covers child learning difficulties, educational testing, and inclusive frameworks)",
      "Track 3: Applied Psychology and Counselling (Covers counseling theories, clinical ethics, and psychotherapy paradigms)",
      "Track 4: General Psychology (Covers advanced cognitive theory, neuropsychology, and cyberpsychology)"
    ],
    requirements: {
      academic: "Bachelor's Degree (SLQF Level 5/RQF level 6), Honors Degree, or Postgraduate Diploma in a relevant field.",
      mature: "Age 21 or older with a minimum of 5 years of relevant teaching, counseling, or administrative experience.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution."
    }
  },

  // Logistics and Supply Chain Management progressions to MBA in Project & Operations Management
  "othm-l7-lscm": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Project & Operations Management",
    overview: "Covers Agile/Scrum methodologies, supply chain optimization, risk mitigation, and enterprise resource planning. Aligns perfectly with Logistics and Supply Chain management backgrounds.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  },

  // Risk Management progression to MBA in Strategic Management & Leadership
  "othm-l7-rm": {
    courseType: "mba",
    title: "Master of Business Administration (MBA)",
    major: "Major in Strategic Management & Leadership",
    overview: "Delivered through flexible on-campus, hybrid, and distance-learning modes, this program bridges theoretical management frameworks with practical, real-world business execution. Aligns perfectly with risk management and compliance backgrounds.",
    duration: "12 to 18 Months",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 7 / Master’s Degree Pathway",
    assessment: "Work-based assignments, strategic case studies, and a final Applied Master's Dissertation or Capstone Project (No formal written exams).",
    fees: {
      local: "LKR 345,000",
      international: "USD 2,500",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials aligned with UK Level 7 postgraduate frameworks.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
      "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    modules: [
      "Strategic Leadership & Human Capital Management (Core)",
      "Corporate Financial Decision Making & Governance (Core)",
      "Strategic Marketing & Brand Positioning (Core)",
      "Operations, Supply Chain & Project Management (Core)",
      "Research Methodology & Business Analytics (Core)",
      "Executive Capstone Project / Master’s Dissertation (Major Focus)"
    ],
    requirements: {
      academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
      mature: "Age 21 or older with a minimum of 5 years of relevant managerial or supervisory experience. Requires Updated CV, highest certifications, and work experience letters.",
      english: "IELTS 5.5 overall (or equivalent recognized standard), or prior degree completed in an English-medium institution, or documented proof of working in an English-speaking environment."
    }
  }
};
