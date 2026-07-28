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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(checkAdminAuth());
  const [courses, setCourses] = useState(getStoredCourses());
  const [faculty, setFaculty] = useState(getStoredFaculty());
  const [events, setEvents] = useState(getStoredEvents());
  const [inquiries, setInquiries] = useState(getStoredInquiries());

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
      const pathname = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'programs', 'admissions', 'student-life', 'contact', 'legal', 'othm', 'admin'];
      
      if (pathname === 'admin' || hash === 'admin') {
        setCurrentPage('admin');
      } else if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (validPages.includes(pathname)) {
        setCurrentPage(pathname);
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
  const handleSaveCourse = (courseToSave) => {
    const existsIndex = courses.findIndex(c => c.id === courseToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...courses];
      updated[existsIndex] = courseToSave;
    } else {
      updated = [courseToSave, ...courses];
    }
    setCourses(updated);
    saveStoredCourses(updated);
  };

  const handleDeleteCourse = (courseId) => {
    const updated = courses.filter(c => c.id !== courseId);
    setCourses(updated);
    saveStoredCourses(updated);
  };

  const handleUpdateInquiryStatus = (inquiryId, newStatus) => {
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, status: newStatus } : i);
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleDeleteInquiry = (inquiryId) => {
    const updated = inquiries.filter(i => i.id !== inquiryId);
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleSaveInquiryNotes = (inquiryId, notesText) => {
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, notes: notesText } : i);
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleSaveFaculty = (facultyToSave) => {
    const existsIndex = faculty.findIndex(f => f.id === facultyToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...faculty];
      updated[existsIndex] = facultyToSave;
    } else {
      updated = [facultyToSave, ...faculty];
    }
    setFaculty(updated);
    saveStoredFaculty(updated);
  };

  const handleDeleteFaculty = (facultyId) => {
    const updated = faculty.filter(f => f.id !== facultyId);
    setFaculty(updated);
    saveStoredFaculty(updated);
  };

  const handleSaveEvent = (eventToSave) => {
    const existsIndex = events.findIndex(e => e.id === eventToSave.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...events];
      updated[existsIndex] = eventToSave;
    } else {
      updated = [eventToSave, ...events];
    }
    setEvents(updated);
    saveStoredEvents(updated);
  };

  const handleDeleteEvent = (eventId) => {
    const updated = events.filter(e => e.id !== eventId);
    setEvents(updated);
    saveStoredEvents(updated);
  };

  const handleAdminLoginSuccess = () => {
    setAdminAuth(true);
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setAdminAuth(false);
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
    if (window.location.pathname.toLowerCase().includes('admin')) {
      window.history.pushState(null, '', '/');
    } else {
      window.location.hash = '#home';
    }
  };

  const handleReturnToPublicSite = () => {
    setCurrentPage('home');
    if (window.location.pathname.toLowerCase().includes('admin')) {
      window.history.pushState(null, '', '/');
    } else {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          />
        );
      case 'about':
        return <About onOpenPartnerModal={setActivePartner} />;
      case 'programs':
        return (
          <Programs 
            filterState={filterState} 
            setFilterState={setFilterState} 
            setCurrentPage={setCurrentPage}
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
          />
        );
      case 'admissions':
        return <Admissions />;
      case 'student-life':
        return <StudentLife />;
      case 'contact':
        return (
          <Contact 
            selectedEnquiryCourse={selectedEnquiryCourse} 
            setSelectedEnquiryCourse={setSelectedEnquiryCourse}
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
