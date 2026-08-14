import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortalModal from './components/PortalModal';
import AccreditationModal from './components/AccreditationModal';
import ScrollToTopButton from './components/ScrollToTopButton';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Admissions from './pages/Admissions';
import StudentLife from './pages/StudentLife';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Policies from './pages/Policies';
import Othm from './pages/Othm';

// Admin Components & Services
import AdminLayout from './admin/AdminLayout';
import AdminLoginModal from './admin/AdminLoginModal';
import { 
  getStoredCourses, 
  saveStoredCourses,
  getStoredFaculty,
  saveStoredFaculty,
  getStoredEvents,
  saveStoredEvents,
  getStoredInquiries,
  saveStoredInquiries,
  checkAdminAuth,
  setAdminAuth,
  getStoredTestimonials,
  saveStoredTestimonials,
  getStoredConvocationRegistrations,
  saveStoredConvocationRegistrations
} from './services/adminStorage';
import CourseDetailsModal from './components/CourseDetailsModal';
import ErrorBoundary from './components/ErrorBoundary';

const studentLifeAnchors = ['clubs-societies', 'campus-life', 'student-services', 'community-services', 'workshops', 'internships', 'graduation'];
const admissionsAnchors = ['diploma', 'othm', 'undergraduate', 'postgraduate', 'entry-requirements', 'tuition', 'how-to-apply', 'international', 'global-footprint', 'english-requirements', 'inquiry-form', 'international-section'];

