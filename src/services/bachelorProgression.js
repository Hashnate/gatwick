// Bachelor's/Undergraduate Progression Options Data
// File: /var/www/gatwick/src/services/bachelorProgression.js

export const bachelorProgressionData = {
  // 1. Business Diplomas progression to BBA
  "othm-l4-ab": {
    courseType: "bba",
    title: "Bachelor of Business Administration (BBA)",
    overview: "The Bachelor of Business Administration (BBA) is a comprehensive, three-year undergraduate degree designed to prepare students for leadership, strategic decision-making, and organizational innovation in a fast-evolving global marketplace. Grounded in both theoretical rigor and practical business application, the program bridges core managerial concepts with cutting-edge technology and sector-specific expertise. Through a progressive curriculum framework, students build a strong foundational understanding of essential business disciplines before advancing into specialized operational domains and high-demand industry tracks.",
    duration: "3 Years (Full time) / 2 Years Advanced Entry from second year",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 4, 5 and 6 / Bachelor's Degree Pathway",
    assessment: "Quizzes, Exams, Work-based assignments, case studies, and a final dissertation.",
    fees: {
      local: "LKR 24,200 Monthly",
      international: "USD 120 Monthly",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers, working professionals, and school leavers.",
      "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    majors: [
      "Business Analytics",
      "Financial Technology",
      "Information Technology Management",
      "International Business",
      "General Business Administration",
      "Marketing",
      "Human Resource Management",
      "Accounting",
      "Operations and supply chain management",
      "Hospitality and Tourism Management",
      "Customer Experience Management",
      "Project Management"
    ],
    requirements: {
      academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
      mature: "Advanced Entry Route: Should have completed one year full time diploma in Business Management. The Diploma should have been obtained from a university or other higher educational institution regulated by the government of any country. Admission through the Advanced Entry Route is subject to review and final approval. Submit documents to studentaffairs@gcbt.edu.lk.",
      english: "Pass in GCE O/L English, English medium education, or overall IELTS score of 5.5 (or equivalent standard in recognized English tests), or documented proof of working in an English-speaking environment."
    }
  },

  // Map other business courses to BBA
  "othm-l5-ab": { courseType: "bba-ref" },
  "othm-l5ex-ab": { courseType: "bba-ref" },
  "othm-l5-business": { courseType: "bba-ref" },
  "othm-l6-bm-d": { courseType: "bba-ref" },
  "othm-l4-pm": { courseType: "bba-ref" },
  "othm-l5ex-pm": { courseType: "bba-ref" },
  "othm-l4-lsc": { courseType: "bba-ref" },
  "othm-l5ex-lsc": { courseType: "bba-ref" },
  "othm-l4-hospitality": { courseType: "bba-ref" },
  "othm-l5-thm": { courseType: "bba-ref" },
  "othm-l5ex-thm": { courseType: "bba-ref" },

  // 2. IT Diplomas progression to BIT
  "othm-l5-it": {
    courseType: "bit",
    title: "Bachelor of Information Technology (BIT)",
    overview: "The BIT degree prepares aspiring IT professionals, systems managers, and tech entrepreneurs to effectively design, deploy, and govern technology solutions within complex business environments. The curriculum balances core computing disciplines—such as software engineering, database architectures, and cloud computing—with essential business management principles including strategic planning, IT project governance, cybersecurity policy, and enterprise architecture.",
    duration: "3 Years (Full time) / 2 Years Advanced Entry from second year",
    mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
    level: "UK Level 4, 5 and 6 / Bachelor's Degree Pathway",
    assessment: "Quizzes, Exams, Work-based assignments, case studies, and a final dissertation.",
    fees: {
      local: "LKR 24,200 Monthly",
      international: "USD 120 Monthly",
      note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
    },
    whyChoose: [
      "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
      "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time professionals and school leavers.",
      "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
      "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking."
    ],
    requirements: {
      academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
      mature: "Advanced Entry Route: Should have completed one year full time diploma in IT. The Diploma should have been obtained from a university or other higher educational institution regulated by the government of any country. Admission through the Advanced Entry Route is subject to review and final approval. Submit documents to studentaffairs@gcbt.edu.lk.",
      english: "Pass in GCE O/L English, English medium education, or overall IELTS score of 5.5 (or equivalent standard in recognized English tests), or documented proof of working in an English-speaking environment."
    }
  },
  "othm-l5ex-it": { courseType: "bit-ref" },
  "othm-l5ex-cs": { courseType: "bit-ref" },

  // 3. Education Diplomas progression to BA Education Pathways
  "othm-l4-ece": {
    courseType: "multi-education",
    title: "Bachelor's Degree Pathway Options",
    subcourses: {
      ece: {
        title: "Bachelor of Arts in Early Childhood Education (BA in ECE)",
        overview: "This three-year, full-time BA program is designed to equip students with the advanced knowledge, practical skills, and ethical foundation necessary for a successful career in early childhood education (ECE). The curriculum is built on a constructivist philosophy, recognizing the child as an active, capable learner and the educator as a facilitator, researcher, and co-constructor of knowledge. Students will explore the holistic development of children from birth to age 8, delving into pedagogical theories, curriculum design, inclusive practices, and leadership. Through a blend of academic study and embedded practical experiences, graduates will be prepared to create nurturing, stimulating, and inclusive learning environments that foster the cognitive, social, emotional, and physical well-being of every child.",
        duration: "3 Years (Full time) / 2 Years Advanced Entry from second year",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 4, 5 and 6 / Bachelor's Degree Pathway",
        assessment: "Quizzes, Exams, Work-based assignments, case studies, and a final dissertation.",
        fees: {
          local: "LKR 24,200 Monthly",
          international: "USD 120 Monthly",
          note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
        },
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        requirements: {
          academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
          mature: "Advanced Entry Route: Should have completed one year full time diploma in Early Childhood Education. The credit should be equal to 24 (SLQF)/120 UK Credits. Students should complete the 6 credit in the first year with the courses which are not in the curricula of the Diploma. The Diploma should have been obtained from a university or other higher educational institution regulated by the government. Subject to review and final approval. Submit documents to studentaffairs@gcbt.edu.lk.",
          english: "Pass in GCE O/L English, English medium education, or overall IELTS score of 5.5 (or equivalent standard in recognized English tests), or documented proof of working in an English-speaking environment."
        }
      },
      sne: {
        title: "Bachelor of Arts in Special Needs Education (BA in SNE)",
        overview: "The Bachelor of Arts in Special Needs Education (SNE) is a three‑year undergraduate degree designed to prepare knowledgeable, compassionate, and skilled educators who can support the learning, development, and well‑being of children and young people with special educational needs. The program recognizes that every learner has unique strengths and challenges, and that effective special needs education requires a blend of theoretical understanding, evidence‑based practice, and a strong commitment to inclusion and human rights.",
        duration: "3 Years (Full time) / 2 Years Advanced Entry from second year",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 4, 5 and 6 / Bachelor's Degree Pathway",
        assessment: "Quizzes, Exams, Work-based assignments, case studies, and a final dissertation.",
        fees: {
          local: "LKR 24,200 Monthly",
          international: "USD 120 Monthly",
          note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
        },
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        requirements: {
          academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
          mature: "Advanced Entry Route: Should have completed one year full time diploma in Early Childhood Education/SNE/TESOL. The credit should be equal to 24 (SLQF)/120 UK Credits. Students should complete the 6 credit in the first year with the courses which are not in the curricula of the Diploma. The Diploma should have been obtained from a university or other higher educational institution regulated by the government. Subject to review and final approval. Submit documents to studentaffairs@gcbt.edu.lk.",
          english: "Pass in GCE O/L English, English medium education, or overall IELTS score of 5.5 (or equivalent standard in recognized English tests), or documented proof of working in an English-speaking environment."
        }
      },
      tesol: {
        title: "Bachelor of Arts in TESOL (BA in TESOL)",
        overview: "The Bachelor of Arts in TESOL (Teaching English to Speakers of Other Languages) is a three year undergraduate degree designed for students who wish to become professional English language teachers in a variety of local and international contexts. The programme integrates rigorous linguistic and pedagogical foundations with extensive practical teaching experience, preparing graduates to teach English to learners of different ages, proficiency levels, and cultural backgrounds – from young children to adults, and from general English to English for specific purposes (ESP). Throughout the programme, students are encouraged to adopt a reflective, learner-centred approach, informed by second language acquisition (SLA) research and contemporary communicative methodologies. Graduates will be qualified to teach English in schools, language institutes, universities, and adult education programmes, both domestically and internationally. The programme also prepares students for further study (e.g., MA in TESOL or Applied Linguistics) and for professional certifications such as Cambridge CELTA/DELTA.",
        duration: "3 Years (Full time) / 2 Years Advanced Entry from second year",
        mode: "On-Campus (Colombo & Kandy Hubs), Online, or Hybrid",
        level: "UK Level 4, 5 and 6 / Bachelor's Degree Pathway",
        assessment: "Quizzes, Exams, Work-based assignments, case studies, and a final dissertation.",
        fees: {
          local: "LKR 24,200 Monthly",
          international: "USD 120 Monthly",
          note: "Fees vary based on university partners. Study Now, Pay Later (SNPL) interest-free monthly payment plans available via Myfees.lk."
        },
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        requirements: {
          academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
          mature: "Advanced Entry Route: Should have completed one year full time diploma in Early Childhood Education. The credit should be equal to 24 (SLQF)/120 UK Credits. Students should complete the 6 credit in the first year with the courses which are not in the curricula of the Diploma. The Diploma should have been obtained from a university or other higher educational institution regulated by the government. Subject to review and final approval. Submit documents to studentaffairs@gcbt.edu.lk.",
          english: "Pass in GCE O/L English, English medium education, or overall IELTS score of 5.5 (or equivalent standard in recognized English tests), or documented proof of working in an English-speaking environment."
        }
      }
    }
  },

  // Link other education courses to ECE/SNE/TESOL Multi-Education block
  "othm-l5-ece": { courseType: "multi-education-ref", targetId: "othm-l4-ece" },
  "othm-l5ex-ece": { courseType: "multi-education-ref", targetId: "othm-l4-ece" },
  "othm-l4-etm": { courseType: "multi-education-ref", targetId: "othm-l4-ece" },
  "othm-l5-etm": { courseType: "multi-education-ref", targetId: "othm-l4-ece" },
  "othm-l5ex-etm": { courseType: "multi-education-ref", targetId: "othm-l4-ece" },
  "othm-l5-education": { courseType: "multi-education-ref", targetId: "othm-l4-ece" },
  "othm-l6-tl": { courseType: "multi-education-ref", targetId: "othm-l4-ece" }
};
