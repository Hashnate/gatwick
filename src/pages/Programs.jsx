import React from 'react';
import CourseFinder from '../components/CourseFinder';

export default function Programs({ filterState, setFilterState, setCurrentPage, setSelectedEnquiryCourse, courses, isLoading, onOpenDetailsModal }) {
  const handleSelectCourseForEnquiry = (course) => {
    setSelectedEnquiryCourse(course.id);
    setCurrentPage('contact');
    setTimeout(() => {
      const formEl = document.getElementById('inquiry-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-page-header" style={{ padding: '2.25rem 0 1rem 0', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Transnational Curriculum
          </span>
          <h1 className="title-medium" style={{ margin: '0.4rem 0 0', color: '#0a2540' }}>Find Your Course</h1>
        </div>
      </section>

      {/* Unified Program Database Search Section */}
      <section className="section" style={{ paddingTop: '1.25rem' }}>
        <div className="container">
          <CourseFinder 
            initialSchool={filterState.school || 'all'} 
            initialLevel={filterState.level || 'all'}
            onSelectCourse={handleSelectCourseForEnquiry}
            courses={courses}
            isLoading={isLoading}
            onOpenDetailsModal={onOpenDetailsModal}
          />
        </div>
      </section>
    </div>
  );
}

