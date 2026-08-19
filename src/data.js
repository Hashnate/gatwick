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
    "id": "othm-l5-business",
    "title": "OTHM Level 5 Extended Diploma in Business Management",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "assets/course_business_extended.webp",
    "desc": "Equates to the second year of a UK bachelor's degree. Covers finance, entrepreneurship, and organizational behavior.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l7-strategic",
    "title": "OTHM Level 7 Diploma in Strategic Management and Leadership",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
    "desc": "Provides advanced strategic skills for corporate leaders, serving as a direct pathway to an MBA top-up.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l5-education",
    "title": "OTHM Level 5 Diploma in Education and Training",
    "school": "education",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600",
    "desc": "An industry-standard teaching qualification preparing educators for post-16 training institutions.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-health",
    "title": "OTHM Level 5 Diploma in Health and Social Care Management",
    "school": "health",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600",
    "desc": "Advanced training for nursing managers, clinic administrators, and health system team leaders.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-it",
    "title": "OTHM Level 5 Diploma in Information Technology",
    "school": "it",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600",
    "desc": "Advanced software architecture, cloud database engineering, cybersecurity standards, and IT management.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l4-hospitality",
    "title": "OTHM Level 4 Diploma in Tourism and Hospitality Management",
    "school": "tourism",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600",
    "desc": "Foundational training in resort operations, customer relations, food safety, and travel management.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l3-bm",
    "title": "OTHM Level 3 Diploma in Business Management",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L3 Ofqual",
    "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600",
    "desc": "Provides an entry-level understanding of business principles, operations, and management.",
    "credits": 120,
    "feeLocal": "LKR 110,000",
    "feeInternational": "USD 600"
  },
  {
    "id": "othm-l3-hes",
    "title": "OTHM Level 3 Foundation Diploma for Higher Education Studies",
    "school": "education",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L3 Ofqual",
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600",
    "desc": "Designed to provide learners with an entry route to UK undergraduate programs.",
    "credits": 120,
    "feeLocal": "LKR 110,000",
    "feeInternational": "USD 600"
  },
  {
    "id": "othm-l3-acc",
    "title": "OTHM Level 3 Foundation Diploma in Accountancy",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "6 Months",
    "level": "L3 Ofqual",
    "image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600",
    "desc": "Introduces learners to basic accounting processes, concepts, and financial regulation.",
    "credits": 60,
    "feeLocal": "LKR 110,000",
    "feeInternational": "USD 600"
  },
  {
    "id": "othm-l3-hsc-fd",
    "title": "OTHM Level 3 Foundation Diploma in Health and Social Care",
    "school": "health",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "6 Months",
    "level": "L3 Ofqual",
    "image": "assets/course_health_social_care.webp",
    "desc": "Provides basic knowledge and skills for working in the social care and health sector.",
    "credits": 60,
    "feeLocal": "LKR 110,000",
    "feeInternational": "USD 600"
  },
  {
    "id": "othm-l3-it-fd",
    "title": "OTHM Level 3 Foundation Diploma in Information Technology",
    "school": "it",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "6 Months",
    "level": "L3 Ofqual",
    "image": "assets/course_information_technology.webp",
    "desc": "A foundation course designed to develop computing, digital literacy, and IT skills.",
    "credits": 60,
    "feeLocal": "LKR 110,000",
    "feeInternational": "USD 600"
  },
  {
    "id": "othm-l4-ab",
    "title": "OTHM Level 4 Diploma in Accounting and Business",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "assets/course_business_accountancy.webp",
    "desc": "Equates to the first year of a UK bachelor degree in accounting and corporate finance.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l4-ece",
    "title": "OTHM Level 4 Diploma in Early Childhood Education",
    "school": "education",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=600",
    "desc": "Focuses on early years development, childcare pedagogy, and classroom management.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l4-etm",
    "title": "OTHM Level 4 Diploma in Education and Training Management",
    "school": "education",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600",
    "desc": "Develops management capabilities for schools, academies, and private education centers.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l4-lsc",
    "title": "OTHM Level 4 Diploma in Logistics and Supply Chain Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600",
    "desc": "Covers foundational strategies in fleet transport, inventory, and procurement.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l4-pm",
    "title": "OTHM Level 4 Diploma in Project Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "assets/course_project_management.webp",
    "desc": "Teaches fundamental project execution, risk scoping, and team coordination skills.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l4-psy",
    "title": "OTHM Level 4 Diploma in Psychology",
    "school": "psychology",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L4 Ofqual",
    "image": "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=600",
    "desc": "Introduces learners to cognitive, social, and developmental psychology research.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-ab",
    "title": "OTHM Level 5 Diploma in Accounting and Business",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "assets/course_business_accountancy.webp",
    "desc": "Equates to the second year of a UK bachelor degree in business accounting.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-ece",
    "title": "OTHM Level 5 Diploma in Early Childhood Education",
    "school": "education",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600",
    "desc": "Advanced practices in child development theories and nursery management administration.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-etm",
    "title": "OTHM Level 5 Diploma in Education and Training Management",
    "school": "education",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600",
    "desc": "Designed to develop management and educational auditing strategies in learners.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-psy",
    "title": "OTHM Level 5 Diploma in Psychology",
    "school": "psychology",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
    "desc": "Deeper analysis of research methodology, cognitive frameworks, and clinical psychology.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5-thm",
    "title": "OTHM Level 5 Diploma in Tourism and Hospitality Management",
    "school": "tourism",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
    "desc": "Managerial operations in international travel sectors, cruise liner, and hotel brands.",
    "credits": 120,
    "feeLocal": "LKR 165,000",
    "feeInternational": "USD 750"
  },
  {
    "id": "othm-l5ex-ab",
    "title": "OTHM Level 5 Extended Diploma in Accounting and Business",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "assets/course_business_accountancy.webp",
    "desc": "Comprehensive Year 1 & 2 equivalence covering cost accounting and audit management.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-cs",
    "title": "OTHM Level 5 Extended Diploma in Cyber Security",
    "school": "it",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600",
    "desc": "Hands-on training in network defense, ethical hacking, and threat intelligence operations.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-ece",
    "title": "OTHM Level 5 Extended Diploma in Early Childhood Education",
    "school": "education",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600",
    "desc": "Covers toddler learning development policies, inclusion standards, and nursery operations.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-etm",
    "title": "OTHM Level 5 Extended Diploma in Education and Training Management",
    "school": "education",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600",
    "desc": "Integrates instructional design, educational audit standards, and administrative skills.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-hsc",
    "title": "OTHM Level 5 Extended Diploma in Health and Social Care Management",
    "school": "health",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600",
    "desc": "Prepares senior nursing and administration officials for hospital operation leadership.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-it",
    "title": "OTHM Level 5 Extended Diploma in Information Technology",
    "school": "it",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
    "desc": "Covers advanced programming languages, database architecture, and network management.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-lsc",
    "title": "OTHM Level 5 Extended Diploma in Logistics and Supply Chain Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600",
    "desc": "Deeper logistics frameworks in international supply lines and operations management.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-pm",
    "title": "OTHM Level 5 Extended Diploma in Project Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "assets/course_project_management.webp",
    "desc": "Comprehensive training in corporate resource scoping and strategic agile frameworks.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-psy",
    "title": "OTHM Level 5 Extended Diploma in Psychology",
    "school": "psychology",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600",
    "desc": "Includes research project modeling, personality assessments, and clinical approaches.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l5ex-thm",
    "title": "OTHM Level 5 Extended Diploma in Tourism and Hospitality Management",
    "school": "tourism",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L5 Ofqual",
    "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600",
    "desc": "Combines hotel operations, customer retention plans, and event management.",
    "credits": 240,
    "feeLocal": "LKR 249,000",
    "feeInternational": "USD 1150"
  },
  {
    "id": "othm-l6-bm-d",
    "title": "OTHM Level 6 Diploma in Business Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L6 Ofqual",
    "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600",
    "desc": "Equates to the final year of a UK bachelor degree, focusing on corporate strategy.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l6-tl",
    "title": "OTHM Level 6 Diploma in Teaching and Learning",
    "school": "education",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L6 Ofqual",
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600",
    "desc": "Advanced credentials for experienced teachers looking to upgrade academic pedagogical skills.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-af-d",
    "title": "OTHM Level 7 Diploma in Accounting and Finance",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600",
    "desc": "Postgraduate course preparing executives for senior financial analysis and global reporting.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-bop",
    "title": "OTHM Level 7 Diploma in Business and Organisational Psychology",
    "school": "psychology",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600",
    "desc": "Applies psychology concepts to organizational behavior, corporate culture, and workforce strategy.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-ds",
    "title": "OTHM Level 7 Diploma in Data Science",
    "school": "it",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
    "desc": "Advanced data mining, machine learning architectures, and statistics for enterprise analytics.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-eml",
    "title": "OTHM Level 7 Diploma in Education Management and Leadership",
    "school": "education",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600",
    "desc": "Prepares senior academic directors for policy administration, governance, and auditing.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-hsc-d",
    "title": "OTHM Level 7 Diploma in Health and Social Care Management",
    "school": "health",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600",
    "desc": "Postgraduate course focused on public health policies, financial governance, and healthcare planning.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-hrm-d",
    "title": "OTHM Level 7 Diploma in Human Resource Management",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600",
    "desc": "Strategic talent acquisition, training alignment, and employee labor relationship strategies.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-lscm",
    "title": "OTHM Level 7 Diploma in Logistics and Supply Chain Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=600",
    "desc": "Strategic supply routing, container logistics, and procurement networks.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-pm-d",
    "title": "OTHM Level 7 Diploma in Project Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "assets/course_project_management.webp",
    "desc": "Teaches advanced risk management, agile scoping, and corporate portfolio governance.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-rm",
    "title": "OTHM Level 7 Diploma in Risk Management",
    "school": "business",
    "mode": [
      "Online",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=600",
    "desc": "Strategic focus on corporate compliance, auditing, operational vulnerabilities, and protection.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-sm",
    "title": "OTHM Level 7 Diploma in Strategic Marketing",
    "school": "business",
    "mode": [
      "Online",
      "In Person",
      "Hybrid"
    ],
    "campus": [
      "Colombo",
      "Kandy"
    ],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=600",
    "desc": "Advanced consumer profiling, digital analytics campaigns, and brand equity architecture.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },
  {
    "id": "othm-l7-thm-d",
    "title": "OTHM Level 7 Diploma in Tourism and Hospitality Management",
    "school": "tourism",
    "mode": ["Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "1 Year",
    "level": "L7 Ofqual (Postgraduate)",
    "image": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600",
    "desc": "Strategic management frameworks for international hospitality, service industries, and tourism.",
    "credits": 120,
    "feeLocal": "LKR 195,000",
    "feeInternational": "USD 900"
  },

  // ── Bachelor's Degree Programmes ──────────────────────────────────────────
  {
    "id": "bba",
    "title": "Bachelor of Business Administration (BBA)",
    "school": "business",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Years (Full time) / 2 Years Advanced Entry",
    "level": "Bachelor's Degree (UK Level 6)",
    "image": "assets/course_bba.webp",
    "desc": "The Bachelor of Business Administration (BBA) is a comprehensive, three-year undergraduate degree designed to prepare students for leadership, strategic decision-making, and organizational innovation in a fast-evolving global marketplace. Grounded in both theoretical rigor and practical business application, the program bridges core managerial concepts with cutting-edge technology and sector-specific expertise. Through a progressive curriculum framework, students build a strong foundational understanding of essential business disciplines before advancing into specialized operational domains and high-demand industry tracks.",
    "credits": 360,
    "feeLocal": "LKR 24,200 Monthly",
    "feeInternational": "USD 120 Monthly",
    "linkToContact": false,
    "majors": [
      "Business Analytics", "Financial Technology", "Information Technology Management",
      "International Business", "General Business Administration", "Marketing",
      "Human Resource Management", "Accounting", "Operations and Supply Chain Management",
      "Hospitality and Tourism Management", "Customer Experience Management", "Project Management"
    ]
  },
  {
    "id": "bit",
    "title": "Bachelor of Information Technology (BIT)",
    "school": "it",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Years (Full time) / 2 Years Advanced Entry",
    "level": "Bachelor's Degree (UK Level 6)",
    "image": "assets/course_bit.webp",
    "desc": "The BIT degree prepares aspiring IT professionals, systems managers, and tech entrepreneurs to effectively design, deploy, and govern technology solutions within complex business environments. The curriculum balances core computing disciplines—such as software engineering, database architectures, and cloud computing—with essential business management principles including strategic planning, IT project governance, cybersecurity policy, and enterprise architecture.",
    "credits": 360,
    "feeLocal": "LKR 24,200 Monthly",
    "feeInternational": "USD 120 Monthly",
    "linkToContact": false
  },
  {
    "id": "ba-ece",
    "title": "Bachelor of Arts in Early Childhood Education (BA ECE)",
    "school": "education",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Years (Full time) / 2 Years Advanced Entry from second year",
    "level": "Bachelor's Degree (UK Level 6)",
    "image": "assets/course_ba_ece.webp",
    "desc": "This three-year, full-time BA program is designed to equip students with the advanced knowledge, practical skills, and ethical foundation necessary for a successful career in early childhood education (ECE). The curriculum is built on a constructivist philosophy, recognizing the child as an active, capable learner and the educator as a facilitator, researcher, and co-constructor of knowledge. Students will explore the holistic development of children from birth to age 8, delving into pedagogical theories, curriculum design, inclusive practices, and leadership. Through a blend of academic study and embedded practical experiences, graduates will be prepared to create nurturing, stimulating, and inclusive learning environments that foster the cognitive, social, emotional, and physical well-being of every child.",
    "credits": 360,
    "feeLocal": "LKR 24,200 Monthly",
    "feeInternational": "USD 120 Monthly",
    "linkToContact": false
  },
  {
    "id": "ba-sne",
    "title": "Bachelor of Arts in Special Needs Education (BA SNE)",
    "school": "education",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Years (Full time) / 2 Years Advanced Entry",
    "level": "Bachelor's Degree (UK Level 6)",
    "image": "assets/course_ba_sne.webp",
    "desc": "The Bachelor of Arts in Special Needs Education (SNE) is a three‑year undergraduate degree designed to prepare knowledgeable, compassionate, and skilled educators who can support the learning, development, and well‑being of children and young people with special educational needs. The program recognizes that every learner has unique strengths and challenges, and that effective special needs education requires a blend of theoretical understanding, evidence‑based practice, and a strong commitment to inclusion and human rights.",
    "credits": 360,
    "feeLocal": "LKR 24,200 Monthly",
    "feeInternational": "USD 120 Monthly",
    "linkToContact": false
  },
  {
    "id": "ba-tesol",
    "title": "Bachelor of Arts in TESOL (BA TESOL)",
    "school": "linguistics",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Years (Full time) / 2 Years Advanced Entry",
    "level": "Bachelor's Degree (UK Level 6)",
    "image": "assets/course_ba_tesol.webp",
    "desc": "The Bachelor of Arts in TESOL (Teaching English to Speakers of Other Languages) is a three year undergraduate degree designed for students who wish to become professional English language teachers in a variety of local and international contexts. The programme integrates rigorous linguistic and pedagogical foundations with extensive practical teaching experience, preparing graduates to teach English to learners of different ages, proficiency levels, and cultural backgrounds – from young children to adults, and from general English to English for specific purposes (ESP). Throughout the programme, students are encouraged to adopt a reflective, learner centred approach, informed by second language acquisition (SLA) research and contemporary communicative methodologies. Graduates will be qualified to teach English in schools, language institutes, universities, and adult education programmes, both domestically and internationally. The programme also prepares students for further study (e.g., MA in TESOL or Applied Linguistics) and for professional certifications such as Cambridge CELTA/DELTA.",
    "credits": 360,
    "feeLocal": "LKR 24,200 Monthly",
    "feeInternational": "USD 120 Monthly",
    "linkToContact": false
  },
  {
    "id": "mba",
    "title": "Master of Business Administration (MBA)",
    "school": "business",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "12 to 18 Months (Full-Time / Part-Time / Blended)",
    "level": "Master's Degree (UK Level 7)",
    "image": "assets/course_mba.webp",
    "desc": "The Master of Business Administration (MBA) at Gatwick College of Business and Technology is an advanced, executive-level postgraduate program designed to transform ambitious professionals, managers, and entrepreneurs into strategic global leaders. Delivered through flexible on-campus, hybrid, and distance-learning modes, the program bridges theoretical management frameworks with practical, real-world business execution. By combining core executive modules with 9 industry-aligned specialized majors, the Gatwick College MBA empowers students to tailor their qualification to their career goals—whether leading digital transformation, driving corporate finance, or managing international operations.",
    "credits": 180,
    "feeLocal": "LKR 345,000",
    "feeInternational": "USD 2,500",
    "linkToContact": false,
    "modules": [
      "Strategic Leadership & Human Capital Management",
      "Corporate Financial Decision Making & Governance",
      "Strategic Marketing & Brand Positioning",
      "Operations, Supply Chain & Project Management",
      "Research Methodology & Business Analytics",
      "Executive Capstone Project / Master’s Dissertation"
    ],
    "majors": [
      "MBA in Strategic Management & Leadership",
      "MBA in Accounting & Finance",
      "MBA in Information Technology Management",
      "MBA in Human Resource Management",
      "MBA in Strategic Marketing",
      "MBA in Healthcare & Social Care Management",
      "MBA in Project & Operations Management",
      "MBA in Tourism & Hospitality Management",
      "MBA in Educational Leadership & Management"
    ]
  },
  {
    "id": "ma-education",
    "title": "Master of Arts in Education (MA in Education)",
    "school": "education",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "12 to 18 Months (Full-Time / Part-Time / Blended)",
    "level": "Master's Degree (UK Level 7)",
    "image": "assets/course_ma_education.webp",
    "desc": "The Master of Arts in Education (MA in Education) at Gatwick College of Business and Technology, is a comprehensive, intensive, and flexible postgraduate program designed for education professionals aspiring to become critical, research-informed leaders and scholars. Delivered through flexible online live classes, on-campus study, or hybrid modes, the program empowers graduates to address complex educational challenges through an interdisciplinary lens. The curriculum builds a strong foundation in advanced pedagogy, educational research methodologies, and socio-political contexts in the first semester, followed by advanced and trending topics in education during the second semester. This generalist pathway allows educators, school leaders, and academic administrators to craft a holistic understanding of educational theory, policy, and practice across diverse learning environments.",
    "credits": 180,
    "feeLocal": "LKR 345,000",
    "feeInternational": "USD 2,500",
    "linkToContact": false,
    "modules": [
      "Foundations of Education Sciences",
      "Advanced Pedagogical Theories and Practices",
      "Introduction to Educational Research Methods",
      "Critical Issues in Global Education and Policy",
      "The Digital Educator: Technology, Learning, and Society",
      "Advanced Assessment and Data for Educational Improvement",
      "Dissertation in Education"
    ]
  },
  {
    "id": "ma-ece",
    "title": "Master of Arts in Early Childhood Education (MA in ECE)",
    "school": "education",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "12 to 18 Months (Full-Time / Part-Time / Blended)",
    "level": "Master's Degree (UK Level 7)",
    "image": "assets/course_ma_ece.webp",
    "desc": "The Master of Arts in Early Childhood Education (MA in ECE) is a specialized postgraduate program designed for early years practitioners, educational leaders, and policy professionals. Focused on children from birth to eight years, this program moves beyond foundational theories to address complex, contemporary debates shaping global early childhood practice. Grounded in a socio-constructivist and rights-based philosophy, the curriculum equips graduates to lead pedagogical change, design progressive curricula, and advocate for high-quality early childhood ecosystems.",
    "credits": 180,
    "feeLocal": "LKR 345,000",
    "feeInternational": "USD 2,500",
    "linkToContact": false,
    "modules": [
      "Foundations of Education Sciences",
      "Advanced Pedagogical Theories and Practices",
      "Introduction to Educational Research Methods",
      "Advanced Studies in Early Childhood Development & Contemporary Theories",
      "Pedagogical Leadership & Curriculum Innovation in ECE",
      "Policy, Advocacy, and Leadership in Early Childhood Ecosystems",
      "Dissertation in Education"
    ]
  },
  {
    "id": "ma-tesol",
    "title": "Master of Arts in TESOL (MA in TESOL)",
    "school": "linguistics",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "12 to 18 Months (Full-Time / Part-Time / Blended)",
    "level": "Master's Degree (UK Level 7)",
    "image": "assets/course_ma_tesol.webp",
    "desc": "The Master of Arts in TESOL is a specialist, practice-oriented program designed for both aspiring and experienced English language educators who seek to deepen their theoretical knowledge, refine their pedagogical skills, and advance their careers in a global context. This program addresses the complex and dynamic realities of 21st-century language teaching, where English functions as a global lingua franca across diverse cultural, educational, and professional settings. It prepares graduates to be critical, reflective, and highly effective practitioners who can navigate the challenges and opportunities of teaching English to learners of all ages and backgrounds.",
    "credits": 180,
    "feeLocal": "LKR 345,000",
    "feeInternational": "USD 2,500",
    "linkToContact": false,
    "modules": [
      "Foundations of Education Sciences",
      "Advanced Pedagogical Theories and Practices",
      "Introduction to Educational Research Methods",
      "The Systems of English and Second Language Acquisition",
      "Methodology, Curriculum, and Materials Design",
      "Assessment, Digital Literacies, and Critical Pedagogies",
      "Dissertation in Education"
    ]
  },
  {
    "id": "ma-sne",
    "title": "Master of Arts in Special Needs Education (MA in SNE)",
    "school": "education",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "12 to 18 Months (Full-Time / Part-Time / Blended)",
    "level": "Master's Degree (UK Level 7)",
    "image": "assets/course_ma_sne.webp",
    "desc": "The Master of Arts in Inclusive and Special Needs Education is a specialist, transformative program designed for educators, therapists, support staff, and aspiring leaders who are committed to advancing equity, access, and participation for all learners, particularly those with diverse learning needs and disabilities. In an era of global commitment to inclusive education, this program moves beyond compliance with policy to foster a deep, critical understanding of how to create educational environments where every individual can thrive. It prepares graduates to be not just practitioners, but advocates, innovators, and change agents within their educational communities.",
    "credits": 180,
    "feeLocal": "LKR 345,000",
    "feeInternational": "USD 2,500",
    "linkToContact": false,
    "modules": [
      "Foundations of Education Sciences",
      "Advanced Pedagogical Theories and Practices",
      "Introduction to Educational Research Methods",
      "Critical Perspectives on Policy, Theory, and Models in Inclusion",
      "Assessment, Curriculum Adaptation, and Inclusive Pedagogies",
      "Collaborative Partnerships and Systemic Support for Inclusion",
      "Dissertation in Education"
    ]
  },
  {
    "id": "msc-psychology",
    "title": "Master of Science in Psychology (MSc in Psychology)",
    "school": "psychology",
    "mode": ["On-Campus", "Online", "Hybrid"],
    "campus": ["Colombo", "Kandy"],
    "duration": "12 to 18 Months (Full-Time / Part-Time / Blended)",
    "level": "Master's Degree (UK Level 7)",
    "image": "assets/course_msc_psychology.webp",
    "desc": "The Master of Science (MSc) in Psychology is an advanced, post-graduate program specifically engineered to provide a thorough transition into the scientific study of human behavior, cognition, and emotion. The program accommodates both psychology graduates seeking deep, specialized training and non-psychology graduates pivoting into the field. By establishing a demanding thirty six SLQF credit architecture (equivalent to 180 UK credits), the program bridges the gap between historical foundational theory and highly technical practical applications, preparing candidates to operate effectively across diverse global and local institutional landscapes.",
    "credits": 180,
    "feeLocal": "LKR 345,000",
    "feeInternational": "USD 2,500",
    "linkToContact": false,
    "modules": [
      "Foundations of Psychological Theory",
      "Lifespan Development & Social Behavior",
      "Cognitive & Biological Bases of Mind",
      "Essentials of Research Methods",
      "Professional Ethics & Applied Practice"
    ],
    "majors": [
      "Business Psychology",
      "Educational Psychology",
      "Applied Psychology and Counselling",
      "General Psychology"
    ]
  },
  {
    "id": "dip-tt-ece",
    "title": "Diploma in TT and ECE",
    "school": "education",
    "mode": ["Online", "In Person"],
    "campus": ["Colombo", "Kandy"],
    "duration": "6/12 Months",
    "level": "UK RQF Level 4",
    "image": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600",
    "desc": "A comprehensive Level 4 Diploma focusing on Teacher Training (TT) and Early Childhood Education (ECE).",
    "credits": 120,
    "feeLocal": "LKR 55,000",
    "feeInternational": "USD 300",
    "linkToContact": false
  },
  {
    "id": "dip-sne",
    "title": "Diploma in Special Needs Education",
    "school": "education",
    "mode": ["Online", "In Person"],
    "campus": ["Colombo", "Kandy"],
    "duration": "6/12 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600",
    "desc": "Designed to provide core understanding and practical tools for supporting children with special educational needs.",
    "credits": 120,
    "feeLocal": "LKR 55,000",
    "feeInternational": "USD 300",
    "linkToContact": false
  },
  {
    "id": "dip-ed-psy",
    "title": "Diploma in Educational Psychology",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "assets/course_educational_psychology.webp",
    "desc": "Explores how children learn and develop, focusing on educational settings, pedagogy, and development.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-tesol",
    "title": "Diploma in TESOL",
    "school": "linguistics",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "4 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600",
    "desc": "A practical training program for teaching English to speakers of other languages.",
    "credits": 60,
    "feeLocal": "LKR 40,000",
    "feeInternational": "USD 250",
    "linkToContact": false
  },
  {
    "id": "dip-bm",
    "title": "Diploma in Business Management",
    "school": "business",
    "mode": ["Online", "In Person"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=600",
    "desc": "Introduction to basic principles of business administration, marketing, and leadership.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-comp-acc",
    "title": "Diploma in Computerised Accounting",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "4 Months",
    "level": "UK RQF Level 4",
    "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600",
    "desc": "Practical training in computerized accounting systems, financial record keeping, and spreadsheets.",
    "credits": 60,
    "feeLocal": "LKR 40,000",
    "feeInternational": "USD 250",
    "linkToContact": false
  },
  {
    "id": "dip-fintech",
    "title": "Diploma in FinTech",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600",
    "desc": "A foundational course in financial technology, blockchain basics, and digital banking innovations.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-women-ent",
    "title": "Diploma in Women Entrepreneurship",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "assets/course_women_entrepreneurship.webp",
    "desc": "Empowering women leaders with entrepreneurship skills, start-up launch toolkits, and financial planning.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-tourism-mgmt",
    "title": "Diploma in Tourism Management",
    "school": "tourism",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600",
    "desc": "Focuses on strategic principles of global tourism operations, hospitality, and travel management.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-hrm",
    "title": "Diploma in Human Resource Management",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600",
    "desc": "Introduction to employee relations, talent acquisition, performance management, and HR policy.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-bus-analytics",
    "title": "Diploma in Business Analytics",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
    "desc": "An introduction to data-driven decision making, metrics dashboards, and business intelligence.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-int-business",
    "title": "Diploma in International Business",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "assets/course_international_business.webp",
    "desc": "Covers multinational trade structures, cross-border operations, and international market entry.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-supply-chain",
    "title": "Diploma in Supply Chain and Logistics",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600",
    "desc": "Foundations of procurement, warehousing, global distribution, and logistics operations.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-ai-business",
    "title": "Diploma in Artificial Intelligence for Business",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600",
    "desc": "Explores how to leverage AI tools, automation, and machine learning to optimize corporate operations.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-fashion-design",
    "title": "Diploma in Fashion Design",
    "school": "business",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600",
    "desc": "Focuses on design conceptualization, pattern drafting, apparel manufacturing, and fashion retail.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-psychology",
    "title": "Diploma in Psychology",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "assets/course_psychology.webp",
    "desc": "Introduction to human behavior, cognition, mental health concepts, and social psychology.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-applied-psych",
    "title": "Diploma in Applied Psychology",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=600",
    "desc": "Focuses on real-world applications of psychological science in counseling, groups, and workplaces.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-child-psych",
    "title": "Diploma in Child Psychology",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600",
    "desc": "Covers child growth stages, behavior assessment, play therapy concepts, and parenting support.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-forensic-psych",
    "title": "Diploma in Forensic Psychology",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=600",
    "desc": "Explores the intersection of psychology and the legal system, including criminal behaviors and profiling.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-corp-psych",
    "title": "Diploma in Corporate Psychology & Workplace Mental Health",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "assets/course_corporate_psychology.webp",
    "desc": "Addresses stress management, employee well-being, motivation, and leadership alignment in business.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-cyber-psych",
    "title": "Diploma in Cyber Psychology",
    "school": "psychology",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600",
    "desc": "Studies human interaction with digital technologies, social media behaviors, and cyberbullying.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-cyber-sec",
    "title": "Diploma in Cyber Security",
    "school": "it",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600",
    "desc": "Foundational training in system hacking defense, network protection, and security policies.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-cloud-comp",
    "title": "Diploma in Cloud Computing",
    "school": "it",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "assets/course_cloud_computing.webp",
    "desc": "An introduction to virtualized infrastructures, cloud architectures (AWS/Azure), and web hosting.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-ai-ml",
    "title": "Diploma in AI and Machine Learning",
    "school": "it",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600",
    "desc": "Core mathematical concepts of artificial intelligence, data sets, training models, and prediction loops.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-blockchain",
    "title": "Diploma in Blockchain Technology",
    "school": "it",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600",
    "desc": "Covers distributed ledger technology, cryptocurrency structures, smart contracts, and decentralized finance.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
  },
  {
    "id": "dip-it",
    "title": "Diploma in IT",
    "school": "it",
    "mode": ["Online"],
    "campus": ["Colombo", "Kandy"],
    "duration": "3 Months",
    "level": "UK RQF Level 3",
    "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
    "desc": "Foundational course introducing hardware architectures, operating systems, and basic software logic.",
    "credits": 60,
    "feeLocal": "LKR 35,000",
    "feeInternational": "USD 200",
    "linkToContact": false
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
    name: "Fathima Nishara",
    initial: "F",
    avatarBg: "#7c3aed",
    course: "MBA in Strategic Management",
    rating: 5,
    quote: "Enrolling in the MBA program at Gatwick College was one of the best decisions of my career. The curriculum is structured around real-world business challenges, and the faculty brings tremendous industry experience into every session. Within six months of completing my degree, I secured a senior management position at a leading multinational firm in Colombo. The UGC recognition of my degree gave my employer the confidence they needed.",
    campus: "Colombo"
  },
  {
    id: 4,
    name: "Kasun Perera",
    initial: "K",
    avatarBg: "#0891b2",
    course: "OTHM Level 5 Diploma in Business Management",
    rating: 5,
    quote: "I was working full-time and worried I couldn't manage studies alongside my job. The hybrid mode at Gatwick College made everything possible. The weekend sessions were intensive but very well organized. My OTHM diploma is now recognized by my employer for a promotion, and I'm already progressing towards my Bachelor's degree through the pathway program. This college truly opened doors for me.",
    campus: "Kandy"
  },
  {
    id: 5,
    name: "Amaya Dissanayake",
    initial: "A",
    avatarBg: "#059669",
    course: "BSc (Hons) in Information Technology",
    rating: 5,
    quote: "As a young woman from Kandy, pursuing a UK-recognized degree felt like a distant dream. Gatwick College made it a reality without requiring me to leave the country. The IT program is thorough, the lecturers are knowledgeable, and the online resources are excellent. I graduated with honors and was immediately hired by a software company in Colombo. The WES credential evaluation of my degree also helped me apply for an overseas scholarship.",
    campus: "Kandy"
  },
  {
    id: 6,
    name: "Mohamed Rifkhan",
    initial: "M",
    avatarBg: "#dc2626",
    course: "Diploma in Education & Training",
    rating: 5,
    quote: "I have been a school teacher for over ten years, but without a formal higher education qualification, promotions were always out of reach. The Diploma in Education & Training at Gatwick College gave me not just a recognized credential, but a completely new perspective on pedagogy. The distance learning mode was ideal — I studied from Batticaloa and never had to travel to Colombo. I am now a senior lecturer at a national school.",
    campus: "Distance Learning"
  },
  {
    id: 7,
    name: "Dilini Jayawardena",
    initial: "D",
    avatarBg: "#d97706",
    course: "BA (Hons) in Accounting & Finance",
    rating: 5,
    quote: "After completing my A/Levels, I wasn't sure which path to take. A friend recommended Gatwick College and I haven't looked back since. The Accounting & Finance degree program is rigorous and the support from the academic team is outstanding. I passed all my modules on the first attempt and secured an internship at a top audit firm in Colombo during my second year. Gatwick College is genuinely committed to your success.",
    campus: "Colombo"
  },
  {
    id: 8,
    name: "Pradeep Rathnayake",
    initial: "P",
    avatarBg: "#be185d",
    course: "Master of Science in Healthcare Management",
    rating: 5,
    quote: "I am a registered nurse who wanted to move into hospital administration. The MSc in Healthcare Management at Gatwick College was exactly what I needed. The program blends clinical knowledge with management theory in a way that is directly applicable to the Sri Lankan healthcare sector. My degree is UGC approved and WES recognized, which gave me the credibility to transition into a Hospital Operations Manager role. I am deeply grateful to the entire Gatwick faculty.",
    campus: "Colombo"
  },
  {
    id: 9,
    name: "Tharindu Wickramasinghe",
    initial: "T",
    avatarBg: "#0284c7",
    course: "Level 4 Diploma in Cyber Security & Digital Forensics",
    rating: 5,
    quote: "Choosing Gatwick College for my Diploma in Cyber Security was a game-changer. The practical labs, hands-on vulnerability testing exercises, and mentorship from industry specialists gave me real technical expertise. While completing my final semester, I landed an associate cybersecurity analyst role at a leading tech firm in Colombo. The UK-aligned curriculum gave me a strong edge during technical interviews.",
    campus: "Colombo"
  },
  {
    id: 10,
    name: "Aamina Farook",
    initial: "A",
    avatarBg: "#e11d48",
    course: "Diploma in Applied Psychology & Counselling",
    rating: 5,
    quote: "The Applied Psychology and Counselling program at Gatwick College exceeded all my expectations. The lecturers create an engaging, supportive environment where complex psychological concepts are broken down into practical counseling applications. The flexible schedule allowed me to balance family life and studies smoothly. I am now working as a student guidance counselor and continuing toward my Bachelor's degree.",
    campus: "Kandy"
  },
  {
    id: 11,
    name: "Nadeesha Senaratne",
    initial: "N",
    avatarBg: "#f59e0b",
    course: "Level 4 Diploma in Early Childhood Education & Teaching Methodology",
    rating: 5,
    quote: "As an aspiring pre-school educator, the practical teaching methodology taught at Gatwick College gave me immense confidence. The child psychology modules and lesson planning workshops prepared me directly for classroom environments. I received an offer from a reputed international school in Colombo even before receiving my final graduation transcript!",
    campus: "Colombo"
  },
  {
    id: 12,
    name: "Shalika Bandara",
    initial: "S",
    avatarBg: "#4f46e5",
    course: "OTHM Level 7 Diploma in Human Resource Management",
    rating: 5,
    quote: "The Level 7 Postgraduate Diploma in HRM at Gatwick College helped me bridge the gap between operational HR and strategic executive decision-making. The lecturers gave practical case studies on Sri Lankan labor law alongside UK organizational behavior frameworks. I was promoted to Assistant HR Manager right after completion.",
    campus: "Kandy"
  },
  {
    id: 13,
    name: "Abdul Malik",
    initial: "A",
    avatarBg: "#0d9488",
    course: "Level 3 Foundation Diploma in Higher Education Studies",
    rating: 5,
    quote: "I missed out on direct university entrance after A/Levels, but the Level 3 Foundation at Gatwick College provided the ideal stepping stone. The academic writing, research methods, and critical thinking skills I gained allowed me to seamlessly transition directly into the Level 4 Bachelor degree pathway.",
    campus: "Colombo"
  },
  {
    id: 14,
    name: "Heshani Gunawardena",
    initial: "H",
    avatarBg: "#9333ea",
    course: "Level 4 Diploma in Computerised Accounting and Bookkeeping",
    rating: 5,
    quote: "Learning modern cloud accounting software like QuickBooks, Xero, and ERP systems alongside core financial accounting theory at Gatwick College gave me practical job-ready skills. The faculty was always available to resolve doubts, and the weekend classes suited my work schedule perfectly.",
    campus: "Kandy"
  },
  {
    id: 15,
    name: "Kavishka Silva",
    initial: "K",
    avatarBg: "#ea580c",
    course: "Level 3 Diploma in CyberPsychology & Digital Well-being",
    rating: 5,
    quote: "CyberPsychology is a cutting-edge field that few institutes in Sri Lanka offer. Gatwick College's distance learning platform made studying online effortless with high-quality recorded lectures, digital library access, and prompt lecturer feedback. It gave me a distinct academic profile when applying for overseas postgraduate studies.",
    campus: "Distance Learning"
  },
  {
    id: 16,
    name: "Zaid Mansoor",
    initial: "Z",
    avatarBg: "#16a34a",
    course: "Level 5 Diploma in Tourism & Hospitality Management",
    rating: 5,
    quote: "Gatwick College's strategic hospitality curriculum covers everything from hotel operations and revenue management to customer experience design. Thanks to their industry connections, I was able to secure a supervisory role at a luxury resort chain upon graduation. Highly recommend Gatwick College to anyone pursuing tourism leadership!",
    campus: "Colombo"
  },
  {
    id: 17,
    name: "Shenali De Silva",
    initial: "S",
    avatarBg: "#06b6d4",
    course: "BSc (Hons) in Psychology & Child Development",
    rating: 5,
    quote: "Studying Child Development and Psychology at Gatwick College provided me with in-depth research skills and practical case assessments that set me apart. The faculty gave personalized guidance on my final dissertation, and the degree's UGC approval ensured my qualification was immediately respected when I joined a child wellness clinic in Colombo.",
    campus: "Colombo"
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
    mapUrl: "https://maps.google.com/maps?q=6.8643103,79.8632363&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
    image: "assets/staff_imesha.webp"
  },
  {
    id: 2,
    name: "Kulasegaram Grace Kaarunya",
    program: "Fashion Designing",
    qualifications: "B.Des (Hons) Specialized in Fashion and Lifestyle Design",
    expertise: "Senior Development Merchandiser | Lecturing",
    mobile: "+94 70 532 5955",
    email: "gaayashethra@gmail.com",
    image: "assets/staff_grace.webp"
  },
  {
    id: 3,
    name: "Faleel Jamaldeen",
    program: "Financial Technology & Business Analytics",
    qualifications: "DBA (California) | MBA Finance (UK) | BBA Marketing (Colombo)",
    expertise: "Lecturer of FinTech, Financial Management & Business Analytics",
    mobile: "+94 77 387 0040",
    email: "faleel@gcbt.edu.lk",
    image: "assets/staff_faleel.webp"
  },
  {
    id: 4,
    name: "Ramya Yoganadhan",
    program: "Applied Psychology",
    qualifications: "M.Sc in Applied Psychology | B.Sc in Psychology",
    expertise: "Lecturing & Psychological Counseling",
    mobile: "+94 76 418 0961",
    email: "ramya.zafreen@gmail.com",
    image: "assets/staff_ramya.webp"
  },
  {
    id: 5,
    name: "Mohamed Raazim",
    program: "Business & Hospitality Management",
    qualifications: "MBA | Bachelor of Business Management (Specialized in Tourism & Event Management)",
    expertise: "Business Management, Tourism & Hospitality, Strategic Management",
    mobile: "+94 77 703 1455",
    email: "mamraazim@gmail.com",
    image: "assets/staff_raazim.webp"
  },
  {
    id: 6,
    name: "Manorathnage Lakshitha Iroshan Manorathne",
    program: "English Language & Literature",
    qualifications: "BA (Honours) in English",
    expertise: "Lecturing / Educator & Linguistics",
    mobile: "+94 76 049 8999",
    email: "lakshithamanorathne@gmail.com",
    image: "assets/staff_manorathne.webp"
  },
  {
    id: 7,
    name: "Melani Hansika Nanayakkara",
    program: "Teacher Training & Early Childhood Education",
    qualifications: "M.Sc Applied Psychology & Human Behavior Change | B.Sc in Psychology",
    expertise: "Visiting Lecturer | Life Coach | Speaker | Therapeutic Arts Facilitator",
    mobile: "+94 71 895 8649",
    email: "nanayakkaramelanih@gmail.com",
    image: "assets/staff_melani.webp"
  },
  {
    id: 8,
    name: "Methma Athauda",
    program: "Human Resource Management",
    qualifications: "BBA (Hons) Business Administration | BA (Hons) International Business & Finance | MBA (Reading)",
    expertise: "Business Analyst | Researcher | Tutor",
    mobile: "+94 76 774 5795",
    email: "kavindiathauda@gmail.com",
    image: "assets/staff_methma.webp"
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
    image: "assets/staff_poornima.webp"
  },
  {
    id: 11,
    name: "Kevin Deshan Rajapaksha",
    program: "Information Technology & Engineering",
    qualifications: "B.Eng. in Aeronautical Engineering",
    expertise: "Specialist Engineer – BSS/OSS Operations | IT Lecturer",
    mobile: "+94 78 594 2154",
    email: "kevinrajapaksha@icloud.com",
    image: "assets/staff_kevin.webp"
  },
  {
    id: 12,
    name: "Udanka Premachandra",
    program: "Cyber Security & Information Technology",
    qualifications: "Master in Information Technology | B.Sc in Information Technology",
    expertise: "Cyber Security Lecturing & IT Infrastructure",
    mobile: "+94 77 403 2000",
    email: "udankacbob@gmail.com",
    image: "assets/staff_udanka.webp"
  },
  {
    id: 13,
    name: "Shafiya Zawahir",
    program: "English Language Studies",
    qualifications: "Bachelor of Business Administration (Honors in Accounting & Finance)",
    expertise: "English Teaching & Business Communication",
    mobile: "+94 76 424 5611",
    email: "shafiyy98@gmail.com",
    image: "assets/staff_shafiya.webp"
  }
];
