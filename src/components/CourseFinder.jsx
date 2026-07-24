import React, { useState, useMemo } from 'react';
import { courses, schools } from '../data';
import { Search, MapPin, Clock, ArrowRight, Award } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function CourseFinder({ initialSchool = 'all', onSelectCourse }) {
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(initialSchool);
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('all');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                            course.desc.toLowerCase().includes(search.toLowerCase());
      
      const matchesSchool = selectedSchool === 'all' || course.school === selectedSchool;
      
      const matchesMode = selectedMode === 'all' || course.mode.includes(selectedMode);
      
      const matchesCampus = selectedCampus === 'all' || course.campus.includes(selectedCampus);

      return matchesSearch && matchesSchool && matchesMode && matchesCampus;
    });
  }, [search, selectedSchool, selectedMode, selectedCampus]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSchool('all');
    setSelectedMode('all');
    setSelectedCampus('all');
  };

  return (
    <div>
      <div className="search-widget-card" style={{ marginTop: '0', marginBottom: '2.5rem' }}>
        <div className="finder-inputs-row">
          <div className="finder-input-group">
            <label htmlFor="finder-keyword">What do you want to study?</label>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                id="finder-keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses (e.g. Accounting, IT, Psychology)..."
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div className="finder-input-group">
            <label htmlFor="finder-school">Subject Area</label>
            <CustomSelect
              id="finder-school"
              value={selectedSchool}
              onChange={setSelectedSchool}
              options={[
                { value: 'all', label: 'All Schools' },
                ...schools.map(s => ({ value: s.id, label: s.name }))
              ]}
            />
          </div>

          <div className="finder-input-group">
            <label htmlFor="finder-mode">Mode of Study</label>
            <CustomSelect
              id="finder-mode"
              value={selectedMode}
              onChange={setSelectedMode}
              options={[
                { value: 'all', label: 'All Modes' },
                { value: 'On-Campus', label: 'On-Campus' },
                { value: 'Hybrid', label: 'Hybrid' },
                { value: 'Distance', label: 'Distance' }
              ]}
            />
          </div>

          <div className="finder-input-group">
            <label htmlFor="finder-campus">Campus Location</label>
            <CustomSelect
              id="finder-campus"
              value={selectedCampus}
              onChange={setSelectedCampus}
              options={[
                { value: 'all', label: 'All Campuses' },
                { value: 'Colombo', label: 'Colombo' },
                { value: 'Kandy', label: 'Kandy' }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="courses-status-bar">
        <div className="courses-count">
          Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
        </div>
        {(search || selectedSchool !== 'all' || selectedMode !== 'all' || selectedCampus !== 'all') && (
          <button 
            onClick={handleResetFilters}
            style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e31c23' }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid-3">
          {filteredCourses.map(course => {
            const schoolObj = schools.find(s => s.id === course.school);
            return (
              <div className="course-card" key={course.id}>
                <div className="course-image-wrapper">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="course-img"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600";
                    }}
                  />
                </div>
                <div className="course-body">
                  <div className="course-school">{schoolObj ? schoolObj.name : course.school}</div>
                  <h3 className="course-title">{course.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    {course.desc}
                  </p>
                  
                  <div className="course-meta">
                    <div className="course-meta-item" title="Duration">
                      <Clock size={14} /> <span>{course.duration}</span>
                    </div>
                    <div className="course-meta-item" title="Campuses">
                      <MapPin size={14} /> <span>{course.campus.join(', ')}</span>
                    </div>
                    <div className="course-meta-item" title="Study Mode">
                      <Award size={14} /> <span>{course.mode.join(', ')}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectCourse(course)}
                    className="btn btn-navy" 
                    style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', gap: '0.5rem' }}
                  >
                    Enquire Course <ArrowRight size={16} />
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Courses Found</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            We couldn't find any courses matching your current search parameters. Try clearing filters or refining your keyword.
          </p>
          <button onClick={handleResetFilters} className="btn btn-primary">
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
}

