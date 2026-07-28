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
    name: "School of Tourism & Hospitality Management",
    icon: "Compass",
    desc: "Strategic management frameworks for international hospitality, service industries, and tourism.",
    subsectors: ["Hotel Management", "Strategic Tourism", "Events Management"]
  }
];

export const courses = [
  {
    id: "othm-l5-business",
    title: "OTHM Level 5 Extended Diploma in Business Management",
    school: "business",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_business_extended.jpg",
    desc: "Equates to the second year of a UK bachelor's degree. Covers finance, entrepreneurship, and organizational behavior."
  },
  {
    id: "othm-l7-strategic",
    title: "OTHM Level 7 Diploma in Strategic Management and Leadership",
    school: "business",
    mode: ["Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_strategic_management.jpg",
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
    image: "assets/course_education_training.jpg",
    desc: "An industry-standard teaching qualification preparing educators for post-16 training institutions."
  },
  {
    id: "othm-l5-health",
    title: "OTHM Level 5 Diploma in Health and Social Care Management",
    school: "health",
    mode: ["Hybrid", "Distance"],
    campus: ["Colombo"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_health_management.jpg",
    desc: "Advanced training for nursing managers, clinic administrators, and health system team leaders."
  },
  {
    id: "othm-l5-it",
    title: "OTHM Level 5 Diploma in Information Technology",
    school: "it",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_cloud_cybersecurity.jpg",
    desc: "Advanced software architecture, cloud database engineering, cybersecurity standards, and IT management."
  },
  {
    id: "othm-l4-hospitality",
    title: "OTHM Level 4 Diploma in Tourism and Hospitality Management",
    school: "tourism",
    mode: ["On-Campus", "Hybrid"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_tourism_hospitality.jpg",
    desc: "Foundational training in resort operations, customer relations, food safety, and travel management."
  },
  {
    id: "othm-l3-bm",
    title: "OTHM Level 3 Diploma in Business Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/course_business_management.jpg",
    desc: "Provides an entry-level understanding of business principles, operations, and management."
  },
  {
    id: "othm-l3-hes",
    title: "OTHM Level 3 Foundation Diploma for Higher Education Studies",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Designed to provide learners with an entry route to UK undergraduate programs."
  },
  {
    id: "othm-l3-acc",
    title: "OTHM Level 3 Foundation Diploma in Accountancy",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/course_business_accountancy.jpg",
    desc: "Introduces learners to basic accounting processes, concepts, and financial regulation."
  },
  {
    id: "othm-l3-hsc-fd",
    title: "OTHM Level 3 Foundation Diploma in Health and Social Care",
    school: "health",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/course_health_social_care.jpg",
    desc: "Provides basic knowledge and skills for working in the social care and health sector."
  },
  {
    id: "othm-l3-it-fd",
    title: "OTHM Level 3 Foundation Diploma in Information Technology",
    school: "it",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "6 Months",
    level: "L3 Ofqual",
    image: "assets/course_information_technology.jpg",
    desc: "A foundation course designed to develop computing, digital literacy, and IT skills."
  },
  {
    id: "othm-l4-ab",
    title: "OTHM Level 4 Diploma in Accounting and Business",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_business_accountancy.jpg",
    desc: "Equates to the first year of a UK bachelor degree in accounting and corporate finance."
  },
  {
    id: "othm-l4-ece",
    title: "OTHM Level 4 Diploma in Early Childhood Education",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Focuses on early years development, childcare pedagogy, and classroom management."
  },
  {
    id: "othm-l4-etm",
    title: "OTHM Level 4 Diploma in Education and Training Management",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Develops management capabilities for schools, academies, and private education centers."
  },
  {
    id: "othm-l4-lsc",
    title: "OTHM Level 4 Diploma in Logistics and Supply Chain Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_business_management.jpg",
    desc: "Covers foundational strategies in fleet transport, inventory, and procurement."
  },
  {
    id: "othm-l4-pm",
    title: "OTHM Level 4 Diploma in Project Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_strategic_management.jpg",
    desc: "Teaches fundamental project execution, risk scoping, and team coordination skills."
  },
  {
    id: "othm-l4-psy",
    title: "OTHM Level 4 Diploma in Psychology",
    school: "psychology",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L4 Ofqual",
    image: "assets/course_applied_psychology.jpg",
    desc: "Introduces learners to cognitive, social, and developmental psychology research."
  },
  {
    id: "othm-l5-ab",
    title: "OTHM Level 5 Diploma in Accounting and Business",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_business_accountancy.jpg",
    desc: "Equates to the second year of a UK bachelor degree in business accounting."
  },
  {
    id: "othm-l5-ece",
    title: "OTHM Level 5 Diploma in Early Childhood Education",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Advanced practices in child development theories and nursery management administration."
  },
  {
    id: "othm-l5-etm",
    title: "OTHM Level 5 Diploma in Education and Training Management",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Designed to develop management and educational auditing strategies in learners."
  },
  {
    id: "othm-l5-psy",
    title: "OTHM Level 5 Diploma in Psychology",
    school: "psychology",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_applied_psychology.jpg",
    desc: "Deeper analysis of research methodology, cognitive frameworks, and clinical psychology."
  },
  {
    id: "othm-l5-thm",
    title: "OTHM Level 5 Diploma in Tourism and Hospitality Management",
    school: "tourism",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_tourism_hospitality.jpg",
    desc: "Managerial operations in international travel sectors, cruise liner, and hotel brands."
  },
  {
    id: "othm-l5ex-ab",
    title: "OTHM Level 5 Extended Diploma in Accounting and Business",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_business_accountancy.jpg",
    desc: "Comprehensive Year 1 & 2 equivalence covering cost accounting and audit management."
  },
  {
    id: "othm-l5ex-cs",
    title: "OTHM Level 5 Extended Diploma in Cyber Security",
    school: "it",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_cloud_cybersecurity.jpg",
    desc: "Hands-on training in network defense, ethical hacking, and threat intelligence operations."
  },
  {
    id: "othm-l5ex-ece",
    title: "OTHM Level 5 Extended Diploma in Early Childhood Education",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Covers toddler learning development policies, inclusion standards, and nursery operations."
  },
  {
    id: "othm-l5ex-etm",
    title: "OTHM Level 5 Extended Diploma in Education and Training Management",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Integrates instructional design, educational audit standards, and administrative skills."
  },
  {
    id: "othm-l5ex-hsc",
    title: "OTHM Level 5 Extended Diploma in Health and Social Care Management",
    school: "health",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_health_management.jpg",
    desc: "Prepares senior nursing and administration officials for hospital operation leadership."
  },
  {
    id: "othm-l5ex-it",
    title: "OTHM Level 5 Extended Diploma in Information Technology",
    school: "it",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_cloud_cybersecurity.jpg",
    desc: "Covers advanced programming languages, database architecture, and network management."
  },
  {
    id: "othm-l5ex-lsc",
    title: "OTHM Level 5 Extended Diploma in Logistics and Supply Chain Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_business_management.jpg",
    desc: "Deeper logistics frameworks in international supply lines and operations management."
  },
  {
    id: "othm-l5ex-pm",
    title: "OTHM Level 5 Extended Diploma in Project Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_strategic_management.jpg",
    desc: "Comprehensive training in corporate resource scoping and strategic agile frameworks."
  },
  {
    id: "othm-l5ex-psy",
    title: "OTHM Level 5 Extended Diploma in Psychology",
    school: "psychology",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_applied_psychology.jpg",
    desc: "Includes research project modeling, personality assessments, and clinical approaches."
  },
  {
    id: "othm-l5ex-thm",
    title: "OTHM Level 5 Extended Diploma in Tourism and Hospitality Management",
    school: "tourism",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L5 Ofqual",
    image: "assets/course_tourism_hospitality.jpg",
    desc: "Combines hotel operations, customer retention plans, and event management."
  },
  {
    id: "othm-l6-bm-d",
    title: "OTHM Level 6 Diploma in Business Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L6 Ofqual",
    image: "assets/course_business_management.jpg",
    desc: "Equates to the final year of a UK bachelor degree, focusing on corporate strategy."
  },
  {
    id: "othm-l6-tl",
    title: "OTHM Level 6 Diploma in Teaching and Learning",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L6 Ofqual",
    image: "assets/course_education_training.jpg",
    desc: "Advanced credentials for experienced teachers looking to upgrade academic pedagogical skills."
  },
  {
    id: "othm-l7-af-d",
    title: "OTHM Level 7 Diploma in Accounting and Finance",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_business_accountancy.jpg",
    desc: "Postgraduate course preparing executives for senior financial analysis and global reporting."
  },
  {
    id: "othm-l7-bop",
    title: "OTHM Level 7 Diploma in Business and Organisational Psychology",
    school: "psychology",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_applied_psychology.jpg",
    desc: "Applies psychology concepts to organizational behavior, corporate culture, and workforce strategy."
  },
  {
    id: "othm-l7-ds",
    title: "OTHM Level 7 Diploma in Data Science",
    school: "it",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_cloud_cybersecurity.jpg",
    desc: "Advanced data mining, machine learning architectures, and statistics for enterprise analytics."
  },
  {
    id: "othm-l7-eml",
    title: "OTHM Level 7 Diploma in Education Management and Leadership",
    school: "education",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_education_training.jpg",
    desc: "Prepares senior academic directors for policy administration, governance, and auditing."
  },
  {
    id: "othm-l7-hsc-d",
    title: "OTHM Level 7 Diploma in Health and Social Care Management",
    school: "health",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_health_management.jpg",
    desc: "Postgraduate course focused on public health policies, financial governance, and healthcare planning."
  },
  {
    id: "othm-l7-hrm-d",
    title: "OTHM Level 7 Diploma in Human Resource Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_strategic_management.jpg",
    desc: "Strategic talent acquisition, training alignment, and employee labor relationship strategies."
  },
  {
    id: "othm-l7-lscm",
    title: "OTHM Level 7 Diploma in Logistics and Supply Chain Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_business_management.jpg",
    desc: "Strategic supply routing, container logistics, and procurement networks."
  },
  {
    id: "othm-l7-pm-d",
    title: "OTHM Level 7 Diploma in Project Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_strategic_management.jpg",
    desc: "Teaches advanced risk management, agile scoping, and corporate portfolio governance."
  },
  {
    id: "othm-l7-rm",
    title: "OTHM Level 7 Diploma in Risk Management",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_strategic_management.jpg",
    desc: "Strategic focus on corporate compliance, auditing, operational vulnerabilities, and protection."
  },
  {
    id: "othm-l7-sm",
    title: "OTHM Level 7 Diploma in Strategic Marketing",
    school: "business",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_strategic_management.jpg",
    desc: "Advanced consumer profiling, digital analytics campaigns, and brand equity architecture."
  },
  {
    id: "othm-l7-thm-d",
    title: "OTHM Level 7 Diploma in Tourism and Hospitality Management",
    school: "tourism",
    mode: ["On-Campus", "Hybrid", "Distance"],
    campus: ["Colombo", "Kandy"],
    duration: "12 Months",
    level: "L7 Ofqual (Postgraduate)",
    image: "assets/course_tourism_hospitality.jpg",
    desc: "Strategic management frameworks for international hospitality, service industries, and tourism."
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
    venue: "BMICH, Colombo",
    mapUrl: "https://maps.google.com/maps?q=BMICH,+Colombo&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: 2,
    day: "15",
    month: "Sep",
    title: "Global Educational Progression Seminar",
    time: "03:00 PM - 06:00 PM",
    venue: "Online via Zoom / GCBT Colombo",
    mapUrl: "https://maps.google.com/maps?q=6.883582,79.860076&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: 3,
    day: "04",
    month: "Oct",
    title: "Kandy Campus Open Day & Career Fair",
    time: "10:00 AM - 04:00 PM",
    venue: "GCBT Kandy Campus",
    mapUrl: "https://maps.google.com/maps?q=7.293041,80.635012&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
