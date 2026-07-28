import { 
  courses as defaultCourses, 
  schools as defaultSchools, 
  facultyStaff as defaultFaculty, 
  events as defaultEvents,
  testimonials as defaultTestimonials
} from '../data';

const STORAGE_KEYS = {
  COURSES: 'gcbt_admin_courses',
  FACULTY: 'gcbt_admin_faculty',
  EVENTS: 'gcbt_admin_events',
  INQUIRIES: 'gcbt_admin_inquiries',
  TESTIMONIALS: 'gcbt_admin_testimonials',
  AUTH: 'gcbt_admin_auth'
};

const initialInquiries = [
  {
    id: 'inq-101',
    name: 'Kavindu Senanayake',
    email: 'kavindu.s@gmail.com',
    phone: '+94 77 123 4567',
    campus: 'Colombo',
    course: 'OTHM Level 7 Diploma in Strategic Management & Leadership',
    message: 'Interested in weekend hybrid classes for Level 7. Please contact me with installment details.',
    status: 'New',
    createdAt: '2026-07-27T10:15:00Z',
    notes: ''
  },
  {
    id: 'inq-102',
    name: 'Fathima Nuha',
    email: 'nuha.fathima@yahoo.com',
    phone: '+94 71 987 6543',
    campus: 'Kandy',
    course: 'Graduate Diploma in Applied Psychology',
    message: 'Would like to inquire about admission requirements for the October intake in Kandy campus.',
    status: 'Contacted',
    createdAt: '2026-07-26T14:30:00Z',
    notes: 'Called student on July 26. Sent program syllabus via email.'
  },
  {
    id: 'inq-103',
    name: 'Devinda Perera',
    email: 'devinda.p@outlook.com',
    phone: '+94 70 444 8899',
    campus: 'Colombo',
    course: 'OTHM Level 4 Diploma in Information Technology',
    message: 'Can I apply for credit transfers from a local diploma?',
    status: 'In Progress',
    createdAt: '2026-07-25T09:20:00Z',
    notes: 'Transcript under review by academic department.'
  }
];

export const getStoredCourses = () => {
  const data = localStorage.getItem(STORAGE_KEYS.COURSES);
  return data ? JSON.parse(data) : defaultCourses;
};

export const saveStoredCourses = (courses) => {
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
};

export const getStoredFaculty = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FACULTY);
  return data ? JSON.parse(data) : defaultFaculty;
};

export const saveStoredFaculty = (faculty) => {
  localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
};

export const getStoredEvents = () => {
  const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
  return data ? JSON.parse(data) : defaultEvents;
};

export const saveStoredEvents = (events) => {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

export const getStoredInquiries = () => {
  const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  return data ? JSON.parse(data) : initialInquiries;
};

export const saveStoredInquiries = (inquiries) => {
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
};

export const addInquiry = (newInquiry) => {
  const current = getStoredInquiries();
  const inquiry = {
    id: `inq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
    notes: '',
    ...newInquiry
  };
  const updated = [inquiry, ...current];
  saveStoredInquiries(updated);
  return inquiry;
};

export const checkAdminAuth = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
};

export const setAdminAuth = (isAuthenticated) => {
  if (isAuthenticated) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
};
