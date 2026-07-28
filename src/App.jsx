import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PortalModal from './components/PortalModal';
import AccreditationModal from './components/AccreditationModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Admissions from './pages/Admissions';
import StudentLife from './pages/StudentLife';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
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
  setAdminAuth
} from './services/adminStorage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState(null); // 'othm', 'ncc', etc.

  // Admin Data State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(localStorage.getItem('gcbt_admin_auth') === 'true');
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [events, setEvents] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Load data asynchronously on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [c, f, e, i, auth] = await Promise.all([
          getStoredCourses(),
          getStoredFaculty(),
          getStoredEvents(),
          getStoredInquiries(),
          checkAdminAuth()
        ]);
        setCourses(c || []);
        setFaculty(f || []);
        setEvents(e || []);
        setInquiries(i || []);
        setIsAdminAuthenticated(auth);
      } catch (err) {
        console.error("Error loading initial data:", err);
      }
    };
    loadData();
  }, []);

  // Refresh inquiries whenever page changes to admin
  useEffect(() => {
    if (currentPage === 'admin') {
      const refreshAdmin = async () => {
        try {
          const [i, c, f, e] = await Promise.all([
            getStoredInquiries(),
            getStoredCourses(),
            getStoredFaculty(),
            getStoredEvents()
          ]);
          setInquiries(i || []);
          setCourses(c || []);
          setFaculty(f || []);
          setEvents(e || []);
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
    mode: 'all',
    campus: 'all'
  });

  // Track globally selected course for contact page redirect
  const [selectedEnquiryCourse, setSelectedEnquiryCourse] = useState('');

  // Refresh inquiries whenever page changes to admin
  useEffect(() => {
    if (currentPage === 'admin') {
      setInquiries(getStoredInquiries());
      setCourses(getStoredCourses());
      setFaculty(getStoredFaculty());
      setEvents(getStoredEvents());
    }
  }, [currentPage]);

  // Handle browser back and forward actions (hash & pathname routing)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathSegments = window.location.pathname.toLowerCase().split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1] || '';
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'programs', 'admissions', 'student-life', 'contact', 'legal', 'othm', 'admin'];
      
      if (lastSegment === 'admin' || hash === 'admin' || pathSegments.includes('admin')) {
        setCurrentPage('admin');
      } else if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (hash.startsWith('about-')) {
        setCurrentPage('about');
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

  // Admin Handlers
  const handleSaveCourse = async (courseToSave) => {
    const existsIndex = courses.findIndex(c => c.id === courseToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...courses];
      updated[existsIndex] = courseToSave;
    } else {
      updated = [courseToSave, ...courses];
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
    window.open('http://187.127.152.141/gatwick/', '_blank', 'noopener,noreferrer');
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
        faculty={faculty}
        events={events}
        onSaveCourse={handleSaveCourse}
        onDeleteCourse={handleDeleteCourse}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onSaveInquiryNotes={handleSaveInquiryNotes}
        onSaveFaculty={handleSaveFaculty}
        onDeleteFaculty={handleDeleteFaculty}
        onSaveEvent={handleSaveEvent}
        onDeleteEvent={handleDeleteEvent}
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
          />
        );
      case 'about':
        return <About onOpenPartnerModal={setActivePartner} facultyStaff={faculty} />;
      case 'programs':
        return (
          <Programs 
            filterState={filterState} 
            setFilterState={setFilterState} 
            setCurrentPage={setCurrentPage}
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
            courses={courses}
          />
        );
      case 'admissions':
        return <Admissions courses={courses} />;
      case 'student-life':
        return <StudentLife events={events} />;
      case 'contact':
        return (
          <Contact 
            selectedEnquiryCourse={selectedEnquiryCourse} 
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
            courses={courses}
          />
        );
      case 'legal':
        return <Legal />;
      case 'othm':
        return (
          <Othm 
            setCurrentPage={setCurrentPage}
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
            onOpenPartnerModal={setActivePartner}
          />
        );
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setFilterState={setFilterState} 
            onOpenPartnerModal={setActivePartner}
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
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {renderActivePage()}
      </main>

      {/* Footer component */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Overlays */}
      <PortalModal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
      />

      <AccreditationModal 
        activePartner={activePartner} 
        onClose={() => setActivePartner(null)} 
      />
    </div>
  );
}
