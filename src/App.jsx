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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState(null); // 'othm', 'ncc', etc.

  // Pre-load parameters for searching across pages
  const [filterState, setFilterState] = useState({
    search: '',
    school: 'all',
    mode: 'all',
    campus: 'all'
  });

  // Track globally selected course for contact page redirect
  const [selectedEnquiryCourse, setSelectedEnquiryCourse] = useState('');

  // Handle browser back and forward actions (hash router simulation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'about', 'programs', 'admissions', 'student-life', 'contact', 'legal', 'othm'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
