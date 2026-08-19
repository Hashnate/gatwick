// File: /var/www/gatwick/src/services/pdfGenerator.js
// Client-side PDF generator for Course Syllabus & Prospectus

import { jsPDF } from 'jspdf';

export function downloadCourseSyllabusPDF(course, schoolName, reqs, extraDetails, feeLocal, feeInternational, studyModes, modulesList) {
  if (!course) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2);

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const docRef = `GCBT-SYL-${(course.id || 'COURSE').toUpperCase()}-${new Date().getFullYear()}`;
  const levelTag = (course.level || 'UK Regulated Qualification').toUpperCase();
  const desc = course.description || course.desc || 'Comprehensive higher education qualification delivered by Gatwick College of Business & Technology under UK quality assurance frameworks.';

  // -------------------------------------------------------------
  // TOP BRANDING HEADER BAR
  // -------------------------------------------------------------
  doc.setFillColor(10, 37, 64); // #0a2540 Navy
  doc.rect(0, 0, pageWidth, 4.5, 'F');

  doc.setFillColor(227, 28, 35); // #e31c23 Crimson
  doc.rect(0, 4.5, pageWidth, 1.5, 'F');

  let y = 14;

  // Institution Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(10, 37, 64);
  doc.text('GATWICK COLLEGE', margin, y);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(227, 28, 35);
  doc.text('OF BUSINESS & TECHNOLOGY • TRANSNATIONAL HIGHER EDUCATION', margin, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Colombo Campus (500 Galle Rd) • Kandy Campus (421 Peradeniya Rd) • Global Online', margin, y + 8.5);

  // Right-aligned Document Reference Block
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(pageWidth - margin - 58, y - 4, 58, 14, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(227, 28, 35);
  doc.text('OFFICIAL SYLLABUS SPECIFICATION', pageWidth - margin - 55, y);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(6.5);
  doc.text(`Ref: ${docRef}`, pageWidth - margin - 55, y + 4);
  doc.text(`Issued: ${currentDate}`, pageWidth - margin - 55, y + 7.5);

  y += 13;

  // Header Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;

  // -------------------------------------------------------------
  // COURSE TITLE & BADGES
  // -------------------------------------------------------------
  // Badges
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');

  // Level Badge
  doc.setFillColor(10, 37, 64);
  doc.setTextColor(255, 255, 255);
  const lvlWidth = doc.getTextWidth(levelTag) + 6;
  doc.roundedRect(margin, y, lvlWidth, 4.5, 1, 1, 'F');
  doc.text(levelTag, margin + 3, y + 3.2);

  // School Badge
  doc.setFillColor(239, 246, 255);
  doc.setTextColor(37, 99, 235);
  doc.setDrawColor(191, 219, 254);
  const schoolText = (schoolName || 'Faculty of Study').toUpperCase();
  const schoolWidth = doc.getTextWidth(schoolText) + 6;
  doc.roundedRect(margin + lvlWidth + 2, y, schoolWidth, 4.5, 1, 1, 'FD');
  doc.text(schoolText, margin + lvlWidth + 5, y + 3.2);

  // Ofqual Badge if exists
  if (course.ofqual || course.ofqualNum) {
    const ofqualText = `OFQUAL: ${course.ofqual || course.ofqualNum}`;
    doc.setFillColor(240, 253, 244);
    doc.setTextColor(22, 163, 74);
    doc.setDrawColor(187, 247, 208);
    const ofqualWidth = doc.getTextWidth(ofqualText) + 6;
    doc.roundedRect(margin + lvlWidth + schoolWidth + 4, y, ofqualWidth, 4.5, 1, 1, 'FD');
    doc.text(ofqualText, margin + lvlWidth + schoolWidth + 7, y + 3.2);
  }

  y += 8;

  // Course Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(10, 37, 64);
  const titleLines = doc.splitTextToSize(course.title || 'Course Specification', contentWidth);
  doc.text(titleLines, margin, y);
  y += (titleLines.length * 6) + 1;

  // Course Overview Paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(desc, contentWidth);
  doc.text(descLines, margin, y);
  y += (descLines.length * 3.8) + 3;

  // -------------------------------------------------------------
  // QUICK FACTS 4-BOX MATRIX
  // -------------------------------------------------------------
  const boxWidth = (contentWidth - 6) / 4;
  const boxHeight = 13;

  const facts = [
    { label: 'DURATION', value: course.duration || '12 Months' },
    { label: 'TOTAL CREDITS', value: course.credits ? `${course.credits} Credits` : '120 Credits' },
    { label: 'STUDY MODE', value: studyModes || 'Online / Hybrid' },
    { label: 'ASSESSMENT', value: 'Assignments Only' }
  ];

  facts.forEach((fact, i) => {
    const bx = margin + (i * (boxWidth + 2));
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(bx, y, boxWidth, boxHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(fact.label, bx + (boxWidth / 2), y + 4.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(10, 37, 64);
    const valLines = doc.splitTextToSize(fact.value, boxWidth - 3);
    doc.text(valLines, bx + (boxWidth / 2), y + 9.5, { align: 'center' });
  });

  y += boxHeight + 4;

  // -------------------------------------------------------------
  // 2-COLUMN SECTION: (Left: Modules & Entry Reqs / Right: Tuition & Facts)
  // -------------------------------------------------------------
  const leftColWidth = contentWidth * 0.58;
  const rightColWidth = contentWidth * 0.40;
  const rightColX = margin + leftColWidth + (contentWidth * 0.02);

  const start2ColY = y;

  // --- LEFT COLUMN: CORE MODULES ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(10, 37, 64);
  doc.text('CORE SYLLABUS & KEY MODULES', margin, y);

  doc.setDrawColor(227, 28, 35);
  doc.setLineWidth(0.6);
  doc.line(margin, y + 1.5, margin + leftColWidth, y + 1.5);

  let leftY = y + 5;

  if (modulesList && modulesList.length > 0) {
    modulesList.slice(0, 8).forEach((m, idx) => {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, leftY, leftColWidth, 6, 1, 1, 'FD');

      // Red left accent
      doc.setFillColor(227, 28, 35);
      doc.rect(margin, leftY, 1.5, 6, 'F');

      // Module Index Badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(10, 37, 64);
      const modCode = `M${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}`;
      doc.text(modCode, margin + 3.5, leftY + 4.2);

      // Module Title
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(30, 41, 59);
      const modTitle = doc.splitTextToSize(m, leftColWidth - 14);
      doc.text(modTitle[0], margin + 11, leftY + 4.2);

      leftY += 7.2;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Comprehensive unit outline provided upon academic enrollment.', margin, leftY + 4);
    leftY += 8;
  }

  // --- LEFT COLUMN: ADMISSION REQUIREMENTS ---
  leftY += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(10, 37, 64);
  doc.text('ADMISSION & ENTRY PREREQUISITES', margin, leftY);

  doc.setDrawColor(10, 37, 64);
  doc.setLineWidth(0.6);
  doc.line(margin, leftY + 1.5, margin + leftColWidth, leftY + 1.5);

  leftY += 5;

  const reqList = [
    { title: 'Standard Academic Entry', text: reqs.academic, color: [10, 37, 64] },
    { title: 'Mature / Work Experience Route', text: reqs.mature, color: [227, 28, 35] },
    { title: 'English Competency', text: reqs.english, color: [37, 99, 235] }
  ];

  reqList.forEach(r => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(r.color[0], r.color[1], r.color[2]);
    const rTitle = r.title.toUpperCase();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);
    const rLines = doc.splitTextToSize(r.text, leftColWidth - 6);
    const cardH = (rLines.length * 2.8) + 6.5;

    doc.roundedRect(margin, leftY, leftColWidth, cardH, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r.color[0], r.color[1], r.color[2]);
    doc.text(rTitle, margin + 3, leftY + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(rLines, margin + 3, leftY + 7);

    leftY += cardH + 2;
  });

  // --- RIGHT COLUMN: TUITION FEES & FINANCIAL SUPPORT ---
  let rightY = start2ColY;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(227, 28, 35);
  doc.text('TUITION & INVESTMENT', rightColX, rightY);

  doc.setDrawColor(227, 28, 35);
  doc.setLineWidth(0.6);
  doc.line(rightColX, rightY + 1.5, rightColX + rightColWidth, rightY + 1.5);

  rightY += 5;

  // Tuition Box
  const tuitionBoxHeight = 32;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(227, 28, 35);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightColX, rightY, rightColWidth, tuitionBoxHeight, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('LOCAL STUDENTS TUITION:', rightColX + 4, rightY + 5.5);
  doc.setFontSize(11);
  doc.setTextColor(10, 37, 64);
  doc.text(feeLocal || 'LKR 165,000', rightColX + 4, rightY + 11);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('INTERNATIONAL STUDENTS:', rightColX + 4, rightY + 17);
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text(feeInternational || 'USD 750', rightColX + 4, rightY + 22);

  doc.setFillColor(248, 250, 252);
  doc.rect(rightColX + 1, rightY + 24, rightColWidth - 2, 7, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(71, 85, 105);
  doc.text('Flexible 0% interest monthly installments or Study Now, Pay Later', rightColX + 3, rightY + 27);
  doc.text('(SNPL) student loans available via Myfees.lk.', rightColX + 3, rightY + 29.5);

  rightY += tuitionBoxHeight + 4;

  // --- RIGHT COLUMN: CAMPUS BRANCHES ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 37, 64);
  doc.text('CAMPUS LOCATIONS', rightColX, rightY);

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(rightColX, rightY + 1.5, rightColX + rightColWidth, rightY + 1.5);

  rightY += 4.5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightColX, rightY, rightColWidth, 22, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(10, 37, 64);
  doc.text('Colombo Headquarters:', rightColX + 3, rightY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('500 Galle Road, Colombo 06, Sri Lanka', rightColX + 3, rightY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(10, 37, 64);
  doc.text('Kandy Campus Branch:', rightColX + 3, rightY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('421 Peradeniya Road, Kandy, Sri Lanka', rightColX + 3, rightY + 17.5);

  rightY += 25;

  // --- RIGHT COLUMN: ACCREDITATION & RECOGNITION ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 37, 64);
  doc.text('GLOBAL RECOGNITION', rightColX, rightY);

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(rightColX, rightY + 1.5, rightColX + rightColWidth, rightY + 1.5);

  rightY += 4.5;

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(rightColX, rightY, rightColWidth, 20, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(22, 101, 52);
  doc.text('• Ofqual UK Regulated Awarding Body Alignment', rightColX + 3, rightY + 4.5);
  doc.text('• University Grants Commission (UGC) Recognized', rightColX + 3, rightY + 8.5);
  doc.text('• World Education Services (WES) Evaluation Approved', rightColX + 3, rightY + 12.5);
  doc.text('• Direct UK/Global Final-Year Degree Top-Up Routes', rightColX + 3, rightY + 16.5);

  // -------------------------------------------------------------
  // OFFICIAL FOOTER
  // -------------------------------------------------------------
  const footerY = pageHeight - 15;
  doc.setDrawColor(10, 37, 64);
  doc.setLineWidth(0.6);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(10, 37, 64);
  doc.text('Gatwick College Admissions & Student Affairs Office', margin, footerY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Hotline: +94 11 250 8899 / +94 77 123 4567 • Email: admissions@gcbt.edu.lk • Web: www.gcbt.edu.lk', margin, footerY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(227, 28, 35);
  doc.text('VERIFIED ACADEMIC SPECIFICATION', pageWidth - margin, footerY + 5, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Page 1 of 1 • ${docRef}`, pageWidth - margin, footerY + 8, { align: 'right' });

  // -------------------------------------------------------------
  // DIRECT PDF DOWNLOAD
  // -------------------------------------------------------------
  const cleanTitle = (course.title || 'Course_Syllabus').replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${cleanTitle}_Syllabus.pdf`);
}
