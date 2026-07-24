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
    image: "assets/slide_show_1.jpeg",
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
    image: "assets/slide_show_2.jpeg",
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
    image: "assets/slide_show_3.jpeg",
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
    image: "assets/slide_show_4.jpeg",
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
    image: "assets/slide_show_5.jpeg",
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
    image: "assets/slide_show_1.jpeg",
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
    image: "assets/slide_show_2.jpeg",
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
    image: "assets/slide_show_3.jpeg",
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
    image: "assets/slide_show_4.jpeg",
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
    image: "assets/slide_show_5.jpeg",
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
    image: "assets/slide_show_1.jpeg",
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
    image: "assets/slide_show_2.jpeg",
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
    image: "assets/slide_show_3.jpeg",
    desc: "Foundational training in resort operations, customer relations, food safety, and travel management."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sadhiya Fazal",
    initial: "S",
    avatarBg: "#e31c23",
    course: "Diploma in Psychology",
    rating: 5,
    quote: "By luck I did get to enroll to the diploma of psychology lecturing by Sir Zamrin Zarook, at Gatwick College. This College and the Lecturer did help me to enhance my knowledge and experience in the field of psychology, to which I am grateful for. Not in least to mention, but I am now able to build the foundation for my career.",
    campus: "Colombo"
  },
  {
    id: 2,
    name: "Razeen RZN",
    initial: "R",
    avatarBg: "#0a2540",
    course: "Diploma in Teacher Training & Psychology",
    rating: 5,
    quote: "Gatwick college is the best place to get higher education and also we have a very good opportunity to learn from home.. The lecturer Zamreen Zarook is amazing the way of his teaching is the best. I did many courses on Foundation and now I am doing diploma in teacher training and diploma in psychology...",
    campus: "Kandy"
  },
  {
    id: 3,
    name: "Dilanka Wijesinghe",
    initial: "D",
    avatarBg: "#2ea3f2",
    course: "OTHM Level 7 Diploma in Strategic Management",
    rating: 5,
    quote: "GCBT offered the perfect hybrid model for my professional schedule. The Ofqual qualification was directly evaluated by WES, enabling my successful pathway to Canada. The staff and instructors were highly supportive at every step.",
    campus: "Colombo"
  },
  {
    id: 4,
    name: "Fathima Ruzna",
    initial: "F",
    avatarBg: "#e31c23",
    course: "Graduate Diploma in Applied Psychology",
    rating: 5,
    quote: "The practical lab sessions and clinical case study approach at the Kandy campus were exceptional. Sourcing the curriculum directly from UK standards ensured my credentials stood out globally.",
    campus: "Kandy"
  },
  {
    id: 5,
    name: "Ahamed Nibras",
    initial: "A",
    avatarBg: "#0284c7",
    course: "OTHM Level 4 & 5 Diploma in Information Technology",
    rating: 5,
    quote: "Studying IT at Gatwick College opened up great opportunities for me. The flexible online and hybrid classes made it easy to balance my job while earning a recognized UK Ofqual qualification.",
    campus: "Colombo"
  },
  {
    id: 6,
    name: "Kavindi Perera",
    initial: "K",
    avatarBg: "#9333ea",
    course: "Diploma in Early Childhood & Primary Education",
    rating: 5,
    quote: "Gatwick College provided the best teaching methodology for educator training. The assignments and interactive workshops helped me gain confidence to work at top international schools in Sri Lanka.",
    campus: "Kandy"
  },
  {
    id: 7,
    name: "Mohomed Shafraz",
    initial: "M",
    avatarBg: "#d97706",
    course: "OTHM Level 4 Diploma in Business & Finance",
    rating: 5,
    quote: "The faculty at Gatwick College are extremely dedicated. The course units are updated with modern industry standards, giving us direct progression into final year UK Bachelor's degree top-ups.",
    campus: "Colombo"
  },
  {
    id: 8,
    name: "Nisansala De Silva",
    initial: "N",
    avatarBg: "#0d9488",
    course: "Diploma in Health & Social Care Management",
    rating: 5,
    quote: "I am really thankful to the management of Gatwick College for their continuous guidance and student support. The blended study option allowed me to complete my diploma with high grades.",
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

export const facultyStaff = [
  {
    id: 1,
    name: "Thathsarani Imesha Wickramaarachchi",
    program: "Special Needs Education",
    qualifications: "M.Sc in Applied Psychology | B.Ed(Hons) in Special Needs Education",
    expertise: "Lecturing & Special Education Pedagogy",
    mobile: "+94 77 888 5686",
    email: "imeshawickramaarachchi@gmail.com",
    image: "assets/staff_imesha.jpg"
  },
  {
    id: 2,
    name: "Kulasegaram Grace Kaarunya",
    program: "Fashion Designing",
    qualifications: "B.Des (Hons) Specialized in Fashion and Lifestyle Design",
    expertise: "Senior Development Merchandiser | Lecturing",
    mobile: "+94 70 532 5955",
    email: "gaayashethra@gmail.com",
    image: "assets/staff_grace.jpg"
  },
  {
    id: 3,
    name: "Faleel Jamaldeen",
    program: "Financial Technology & Business Analytics",
    qualifications: "DBA (California) | MBA Finance (UK) | BBA Marketing (Colombo)",
    expertise: "Lecturer of FinTech, Financial Management & Business Analytics",
    mobile: "+94 77 387 0040",
    email: "faleel@gcbt.edu.lk",
    image: "assets/staff_faleel.jpg"
  },
  {
    id: 4,
    name: "Ramya Yoganadhan",
    program: "Applied Psychology",
    qualifications: "M.Sc in Applied Psychology | B.Sc in Psychology",
    expertise: "Lecturing & Psychological Counseling",
    mobile: "+94 76 418 0961",
    email: "ramya.zafreen@gmail.com",
    image: "assets/staff_ramya.jpg"
  },
  {
    id: 5,
    name: "Mohamed Raazim",
    program: "Business & Hospitality Management",
    qualifications: "MBA | Bachelor of Business Management (Specialized in Tourism & Event Management)",
    expertise: "Business Management, Tourism & Hospitality, Strategic Management",
    mobile: "+94 77 703 1455",
    email: "mamraazim@gmail.com",
    image: "assets/staff_raazim.jpg"
  },
  {
    id: 6,
    name: "Manorathnage Lakshitha Iroshan Manorathne",
    program: "English Language & Literature",
    qualifications: "BA (Honours) in English",
    expertise: "Lecturing / Educator & Linguistics",
    mobile: "+94 76 049 8999",
    email: "lakshithamanorathne@gmail.com",
    image: "assets/staff_manorathne.jpg"
  },
  {
    id: 7,
    name: "Melani Hansika Nanayakkara",
    program: "Teacher Training & Early Childhood Education",
    qualifications: "M.Sc Applied Psychology & Human Behavior Change | B.Sc in Psychology",
    expertise: "Visiting Lecturer | Life Coach | Speaker | Therapeutic Arts Facilitator",
    mobile: "+94 71 895 8649",
    email: "nanayakkaramelanih@gmail.com",
    image: "assets/staff_melani.jpg"
  },
  {
    id: 8,
    name: "Methma Athauda",
    program: "Human Resource Management",
    qualifications: "BBA (Hons) Business Administration | BA (Hons) International Business & Finance | MBA (Reading)",
    expertise: "Business Analyst | Researcher | Tutor",
    mobile: "+94 76 774 5795",
    email: "kavindiathauda@gmail.com",
    image: "assets/staff_methma.jpg"
  },
  {
    id: 9,
    name: "Menaka Madurawala",
    program: "OTHM Level 4 & Early Childhood Education",
    qualifications: "Bachelor of Teaching in Early Childhood Education | Associate Degree in Early Childhood Education",
    expertise: "Lecturing & Teacher Development",
    mobile: "+94 70 207 8877",
    email: "menakamadurawala@yahoo.com",
    image: null
  },
  {
    id: 10,
    name: "Poornima Cooray",
    program: "Teacher Training & Early Childhood Education",
    qualifications: "M.Ed (Specialized in Early Childhood Education)",
    expertise: "OTHM Level 5 Early Childhood Education Lecturing",
    mobile: "+94 76 560 0027",
    email: "poornimacooray28@gmail.com",
    image: "assets/staff_poornima.jpg"
  },
  {
    id: 11,
    name: "Kevin Deshan Rajapaksha",
    program: "Information Technology & Engineering",
    qualifications: "B.Eng. in Aeronautical Engineering",
    expertise: "Specialist Engineer – BSS/OSS Operations | IT Lecturer",
    mobile: "+94 78 594 2154",
    email: "kevinrajapaksha@icloud.com",
    image: "assets/staff_kevin.jpg"
  },
  {
    id: 12,
    name: "Udanka Premachandra",
    program: "Cyber Security & Information Technology",
    qualifications: "Master in Information Technology | B.Sc in Information Technology",
    expertise: "Cyber Security Lecturing & IT Infrastructure",
    mobile: "+94 77 403 2000",
    email: "udankacbob@gmail.com",
    image: "assets/staff_udanka.jpg"
  },
  {
    id: 13,
    name: "Shafiya Zawahir",
    program: "English Language Studies",
    qualifications: "Bachelor of Business Administration (Honors in Accounting & Finance)",
    expertise: "English Teaching & Business Communication",
    mobile: "+94 76 424 5611",
    email: "shafiyy98@gmail.com",
    image: "assets/staff_shafiya.jpg"
  }
];
