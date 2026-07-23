import React from 'react';
import CourseFinder from '../components/CourseFinder';

export default function Programs({ filterState, setFilterState, setCurrentPage, setSelectedEnquiryCourse }) {
  const handleSelectCourseForEnquiry = (course) => {
    setSelectedEnquiryCourse(course.id);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-navy" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: '#e31c23', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Transnational Curriculum
          </span>
          <h1 className="title-medium" style={{ margin: '0.5rem 0 0' }}>Find Your Course</h1>
        </div>
      </section>

      {/* Program Database Search Section */}
      <section className="section">
        <div className="container">
          <CourseFinder 
            initialSchool={filterState.school || 'all'} 
            onSelectCourse={handleSelectCourseForEnquiry}
          />
        </div>
      </section>
    </div>
  );
}