const getInitialPage = () => {
  const pathSegments = window.location.pathname.toLowerCase().split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || '';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const validPages = ['home', 'about', 'programs', 'admissions', 'student-life', 'contact', 'privacy-policy', 'privacy', 'policies', 'college-policies', 'legal', 'admin'];
  
  if (lastSegment === 'admin' || hash === 'admin' || pathSegments.includes('admin')) {
    return 'admin';
  } else if (hash === 'privacy' || hash === 'privacy-policy' || lastSegment === 'privacy-policy' || lastSegment === 'privacy') {
    return 'privacy-policy';
  } else if (hash === 'policies' || hash === 'college-policies' || hash === 'governance' || hash === 'legal' || lastSegment === 'policies' || lastSegment === 'legal') {
    return 'policies';
  } else if (validPages.includes(hash)) {
    return hash;
  } else if (studentLifeAnchors.includes(hash)) {
    return 'student-life';
  } else if (admissionsAnchors.includes(hash)) {
    return 'admissions';
  } else if (hash.startsWith('about-')) {
    return 'about';
  } else if (validPages.includes(lastSegment)) {
    return lastSegment;
  } else {
    const savedPage = sessionStorage.getItem('gcbt_current_page');
    if (savedPage && savedPage !== 'admin' && validPages.includes(savedPage)) {
      return savedPage;
    }
    return 'home';
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  // Single source of truth for which About sub-section tab is active
  const [activeAboutTab, setActiveAboutTab] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'about-campus') return 'campus';
    if (hash === 'about-accreditation') return 'accreditation';
    if (hash === 'about-testimonials') return 'testimonials';
    return 'story';
  });
  const [activeLegalTab, setActiveLegalTab] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'policies' || hash === 'college-policies' || hash === 'governance') return 'policies';
    return 'privacy';
  });
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState(null); // 'othm', 'ncc', etc.

  // Admin Data State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(localStorage.getItem('gcbt_admin_auth') === 'true');
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [events, setEvents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [convocationRegistrations, setConvocationRegistrations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeDetailCourse, setActiveDetailCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data asynchronously on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [c, f, e, i, auth, t, cnv] = await Promise.all([
          getStoredCourses(),
          getStoredFaculty(),
          getStoredEvents(),
          getStoredInquiries(),
          checkAdminAuth(),
          getStoredTestimonials(),
          getStoredConvocationRegistrations()
        ]);
        setCourses(c || []);
        setFaculty(f || []);
        setEvents(e || []);
        setInquiries(i || []);
        setIsAdminAuthenticated(auth);
        setTestimonials(t || []);
        setConvocationRegistrations(cnv || []);
      } catch (err) {
        console.error("Error loading initial data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Refresh inquiries & convocation whenever page changes to admin
  useEffect(() => {
    if (currentPage === 'admin') {
      const refreshAdmin = async () => {
        try {
          const [i, c, f, e, t, cnv] = await Promise.all([
            getStoredInquiries(),
            getStoredCourses(),
            getStoredFaculty(),
            getStoredEvents(),
            getStoredTestimonials(),
            getStoredConvocationRegistrations()
          ]);
          setInquiries(i || []);
          setCourses(c || []);
          setFaculty(f || []);
          setEvents(e || []);
          setTestimonials(t || []);
          setConvocationRegistrations(cnv || []);
        } catch (err) {
          console.error("Error refreshing admin data:", err);
        }
      };
      refreshAdmin();
    }
  }, [currentPage]);

  // Pre-load parameters for searching across pages
  const [filterState, setFilterState] = useState({
    search: '',
    school: 'all',
    level: 'all',
    mode: 'all',
    campus: 'all'
  });

  // Track globally selected course for contact page redirect
  const [selectedEnquiryCourse, setSelectedEnquiryCourse] = useState('');
  const [selectedEnquiryCampus, setSelectedEnquiryCampus] = useState('Colombo');


  const scrollToInquiryForm = () => {
    setTimeout(() => {
      const formEl = document.getElementById('inquiry-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenDetailsModal = (course) => {
    if (course && course.linkToContact) {
      setSelectedEnquiryCourse(course.id);
      setCurrentPage('contact');
      scrollToInquiryForm();
    } else {
      setActiveDetailCourse(course);
    }
  };


  // Handle browser back and forward actions (hash & pathname routing)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathSegments = window.location.pathname.toLowerCase().split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1] || '';
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'programs', 'admissions', 'student-life', 'contact', 'legal', 'admin'];
      
      if (lastSegment === 'admin' || hash === 'admin' || pathSegments.includes('admin')) {
        setCurrentPage('admin');
      } else if (hash === 'privacy' || hash === 'privacy-policy' || lastSegment === 'privacy-policy' || lastSegment === 'privacy') {
        setCurrentPage('privacy-policy');
      } else if (hash === 'policies' || hash === 'college-policies' || hash === 'governance' || hash === 'legal' || lastSegment === 'policies' || lastSegment === 'legal') {
        setCurrentPage('policies');
      } else if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (studentLifeAnchors.includes(hash)) {
        setCurrentPage('student-life');
      } else if (admissionsAnchors.includes(hash)) {
        setCurrentPage('admissions');
      } else if (hash.startsWith('about-')) {
        setCurrentPage('about');
        if (hash === 'about-campus') setActiveAboutTab('campus');
        else if (hash === 'about-accreditation') setActiveAboutTab('accreditation');
        else if (hash === 'about-testimonials') setActiveAboutTab('testimonials');
        else if (hash === 'about-story' || hash === 'about') setActiveAboutTab('story');
      } else if (validPages.includes(lastSegment)) {
        setCurrentPage(lastSegment);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    
    // Initial load check
    handleLocationChange();

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Normalize a course object from admin form schema to API schema
  const normalizeCourse = (c) => ({
    ...c,
    linkToContact: c.linkToContact !== undefined ? !!c.linkToContact : false,
    // Unify description field
    description: c.description || c.desc || '',
    // Unify fee fields
    fee_local: c.fee_local || c.feeLocal || '',
    fee_international: c.fee_international || c.feeInternational || '',
    // Ensure arrays
    mode: Array.isArray(c.mode) ? c.mode : (c.mode ? [c.mode] : ['Online', 'Hybrid']),
    campus: Array.isArray(c.campus) ? c.campus : (c.campus ? [c.campus] : ['Colombo', 'Kandy']),
    modules: Array.isArray(c.modules) ? c.modules : [],
  });

  // Admin Handlers
  const handleSaveCourse = async (courseToSave) => {
    const normalized = normalizeCourse(courseToSave);
    const existsIndex = courses.findIndex(c => c.id === normalized.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...courses];
      updated[existsIndex] = normalized;
    } else {
      updated = [normalized, ...courses];
    }
    setCourses(updated);
    await saveStoredCourses(updated);
  };

  const handleDeleteCourse = async (courseId) => {
    const updated = courses.filter(c => c.id !== courseId);
    setCourses(updated);
    await saveStoredCourses(updated);
  };

  const handleResetCourses = async () => {
    localStorage.removeItem('gcbt_admin_courses');
    const reset = await getStoredCourses();
    setCourses(reset || []);
  };

  const handleUpdateInquiryStatus = async (inquiryId, newStatus) => {
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, status: newStatus } : i);
    setInquiries(updated);
    await saveStoredInquiries(updated);
  };

  const handleDeleteInquiry = async (inquiryId) => {
    const updated = inquiries.filter(i => i.id !== inquiryId);
    setInquiries(updated);
    await saveStoredInquiries(updated);
  };

  const handleSaveInquiryNotes = async (inquiryId, notesText) => {
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, notes: notesText } : i);
    setInquiries(updated);
    await saveStoredInquiries(updated);
  };

  const handleSaveFaculty = async (facultyToSave) => {
    const existsIndex = faculty.findIndex(f => f.id === facultyToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...faculty];
      updated[existsIndex] = facultyToSave;
    } else {
      updated = [facultyToSave, ...faculty];
    }
    setFaculty(updated);
    await saveStoredFaculty(updated);
  };

  const handleDeleteFaculty = async (facultyId) => {
    const updated = faculty.filter(f => f.id !== facultyId);
    setFaculty(updated);
    await saveStoredFaculty(updated);
  };

  const handleSaveEvent = async (eventToSave) => {
    const existsIndex = events.findIndex(e => e.id === eventToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...events];
      updated[existsIndex] = eventToSave;
    } else {
      updated = [eventToSave, ...events];
    }
    setEvents(updated);
    await saveStoredEvents(updated);
  };

  const handleDeleteEvent = async (eventId) => {
    const updated = events.filter(e => e.id !== eventId);
    setEvents(updated);
    await saveStoredEvents(updated);
  };

  const handleSaveTestimonial = async (tToSave) => {
    const existsIndex = testimonials.findIndex(x => x.id === tToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...testimonials];
      updated[existsIndex] = tToSave;
    } else {
      updated = [tToSave, ...testimonials];
    }
    setTestimonials(updated);
    await saveStoredTestimonials(updated);
  };

  const handleDeleteTestimonial = async (tId) => {
    const updated = testimonials.filter(x => x.id !== tId);
    setTestimonials(updated);
    await saveStoredTestimonials(updated);
  };

  const handleAdminLoginSuccess = async () => {
    await setAdminAuth(true);
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = async () => {
    await setAdminAuth(false);
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
    if (window.location.pathname.toLowerCase().includes('admin')) {
      const basePath = window.location.pathname.substring(0, window.location.pathname.toLowerCase().indexOf('/admin')) || '/';
      window.history.pushState(null, '', basePath || '/');
    } else {
      window.location.hash = '#home';
    }
  };

  const handleReturnToPublicSite = () => {
    setCurrentPage('home');
    if (window.location.hash.toLowerCase().includes('admin')) {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save current page to sessionStorage on every change so refresh can restore it
  useEffect(() => {
    if (currentPage && currentPage !== 'admin') {
      sessionStorage.setItem('gcbt_current_page', currentPage);
      if (currentPage === 'about') {
        window.history.replaceState(null, '', `#about-${activeAboutTab}`);
      } else {
        const currentHash = window.location.hash.replace('#', '').toLowerCase();
        if (currentHash !== currentPage) {
          window.history.replaceState(null, '', `#${currentPage}`);
        }
      }
    }
  }, [currentPage, activeAboutTab]);

  const handleUpdateConvocationStatus = async (id, newStatus) => {
    const updated = convocationRegistrations.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setConvocationRegistrations(updated);
    await saveStoredConvocationRegistrations(updated);
  };

  const handleDeleteConvocationRegistration = async (id) => {
    const updated = convocationRegistrations.filter(r => r.id !== id);
    setConvocationRegistrations(updated);
    await saveStoredConvocationRegistrations(updated);
  };

  const handleSaveConvocationNotes = async (id, notes) => {
    const updated = convocationRegistrations.map(r => r.id === id ? { ...r, notes } : r);
    setConvocationRegistrations(updated);
    await saveStoredConvocationRegistrations(updated);
  };

  // Render Admin View or Public Pages
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLoginModal 
          onLoginSuccess={handleAdminLoginSuccess}
          onCancel={handleReturnToPublicSite}
        />
      );
    }

    return (
      <AdminLayout 
        courses={courses}
        inquiries={inquiries}
        convocationRegistrations={convocationRegistrations}
        faculty={faculty}
        events={events}
        testimonials={testimonials}
        onSaveCourse={handleSaveCourse}
        onDeleteCourse={handleDeleteCourse}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onSaveInquiryNotes={handleSaveInquiryNotes}
        onUpdateConvocationStatus={handleUpdateConvocationStatus}
        onDeleteConvocationRegistration={handleDeleteConvocationRegistration}
        onSaveConvocationNotes={handleSaveConvocationNotes}
        onSaveFaculty={handleSaveFaculty}
        onDeleteFaculty={handleDeleteFaculty}
        onSaveEvent={handleSaveEvent}
        onDeleteEvent={handleDeleteEvent}
        onSaveTestimonial={handleSaveTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        onLogout={handleAdminLogout}
        onReturnToPublicSite={handleReturnToPublicSite}
        onResetCourses={handleResetCourses}
      />
    );
  }

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setFilterState={setFilterState} 
            onOpenPartnerModal={setActivePartner}
            courses={courses}
            events={events}
            testimonials={testimonials}
            onOpenDetailsModal={handleOpenDetailsModal}
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
          />
        );
      case 'about':
        return <About onOpenPartnerModal={setActivePartner} facultyStaff={faculty} testimonials={testimonials} activeAboutTab={activeAboutTab} setActiveAboutTab={setActiveAboutTab} />;
      case 'programs':
        return (
          <Programs 
            filterState={filterState} 
            setFilterState={setFilterState} 
            setCurrentPage={setCurrentPage}
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
            courses={courses}
            isLoading={isLoading}
            onOpenDetailsModal={handleOpenDetailsModal}
            onOpenPartnerModal={setActivePartner}
          />
        );
      case 'admissions':
        return <Admissions courses={courses} />;
      case 'student-life':
        return <StudentLife events={events} testimonials={testimonials} />;
      case 'contact':
        return (
          <Contact 
            selectedEnquiryCourse={selectedEnquiryCourse} 
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
            selectedEnquiryCampus={selectedEnquiryCampus}
            setSelectedEnquiryCampus={setSelectedEnquiryCampus}
            courses={courses}
          />
        );
      case 'privacy':
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'policies':
      case 'college-policies':
      case 'governance':
      case 'legal':
        return <Policies />;
      case 'othm':
        setCurrentPage('programs');
        return null;
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setFilterState={setFilterState} 
            onOpenPartnerModal={setActivePartner}
            onOpenDetailsModal={handleOpenDetailsModal}
            courses={courses}
            events={events}
          />
        );
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header component */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onOpenPortal={() => setIsPortalOpen(true)}
        activeAboutTab={activeAboutTab}
        setActiveAboutTab={setActiveAboutTab}
        setFilterState={setFilterState}
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {renderActivePage()}
      </main>

      {/* Footer component */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Overlays & Floating Controls */}
      <ScrollToTopButton />

      <PortalModal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
      />

      <AccreditationModal 
        activePartner={activePartner} 
        onClose={() => setActivePartner(null)} 
      />

      <ErrorBoundary key={activeDetailCourse?.id ?? 'no-course'}>
        <CourseDetailsModal 
          course={activeDetailCourse} 
          onClose={() => setActiveDetailCourse(null)} 
          onEnquire={(course, campus = 'Colombo') => {
            setSelectedEnquiryCourse(course.id);
            setSelectedEnquiryCampus(campus);
            setCurrentPage('contact');
            scrollToInquiryForm();
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
