export const schools = [
  {
    id: "business",
    name: "School of Business & Finance",
    icon: "Briefcase",
    desc: "Globally accredited pathways in business management, finance, accounting, and strategic leadership.",
    subsectors: ["Accounting & Finance", "Business & Management", "Project Management"]
  },
  {
    id: "education",
    name: "School of Education & Training",
    icon: "GraduationCap",
    desc: "Professional teaching qualifications and advanced pedagogical methods certified under UK standards.",
    subsectors: ["Teacher Training", "Early Childhood Education", "Educational Leadership"]
  },
  {
    id: "health",
    name: "School of Health & Social Care Management",
    icon: "HeartHandshake",
    desc: "Empowering caregivers and healthcare managers with regulated clinical management pathways.",
    subsectors: ["Health Administration", "Social Care Management", "Caregiving Practice"]
  },
  {
    id: "psychology",
    name: "School of Psychology",
    icon: "Brain",
    desc: "Scientific training in human behavior, counseling, and applied organizational psychology.",
    subsectors: ["General Psychology", "Counseling & Psychotherapy", "Child Psychology"]
  },
  {
    id: "it",
    name: "School of Information Technology",
    icon: "Laptop",
    desc: "Hands-on engineering in software systems, cybersecurity, network architecture, and data science.",
    subsectors: ["Software Engineering", "Cyber Security", "Information Systems"]
  },
  {
    id: "linguistics",
    name: "School of Linguistics (English Academy)",
    icon: "Languages",
    desc: "English language proficiency, business communication, and IELTS preparation courses.",
    subsectors: ["English for Professionals", "Academic English", "IELTS Preparation"]
  },
  {
    id: "executive",
    name: "School of Executive Education",
    icon: "Award",
    desc: "Professional accountancy credentials and certification preparation for globally recognized bodies.",
    subsectors: ["ACCA UK Prep", "AAT Sri Lanka Prep", "ICASL Prep"]
  },
  {
    id: "tourism",
    name: "Tourism & Hospitality Management",
    icon: "Compass",
    desc: "Strategic management frameworks for international hospitality, service industries, and tourism.",
    subsectors: ["Hotel Management", "Strategic Tourism", "Events Management"]
  }
];

