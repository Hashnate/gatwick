/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: gcbt_db
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_settings`
--

DROP TABLE IF EXISTS `admin_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_settings`
--

LOCK TABLES `admin_settings` WRITE;
/*!40000 ALTER TABLE `admin_settings` DISABLE KEYS */;
INSERT INTO `admin_settings` VALUES
('admin_passcode','gcbt2026','2026-07-28 12:11:03');
/*!40000 ALTER TABLE `admin_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `school` varchar(100) NOT NULL,
  `level` varchar(50) NOT NULL,
  `mode` varchar(50) NOT NULL DEFAULT 'Full-Time',
  `campus` varchar(100) NOT NULL DEFAULT 'Both Campuses',
  `duration` varchar(100) NOT NULL DEFAULT '12 Months',
  `credits` int(11) NOT NULL DEFAULT 120,
  `description` text DEFAULT NULL,
  `modules` text DEFAULT NULL COMMENT 'JSON array of module strings',
  `image` varchar(512) DEFAULT NULL,
  `ofqual` varchar(100) DEFAULT NULL,
  `fee_local` varchar(50) DEFAULT NULL,
  `fee_international` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `link_to_contact` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES
('ba-ece','Bachelor of Arts in Early Childhood Education (BA ECE)','education','Bachelor\'s Degree (UK Level 6)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','3 Years (Full time) / 2 Years Advanced Entry from second year',360,'This three-year, full-time BA program is designed to equip students with the advanced knowledge, practical skills, and ethical foundation necessary for a successful career in early childhood education (ECE). The curriculum is built on a constructivist philosophy, recognizing the child as an active, capable learner and the educator as a facilitator, researcher, and co-constructor of knowledge. Students will explore the holistic development of children from birth to age 8, delving into pedagogical theories, curriculum design, inclusive practices, and leadership. Through a blend of academic study and embedded practical experiences, graduates will be prepared to create nurturing, stimulating, and inclusive learning environments that foster the cognitive, social, emotional, and physical well-being of every child.','[]','assets/course_ba_ece.webp','','LKR 24,200 Monthly','USD 120 Monthly','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('ba-sne','Bachelor of Arts in Special Needs Education (BA SNE)','education','Bachelor\'s Degree (UK Level 6)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','3 Years (Full time) / 2 Years Advanced Entry',360,'The Bachelor of Arts in Special Needs Education (SNE) is a three‑year undergraduate degree designed to prepare knowledgeable, compassionate, and skilled educators who can support the learning, development, and well‑being of children and young people with special educational needs. The program recognizes that every learner has unique strengths and challenges, and that effective special needs education requires a blend of theoretical understanding, evidence‑based practice, and a strong commitment to inclusion and human rights.','[]','assets/course_ba_sne.webp','','LKR 24,200 Monthly','USD 120 Monthly','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('ba-tesol','Bachelor of Arts in TESOL (BA TESOL)','linguistics','Bachelor\'s Degree (UK Level 6)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','3 Years (Full time) / 2 Years Advanced Entry',360,'The Bachelor of Arts in TESOL (Teaching English to Speakers of Other Languages) is a three year undergraduate degree designed for students who wish to become professional English language teachers in a variety of local and international contexts. The programme integrates rigorous linguistic and pedagogical foundations with extensive practical teaching experience, preparing graduates to teach English to learners of different ages, proficiency levels, and cultural backgrounds – from young children to adults, and from general English to English for specific purposes (ESP). Throughout the programme, students are encouraged to adopt a reflective, learner centred approach, informed by second language acquisition (SLA) research and contemporary communicative methodologies. Graduates will be qualified to teach English in schools, language institutes, universities, and adult education programmes, both domestically and internationally. The programme also prepares students for further study (e.g., MA in TESOL or Applied Linguistics) and for professional certifications such as Cambridge CELTA/DELTA.','[]','assets/course_ba_tesol.webp','','LKR 24,200 Monthly','USD 120 Monthly','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('bba','Bachelor of Business Administration (BBA)','business','Bachelor\'s Degree (UK Level 6)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','3 Years (Full time) / 2 Years Advanced Entry',360,'The Bachelor of Business Administration (BBA) is a comprehensive, three-year undergraduate degree designed to prepare students for leadership, strategic decision-making, and organizational innovation in a fast-evolving global marketplace. Grounded in both theoretical rigor and practical business application, the program bridges core managerial concepts with cutting-edge technology and sector-specific expertise. Through a progressive curriculum framework, students build a strong foundational understanding of essential business disciplines before advancing into specialized operational domains and high-demand industry tracks.','[]','assets/course_bba.webp','','LKR 24,200 Monthly','USD 120 Monthly','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('bit','Bachelor of Information Technology (BIT)','it','Bachelor\'s Degree (UK Level 6)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','3 Years (Full time) / 2 Years Advanced Entry',360,'The BIT degree prepares aspiring IT professionals, systems managers, and tech entrepreneurs to effectively design, deploy, and govern technology solutions within complex business environments. The curriculum balances core computing disciplines—such as software engineering, database architectures, and cloud computing—with essential business management principles including strategic planning, IT project governance, cybersecurity policy, and enterprise architecture.','[]','assets/course_bit.webp','','LKR 24,200 Monthly','USD 120 Monthly','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-ai-business','Diploma in Artificial Intelligence for Business','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Explores how to leverage AI tools, automation, and machine learning to optimize corporate operations.','[]','https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-ai-ml','Diploma in AI and Machine Learning','it','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Core mathematical concepts of artificial intelligence, data sets, training models, and prediction loops.','[]','https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-applied-psych','Diploma in Applied Psychology','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Focuses on real-world applications of psychological science in counseling, groups, and workplaces.','[]','https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-blockchain','Diploma in Blockchain Technology','it','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Covers distributed ledger technology, cryptocurrency structures, smart contracts, and decentralized finance.','[]','https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-bm','Diploma in Business Management','business','UK RQF Level 3','[\"Online\",\"In Person\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Introduction to basic principles of business administration, marketing, and leadership.','[]','https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-bus-analytics','Diploma in Business Analytics','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'An introduction to data-driven decision making, metrics dashboards, and business intelligence.','[]','https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-child-psych','Diploma in Child Psychology','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Covers child growth stages, behavior assessment, play therapy concepts, and parenting support.','[]','https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-cloud-comp','Diploma in Cloud Computing','it','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'An introduction to virtualized infrastructures, cloud architectures (AWS/Azure), and web hosting.','[]','assets/course_cloud_computing.webp','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-comp-acc','Diploma in Computerised Accounting','business','UK RQF Level 4','[\"Online\"]','[\"Colombo\",\"Kandy\"]','4 Months',60,'Practical training in computerized accounting systems, financial record keeping, and spreadsheets.','[]','https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600','','LKR 40,000','USD 250','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-corp-psych','Diploma in Corporate Psychology & Workplace Mental Health','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Addresses stress management, employee well-being, motivation, and leadership alignment in business.','[]','assets/course_corporate_psychology.webp','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-cyber-psych','Diploma in Cyber Psychology','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Studies human interaction with digital technologies, social media behaviors, and cyberbullying.','[]','https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-cyber-sec','Diploma in Cyber Security','it','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Foundational training in system hacking defense, network protection, and security policies.','[]','https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-ed-psy','Diploma in Educational Psychology','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Explores how children learn and develop, focusing on educational settings, pedagogy, and development.','[]','assets/course_educational_psychology.webp','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-fashion-design','Diploma in Fashion Design','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Focuses on design conceptualization, pattern drafting, apparel manufacturing, and fashion retail.','[]','https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-fintech','Diploma in FinTech','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'A foundational course in financial technology, blockchain basics, and digital banking innovations.','[]','https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-forensic-psych','Diploma in Forensic Psychology','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Explores the intersection of psychology and the legal system, including criminal behaviors and profiling.','[]','https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-hrm','Diploma in Human Resource Management','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Introduction to employee relations, talent acquisition, performance management, and HR policy.','[]','https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-int-business','Diploma in International Business','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Covers multinational trade structures, cross-border operations, and international market entry.','[]','assets/course_international_business.webp','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-it','Diploma in IT','it','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Foundational course introducing hardware architectures, operating systems, and basic software logic.','[]','https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-psychology','Diploma in Psychology','psychology','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Introduction to human behavior, cognition, mental health concepts, and social psychology.','[]','assets/course_psychology.webp','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-sne','Diploma in Special Needs Education','education','UK RQF Level 3','[\"Online\",\"In Person\"]','[\"Colombo\",\"Kandy\"]','6/12 Months',120,'Designed to provide core understanding and practical tools for supporting children with special educational needs.','[]','https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600','','LKR 55,000','USD 300','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-supply-chain','Diploma in Supply Chain and Logistics','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Foundations of procurement, warehousing, global distribution, and logistics operations.','[]','https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-tesol','Diploma in TESOL','linguistics','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','4 Months',60,'A practical training program for teaching English to speakers of other languages.','[]','https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600','','LKR 40,000','USD 250','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-tourism-mgmt','Diploma in Tourism Management','tourism','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Focuses on strategic principles of global tourism operations, hospitality, and travel management.','[]','https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-tt-ece','Diploma in TT and ECE','education','UK RQF Level 4','[\"Online\",\"In Person\"]','[\"Colombo\",\"Kandy\"]','6/12 Months',120,'A comprehensive Level 4 Diploma focusing on Teacher Training (TT) and Early Childhood Education (ECE).','[]','https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600','','LKR 55,000','USD 300','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('dip-women-ent','Diploma in Women Entrepreneurship','business','UK RQF Level 3','[\"Online\"]','[\"Colombo\",\"Kandy\"]','3 Months',60,'Empowering women leaders with entrepreneurship skills, start-up launch toolkits, and financial planning.','[]','assets/course_women_entrepreneurship.webp','','LKR 35,000','USD 200','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('ma-ece','Master of Arts in Early Childhood Education (MA in ECE)','education','Master\'s Degree (UK Level 7)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','12 to 18 Months (Full-Time / Part-Time / Blended)',180,'The Master of Arts in Early Childhood Education (MA in ECE) is a specialized postgraduate program designed for early years practitioners, educational leaders, and policy professionals. Focused on children from birth to eight years, this program moves beyond foundational theories to address complex, contemporary debates shaping global early childhood practice. Grounded in a socio-constructivist and rights-based philosophy, the curriculum equips graduates to lead pedagogical change, design progressive curricula, and advocate for high-quality early childhood ecosystems.','[\"Foundations of Education Sciences\",\"Advanced Pedagogical Theories and Practices\",\"Introduction to Educational Research Methods\",\"Advanced Studies in Early Childhood Development & Contemporary Theories\",\"Pedagogical Leadership & Curriculum Innovation in ECE\",\"Policy, Advocacy, and Leadership in Early Childhood Ecosystems\",\"Dissertation in Education\"]','assets/course_ma_ece.webp','','LKR 345,000','USD 2,500','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('ma-education','Master of Arts in Education (MA in Education)','education','Master\'s Degree (UK Level 7)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','12 to 18 Months (Full-Time / Part-Time / Blended)',180,'The Master of Arts in Education (MA in Education) at Gatwick College of Business and Technology, is a comprehensive, intensive, and flexible postgraduate program designed for education professionals aspiring to become critical, research-informed leaders and scholars. Delivered through flexible online live classes, on-campus study, or hybrid modes, the program empowers graduates to address complex educational challenges through an interdisciplinary lens. The curriculum builds a strong foundation in advanced pedagogy, educational research methodologies, and socio-political contexts in the first semester, followed by advanced and trending topics in education during the second semester. This generalist pathway allows educators, school leaders, and academic administrators to craft a holistic understanding of educational theory, policy, and practice across diverse learning environments.','[\"Foundations of Education Sciences\",\"Advanced Pedagogical Theories and Practices\",\"Introduction to Educational Research Methods\",\"Critical Issues in Global Education and Policy\",\"The Digital Educator: Technology, Learning, and Society\",\"Advanced Assessment and Data for Educational Improvement\",\"Dissertation in Education\"]','assets/course_ma_education.webp','','LKR 345,000','USD 2,500','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('ma-sne','Master of Arts in Special Needs Education (MA in SNE)','education','Master\'s Degree (UK Level 7)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','12 to 18 Months (Full-Time / Part-Time / Blended)',180,'The Master of Arts in Inclusive and Special Needs Education is a specialist, transformative program designed for educators, therapists, support staff, and aspiring leaders who are committed to advancing equity, access, and participation for all learners, particularly those with diverse learning needs and disabilities. In an era of global commitment to inclusive education, this program moves beyond compliance with policy to foster a deep, critical understanding of how to create educational environments where every individual can thrive. It prepares graduates to be not just practitioners, but advocates, innovators, and change agents within their educational communities.','[\"Foundations of Education Sciences\",\"Advanced Pedagogical Theories and Practices\",\"Introduction to Educational Research Methods\",\"Critical Perspectives on Policy, Theory, and Models in Inclusion\",\"Assessment, Curriculum Adaptation, and Inclusive Pedagogies\",\"Collaborative Partnerships and Systemic Support for Inclusion\",\"Dissertation in Education\"]','assets/course_ma_sne.webp','','LKR 345,000','USD 2,500','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('ma-tesol','Master of Arts in TESOL (MA in TESOL)','linguistics','Master\'s Degree (UK Level 7)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','12 to 18 Months (Full-Time / Part-Time / Blended)',180,'The Master of Arts in TESOL is a specialist, practice-oriented program designed for both aspiring and experienced English language educators who seek to deepen their theoretical knowledge, refine their pedagogical skills, and advance their careers in a global context. This program addresses the complex and dynamic realities of 21st-century language teaching, where English functions as a global lingua franca across diverse cultural, educational, and professional settings. It prepares graduates to be critical, reflective, and highly effective practitioners who can navigate the challenges and opportunities of teaching English to learners of all ages and backgrounds.','[\"Foundations of Education Sciences\",\"Advanced Pedagogical Theories and Practices\",\"Introduction to Educational Research Methods\",\"The Systems of English and Second Language Acquisition\",\"Methodology, Curriculum, and Materials Design\",\"Assessment, Digital Literacies, and Critical Pedagogies\",\"Dissertation in Education\"]','assets/course_ma_tesol.webp','','LKR 345,000','USD 2,500','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('mba','Master of Business Administration (MBA)','business','Master\'s Degree (UK Level 7)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','12 to 18 Months (Full-Time / Part-Time / Blended)',180,'The Master of Business Administration (MBA) at Gatwick College of Business and Technology is an advanced, executive-level postgraduate program designed to transform ambitious professionals, managers, and entrepreneurs into strategic global leaders. Delivered through flexible on-campus, hybrid, and distance-learning modes, the program bridges theoretical management frameworks with practical, real-world business execution. By combining core executive modules with 9 industry-aligned specialized majors, the Gatwick College MBA empowers students to tailor their qualification to their career goals—whether leading digital transformation, driving corporate finance, or managing international operations.','[\"Strategic Leadership & Human Capital Management\",\"Corporate Financial Decision Making & Governance\",\"Strategic Marketing & Brand Positioning\",\"Operations, Supply Chain & Project Management\",\"Research Methodology & Business Analytics\",\"Executive Capstone Project \\/ Master\\u2019s Dissertation\"]','assets/course_mba.webp','','LKR 345,000','USD 2,500','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('msc-psychology','Master of Science in Psychology (MSc in Psychology)','psychology','Master\'s Degree (UK Level 7)','[\"On-Campus\",\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','12 to 18 Months (Full-Time / Part-Time / Blended)',180,'The Master of Science (MSc) in Psychology is an advanced, post-graduate program specifically engineered to provide a thorough transition into the scientific study of human behavior, cognition, and emotion. The program accommodates both psychology graduates seeking deep, specialized training and non-psychology graduates pivoting into the field. By establishing a demanding thirty six SLQF credit architecture (equivalent to 180 UK credits), the program bridges the gap between historical foundational theory and highly technical practical applications, preparing candidates to operate effectively across diverse global and local institutional landscapes.','[\"Foundations of Psychological Theory\",\"Lifespan Development & Social Behavior\",\"Cognitive & Biological Bases of Mind\",\"Essentials of Research Methods\",\"Professional Ethics & Applied Practice\"]','assets/course_msc_psychology.webp','','LKR 345,000','USD 2,500','2026-08-19 09:56:43','2026-08-19 09:56:43',0),
('othm-l3-acc','OTHM Level 3 Foundation Diploma in Accountancy','business','L3 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','6 Months',60,'Introduces learners to basic accounting processes, concepts, and financial regulation.','[]','https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600','','LKR 110,000','USD 600','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l3-bm','OTHM Level 3 Diploma in Business Management','business','L3 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Provides an entry-level understanding of business principles, operations, and management.','[]','https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600','','LKR 110,000','USD 600','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l3-hes','OTHM Level 3 Foundation Diploma for Higher Education Studies','education','L3 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Designed to provide learners with an entry route to UK undergraduate programs.','[]','https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600','','LKR 110,000','USD 600','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l3-hsc-fd','OTHM Level 3 Foundation Diploma in Health and Social Care','health','L3 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','6 Months',60,'Provides basic knowledge and skills for working in the social care and health sector.','[]','assets/course_health_social_care.webp','','LKR 110,000','USD 600','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l3-it-fd','OTHM Level 3 Foundation Diploma in Information Technology','it','L3 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','6 Months',60,'A foundation course designed to develop computing, digital literacy, and IT skills.','[]','assets/course_information_technology.webp','','LKR 110,000','USD 600','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-ab','OTHM Level 4 Diploma in Accounting and Business','business','L4 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Equates to the first year of a UK bachelor degree in accounting and corporate finance.','[]','assets/course_business_accountancy.webp','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-ece','OTHM Level 4 Diploma in Early Childhood Education','education','L4 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Focuses on early years development, childcare pedagogy, and classroom management.','[]','https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-etm','OTHM Level 4 Diploma in Education and Training Management','education','L4 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Develops management capabilities for schools, academies, and private education centers.','[]','https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-hospitality','OTHM Level 4 Diploma in Tourism and Hospitality Management','tourism','L4 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Foundational training in resort operations, customer relations, food safety, and travel management.','[]','https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-lsc','OTHM Level 4 Diploma in Logistics and Supply Chain Management','business','L4 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Covers foundational strategies in fleet transport, inventory, and procurement.','[]','https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-pm','OTHM Level 4 Diploma in Project Management','business','L4 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Teaches fundamental project execution, risk scoping, and team coordination skills.','[]','assets/course_project_management.webp','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l4-psy','OTHM Level 4 Diploma in Psychology','psychology','L4 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Introduces learners to cognitive, social, and developmental psychology research.','[]','https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-ab','OTHM Level 5 Diploma in Accounting and Business','business','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Equates to the second year of a UK bachelor degree in business accounting.','[]','assets/course_business_accountancy.webp','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-business','OTHM Level 5 Extended Diploma in Business Management','business','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Equates to the second year of a UK bachelor\'s degree. Covers finance, entrepreneurship, and organizational behavior.','[]','assets/course_business_extended.webp','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-ece','OTHM Level 5 Diploma in Early Childhood Education','education','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Advanced practices in child development theories and nursery management administration.','[]','https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-education','OTHM Level 5 Diploma in Education and Training','education','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'An industry-standard teaching qualification preparing educators for post-16 training institutions.','[]','https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-etm','OTHM Level 5 Diploma in Education and Training Management','education','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Designed to develop management and educational auditing strategies in learners.','[]','https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-health','OTHM Level 5 Diploma in Health and Social Care Management','health','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Advanced training for nursing managers, clinic administrators, and health system team leaders.','[]','https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-it','OTHM Level 5 Diploma in Information Technology','it','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Advanced software architecture, cloud database engineering, cybersecurity standards, and IT management.','[]','https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-psy','OTHM Level 5 Diploma in Psychology','psychology','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Deeper analysis of research methodology, cognitive frameworks, and clinical psychology.','[]','https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5-thm','OTHM Level 5 Diploma in Tourism and Hospitality Management','tourism','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Managerial operations in international travel sectors, cruise liner, and hotel brands.','[]','https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600','','LKR 165,000','USD 750','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-ab','OTHM Level 5 Extended Diploma in Accounting and Business','business','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Comprehensive Year 1 & 2 equivalence covering cost accounting and audit management.','[]','assets/course_business_accountancy.webp','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-cs','OTHM Level 5 Extended Diploma in Cyber Security','it','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Hands-on training in network defense, ethical hacking, and threat intelligence operations.','[]','https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-ece','OTHM Level 5 Extended Diploma in Early Childhood Education','education','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Covers toddler learning development policies, inclusion standards, and nursery operations.','[]','https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-etm','OTHM Level 5 Extended Diploma in Education and Training Management','education','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Integrates instructional design, educational audit standards, and administrative skills.','[]','https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-hsc','OTHM Level 5 Extended Diploma in Health and Social Care Management','health','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Prepares senior nursing and administration officials for hospital operation leadership.','[]','https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-it','OTHM Level 5 Extended Diploma in Information Technology','it','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Covers advanced programming languages, database architecture, and network management.','[]','https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-lsc','OTHM Level 5 Extended Diploma in Logistics and Supply Chain Management','business','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Deeper logistics frameworks in international supply lines and operations management.','[]','https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-pm','OTHM Level 5 Extended Diploma in Project Management','business','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Comprehensive training in corporate resource scoping and strategic agile frameworks.','[]','assets/course_project_management.webp','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-psy','OTHM Level 5 Extended Diploma in Psychology','psychology','L5 Ofqual','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Includes research project modeling, personality assessments, and clinical approaches.','[]','https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l5ex-thm','OTHM Level 5 Extended Diploma in Tourism and Hospitality Management','tourism','L5 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',240,'Combines hotel operations, customer retention plans, and event management.','[]','https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600','','LKR 249,000','USD 1150','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l6-bm-d','OTHM Level 6 Diploma in Business Management','business','L6 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Equates to the final year of a UK bachelor degree, focusing on corporate strategy.','[]','https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l6-tl','OTHM Level 6 Diploma in Teaching and Learning','education','L6 Ofqual','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Advanced credentials for experienced teachers looking to upgrade academic pedagogical skills.','[]','https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-af-d','OTHM Level 7 Diploma in Accounting and Finance','business','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Postgraduate course preparing executives for senior financial analysis and global reporting.','[]','https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-bop','OTHM Level 7 Diploma in Business and Organisational Psychology','psychology','L7 Ofqual (Postgraduate)','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Applies psychology concepts to organizational behavior, corporate culture, and workforce strategy.','[]','https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-ds','OTHM Level 7 Diploma in Data Science','it','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Advanced data mining, machine learning architectures, and statistics for enterprise analytics.','[]','https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-eml','OTHM Level 7 Diploma in Education Management and Leadership','education','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Prepares senior academic directors for policy administration, governance, and auditing.','[]','https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-hrm-d','OTHM Level 7 Diploma in Human Resource Management','business','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Strategic talent acquisition, training alignment, and employee labor relationship strategies.','[]','https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-hsc-d','OTHM Level 7 Diploma in Health and Social Care Management','health','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Postgraduate course focused on public health policies, financial governance, and healthcare planning.','[]','https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-lscm','OTHM Level 7 Diploma in Logistics and Supply Chain Management','business','L7 Ofqual (Postgraduate)','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Strategic supply routing, container logistics, and procurement networks.','[]','https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-pm-d','OTHM Level 7 Diploma in Project Management','business','L7 Ofqual (Postgraduate)','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Teaches advanced risk management, agile scoping, and corporate portfolio governance.','[]','assets/course_project_management.webp','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-rm','OTHM Level 7 Diploma in Risk Management','business','L7 Ofqual (Postgraduate)','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Strategic focus on corporate compliance, auditing, operational vulnerabilities, and protection.','[]','https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-sm','OTHM Level 7 Diploma in Strategic Marketing','business','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Advanced consumer profiling, digital analytics campaigns, and brand equity architecture.','[]','https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-strategic','OTHM Level 7 Diploma in Strategic Management and Leadership','business','L7 Ofqual (Postgraduate)','[\"Online\",\"In Person\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Provides advanced strategic skills for corporate leaders, serving as a direct pathway to an MBA top-up.','[]','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1),
('othm-l7-thm-d','OTHM Level 7 Diploma in Tourism and Hospitality Management','tourism','L7 Ofqual (Postgraduate)','[\"Online\",\"Hybrid\"]','[\"Colombo\",\"Kandy\"]','1 Year',120,'Strategic management frameworks for international hospitality, service industries, and tourism.','[]','https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600','','LKR 195,000','USD 900','2026-08-19 09:56:43','2026-08-19 09:56:43',1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(50) NOT NULL DEFAULT 'academic',
  `description` text DEFAULT NULL,
  `map_url` text DEFAULT NULL,
  `map_embed` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES
('1','Annual Graduation Ceremony 2026','28 Aug','09:00 AM - 02:00 PM','BMICH, Colombo','academic','','https://maps.google.com/maps?q=BMICH,+Colombo&t=&z=16&ie=UTF8&iwloc=&output=embed','','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('2','Global Educational Progression Seminar','15 Sep','03:00 PM - 06:00 PM','Online via Zoom / GCBT Colombo','academic','','https://maps.google.com/maps?q=6.8643103,79.8632363&t=&z=16&ie=UTF8&iwloc=&output=embed','','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('3','Kandy Campus Open Day & Career Fair','04 Oct','10:00 AM - 04:00 PM','GCBT Kandy Campus','academic','','https://maps.google.com/maps?q=7.293041,80.635012&t=&z=16&ie=UTF8&iwloc=&output=embed','','2026-08-19 09:56:43','2026-08-19 09:56:43');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `campus` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES
('1','Thathsarani Imesha Wickramaarachchi','M.Sc in Applied Psychology | B.Ed(Hons) in Special Needs Education','Special Needs Education','','Lecturing & Special Education Pedagogy','assets/staff_imesha.webp','imeshawickramaarachchi@gmail.com','+94 77 888 5686','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('10','Poornima Cooray','M.Ed (Specialized in Early Childhood Education)','Teacher Training & Early Childhood Education','','OTHM Level 5 Early Childhood Education Lecturing','assets/staff_poornima.webp','poornimacooray28@gmail.com','+94 76 560 0027','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('11','Kevin Deshan Rajapaksha','B.Eng. in Aeronautical Engineering','Information Technology & Engineering','','Specialist Engineer – BSS/OSS Operations | IT Lecturer','assets/staff_kevin.webp','kevinrajapaksha@icloud.com','+94 78 594 2154','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('12','Udanka Premachandra','Master in Information Technology | B.Sc in Information Technology','Cyber Security & Information Technology','','Cyber Security Lecturing & IT Infrastructure','assets/staff_udanka.webp','udankacbob@gmail.com','+94 77 403 2000','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('13','Shafiya Zawahir','Bachelor of Business Administration (Honors in Accounting & Finance)','English Language Studies','','English Teaching & Business Communication','assets/staff_shafiya.webp','shafiyy98@gmail.com','+94 76 424 5611','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('2','Kulasegaram Grace Kaarunya','B.Des (Hons) Specialized in Fashion and Lifestyle Design','Fashion Designing','','Senior Development Merchandiser | Lecturing','assets/staff_grace.webp','gaayashethra@gmail.com','+94 70 532 5955','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('3','Faleel Jamaldeen','DBA (California) | MBA Finance (UK) | BBA Marketing (Colombo)','Financial Technology & Business Analytics','','Lecturer of FinTech, Financial Management & Business Analytics','assets/staff_faleel.webp','faleel@gcbt.edu.lk','+94 77 387 0040','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('4','Ramya Yoganadhan','M.Sc in Applied Psychology | B.Sc in Psychology','Applied Psychology','','Lecturing & Psychological Counseling','assets/staff_ramya.webp','ramya.zafreen@gmail.com','+94 76 418 0961','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('5','Mohamed Raazim','MBA | Bachelor of Business Management (Specialized in Tourism & Event Management)','Business & Hospitality Management','','Business Management, Tourism & Hospitality, Strategic Management','assets/staff_raazim.webp','mamraazim@gmail.com','+94 77 703 1455','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('6','Manorathnage Lakshitha Iroshan Manorathne','BA (Honours) in English','English Language & Literature','','Lecturing / Educator & Linguistics','assets/staff_manorathne.webp','lakshithamanorathne@gmail.com','+94 76 049 8999','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('7','Melani Hansika Nanayakkara','M.Sc Applied Psychology & Human Behavior Change | B.Sc in Psychology','Teacher Training & Early Childhood Education','','Visiting Lecturer | Life Coach | Speaker | Therapeutic Arts Facilitator','assets/staff_melani.webp','nanayakkaramelanih@gmail.com','+94 71 895 8649','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('8','Methma Athauda','BBA (Hons) Business Administration | BA (Hons) International Business & Finance | MBA (Reading)','Human Resource Management','','Business Analyst | Researcher | Tutor','assets/staff_methma.webp','kavindiathauda@gmail.com','+94 76 774 5795','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('9','Menaka Madurawala','Bachelor of Teaching in Early Childhood Education | Associate Degree in Early Childhood Education','OTHM Level 4 & Early Childhood Education','','Lecturing & Teacher Development','','menakamadurawala@yahoo.com','+94 70 207 8877','2026-08-19 09:56:43','2026-08-19 09:56:43');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `campus` varchar(100) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('New','Contacted','In Progress','Enrolled','Closed') NOT NULL DEFAULT 'New',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
INSERT INTO `inquiries` VALUES
('inq-1785488519253','Mohamed Muzakkir','alisabrymuzakkir@gmail.com','+94768049250','Colombo','Master of Arts in Early Childhood Education (MA in ECE)','Admission enquiry submitted via Admissions page.','Contacted','','2026-07-31 09:35:50','2026-07-31 09:35:50');
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `initial` varchar(10) NOT NULL,
  `avatar_bg` varchar(50) NOT NULL DEFAULT '#e31c23',
  `course` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `quote` text NOT NULL,
  `campus` varchar(50) NOT NULL DEFAULT 'Colombo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES
('1','Sadhiya Fazal','S','#e31c23','Diploma in Psychology',5,'By luck I did get to enroll to the diploma of psychology lecturing by Sir Zamrin Zarook, at Gatwick College. This College and the Lecturer did help me to enhance my knowledge and experience in the field of psychology, to which I am grateful for. Not in least to mention, but I am now able to build the foundation for my career.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('10','Aamina Farook','A','#e11d48','Diploma in Applied Psychology & Counselling',5,'The Applied Psychology and Counselling program at Gatwick College exceeded all my expectations. The lecturers create an engaging, supportive environment where complex psychological concepts are broken down into practical counseling applications. The flexible schedule allowed me to balance family life and studies smoothly. I am now working as a student guidance counselor and continuing toward my Bachelor\'s degree.','Kandy','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('11','Nadeesha Senaratne','N','#f59e0b','Level 4 Diploma in Early Childhood Education & Teaching Methodology',5,'As an aspiring pre-school educator, the practical teaching methodology taught at Gatwick College gave me immense confidence. The child psychology modules and lesson planning workshops prepared me directly for classroom environments. I received an offer from a reputed international school in Colombo even before receiving my final graduation transcript!','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('12','Shalika Bandara','S','#4f46e5','OTHM Level 7 Diploma in Human Resource Management',5,'The Level 7 Postgraduate Diploma in HRM at Gatwick College helped me bridge the gap between operational HR and strategic executive decision-making. The lecturers gave practical case studies on Sri Lankan labor law alongside UK organizational behavior frameworks. I was promoted to Assistant HR Manager right after completion.','Kandy','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('13','Abdul Malik','A','#0d9488','Level 3 Foundation Diploma in Higher Education Studies',5,'I missed out on direct university entrance after A/Levels, but the Level 3 Foundation at Gatwick College provided the ideal stepping stone. The academic writing, research methods, and critical thinking skills I gained allowed me to seamlessly transition directly into the Level 4 Bachelor degree pathway.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('14','Heshani Gunawardena','H','#9333ea','Level 4 Diploma in Computerised Accounting and Bookkeeping',5,'Learning modern cloud accounting software like QuickBooks, Xero, and ERP systems alongside core financial accounting theory at Gatwick College gave me practical job-ready skills. The faculty was always available to resolve doubts, and the weekend classes suited my work schedule perfectly.','Kandy','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('15','Kavishka Silva','K','#ea580c','Level 3 Diploma in CyberPsychology & Digital Well-being',5,'CyberPsychology is a cutting-edge field that few institutes in Sri Lanka offer. Gatwick College\'s distance learning platform made studying online effortless with high-quality recorded lectures, digital library access, and prompt lecturer feedback. It gave me a distinct academic profile when applying for overseas postgraduate studies.','Distance Learning','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('16','Zaid Mansoor','Z','#16a34a','Level 5 Diploma in Tourism & Hospitality Management',5,'Gatwick College\'s strategic hospitality curriculum covers everything from hotel operations and revenue management to customer experience design. Thanks to their industry connections, I was able to secure a supervisory role at a luxury resort chain upon graduation. Highly recommend Gatwick College to anyone pursuing tourism leadership!','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('17','Shenali De Silva','S','#06b6d4','BSc (Hons) in Psychology & Child Development',5,'Studying Child Development and Psychology at Gatwick College provided me with in-depth research skills and practical case assessments that set me apart. The faculty gave personalized guidance on my final dissertation, and the degree\'s UGC approval ensured my qualification was immediately respected when I joined a child wellness clinic in Colombo.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('2','Razeen RZN','R','#0a2540','Diploma in Teacher Training & Psychology',5,'Gatwick college is the best place to get higher education and also we have a very good opportunity to learn from home.. The lecturer Zamreen Zarook is amazing the way of his teaching is the best. I did many courses on Foundation and now I am doing diploma in teacher training and diploma in psychology...','Kandy','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('3','Fathima Nishara','F','#7c3aed','MBA in Strategic Management',5,'Enrolling in the MBA program at Gatwick College was one of the best decisions of my career. The curriculum is structured around real-world business challenges, and the faculty brings tremendous industry experience into every session. Within six months of completing my degree, I secured a senior management position at a leading multinational firm in Colombo. The UGC recognition of my degree gave my employer the confidence they needed.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('4','Kasun Perera','K','#0891b2','OTHM Level 5 Diploma in Business Management',5,'I was working full-time and worried I couldn\'t manage studies alongside my job. The hybrid mode at Gatwick College made everything possible. The weekend sessions were intensive but very well organized. My OTHM diploma is now recognized by my employer for a promotion, and I\'m already progressing towards my Bachelor\'s degree through the pathway program. This college truly opened doors for me.','Kandy','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('5','Amaya Dissanayake','A','#059669','BSc (Hons) in Information Technology',5,'As a young woman from Kandy, pursuing a UK-recognized degree felt like a distant dream. Gatwick College made it a reality without requiring me to leave the country. The IT program is thorough, the lecturers are knowledgeable, and the online resources are excellent. I graduated with honors and was immediately hired by a software company in Colombo. The WES credential evaluation of my degree also helped me apply for an overseas scholarship.','Kandy','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('6','Mohamed Rifkhan','M','#dc2626','Diploma in Education & Training',5,'I have been a school teacher for over ten years, but without a formal higher education qualification, promotions were always out of reach. The Diploma in Education & Training at Gatwick College gave me not just a recognized credential, but a completely new perspective on pedagogy. The distance learning mode was ideal — I studied from Batticaloa and never had to travel to Colombo. I am now a senior lecturer at a national school.','Distance Learning','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('7','Dilini Jayawardena','D','#d97706','BA (Hons) in Accounting & Finance',5,'After completing my A/Levels, I wasn\'t sure which path to take. A friend recommended Gatwick College and I haven\'t looked back since. The Accounting & Finance degree program is rigorous and the support from the academic team is outstanding. I passed all my modules on the first attempt and secured an internship at a top audit firm in Colombo during my second year. Gatwick College is genuinely committed to your success.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('8','Pradeep Rathnayake','P','#be185d','Master of Science in Healthcare Management',5,'I am a registered nurse who wanted to move into hospital administration. The MSc in Healthcare Management at Gatwick College was exactly what I needed. The program blends clinical knowledge with management theory in a way that is directly applicable to the Sri Lankan healthcare sector. My degree is UGC approved and WES recognized, which gave me the credibility to transition into a Hospital Operations Manager role. I am deeply grateful to the entire Gatwick faculty.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43'),
('9','Tharindu Wickramasinghe','T','#0284c7','Level 4 Diploma in Cyber Security & Digital Forensics',5,'Choosing Gatwick College for my Diploma in Cyber Security was a game-changer. The practical labs, hands-on vulnerability testing exercises, and mentorship from industry specialists gave me real technical expertise. While completing my final semester, I landed an associate cybersecurity analyst role at a leading tech firm in Colombo. The UK-aligned curriculum gave me a strong edge during technical interviews.','Colombo','2026-08-19 09:56:43','2026-08-19 09:56:43');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-19 12:27:10
