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

const getApiUrl = () => {
  if (window.location.port === '8002') {
    return '/api/api.php';
  }
  const path = window.location.pathname.toLowerCase();
  if (path.includes('/gatwick')) {
    return '/gatwick/api/api.php';
  }
  return '/api/api.php';
};
const API_URL = getApiUrl();

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
    const res = await fetch(`${API_URL}?action=${action}&_t=${Date.now()}`, options);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`API call for action '${action}' failed, using local storage fallback:`, err);
    return null;
  }
}

const processCourseWithRedirect = (course) => {
  if (!course) return course;
  const idLower = (course.id || '').toLowerCase();
  const isCustomDip = idLower.startsWith('dip-');
  const hasDetails = !!((course.description || course.desc || '').trim());

  let linkToContact = true;
  if (hasDetails) {
    if (course.linkToContact !== undefined) {
      linkToContact = !!course.linkToContact;
    } else {
      linkToContact = isCustomDip;
    }
  }

  const feeLocal = course.feeLocal || course.fee_local || '';
  const feeInternational = course.feeInternational || course.fee_international || '';
  const desc = course.desc || course.description || '';

  return {
    ...course,
    feeLocal,
    fee_local: feeLocal,
    feeInternational,
    fee_international: feeInternational,
    desc,
    description: desc,
    linkToContact
  };
};

const getCourseSortWeight = (course) => {
  const lvl = (course.level || '').toUpperCase();
  const id = (course.id || '').toLowerCase();

  // 1. Masters
  const masterIds = ['mba', 'ma-education', 'ma-ece', 'ma-tesol', 'ma-sne', 'msc-psychology'];
  if (masterIds.includes(id)) {
    return 10;
  }

  // 2. Bachelors
  const bachelorIds = ['bba', 'bit', 'ba-ece', 'ba-sne', 'ba-tesol'];
  if (bachelorIds.includes(id)) {
    return 20;
  }

  // 3. Level 7 Diplomas
  if (lvl.includes('L7') || lvl.includes('LEVEL 7') || lvl.includes('L 7')) {
    return 30;
  }

  // 4. Level 6 Diplomas
  if (lvl.includes('L6') || lvl.includes('LEVEL 6') || lvl.includes('L 6')) {
    return 40;
  }

  // 5. Level 5 Diplomas
  if (lvl.includes('L5') || lvl.includes('LEVEL 5') || lvl.includes('L 5')) {
    return 50;
  }

  // 6. Level 4 Diplomas
  if (lvl.includes('L4') || lvl.includes('LEVEL 4') || lvl.includes('L 4')) {
    return 60;
  }

  // 7. Level 3 Diplomas
  if (lvl.includes('L3') || lvl.includes('LEVEL 3') || lvl.includes('L 3')) {
    return 70;
  }

  return 100;
};

const sortCourses = (list) => {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const wA = getCourseSortWeight(a);
    const wB = getCourseSortWeight(b);
    if (wA === wB) {
      return (a.title || '').localeCompare(b.title || '');
    }
    return wA - wB;
  });
};

const DATA_VERSION = 'v2026_08_19_othm_sync_v5';

export const getStoredCourses = async () => {
  const apiData = await apiCall('get_courses');
  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    const processed = sortCourses(apiData.map(processCourseWithRedirect));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(processed));
    return processed;
  }

  const storedVer = localStorage.getItem('gcbt_data_ver');
  const data = localStorage.getItem(STORAGE_KEYS.COURSES);

  if (!data || storedVer !== DATA_VERSION) {
    const processed = sortCourses(defaultCourses.map(processCourseWithRedirect));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(processed));
    localStorage.setItem('gcbt_data_ver', DATA_VERSION);
    return processed;
  }

  try {
    return sortCourses(JSON.parse(data).map(processCourseWithRedirect));
  } catch (e) {
    const processed = sortCourses(defaultCourses.map(processCourseWithRedirect));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(processed));
    localStorage.setItem('gcbt_data_ver', DATA_VERSION);
    return processed;
  }
};

export const saveStoredCourses = async (courses) => {
  const sorted = sortCourses(courses);
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(sorted));
  await apiCall('save_courses', 'POST', sorted);
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
  // Always require entering passcode when accessing admin panel
  return false;
};

export const setAdminAuth = async (isAuthenticated) => {
  if (isAuthenticated) {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  }
  await apiCall('set_auth', 'POST', { authenticated: isAuthenticated });
};

export const getStoredTestimonials = async () => {
  const apiData = await apiCall('get_testimonials');
  if (apiData && Array.isArray(apiData)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(apiData));
    return apiData;
  }

  const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
  if (!data) return defaultTestimonials;
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultTestimonials;
  }
};

export const saveStoredTestimonials = async (list) => {
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
  await apiCall('save_testimonials', 'POST', list);
};

const initialConvocationRegistrations = [
  {
    id: 'cnv-101',
    fullName: 'Anura Perera',
    studentId: 'GCBT-2024-8841',
    program: 'Higher National Diploma in Computing',
    cohortYear: '2026 Convocation Gala (Upcoming)',
    email: 'anura.perera@gmail.com',
    phone: '+94 77 123 4567',
    tickets: '2 Tickets (Graduate + 1 Guest)',
    gownSize: 'Medium (5\'5" - 5\'9")',
    status: 'Confirmed',
    createdAt: '2026-08-01T09:30:00Z',
    notes: 'Payment verified for guest pass.'
  },
  {
    id: 'cnv-102',
    fullName: 'Samantha De Silva',
    studentId: 'GCBT-2023-4412',
    program: 'BSc (Hons) Computer Science',
    cohortYear: '2026 Convocation Gala (Upcoming)',
    email: 'samantha.ds@outlook.com',
    phone: '+94 71 888 9900',
    tickets: '3 Tickets (Graduate + 2 Guests)',
    gownSize: 'Large (5\'10" - 6\'2")',
    status: 'Gown Allocated',
    createdAt: '2026-08-03T14:15:00Z',
    notes: 'Gown fitting scheduled for Aug 15.'
  }
];

export const getStoredConvocationRegistrations = async () => {
  const apiData = await apiCall('get_convocation');
  if (apiData && Array.isArray(apiData)) {
    localStorage.setItem('gcbt_admin_convocation', JSON.stringify(apiData));
    return apiData;
  }
  const data = localStorage.getItem('gcbt_admin_convocation');
  if (!data) return initialConvocationRegistrations;
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialConvocationRegistrations;
  }
};

export const saveStoredConvocationRegistrations = async (list) => {
  localStorage.setItem('gcbt_admin_convocation', JSON.stringify(list));
  await apiCall('save_convocation', 'POST', list);
};

export const addConvocationRegistration = async (newReg) => {
  const item = {
    id: `cnv-${Date.now()}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
    notes: '',
    ...newReg
  };
  const current = await getStoredConvocationRegistrations();
  const updated = [item, ...current];
  await saveStoredConvocationRegistrations(updated);
  return item;
};
