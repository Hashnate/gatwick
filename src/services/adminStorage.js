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
    course: 'OTHM Level 7 Diploma in Strategic Management and Leadership',
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

const API_URL = './api/api.php';

// Helper to make API calls with fallback to local storage
async function apiCall(action, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(`${API_URL}?action=${action}`, options);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`API call for action '${action}' failed, using local storage fallback:`, err);
    return null;
  }
}

export const getStoredCourses = async () => {
  const apiData = await apiCall('get_courses');
  if (apiData && Array.isArray(apiData)) return apiData;

  const data = localStorage.getItem(STORAGE_KEYS.COURSES);
  if (!data) return defaultCourses;
  try {
    const parsed = JSON.parse(data);
    if (parsed.length !== 45) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(defaultCourses));
      return defaultCourses;
    }
    return parsed;
  } catch (e) {
    return defaultCourses;
  }
};

export const saveStoredCourses = async (courses) => {
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  await apiCall('save_courses', 'POST', courses);
};

export const getStoredFaculty = async () => {
  const apiData = await apiCall('get_faculty');
  if (apiData && Array.isArray(apiData)) return apiData;

  const data = localStorage.getItem(STORAGE_KEYS.FACULTY);
  return data ? JSON.parse(data) : defaultFaculty;
};

export const saveStoredFaculty = async (faculty) => {
  localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
  await apiCall('save_faculty', 'POST', faculty);
};

export const getStoredEvents = async () => {
  const apiData = await apiCall('get_events');
  if (apiData && Array.isArray(apiData)) return apiData;

  const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
  return data ? JSON.parse(data) : defaultEvents;
};

export const saveStoredEvents = async (events) => {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  await apiCall('save_events', 'POST', events);
};

export const getStoredInquiries = async () => {
  const apiData = await apiCall('get_inquiries');
  if (apiData && Array.isArray(apiData)) return apiData;

  const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  return data ? JSON.parse(data) : initialInquiries;
};

export const saveStoredInquiries = async (inquiries) => {
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  await apiCall('save_inquiries', 'POST', inquiries);
};

export const addInquiry = async (newInquiry) => {
  const inquiry = {
    id: `inq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
    notes: '',
    ...newInquiry
  };
  
  const apiResult = await apiCall('add_inquiry', 'POST', inquiry);
  if (apiResult) return apiResult;

  const current = await getStoredInquiries();
  const updated = [inquiry, ...current];
  await saveStoredInquiries(updated);
  return inquiry;
};

export const checkAdminAuth = async () => {
  const apiAuth = await apiCall('check_auth');
  if (apiAuth !== null) return apiAuth === true;
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
};

export const setAdminAuth = async (isAuthenticated) => {
  if (isAuthenticated) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
  await apiCall('set_auth', 'POST', { authenticated: isAuthenticated });
};
