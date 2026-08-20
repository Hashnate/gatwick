import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortalModal from './components/PortalModal';
import AccreditationModal from './components/AccreditationModal';
import ScrollToTopButton from './components/ScrollToTopButton';
import WhatsAppButton from './components/WhatsAppButton';

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
import { getCleanUrl, parseCurrentRoute } from './services/router';

const studentLifeAnchors = ['clubs-societies', 'campus-life', 'student-services', 'community-services', 'workshops', 'internships', 'graduation'];
const admissionsAnchors = ['diploma', 'undergraduate', 'postgraduate', 'entry-requirements', 'tuition', 'how-to-apply', 'international', 'global-footprint', 'english-requirements', 'inquiry-form', 'international-section'];

const getInitialPage = () => {
  const route = parseCurrentRoute();
  return route.page;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Ref always holds the live admin state — readable inside stale event listener closures
  const isAdminModeRef = React.useRef(false);
  // Single source of truth for which About sub-section tab is active
  const [activeAboutTab, setActiveAboutTab] = useState(() => {
    const route = parseCurrentRoute();
    return route.aboutTab || 'story';
  });
  const [activeLegalTab, setActiveLegalTab] = useState(() => {
    const route = parseCurrentRoute();
    if (route.page === 'policies') return 'policies';
    return 'privacy';
  });
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState(null); // 'othm', 'ncc', etc.

  // Admin Data State
  // Always start as NOT authenticated — verified async below (never trust localStorage alone)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  // authChecked prevents showing anything until auth verification finishes
  const [authChecked, setAuthChecked] = useState(false);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [events, setEvents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [convocationRegistrations, setConvocationRegistrations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeDetailCourse, setActiveDetailCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data and verify admin auth asynchronously on every mount
  // Auth is ALWAYS re-verified — localStorage alone never grants access
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
        // Only set authenticated AFTER server confirms it
        setIsAdminAuthenticated(!!auth);
        setTestimonials(t || []);
        setConvocationRegistrations(cnv || []);
      } catch (err) {
        console.error("Error loading initial data:", err);
        // On error, keep unauthenticated for safety
        setIsAdminAuthenticated(false);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
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

  // Handle browser back and forward actions (HTML5 Clean Path Routing)
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseCurrentRoute();

      // While in admin mode: AdminLayout owns all history management.
      // App.jsx ensures React state is locked to admin and URL stays on clean admin path.
      if (isAdminModeRef.current) {
        if (route.page !== 'admin') {
          window.history.replaceState({ adminTab: 'dashboard' }, '', getCleanUrl('admin', 'dashboard'));
        }
        setCurrentPage('admin');
        return;
      }

      setCurrentPage(route.page);
      if (route.page === 'about' && route.aboutTab) {
        setActiveAboutTab(route.aboutTab);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    // Initial load check
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
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
    isAdminModeRef.current = true;
  };

  const handleAdminLogout = async () => {
    isAdminModeRef.current = false;
    setIsAdminAuthenticated(false);
    setAuthChecked(true);
    // Stay on 'admin' page so the login form is shown immediately after sign out
    setCurrentPage('admin');
    window.history.replaceState(null, '', getCleanUrl('admin', 'login'));
    await setAdminAuth(false);
  };

  // Keep isAdminModeRef in sync — AdminLayout now owns all history manipulation
  useEffect(() => {
    isAdminModeRef.current = currentPage === 'admin' && isAdminAuthenticated;
  }, [currentPage, isAdminAuthenticated]);

  const handleReturnToPublicSite = async () => {
    isAdminModeRef.current = false;
    setIsAdminAuthenticated(false);
    sessionStorage.setItem('gcbt_current_page', 'home');
    setCurrentPage('home');
    window.history.pushState(null, '', getCleanUrl('home'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await setAdminAuth(false);
  };

  // Save current page to sessionStorage on every change so refresh can restore it
  useEffect(() => {
    if (currentPage && currentPage !== 'admin') {
      sessionStorage.setItem('gcbt_current_page', currentPage);
      const targetUrl = currentPage === 'about' 
        ? getCleanUrl('about', activeAboutTab !== 'story' ? activeAboutTab : '') 
        : getCleanUrl(currentPage);
      
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath !== targetUrl && !window.location.hash) {
        window.history.replaceState(null, '', targetUrl);
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
    // While auth verification is still in progress, show nothing (prevents flash of admin)
    if (!authChecked) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f172a' }}>
          <div style={{ color: '#94a3b8', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>Verifying session…</div>
        </div>
      );
    }

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
        return (
          <Othm 
            setCurrentPage={setCurrentPage} 
            setSelectedEnquiryCourse={setSelectedEnquiryCourse} 
            onOpenPartnerModal={setActivePartner} 
            onOpenDetailsModal={handleOpenDetailsModal} 
          />
        );
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
      <main style={{ flexGrow: 1, minHeight: 'calc(100vh - 76px)' }}>
        {renderActivePage()}
      </main>

      {/* Footer component */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Overlays & Floating Controls */}
      <ScrollToTopButton />
      <WhatsAppButton />

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
