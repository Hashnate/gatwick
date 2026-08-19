// Detailed Course Info & Master's Progression Modal
// File: /var/www/gatwick/src/components/CourseDetailsModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle, BookOpen, Clock, ArrowRight, ShieldCheck, DollarSign, Info, Globe, Layers, UserCheck, MapPin, GraduationCap, Download, Printer, FileDown } from 'lucide-react';
import { masterProgressionData, MBA_MAJORS, MASTERS_RECOGNITION, MASTERS_SNPL } from '../services/masterProgression';
import { bachelorProgressionData } from '../services/bachelorProgression';
import { downloadCourseSyllabusPDF } from '../services/pdfGenerator';

export default function CourseDetailsModal({ course, onClose, onEnquire }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'master_pathway', 'bachelor_pathway'
  const [activeEduSub, setActiveEduSub] = useState('mba'); // for postgraduate multi-education only
  const [activeBachelorEduSub, setActiveBachelorEduSub] = useState('ece'); // for undergraduate multi-education only

  // CRITICAL: Reset tabs whenever the course changes to prevent stale tab state crash
  useEffect(() => {
    setActiveTab('details');
    setActiveEduSub('mba');
    setActiveBachelorEduSub('ece');
  }, [course?.id]);

  if (!course) return null;
  // Normalise level string
  const lvl = (course.level || '').toUpperCase();

  // Helper to determine if Level 7
  const isLevel7 = lvl.includes('L7') || lvl.includes('LEVEL 7') || lvl.includes('L 7');
  const masterData = isLevel7 ? masterProgressionData[course.id] : null;

  // Helper to determine if Bachelor progression exists
  const lookup = bachelorProgressionData[course.id];
  let bachelorData = null;
  if (lookup) {
    if (lookup.courseType === 'bba-ref') {
      bachelorData = bachelorProgressionData['othm-l4-ab'];
    } else if (lookup.courseType === 'bit-ref') {
      bachelorData = bachelorProgressionData['othm-l5-it'];
    } else if (lookup.courseType === 'multi-education-ref') {
      bachelorData = bachelorProgressionData[lookup.targetId || 'othm-l4-ece'];
    } else {
      bachelorData = lookup;
    }
  }

  // Helper to determine if Level 4 to 7
  const isLevel4To7 = lvl.includes('L4') || lvl.includes('LEVEL 4') || lvl.includes('L 4') ||
                      lvl.includes('L5') || lvl.includes('LEVEL 5') || lvl.includes('L 5') ||
                      lvl.includes('L6') || lvl.includes('LEVEL 6') || lvl.includes('L 6') ||
                      lvl.includes('L7') || lvl.includes('LEVEL 7') || lvl.includes('L 7');

  // Resolve target course enquiry details based on active tab selection
  const getEnquiryTarget = () => {
    if (activeTab === 'bachelor_pathway' && bachelorData) {
      if (bachelorData.courseType === 'multi-education') {
        const sub = bachelorData.subcourses[activeBachelorEduSub] || Object.values(bachelorData.subcourses)[0];
        return { id: activeBachelorEduSub, title: sub?.title || 'Bachelor' };
      }
      if (bachelorData.courseType === 'bba') {
        return { id: 'bba', title: 'Bachelor of Business Administration (BBA)' };
      }
      if (bachelorData.courseType === 'bit') {
        return { id: 'bit', title: 'Bachelor of Information Technology (BIT)' };
      }
    }
    if (activeTab === 'master_pathway' && masterData) {
      return { id: 'mba', title: 'Master of Business Administration (MBA)' };
    }
    return course;
  };

  const primaryCampus = Array.isArray(course.campus) && course.campus.length > 0 
    ? course.campus[0] 
    : (typeof course.campus === 'string' && course.campus.includes('Kandy') ? 'Kandy' : 'Colombo');

  // Formatting modules array safely
  const modulesList = Array.isArray(course.modules) ? course.modules : [];

  // Local/International fees mapping
  const feeLocal = course.feeLocal || course.fee_local || "Contact Admissions";
  const feeInternational = course.feeInternational || course.fee_international || "Contact Admissions";

  // Study mode mapping
  const studyModes = Array.isArray(course.mode) ? course.mode.join(', ') : (course.mode || "Online / Hybrid / In-Person");

  // Determine school display name
  const schoolNames = {
    business: "School of Business & Finance",
    education: "School of Education & Training",
    health: "School of Health & Social Care Management",
    psychology: "School of Psychology",
    it: "School of Information Technology",
    tourism: "School of Tourism & Hospitality Management",
    linguistics: "School of Linguistics (English Academy)",
    executive: "School of Executive Education"
  };
  const schoolName = schoolNames[course.school] || course.school || "Regulated UK Qualification (Ofqual)";

  // Entry requirements based on level
  const getRequirements = () => {
    if (course.id === 'ba-ece') {
      return {
        academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
        mature: "Should have completed one year full time diploma in Early Childhood Education. The credit should be equal to 24 (SLQF)/120 UK Credits. Students should complete the 6 credits in the first year with the courses which are not in the curricula of the Diploma. The Diploma should have been obtained from university of any other higher educational institutions which are regulated by the government of any country. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Applicants whose primary language is not English must demonstrate adequate English language competence through: Pass in GCE O/L English; OR English medium education; OR an overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Documented proof of working in an English-speaking professional environment."
      };
    }
    if (course.id === 'ba-sne') {
      return {
        academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
        mature: "Should have completed one year full time diploma in Early Childhood Education/SNE/TESOL. The credit should be equal to 24 (SLQF)/120 UK Credits. Students should complete the 6 credits in the first year with the courses which are not in the curricula of the Diploma. The Diploma should have been obtained from university of any other higher educational institutions which are regulated by the government of any country. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Applicants whose primary language is not English must demonstrate adequate English language competence through: Pass in GCE O/L English; OR English medium education; OR an overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Documented proof of working in an English-speaking professional environment."
      };
    }
    if (course.id === 'ba-tesol') {
      return {
        academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
        mature: "Should have completed one year full time diploma in Early Childhood Education. The credit should be equal to 24 (SLQF)/120 UK Credits. Students should complete the 6 credits in the first year with the courses which are not in the curricula of the Diploma. The Diploma should have been obtained from university of any other higher educational institutions which are regulated by the government of any country. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Applicants whose primary language is not English must demonstrate adequate English language competence through: Pass in GCE O/L English; OR English medium education; OR an overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Documented proof of working in an English-speaking professional environment."
      };
    }
    if (course.id === 'ma-education' || course.id === 'ma-ece' || course.id === 'ma-tesol' || course.id === 'ma-sne' || course.id === 'msc-psychology') {
      return {
        academic: "Bachelor's Degree from a recognized university/institution (equivalent to SLQF Level 5/RQF level 6) in a relevant field; OR Bachelor's Honors Degree (SLQF Level 6/ RQF Level 7 or above) in a relevant field; OR Postgraduate Diploma (SLQF Level 8/RQF Level 7) in a relevant field.",
        mature: "We welcome applicants with substantial professional experience who may not hold a formal Bachelor's degree. Admission via this route is evaluated on a case-by-case basis. Requirements: Age 21 years or older; Minimum of 5 years of relevant teaching or supervisory experience; Supporting Documents: Updated Professional CV / Resume, Certificates of highest completed qualifications, and work experience letters. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Standardized Testing: An overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Prior Medium of Instruction: A Bachelor’s degree or higher diploma completed in an English-medium institution; OR Professional Experience: Documented proof of working in an English-speaking professional environment."
      };
    }
    if (course.id === 'mba') {
      return {
        academic: "A Recognized Bachelor’s Degree (or equivalent academic qualification) in any discipline from an accredited institution.",
        mature: "We welcome applicants with substantial professional experience who may not hold a formal Bachelor's degree. Admission via this route is evaluated on a case-by-case basis. Requirements: Age 21 years or older; Minimum of 5 years of relevant managerial or supervisory experience; Supporting Documents: Updated Professional CV / Resume, Certificates of highest completed qualifications, and work experience letters. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Standardized Testing: An overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Prior Medium of Instruction: A Bachelor’s degree or higher diploma completed in an English-medium institution; OR Professional Experience: Documented proof of working in an English-speaking professional environment."
      };
    }
    if (course.id === 'bba') {
      return {
        academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
        mature: "Should have completed one year full time diploma in Business Management. The Diploma should have been obtained from university of any other higher educational institutions which are regulated by the government of any country. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Applicants whose primary language is not English must demonstrate adequate English language competence through: Pass in GCE O/L English; OR English medium education; OR an overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Documented proof of working in an English-speaking professional environment."
      };
    }
    if (course.id === 'bit') {
      return {
        academic: "3 Passes in Advanced Level examination of Sri Examination department or International Advanced level (UK); OR Completed High School Diploma from USA based school curriculum (12 years of study); OR Foundation Diploma (UK/Australia/Canada or any other countries - regulated by the government).",
        mature: "Should have completed one year full time diploma in IT. The Diploma should have been obtained from university of any other higher educational institutions which are regulated by the government of any country. (Subject to review and final approval; submit documents to studentaffairs@gcbt.edu.lk).",
        english: "Applicants whose primary language is not English must demonstrate adequate English language competence through: Pass in GCE O/L English; OR English medium education; OR an overall IELTS score of 5.5 (or equivalent standard in recognized English tests) across all bands; OR Documented proof of working in an English-speaking professional environment."
      };
    }
    if (lvl.includes('L3') || lvl.includes('LEVEL 3') || lvl.includes('L 3')) {
      return {
        academic: "Successful completion of G.C.E. O/Levels or equivalent secondary education qualifications.",
        mature: "Applicants aged 21 or older with relevant work experience may be admitted on a case-by-case basis.",
        english: "Competence in English medium instruction or a pass in school-level English."
      };
    }
    if (lvl.includes('L4') || lvl.includes('LEVEL 4') || lvl.includes('L 4')) {
      return {
        academic: "Successful completion of G.C.E. A/Levels, an OTHM Level 3 qualification, or equivalent foundation certification.",
        mature: "Applicants aged 21 or older with over 2 years of work experience in a relevant field.",
        english: "IELTS 5.5 overall, or proof of education completed in English medium."
      };
    }
    if (lvl.includes('L5') || lvl.includes('LEVEL 5') || lvl.includes('L 5')) {
      return {
        academic: "Successful completion of OTHM Level 4 Diploma, standard HND Year 1, or equivalent undergraduate credits.",
        mature: "Applicants aged 21 or older with over 3 years of work experience in a relevant field.",
        english: "IELTS 5.5 overall, or proof of education completed in English medium."
      };
    }
    if (lvl.includes('L6') || lvl.includes('LEVEL 6') || lvl.includes('L 6')) {
      return {
        academic: "Successful completion of OTHM Level 5 Diploma, Advanced HND, or equivalent associate degree credits.",
        mature: "Applicants aged 21 or older with over 4 years of supervisor/managerial work experience.",
        english: "IELTS 5.5 overall, or proof of education completed in English medium."
      };
    }
    // Level 7 / Default
    return {
      academic: "A recognized Bachelor's Degree (or equivalent academic qualification) from an accredited university.",
      mature: "Applicants aged 21 or older with at least 5 years of relevant managerial or teaching experience.",
        english: "IELTS 5.5 overall, or proof of working/learning in an English medium environment."
      };
  };

  const reqs = getRequirements();

  const getExtraDetails = () => {
    if (course.id === 'ba-ece') {
      return {
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        recognition: "Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier Bachelor degree in Early Childhood Education tailored to meet the market demand. To ensure accessible, world-class education for every student, our BA pathways are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an BA from Gatwick College provides a trusted, globally accepted passport to success."
      };
    }
    if (course.id === 'ba-sne') {
      return {
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        recognition: "Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier Bachelor degree in Special Needs Education tailored to meet the market demand. To ensure accessible, world-class education for every student, our BA pathways are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an BA from Gatwick College provides a trusted, globally accepted passport to success."
      };
    }
    if (course.id === 'ba-tesol') {
      return {
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        recognition: "Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier Bachelor degree in TESOL tailored to meet the market demand. To ensure accessible, world-class education for every student, our BA pathways are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an BA from Gatwick College provides a trusted, globally accepted passport to success."
      };
    }
    if (course.id === 'bba') {
      return {
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        recognition: "Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier Bachelor degree in business Management tailored to meet the market demand. To ensure accessible, world-class education for every student, our BBA pathways are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an BBA from Gatwick College provides a trusted, globally accepted passport to success."
      };
    }
    if (course.id === 'bit') {
      return {
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 4 undergraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time teachers and school leavers.",
          "Cost-Effective Pathway: Earn a respected international Bachelor's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers, school leaders and undergraduate students."
        ],
        recognition: "Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier Bachelor degree in information technology tailored to meet the market demand. To ensure accessible, world-class education for every student, our BIT pathways are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an BIT from Gatwick College provides a trusted, globally accepted passport to success."
      };
    }
    if (course.id === 'mba') {
      return {
        whyChoose: [
          "Dual / Globally Recognized Credentials: Aligned with UK Level 7 postgraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
          "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with executives across multiple sectors."
        ],
        recognition: "Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier MBA programs tailored to your professional ambitions. To ensure accessible, world-class education for every student, our MBA pathways are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an MBA from Gatwick College provides a trusted, globally accepted passport to success."
      };
    }
    if (course.id === 'ma-education' || course.id === 'ma-ece' || course.id === 'ma-tesol' || course.id === 'ma-sne' || course.id === 'msc-psychology') {
      const isPsych = course.id === 'msc-psychology';
      const progName = isPsych ? 'MSc Psychology pathways' : 'MA in Education programs';
      const degName = isPsych ? 'MSc in Psychology' : 'MA in Education';
      return {
        whyChoose: [
          "Global Recognition & Migration Pathways: Recognized foreign university degree by the University Grants Commission (UGC) Sri Lanka and approved/listed by World Education Services (WES) for migration evaluation (USA, Canada, UK, Australia, New Zealand).",
          "Flexible Learning Schedule: Weekend live online lectures (3–4 hours per week) with LMS recorded lecture access for working educators.",
          "European Pathways & Global Graduation: Access to European progression through the GNI Education Network (Geneva) and options to attend international graduation ceremonies in Colombo, Cambodia, Dubai (with corporate experience), or Geneva.",
          "Dual / Globally Recognized Credentials: Aligned with UK Level 7 postgraduate frameworks and international university top-up pathways.",
          "Flexibility for Working Executives: Weekend and evening lectures tailored for full-time corporate professionals.",
          "Cost-Effective Pathway: Earn a respected international Master's degree at a fraction of the cost of studying abroad.",
          "Network & Industry Connection: Access to dual campus hubs in Colombo and Kandy, fostering peer-to-peer networking with teachers and educational leaders across multiple sectors."
        ],
        recognition: `Gatwick College of Business and Technology has partnered with prestigious international universities and globally recognized awarding bodies to deliver top-tier ${progName} tailored to your professional ambitions. To ensure accessible, world-class education for every student, our ${progName} are structured across multiple partner institutions, allowing you to select a degree option that aligns perfectly with your budget and career goals. Most importantly, all degrees offered through our partner universities hold full institutional recognition, making them recognized by the University Grants Commission (UGC) Sri Lanka as well as World Education Services (WES) for foreign credential evaluation. Whether your goal is career advancement, international migration, or further postgraduate and doctoral studies, an ${degName} from Gatwick College provides a trusted, globally accepted passport to success.`
      };
    }
    return null;
  };
  const extraDetails = getExtraDetails();

  const handleDownloadSyllabus = () => {
    downloadCourseSyllabusPDF(
      course,
      schoolName,
      reqs,
      extraDetails,
      feeLocal,
      feeInternational,
      studyModes,
      modulesList
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(10, 37, 64, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-scroll-body::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll-body::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .modal-scroll-body::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }
        .modal-grid-layout {
          display: grid;
          grid-template-columns: 1.8fr 1.2fr;
          gap: 2rem;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .modal-grid-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        .main-tab-btn {
          padding: 0.85rem 1.5rem;
          background: none;
          border: none;
          font-weight: 800;
          font-size: 0.95rem;
          color: #64748b;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .main-tab-btn.active {
          color: #e31c23;
          border-bottom-color: #e31c23;
        }
        .modal-sub-tab-btn {
          padding: 0.4rem 0.85rem;
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.78rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .modal-sub-tab-btn.active {
          background-color: #e31c23;
          color: #ffffff;
          border-color: #e31c23;
        }
      `}</style>

      <div 
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0a2540',
            color: '#ffffff'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ backgroundColor: '#e31c23', color: '#ffffff', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {course.level}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600 }}>
                {schoolName}
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
              {course.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls for Progression Pathways */}
        {((isLevel7 && masterData) || bachelorData) && (
          <div 
            style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 2rem',
              backgroundColor: '#ffffff'
            }}
          >
            <button 
              onClick={() => setActiveTab('details')} 
              className={`main-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            >
              <Award size={18} /> Course Details
            </button>
            {isLevel7 && masterData && (
              <button 
                onClick={() => setActiveTab('master_pathway')} 
                className={`main-tab-btn ${activeTab === 'master_pathway' ? 'active' : ''}`}
              >
                <GraduationCap size={18} /> 🎓 Master's Degree Pathway
              </button>
            )}
            {bachelorData && (
              <button 
                onClick={() => setActiveTab('bachelor_pathway')} 
                className={`main-tab-btn ${activeTab === 'bachelor_pathway' ? 'active' : ''}`}
              >
                <GraduationCap size={18} /> 🎓 Bachelor's Degree Pathway
              </button>
            )}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div 
          className="modal-scroll-body"
          style={{
            padding: '2rem',
            overflowY: 'auto',
            flexGrow: 1,
            backgroundColor: '#fafbfc'
          }}
        >
          {activeTab === 'details' && (
            /* =================== STANDARD COURSE DETAILS =================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Top Section: Overview & Quick Facts */}
              <div className="modal-grid-layout">
                {/* Left Column */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.75rem' }}>
                    Course Overview
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                    {course.description || course.desc || "Learn more about the curriculum structure, core topics, and professional applications of this qualification."}
                  </p>

                  {/* Modules List */}
                  {modulesList.length > 0 && (
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.75rem', marginTop: 0 }}>
                        Key Modules Covered:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {modulesList.map((m, idx) => (
                          <span 
                            key={idx} 
                            style={{ 
                              backgroundColor: '#ffffff', 
                              border: '1px solid #cbd5e1', 
                              color: '#334155', 
                              fontSize: '0.75rem', 
                              padding: '0.3rem 0.65rem', 
                              borderRadius: '6px', 
                              fontWeight: 600,
                              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                            }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Majors / Specializations List */}
                  {course.majors && course.majors.length > 0 && (
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.75rem', marginTop: 0 }}>
                        Available Majors & Specializations:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {course.majors.map((m, idx) => (
                          <span 
                            key={idx} 
                            style={{ 
                              backgroundColor: '#eff6ff', 
                              border: '1px solid #bfdbfe', 
                              color: '#1d4ed8', 
                              fontSize: '0.75rem', 
                              padding: '0.3rem 0.65rem', 
                              borderRadius: '6px', 
                              fontWeight: 700,
                              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                            }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why Choose Gatwick College */}
                  {extraDetails && extraDetails.whyChoose && (
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.75rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle size={16} style={{ color: '#10b981' }} /> Why Choose Gatwick College?
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {extraDetails.whyChoose.map((why, idx) => (
                          <div 
                            key={idx}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '0.85rem 1rem',
                              display: 'flex',
                              gap: '0.5rem',
                              alignItems: 'flex-start'
                            }}
                          >
                            <ShieldCheck size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                            <span style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>{why}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admission Requirements */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <UserCheck size={16} style={{ color: '#e31c23' }} /> Admission Requirements
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Academic Entry Route</span>
                        <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{reqs.academic}</p>
                      </div>
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e31c23', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>{(course.id === 'ba-ece' || course.id === 'ba-sne' || course.id === 'ba-tesol' || course.id === 'bba' || course.id === 'bit') ? 'Advanced Entry Route' : 'Mature Entry Route'}</span>
                        <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{reqs.mature}</p>
                      </div>
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>English Proficiency</span>
                        <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{reqs.english}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recognition logos */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.5rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} style={{ color: '#10b981' }} /> Global Recognition
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.45, margin: '0 0 1rem 0' }}>
                      {extraDetails && extraDetails.recognition ? extraDetails.recognition : "GCBT diplomas are issued by UK regulated awarding bodies. Our course pathways hold full institutional recognition, evaluated by World Education Services (WES) for migration evaluation and recognized by the University Grants Commission (UGC) Sri Lanka."}
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <img src="assets/partner_ugc.png" alt="UGC Sri Lanka Approved" style={{ height: '40px', width: 'auto' }} />
                      <img src="assets/partner_wes.png" alt="WES Approved" style={{ height: '40px', width: 'auto' }} />
                    </div>
                  </div>
                </div>

                {/* Right Column Sidebar Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Quick Facts */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                      Quick Facts
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Duration:</span>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>{course.duration || '12 Months'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Credits:</span>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>{course.credits || 120} Credits</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Study Mode:</span>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>{studyModes}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Assessment:</span>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>Assignments (No Exams)</span>
                      </div>
                    </div>
                  </div>

                  {/* Tuition Fees */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e31c23', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(227, 28, 35, 0.04)' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#e31c23', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px dashed #f1f5f9', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <DollarSign size={15} /> Tuition Fees
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 700 }}>Local Students:</span>
                        <span style={{ fontWeight: 850, color: '#0f172a' }}>{feeLocal}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 700 }}>International:</span>
                        <span style={{ fontWeight: 850, color: '#2563eb' }}>{feeInternational}</span>
                      </div>
                    </div>
                    {/* SNPL & Installment info */}
                    <div style={{ backgroundColor: '#f8fafc', padding: '0.65rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#475569', lineHeight: 1.35 }}>
                      Interest-free monthly installments or <strong>Study Now, Pay Later (SNPL)</strong> loan options available via Myfees.lk.
                    </div>
                  </div>

                  {/* Campus Branches Card */}
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={16} style={{ color: '#e31c23' }} /> Campus Branches
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', display: 'block', marginBottom: '0.15rem' }}>Colombo Headquarters</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>500 Galle Road, Colombo 06</span>
                        <a 
                          href="https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn"
                          style={{ display: 'inline-flex', fontSize: '0.72rem', padding: '0.35rem 0.65rem', textDecoration: 'none', width: 'auto', gap: '0.25rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', fontWeight: 700 }}
                        >
                          View Map & Directions
                        </a>
                      </div>
                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', display: 'block', marginBottom: '0.15rem' }}>Kandy Branch Campus</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>291 A9, Kandy</span>
                        <a 
                          href="https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn"
                          style={{ display: 'inline-flex', fontSize: '0.72rem', padding: '0.35rem 0.65rem', textDecoration: 'none', width: 'auto', gap: '0.25rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', fontWeight: 700 }}
                        >
                          View Map & Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'master_pathway' && isLevel7 && masterData && (
            /* =================== DYNAMIC MASTER'S DEGREE PATHWAY =================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* EML Multiple Pathways Sub-Tabs */}
              {masterData.courseType === 'multi-education' && (
                <div 
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    display: 'flex',
                    gap: '0.4rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', fontWeight: 850, color: '#475569', marginRight: '0.4rem' }}>Select Degree:</span>
                  <button 
                    onClick={() => setActiveEduSub('mba')}
                    className={`modal-sub-tab-btn ${activeEduSub === 'mba' ? 'active' : ''}`}
                  >
                    MBA (Ed. Leadership)
                  </button>
                  <button 
                    onClick={() => setActiveEduSub('ma_edu')}
                    className={`modal-sub-tab-btn ${activeEduSub === 'ma_edu' ? 'active' : ''}`}
                  >
                    MA in Education
                  </button>
                  <button 
                    onClick={() => setActiveEduSub('ma_ece')}
                    className={`modal-sub-tab-btn ${activeEduSub === 'ma_ece' ? 'active' : ''}`}
                  >
                    MA in Early Childhood
                  </button>
                  <button 
                    onClick={() => setActiveEduSub('ma_tesol')}
                    className={`modal-sub-tab-btn ${activeEduSub === 'ma_tesol' ? 'active' : ''}`}
                  >
                    MA in TESOL
                  </button>
                  <button 
                    onClick={() => setActiveEduSub('ma_sne')}
                    className={`modal-sub-tab-btn ${activeEduSub === 'ma_sne' ? 'active' : ''}`}
                  >
                    MA in Special Needs
                  </button>
                </div>
              )}

              {/* Master Pathway Active Details */}
              {(() => {
                const subContent = masterData.courseType === 'multi-education' ? (masterData.subcourses[activeEduSub] || Object.values(masterData.subcourses)[0]) : masterData;
                if (!subContent) return null;
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="modal-grid-layout">
                      {/* Left Column */}
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.75rem' }}>
                          {subContent.major || "Master's Progression"}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                          {subContent.overview}
                        </p>

                        {/* MBA 9 Majors panel */}
                        {masterData.courseType === 'mba' && (
                          <div style={{ marginBottom: '1.25rem', backgroundColor: '#fff8f8', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem' }}>
                            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#e31c23', marginBottom: '0.6rem', marginTop: 0 }}>9 MBA Majors — Select Your Specialization:</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                              {MBA_MAJORS.map((m, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: subContent.major && subContent.major.includes(m.replace('MBA in ','')) ? '#e31c23' : '#334155', fontWeight: subContent.major && subContent.major.includes(m.replace('MBA in ','')) ? 800 : 600 }}>
                                  <span style={{ color: subContent.major && subContent.major.includes(m.replace('MBA in ','')) ? '#e31c23' : '#94a3b8', fontWeight: 900 }}>•</span>
                                  <span>{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tracks/Majors for Psychology */}
                        {masterData.courseType === 'psychology' && masterData.tracks && (
                          <div style={{ marginBottom: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.5rem' }}>Specialization Tracks Available:</h4>
                            <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {masterData.tracks.map((t, idx) => (
                                <li key={idx} style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Modules Covered */}
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.75rem', marginTop: '1.25rem' }}>
                          Curriculum Modules (180 UK Credits):
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                          {subContent.modules.map((m, idx) => (
                            <div key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem 0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              <span style={{ color: '#e31c23', fontWeight: 900, fontSize: '0.8rem' }}>•</span>
                              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{m}</span>
                            </div>
                          ))}
                        </div>

                        {/* Master Admission Requirements */}
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <UserCheck size={16} style={{ color: '#e31c23' }} /> Admission Requirements
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Academic Entry Route</span>
                              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{subContent.requirements.academic}</p>
                            </div>
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e31c23', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Mature Entry Route</span>
                              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{subContent.requirements.mature}</p>
                            </div>
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>English Proficiency</span>
                              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{subContent.requirements.english}</p>
                            </div>
                          </div>
                        </div>

                        {/* Recognition + SNPL */}
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '0.85rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>🏛️ UGC & WES Recognition</span>
                            <p style={{ fontSize: '0.78rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>{MASTERS_RECOGNITION}</p>
                          </div>
                          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '10px', padding: '0.85rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>💳 Flexible Payment Options</span>
                            <p style={{ fontSize: '0.78rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>{MASTERS_SNPL}</p>
                          </div>
                        </div>
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.75rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} /> Why Choose Gatwick College?
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {subContent.whyChoose.map((why, idx) => (
                              <div 
                                key={idx}
                                style={{
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '12px',
                                  padding: '0.85rem 1rem',
                                  display: 'flex',
                                  gap: '0.5rem',
                                  alignItems: 'flex-start'
                                }}
                              >
                                <ShieldCheck size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                <span style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>{why}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Fees and Quick Facts */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Facts */}
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                            Pathway Facts
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Duration:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>{subContent.duration}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Total Credits:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>180 UK Credits</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Level:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>UK Level 7 (Master's)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Assessment:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>Assignments & Dissertation</span>
                            </div>
                          </div>
                        </div>

                        {/* Master Tuition Card */}
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e31c23', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(227, 28, 35, 0.05)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#e31c23', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px dashed #f1f5f9', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <DollarSign size={15} /> Master's Tuition Fees
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 700 }}>Local Students:</span>
                              <span style={{ fontWeight: 850, color: '#0f172a' }}>{subContent.fees.local}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 700 }}>International:</span>
                              <span style={{ fontWeight: 850, color: '#2563eb' }}>{subContent.fees.international}</span>
                            </div>
                          </div>
                          <div style={{ backgroundColor: '#f8fafc', padding: '0.65rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#475569', lineHeight: 1.35 }}>
                            {subContent.fees.note} Supports flexible installment structures & SNPL.
                          </div>
                        </div>

                        {/* Campus Branches Card */}
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '1.25rem' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <MapPin size={16} style={{ color: '#e31c23' }} /> Campus Branches
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', display: 'block', marginBottom: '0.15rem' }}>Colombo Headquarters</span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>500 Galle Road, Colombo 06</span>
                              <a 
                                href="https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn"
                                style={{ display: 'inline-flex', fontSize: '0.72rem', padding: '0.35rem 0.65rem', textDecoration: 'none', width: 'auto', gap: '0.25rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', fontWeight: 700 }}
                              >
                                View Map & Directions
                              </a>
                            </div>
                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', display: 'block', marginBottom: '0.15rem' }}>Kandy Branch Campus</span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>291 A9, Kandy</span>
                              <a 
                                href="https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn"
                                style={{ display: 'inline-flex', fontSize: '0.72rem', padding: '0.35rem 0.65rem', textDecoration: 'none', width: 'auto', gap: '0.25rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', fontWeight: 700 }}
                              >
                                View Map & Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>
          )}

          {activeTab === 'bachelor_pathway' && bachelorData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* ECE/SNE/TESOL Multiple Pathways Sub-Tabs */}
              {bachelorData.courseType === 'multi-education' && (
                <div 
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    display: 'flex',
                    gap: '0.4rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', fontWeight: 850, color: '#475569', marginRight: '0.4rem' }}>Select Pathway:</span>
                  <button 
                    onClick={() => setActiveBachelorEduSub('ece')}
                    className={`modal-sub-tab-btn ${activeBachelorEduSub === 'ece' ? 'active' : ''}`}
                  >
                    BA in ECE
                  </button>
                  <button 
                    onClick={() => setActiveBachelorEduSub('sne')}
                    className={`modal-sub-tab-btn ${activeBachelorEduSub === 'sne' ? 'active' : ''}`}
                  >
                    BA in SNE
                  </button>
                  <button 
                    onClick={() => setActiveBachelorEduSub('tesol')}
                    className={`modal-sub-tab-btn ${activeBachelorEduSub === 'tesol' ? 'active' : ''}`}
                  >
                    BA in TESOL
                  </button>
                </div>
              )}

              {/* Bachelor Pathway Active Details */}
              {(() => {
                const subContent = bachelorData.courseType === 'multi-education' 
                  ? (bachelorData.subcourses[activeBachelorEduSub] || Object.values(bachelorData.subcourses)[0])
                  : bachelorData;
                if (!subContent) return null;
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="modal-grid-layout">
                      {/* Left Column */}
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.75rem' }}>
                          {subContent.title}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                          {subContent.overview}
                        </p>

                        {/* Majors for BBA */}
                        {bachelorData.courseType === 'bba' && bachelorData.majors && (
                          <div style={{ marginBottom: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.5rem' }}>Available Majors (Select One):</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                              {bachelorData.majors.map((m, idx) => (
                                <div key={idx} style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <span style={{ color: '#e31c23', fontWeight: 900 }}>•</span>
                                  <span>{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Admission Requirements */}
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <UserCheck size={16} style={{ color: '#e31c23' }} /> Admission Requirements
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Academic Entry Route</span>
                              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{subContent.requirements.academic}</p>
                            </div>
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e31c23', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Advanced Entry Route</span>
                              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{subContent.requirements.mature}</p>
                            </div>
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>English Language Proficiency</span>
                              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>{subContent.requirements.english}</p>
                            </div>
                          </div>
                        </div>

                        {/* Why Choose */}
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0a2540', marginBottom: '0.75rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} /> Why Choose Gatwick College?
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {subContent.whyChoose.map((why, idx) => (
                              <div 
                                key={idx}
                                style={{
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '12px',
                                  padding: '0.85rem 1rem',
                                  display: 'flex',
                                  gap: '0.5rem',
                                  alignItems: 'flex-start'
                                }}
                              >
                                <ShieldCheck size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                <span style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>{why}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Fees and Quick Facts */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Facts */}
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                            Pathway Facts
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Duration:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>{subContent.duration}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Academic Level:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>{subContent.level}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Assessment:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>{subContent.assessment}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Mode:</span>
                              <span style={{ fontWeight: 700, color: '#1e293b' }}>{subContent.mode}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tuition Card */}
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e31c23', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(227, 28, 35, 0.05)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#e31c23', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px dashed #f1f5f9', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <DollarSign size={15} /> Bachelor's Tuition Fees
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 700 }}>Local Students:</span>
                              <span style={{ fontWeight: 850, color: '#0f172a' }}>{subContent.fees.local}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                              <span style={{ color: '#64748b', fontWeight: 700 }}>International:</span>
                              <span style={{ fontWeight: 850, color: '#2563eb' }}>{subContent.fees.international}</span>
                            </div>
                          </div>
                          <div style={{ backgroundColor: '#f8fafc', padding: '0.65rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#475569', lineHeight: 1.35 }}>
                            Supports scholarships, flexible installment & Myfees.lk Study Now Pay Later.
                          </div>
                        </div>

                        {/* Campus Branches Card */}
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '1.25rem' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0a2540', marginTop: 0, marginBottom: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <MapPin size={16} style={{ color: '#e31c23' }} /> Campus Branches
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', display: 'block', marginBottom: '0.15rem' }}>Colombo Headquarters</span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>500 Galle Road, Colombo 06</span>
                              <a 
                                href="https://maps.google.com/?q=500+Galle+Road,+Colombo+06,+Sri+Lanka" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn"
                                style={{ display: 'inline-flex', fontSize: '0.72rem', padding: '0.35rem 0.65rem', textDecoration: 'none', width: 'auto', gap: '0.25rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', fontWeight: 700 }}
                              >
                                View Map & Directions
                              </a>
                            </div>
                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a2540', display: 'block', marginBottom: '0.15rem' }}>Kandy Branch Campus</span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>291 A9, Kandy</span>
                              <a 
                                href="https://maps.google.com/?q=291+A9,+Kandy,+Sri+Lanka" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn"
                                style={{ display: 'inline-flex', fontSize: '0.72rem', padding: '0.35rem 0.65rem', textDecoration: 'none', width: 'auto', gap: '0.25rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', fontWeight: 700 }}
                              >
                                View Map & Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={handleDownloadSyllabus}
              className="btn"
              style={{ 
                backgroundColor: '#0a2540', 
                color: '#ffffff', 
                fontWeight: 700, 
                padding: '0.65rem 1.25rem', 
                borderRadius: '8px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 12px rgba(10, 37, 64, 0.15)',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e31c23'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0a2540'}
            >
              <Download size={16} /> Download Syllabus / Export PDF
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={onClose}
              className="btn"
              style={{ 
                backgroundColor: '#ffffff', 
                color: '#475569', 
                border: '1px solid #cbd5e1', 
                fontWeight: 700, 
                padding: '0.65rem 1.25rem', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}
            >
              Close Details
            </button>
            <button 
              onClick={() => {
                onEnquire(getEnquiryTarget(), primaryCampus);
                onClose();
              }}
              className="btn btn-primary"
              style={{ 
                backgroundColor: '#e31c23', 
                borderColor: '#e31c23', 
                color: '#ffffff', 
                fontWeight: 700, 
                padding: '0.65rem 1.5rem', 
                borderRadius: '8px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Enquire / Apply Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
