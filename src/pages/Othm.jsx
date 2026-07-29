import React, { useState } from 'react';
import { 
  Award, CheckCircle, BookOpen, Clock, ArrowRight, ShieldCheck, 
  ChevronRight, ExternalLink, GraduationCap, FileText, Globe, Layers, UserCheck 
} from 'lucide-react';

export default function Othm({ setCurrentPage, setSelectedEnquiryCourse, onOpenPartnerModal }) {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const othmCourses = [
    {
        "id": "othm-l3-bm",
        "title": "OTHM Level 3 Diploma in Business Management",
        "level": "Level 3",
        "levelTag": "University Access / Foundation",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/1021/3",
        "summary": "Provides an entry-level understanding of business principles, operations, and management.",
        "modules": [
            "Business Culture and Environment",
            "Introduction to Marketing",
            "Introduction to Finance",
            "Introduction to HRM"
        ],
        "feeLocal": "LKR 110,000",
        "feeInternational": "USD 600"
    },
    {
        "id": "othm-l3-hes",
        "title": "OTHM Level 3 Foundation Diploma for Higher Education Studies",
        "level": "Level 3",
        "levelTag": "University Access / Foundation",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/5224/0",
        "summary": "Designed to provide learners with an entry route to UK undergraduate programs.",
        "modules": [
            "Academic English & Study Skills",
            "Foundation Mathematics",
            "Introduction to Business & Management",
            "IT & Digital Literacy"
        ],
        "feeLocal": "LKR 110,000",
        "feeInternational": "USD 600"
    },
    {
        "id": "othm-l3-acc",
        "title": "OTHM Level 3 Foundation Diploma in Accountancy",
        "level": "Level 3",
        "levelTag": "University Access / Foundation",
        "duration": "6 Months",
        "credits": "60 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5223/8",
        "summary": "Introduces learners to basic accounting processes, concepts, and financial regulation.",
        "modules": [
            "Introduction to Bookkeeping",
            "Introduction to Management Accounting",
            "Business Mathematics",
            "IT for Accountants"
        ],
        "feeLocal": "LKR 110,000",
        "feeInternational": "USD 600"
    },
    {
        "id": "othm-l3-hsc-fd",
        "title": "OTHM Level 3 Foundation Diploma in Health and Social Care",
        "level": "Level 3",
        "levelTag": "University Access / Foundation",
        "duration": "6 Months",
        "credits": "60 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5223/8",
        "summary": "Provides basic knowledge and skills for working in the social care and health sector.",
        "modules": [
            "Communication in Care",
            "Health and Safety",
            "Introduction to Social Care",
            "Human Growth and Development"
        ],
        "feeLocal": "LKR 110,000",
        "feeInternational": "USD 600"
    },
    {
        "id": "othm-l3-it-fd",
        "title": "OTHM Level 3 Foundation Diploma in Information Technology",
        "level": "Level 3",
        "levelTag": "University Access / Foundation",
        "duration": "6 Months",
        "credits": "60 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5224/0",
        "summary": "A foundation course designed to develop computing, digital literacy, and IT skills.",
        "modules": [
            "Introduction to Computing",
            "Basic Software Programming",
            "Web Design Foundations",
            "Digital Literacy"
        ],
        "feeLocal": "LKR 110,000",
        "feeInternational": "USD 600"
    },
    {
        "id": "othm-l4-ab",
        "title": "OTHM Level 4 Diploma in Accounting and Business",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/4523/4",
        "summary": "Equates to the first year of a UK bachelor degree in accounting and corporate finance.",
        "modules": [
            "Financial Accounting",
            "Management Accounting",
            "Corporate Finance",
            "Business Law"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l4-ece",
        "title": "OTHM Level 4 Diploma in Early Childhood Education",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4722/X",
        "summary": "Focuses on early years development, childcare pedagogy, and classroom management.",
        "modules": [
            "Child Development Theories",
            "Early Years Pedagogy",
            "Health and Safety in Childcare",
            "Inclusion in Early Years"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l4-etm",
        "title": "OTHM Level 4 Diploma in Education and Training Management",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/4722/X",
        "summary": "Develops management capabilities for schools, academies, and private education centers.",
        "modules": [
            "Educational Theories",
            "Classroom Management",
            "Lesson Planning & Assessment",
            "Professional Practice"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l4-lsc",
        "title": "OTHM Level 4 Diploma in Logistics and Supply Chain Management",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5660/8",
        "summary": "Covers foundational strategies in fleet transport, inventory, and procurement.",
        "modules": [
            "Principles of Logistics",
            "Inventory Control",
            "Procurement Operations",
            "Supply Chain Management"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l4-pm",
        "title": "OTHM Level 4 Diploma in Project Management",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5660/8",
        "summary": "Teaches fundamental project execution, risk scoping, and team coordination skills.",
        "modules": [
            "Project Scoping and Design",
            "Project Risk Management",
            "Project Resource Allocation",
            "Agile Principles"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l4-psy",
        "title": "OTHM Level 4 Diploma in Psychology",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/6122/7",
        "summary": "Introduces learners to cognitive, social, and developmental psychology research.",
        "modules": [
            "Introduction to Cognitive Psychology",
            "Social Psychology",
            "Developmental Psychology",
            "Research Methods in Psychology"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l4-hospitality",
        "title": "OTHM Level 4 Diploma in Tourism and Hospitality Management",
        "level": "Level 4",
        "levelTag": "Undergraduate Diploma (Year 1 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4987/2",
        "summary": "Foundational training in resort operations, customer relations, food safety, and travel management.",
        "modules": [
            "Contemporary Hospitality Operations",
            "Customer Relationship Management",
            "Tourism Planning",
            "Event Management"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-ab",
        "title": "OTHM Level 5 Diploma in Accounting and Business",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/4524/6",
        "summary": "Equates to the second year of a UK bachelor degree in business accounting.",
        "modules": [
            "Advanced Financial Accounting",
            "Advanced Management Accounting",
            "Audit and Assurance",
            "Taxation Practice"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-ece",
        "title": "OTHM Level 5 Diploma in Early Childhood Education",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4723/1",
        "summary": "Advanced practices in child development theories and nursery management administration.",
        "modules": [
            "Advanced Child Development",
            "Educational Play Theories",
            "Special Educational Needs",
            "Nursery Operations"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-education",
        "title": "OTHM Level 5 Diploma in Education and Training",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5225/2",
        "summary": "An industry-standard teaching qualification preparing educators for post-16 training institutions.",
        "modules": [
            "Theories of Learning",
            "Curriculum Design",
            "Assessment Methods",
            "Action Research"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-etm",
        "title": "OTHM Level 5 Diploma in Education and Training Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5225/2",
        "summary": "Designed to develop management and educational auditing strategies in learners.",
        "modules": [
            "Educational Auditing",
            "Strategic Institutional Planning",
            "Staff Training and Development",
            "Policy Frameworks"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-health",
        "title": "OTHM Level 5 Diploma in Health and Social Care Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5156/8",
        "summary": "Advanced training for nursing managers, clinic administrators, and health system team leaders.",
        "modules": [
            "Promoting Health in Society",
            "Healthcare Policy & Practice",
            "Managing Resources in Health Care",
            "Leadership in Social Care"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-it",
        "title": "OTHM Level 5 Diploma in Information Technology",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4723/1",
        "summary": "Advanced software architecture, cloud database engineering, cybersecurity standards, and IT management.",
        "modules": [
            "Advanced Software Development",
            "Database Management Systems",
            "Network Security",
            "Web Application Architecture"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-psy",
        "title": "OTHM Level 5 Diploma in Psychology",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/6122/7",
        "summary": "Deeper analysis of research methodology, cognitive frameworks, and clinical psychology.",
        "modules": [
            "Biological Psychology",
            "Personality & Individual Differences",
            "Qualitative Research Methods",
            "Clinical Psychology Foundations"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5-thm",
        "title": "OTHM Level 5 Diploma in Tourism and Hospitality Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4988/4",
        "summary": "Managerial operations in international travel sectors, cruise liner, and hotel brands.",
        "modules": [
            "Strategic Tourism Management",
            "Hospitality Service Design",
            "Revenue Management",
            "Sustainable Tourism"
        ],
        "feeLocal": "LKR 165,000",
        "feeInternational": "USD 750"
    },
    {
        "id": "othm-l5ex-ab",
        "title": "OTHM Level 5 Extended Diploma in Accounting and Business",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4523/4 & 603/4524/6",
        "summary": "Comprehensive Year 1 & 2 equivalence covering cost accounting and audit management.",
        "modules": [
            "Financial Accounting",
            "Management Accounting",
            "Audit and Assurance",
            "Taxation Practice"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-business",
        "title": "OTHM Level 5 Extended Diploma in Business Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/3329/7 & 603/3330/3",
        "summary": "Equates to the second year of a UK bachelor's degree. Covers finance, entrepreneurship, and organizational behavior.",
        "modules": [
            "Business Environment",
            "Marketing Essentials",
            "Human Resource Management",
            "Financial Accounting",
            "Strategic Management"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-cs",
        "title": "OTHM Level 5 Extended Diploma in Cyber Security",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/4722/X & 603/4723/1",
        "summary": "Hands-on training in network defense, ethical hacking, and threat intelligence operations.",
        "modules": [
            "Network Defense",
            "Ethical Hacking",
            "Threat Intelligence",
            "Incident Response"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-ece",
        "title": "OTHM Level 5 Extended Diploma in Early Childhood Education",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4722/X & 603/4723/1",
        "summary": "Covers toddler learning development policies, inclusion standards, and nursery operations.",
        "modules": [
            "Child Development Theories",
            "Early Years Pedagogy",
            "Health and Safety",
            "Special Educational Needs"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-etm",
        "title": "OTHM Level 5 Extended Diploma in Education and Training Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/4722/X & 603/4723/1",
        "summary": "Integrates instructional design, educational audit standards, and administrative skills.",
        "modules": [
            "Educational Theories",
            "Classroom Management",
            "Lesson Planning",
            "Strategic Institutional Planning"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-hsc",
        "title": "OTHM Level 5 Extended Diploma in Health and Social Care Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5155/6 & 603/5156/8",
        "summary": "Prepares senior nursing and administration officials for hospital operation leadership.",
        "modules": [
            "Promoting Health",
            "Healthcare Policy",
            "Managing Resources",
            "Leadership in Care"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-it",
        "title": "OTHM Level 5 Extended Diploma in Information Technology",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4722/X & 603/4723/1",
        "summary": "Covers advanced programming languages, database architecture, and network management.",
        "modules": [
            "Computing Fundamentals",
            "Software Programming",
            "Database Systems",
            "Network Security"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-lsc",
        "title": "OTHM Level 5 Extended Diploma in Logistics and Supply Chain Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5660/8",
        "summary": "Deeper logistics frameworks in international supply lines and operations management.",
        "modules": [
            "Supply Chain Principles",
            "Logistics Management",
            "Procurement Strategies",
            "Inventory Control"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-pm",
        "title": "OTHM Level 5 Extended Diploma in Project Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5660/8",
        "summary": "Comprehensive training in corporate resource scoping and strategic agile frameworks.",
        "modules": [
            "Project Scoping",
            "Project Risk Management",
            "Resource Scoping",
            "Agile Frameworks"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-psy",
        "title": "OTHM Level 5 Extended Diploma in Psychology",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/6122/7",
        "summary": "Includes research project modeling, personality assessments, and clinical approaches.",
        "modules": [
            "Developmental Psychology",
            "Cognitive Psychology",
            "Counselling Skills",
            "Research Methods"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l5ex-thm",
        "title": "OTHM Level 5 Extended Diploma in Tourism and Hospitality Management",
        "level": "Level 5",
        "levelTag": "Undergraduate Diploma (Year 2 HND)",
        "duration": "1 Year",
        "credits": "240 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/4987/2 & 603/4988/4",
        "summary": "Combines hotel operations, customer retention plans, and event management.",
        "modules": [
            "Contemporary Hospitality Operations",
            "Customer Relations",
            "Strategic Tourism",
            "Revenue Management"
        ],
        "feeLocal": "LKR 249,000",
        "feeInternational": "USD 1150"
    },
    {
        "id": "othm-l6-bm-d",
        "title": "OTHM Level 6 Diploma in Business Management",
        "level": "Level 6",
        "levelTag": "Graduate Diploma (Final Year Equivalent)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/1022/5",
        "summary": "Equates to the final year of a UK bachelor degree, focusing on corporate strategy.",
        "modules": [
            "Leadership & Change",
            "Strategic Marketing",
            "Corporate Governance",
            "Research Project"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l6-tl",
        "title": "OTHM Level 6 Diploma in Teaching and Learning",
        "level": "Level 6",
        "levelTag": "Graduate Diploma (Final Year Equivalent)",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5226/4",
        "summary": "Advanced credentials for experienced teachers looking to upgrade academic pedagogical skills.",
        "modules": [
            "Advanced Pedagogy",
            "Assessment Strategies",
            "Inclusive Education",
            "Reflective Practice"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-af-d",
        "title": "OTHM Level 7 Diploma in Accounting and Finance",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/5662/1",
        "summary": "Postgraduate course preparing executives for senior financial analysis and global reporting.",
        "modules": [
            "Investment Analysis",
            "Strategic Financial Management",
            "Corporate Reporting",
            "Global Finance"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-bop",
        "title": "OTHM Level 7 Diploma in Business and Organisational Psychology",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/6122/7",
        "summary": "Applies psychology concepts to organizational behavior, corporate culture, and workforce strategy.",
        "modules": [
            "Organisational Behavior",
            "Workplace Psychology",
            "Consumer Psychology",
            "Leadership Development"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-ds",
        "title": "OTHM Level 7 Diploma in Data Science",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/4723/1",
        "summary": "Advanced data mining, machine learning architectures, and statistics for enterprise analytics.",
        "modules": [
            "Machine Learning",
            "Data Mining",
            "Statistical Analysis",
            "Data Visualization"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-eml",
        "title": "OTHM Level 7 Diploma in Education Management and Leadership",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5226/4",
        "summary": "Prepares senior academic directors for policy administration, governance, and auditing.",
        "modules": [
            "Educational Policy",
            "Governance and Quality",
            "Leading Institutional Change",
            "Research Methods"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-hsc-d",
        "title": "OTHM Level 7 Diploma in Health and Social Care Management",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5156/8",
        "summary": "Postgraduate course focused on public health policies, financial governance, and healthcare planning.",
        "modules": [
            "Healthcare Policy Analysis",
            "Financial Management in Care",
            "Strategic Planning",
            "Research Methods"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-hrm-d",
        "title": "OTHM Level 7 Diploma in Human Resource Management",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/3330/3",
        "summary": "Strategic talent acquisition, training alignment, and employee labor relationship strategies.",
        "modules": [
            "Strategic HRM",
            "Talent Acquisition",
            "Employee Relations",
            "Research Project"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-lscm",
        "title": "OTHM Level 7 Diploma in Logistics and Supply Chain Management",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5660/8",
        "summary": "Strategic supply routing, container logistics, and procurement networks.",
        "modules": [
            "Strategic Supply Chain",
            "Global Logistics Operations",
            "Inventory Strategy",
            "Strategic Sourcing"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-pm-d",
        "title": "OTHM Level 7 Diploma in Project Management",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/5660/8",
        "summary": "Teaches advanced risk management, agile scoping, and corporate portfolio governance.",
        "modules": [
            "Planning & Governance",
            "Risk & Quality Management",
            "Agile Project Leadership",
            "Research Methods"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-rm",
        "title": "OTHM Level 7 Diploma in Risk Management",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / Hybrid",
        "ofqualNum": "603/3330/3",
        "summary": "Strategic focus on corporate compliance, auditing, operational vulnerabilities, and protection.",
        "modules": [
            "Corporate Compliance",
            "Operational Risk",
            "Crisis Management",
            "Strategic Risk Control"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-strategic",
        "title": "OTHM Level 7 Diploma in Strategic Management and Leadership",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/5092/8",
        "summary": "Designed for senior executives and directors, offering direct entry pathways to Doctorate / DBA research programs.",
        "modules": [
            "Leadership Practice",
            "Strategic Planning",
            "Global Strategy",
            "Corporate Culture"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-sm",
        "title": "OTHM Level 7 Diploma in Strategic Marketing",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/3330/3",
        "summary": "Advanced consumer profiling, digital analytics campaigns, and brand equity architecture.",
        "modules": [
            "Strategic Marketing Planning",
            "Brand Equity",
            "Digital Marketing Analytics",
            "Consumer Behavior"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    },
    {
        "id": "othm-l7-thm-d",
        "title": "OTHM Level 7 Diploma in Tourism and Hospitality Management",
        "level": "Level 7",
        "levelTag": "Postgraduate / Master Coursework Level",
        "duration": "1 Year",
        "credits": "120 RQF Credits",
        "mode": "Online / In Person / Hybrid",
        "ofqualNum": "603/5091/6",
        "summary": "Strategic management frameworks for international hospitality, service industries, and tourism.",
        "modules": [
            "Strategic Tourism Management",
            "Social Media Marketing",
            "Management Control Systems",
            "Research Methods"
        ],
        "feeLocal": "LKR 195,000",
        "feeInternational": "USD 900"
    }
];

  const filteredCourses = selectedLevel === 'all' 
    ? othmCourses 
    : othmCourses.filter(c => {
        if (selectedLevel === 'Level 4 & 5') {
          return c.level === 'Level 4' || c.level === 'Level 5';
        }
        return c.level === selectedLevel;
      });

  const handleApplyClick = (courseTitle) => {
    setSelectedEnquiryCourse(courseTitle);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
    {/* First Visible Viewport Section (Hero + Framework Level Selector) */}
    <div style={{ 
      minHeight: 'calc(100vh - 75px)', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between' 
    }}>
      {/* 1. Page Hero - 100% Full Covered Background Image Section */}
      <section style={{ 
        backgroundColor: '#030b17',
        backgroundImage: 'url("assets/othm_header_bg.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff', 
        padding: '2.75rem 0 2.25rem 0',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(227, 28, 35, 0.15) 0%, rgba(227, 28, 35, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '0.35rem 0.9rem', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.25)', marginBottom: '0.85rem' }}>
              <img src="assets/partner_othm.png" alt="OTHM UK Official Logo" style={{ height: '24px', width: 'auto', display: 'block' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Regulated UK Awarding Organization
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 900, 
              color: '#ffffff', 
              lineHeight: 1.15, 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)'
            }}>
              OTHM Qualifications (UK) Hub
            </h1>
            
            <p style={{ 
              fontSize: '1rem', 
              color: '#e2e8f0', 
              fontWeight: 500,
              lineHeight: 1.6, 
              marginBottom: '1.25rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
            }}>
              Earn globally recognized British diplomas from <strong style={{ color: '#ffffff' }}>RQF Level 3 to Level 7</strong> at Gatwick College Sri Lanka. 
              Enjoy 100% assignment-based assessment with direct top-up pathways to final-year Bachelor&apos;s and Master&apos;s degrees at top UK, Australian, and Canadian universities.
            </p>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(10, 25, 47, 0.75)', padding: '0.5rem 0.9rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '0.82rem', backdropFilter: 'blur(8px)' }}>
                <ShieldCheck size={15} style={{ color: '#38bdf8' }} />
                <span>Ofqual Regulated: <strong>RN5244</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(10, 25, 47, 0.75)', padding: '0.5rem 0.9rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '0.82rem', backdropFilter: 'blur(8px)' }}>
                <CheckCircle size={15} style={{ color: '#4ade80' }} />
                <span>100% Coursework & Assignments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(10, 25, 47, 0.75)', padding: '0.5rem 0.9rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '0.82rem', backdropFilter: 'blur(8px)' }}>
                <Globe size={15} style={{ color: '#f43f5e' }} />
                <span>WES Approved Equivalence</span>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* 2. OTHM Level Framework Selector */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '1.25rem 0 1.5rem 0', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <h2 className="title-medium" style={{ margin: 0 }}>Explore OTHM Qualification Levels</h2>
            <p className="subtitle" style={{ marginTop: '0.5rem' }}>Filter courses by your current academic or professional entry point</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All OTHM Courses' },
              { id: 'Level 3', label: 'Level 3 (Foundation)' },
              { id: 'Level 4 & 5', label: 'Level 4 & 5 (Undergraduate)' },
              { id: 'Level 6', label: 'Level 6 (Graduate)' },
              { id: 'Level 7', label: 'Level 7 (Postgraduate)' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setSelectedLevel(btn.id)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: selectedLevel === btn.id ? '2px solid #e31c23' : '1px solid #cbd5e1',
                  backgroundColor: selectedLevel === btn.id ? '#e31c23' : '#ffffff',
                  color: selectedLevel === btn.id ? '#ffffff' : '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedLevel === btn.id ? '0 4px 12px rgba(227, 28, 35, 0.25)' : 'none'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>

      {/* 3. OTHM Courses Directory Grid */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="program-card-hover"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      backgroundColor: '#0f172a', 
                      color: '#ffffff', 
                      fontWeight: 800, 
                      fontSize: '0.72rem', 
                      padding: '0.3rem 0.65rem', 
                      borderRadius: '6px',
                      letterSpacing: '0.05em'
                    }}>
                      {course.level}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      Ofqual: {course.ofqualNum}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {course.summary}
                  </p>

                  <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                      Key Modules Covered:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {course.modules.map((m, idx) => (
                        <span key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                 <div>
                  <div className="course-meta" style={{ marginBottom: '1rem' }}>
                    <div className="course-meta-item">
                      <Clock size={14} style={{ color: '#e31c23' }} /> <span>{course.duration}</span>
                    </div>
                    <div className="course-meta-item">
                      <BookOpen size={14} style={{ color: '#2563eb' }} /> <span>{course.credits}</span>
                    </div>
                    <div className="course-meta-item">
                      <Globe size={14} style={{ color: '#16a34a' }} /> <span>{course.mode}</span>
                    </div>
                  </div>

                  {/* Course Fees Section */}
                  <div style={{ 
                    borderTop: '1px dashed #cbd5e1', 
                    paddingTop: '0.85rem', 
                    marginBottom: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Local Students:</span>
                      <span style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 800 }}>{course.feeLocal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>International Students:</span>
                      <span style={{ fontSize: '0.88rem', color: '#2563eb', fontWeight: 800 }}>{course.feeInternational}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleApplyClick(course.title)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                  >
                    Enquire / Apply for Course <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OTHM Degree Progression Pathway */}
      <section className="section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#e31c23', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Direct Degree Progression
            </span>
            <h2 className="title-medium" style={{ margin: '0.25rem 0 0.75rem 0' }}>How OTHM Qualifications Work</h2>
            <p className="subtitle">From diploma enrollment to final-year UK Bachelor&apos;s or Master&apos;s degree completion</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Enroll at GCBT Sri Lanka</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Begin your OTHM Level 4 & 5 Extended Diploma in Colombo, Kandy, or online with flexible payment plans.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e31c23', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Complete Assignments</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Submit practical assignments & project reports assessed directly under Ofqual quality benchmarks. No written exams.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Receive Official Transcripts</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Receive verified OTHM diploma certificates & 240 RQF credits recognized worldwide.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem' }}>
                4
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Top-Up to UK Degree</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Enter directly into the final year (BSc / BA / MBA) at top UK universities on campus or remotely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