export const courses = [
  {
    id: "othm-l3-business",
    title: "OTHM Level 3 Foundation Diploma in Accountancy & Business",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/hero_campus.png",
    desc: "Designed to provide learners with an entry route to UK undergraduate programs in business and finance."
  },
  {
    id: "othm-l4-business",
    title: "OTHM Level 4 Diploma in Business Management",
    school: "business",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/campus_colombo.png",
    desc: "Equates to the first year of a UK bachelor's degree. Focuses on marketing, human resource management, and operations."
  },
  {
    id: "othm-l5-business",
    title: "OTHM Level 5 Extended Diploma in Business Management",
    school: "business",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/hero_graduation.png",
    desc: "Equates to the second year of a UK bachelor's degree. Covers finance, entrepreneurship, and organizational behavior."
  },
  {
    id: "othm-l7-strategic",
    title: "OTHM Level 7 Diploma in Strategic Management & Leadership",
    school: "business",
    mode: ["Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/student_portrait_1.png",
    desc: "Provides advanced strategic skills for corporate leaders, serving as a direct pathway to an MBA top-up."
  },
  {
    id: "othm-l5-education",
    title: "OTHM Level 5 Diploma in Education and Training",
    school: "education",
    mode: ["On-Campus", "Distance"],
    campus: ["Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/campus_kandy.png",
    desc: "An industry-standard teaching qualification preparing educators for post-16 training institutions."
  },
  {
    id: "othm-l3-health",
    title: "OTHM Level 3 Diploma in Health and Social Care",
    school: "health",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/student_portrait_2.png",
    desc: "Foundation training for social care workers, covering safety, ethics, and patient support communication."
  },
  {
    id: "othm-l5-health",
    title: "OTHM Level 5 Diploma in Health and Social Care Management",
    school: "health",
    mode: ["Hybrid", "Distance"],
    campus: ["Colombo"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/hero_campus.png",
    desc: "Advanced training for nursing managers, clinic administrators, and health system team leaders."
  },
  {
    id: "dip-psychology",
    title: "Graduate Diploma in Applied Psychology",
    school: "psychology",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "Advanced Diploma",
    image: "assets/campus_colombo.png",
    desc: "Provides a thorough grounding in developmental, social, cognitive, and clinical psychology frameworks."
  },
  {
    id: "othm-l4-it",
    title: "OTHM Level 4 Diploma in Information Technology",
    school: "it",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/hero_graduation.png",
    desc: "Covers fundamental programming, network engineering, databases, and systems analysis techniques."
  },
  {
    id: "othm-l5-it",
    title: "OTHM Level 5 Diploma in Information Technology",
    school: "it",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/student_portrait_1.png",
    desc: "Advanced software architecture, cloud database engineering, cybersecurity standards, and IT management."
  },
  {
    id: "ielts-prep",
    title: "Advanced IELTS Academic Preparation Program",
    school: "linguistics",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "3 Months",
    level: "Certificate",
    image: "assets/student_portrait_2.png",
    desc: "Intensive training program focusing on writing, speaking, listening, and reading module strategies."
  },
  {
    id: "acca-skills",
    title: "ACCA UK — Applied Skills Level Preparation",
    school: "executive",
    mode: ["Hybrid"],
    campus: ["Colombo"],
    duration: "18 Months",
    level: "Professional Prep",
    image: "assets/campus_kandy.png",
    desc: "Focused modules preparing learners for global chartered accountant accreditation exams."
  },
  {
    id: "othm-l4-hospitality",
    title: "OTHM Level 4 Diploma in Tourism and Hospitality Management",
    school: "tourism",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/hero_campus.png",
    desc: "Foundational training in resort operations, customer relations, food safety, and travel management."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Dilanka Wijesinghe",
    course: "OTHM Level 7 Diploma in Strategic Management",
    quote: "GCBT offered the perfect hybrid model for my professional schedule. The Ofqual qualification was directly evaluated by WES, enabling my successful pathway to Canada. The staff and instructors were highly supportive at every step.",
    image: "assets/student_portrait_1.png",
    campus: "Colombo"
  },
  {
    id: 2,
    name: "Fathima Ruzna",
    course: "Graduate Diploma in Applied Psychology",
    quote: "The practical lab sessions and clinical case study approach at the Kandy campus were exceptional. Sourcing the curriculum directly from UK standards ensured my credentials stood out globally.",
    image: "assets/student_portrait_2.png",
    campus: "Kandy"
  }
];

export const faqs = [
  {
    question: "Are GCBT qualifications recognized globally?",
    answer: "Yes. GCBT delivers qualifications under OTHM and NCC Education, which are UK regulated awarding bodies. These courses are fully recognized by Ofqual (UK Government Office of Qualifications and Examinations Regulation) and verified by credential bodies like WES (World Education Services) and UK ENIC."
  },
  {
    question: "What are the available modes of study?",
    answer: "We support three modes of study: On-Campus (full-time traditional lectures), Hybrid (blended online sessions combined with weekend physical labs), and Distance Learning (fully self-paced online curriculum supported by periodic virtual tutorials)."
  },
  {
    question: "How can I verify the status of my UK qualification?",
    answer: "All certificates are directly issued by the UK awarding bodies (e.g., OTHM) and carry unique registration codes. You can verify your certificates directly through the awarding body's online portal using your student credentials."
  },
  {
    question: "Do you offer flexible installment plans for course fees?",
    answer: "Yes, we offer flexible interest-free monthly installment plans for all our courses. We also partner with local banks to provide student educational loans with extended repayment options."
  },
  {
    question: "What is the entry requirement for Level 3 and Level 4 diplomas?",
    answer: "For Level 3 diplomas, learners must have completed G.C.E. O/Levels or equivalent. For Level 4 diplomas, a completed Level 3 qualification, G.C.E. A/Levels, or relevant work experience is required."
  }
];

export const events = [
  {
    id: 1,
    day: "28",
    month: "Aug",
    title: "Annual Graduation Ceremony 2026",
    time: "09:00 AM - 02:00 PM",
    venue: "BMICH, Colombo"
  },
  {
    id: 2,
    day: "15",
    month: "Sep",
    title: "Global Educational Progression Seminar",
    time: "03:00 PM - 06:00 PM",
    venue: "Online via Zoom / GCBT Colombo"
  },
  {
    id: 3,
    day: "04",
    month: "Oct",
    title: "Kandy Campus Open Day & Career Fair",
    time: "10:00 AM - 04:00 PM",
    venue: "GCBT Kandy Campus"
  }
];
