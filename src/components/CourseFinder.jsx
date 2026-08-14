import React, { useState, useMemo } from 'react';
import { courses, schools } from '../data';
import { Search, MapPin, Clock, ArrowRight, Award } from 'lucide-react';
import CustomSelect from './CustomSelect';

function getCourseLevelGroup(course) {
  const lvl = (course.level || '');
  const lvlUp = lvl.toUpperCase();
  const cId = (course.id || '');

  // 1. Postgraduate / Master's (Level 7)
  if (lvl.includes("Master's Degree") || lvlUp.startsWith('L7') || lvlUp.includes('LEVEL 7')) {
    return 'postgraduate';
  }

  // 2. Undergraduate / Bachelor's (Level 4–6)
  if (
    lvl.includes("Bachelor's Degree") || 
    lvlUp.startsWith('L6') || lvlUp.includes('LEVEL 6') ||
    lvlUp.startsWith('L5') || lvlUp.includes('LEVEL 5') ||
    lvlUp.startsWith('L4') || lvlUp.includes('LEVEL 4')
  ) {
    return 'undergraduate';
  }

  // 3. Foundation & Skill Diplomas (Level 3 & Skill Diplomas)
  if (lvlUp.startsWith('L3') || lvlUp.includes('LEVEL 3') || cId.startsWith('dip-') || lvlUp.includes('DIPLOMA')) {
    return 'foundation_diploma';
  }

  return 'other';
}

const LEVEL_OPTIONS = [
  { value: 'all', label: 'All Levels' },
  { value: 'postgraduate', label: "🎓 Postgraduate / Master's (Level 7)" },
  { value: 'undergraduate', label: "🎓 Undergraduate / Bachelor's (Level 4–6)" },
  { value: 'foundation_diploma', label: "📗 Foundation & Diplomas (Level 3 & Skill Diplomas)" }
];

export default function CourseFinder({ initialSchool = 'all', initialLevel = 'all', onSelectCourse, courses: propCourses, onOpenDetailsModal, isLoading }) {
  const activeCourses = propCourses || courses;
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(initialSchool);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('all');

  React.useEffect(() => {
    setSelectedLevel(initialLevel);
  }, [initialLevel]);

  React.useEffect(() => {
    setSelectedSchool(initialSchool);
  }, [initialSchool]);

  const filteredCourses = useMemo(() => {
    return activeCourses.filter(course => {
      const courseDesc = course.description || course.desc || '';
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                            courseDesc.toLowerCase().includes(search.toLowerCase());
      
      const matchesSchool = selectedSchool === 'all' || course.school === selectedSchool;

      const matchesLevel = selectedLevel === 'all' || getCourseLevelGroup(course) === selectedLevel;
      
      const matchesMode = selectedMode === 'all' || course.mode.includes(selectedMode);
      
      const matchesCampus = selectedCampus === 'all' || course.campus.includes(selectedCampus);

      return matchesSearch && matchesSchool && matchesLevel && matchesMode && matchesCampus;
    });
  }, [activeCourses, search, selectedSchool, selectedLevel, selectedMode, selectedCampus]);

  const hasActiveFilters = search || selectedSchool !== 'all' || selectedLevel !== 'all' || selectedMode !== 'all' || selectedCampus !== 'all';

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSchool('all');
    setSelectedLevel('all');
    setSelectedMode('all');
    setSelectedCampus('all');
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{
          width: '42px',
          height: '42px',
          border: '4px solid #e2e8f0',
          borderTopColor: '#e31c23',
          borderRadius: '50%',
          marginBottom: '1.25rem'
        }} />
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a2540', margin: '0 0 0.35rem 0' }}>Loading Course Directory</h4>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Connecting to local student registry...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="search-widget-card" style={{ marginTop: '0', marginBottom: '1.75rem' }}>
        {/* Single unified filter row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr',
          gap: '1rem',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div className="finder-input-group">
            <label htmlFor="finder-keyword">What do you want to study?</label>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                id="finder-keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                style={{ paddingLeft: '2.75rem', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Subject Area */}
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

          {/* Qualification Level */}
          <div className="finder-input-group">
            <label htmlFor="finder-level">Qualification Level</label>
            <CustomSelect
              id="finder-level"
              value={selectedLevel}
              onChange={setSelectedLevel}
              options={LEVEL_OPTIONS}
            />
          </div>

          {/* Mode of Study */}
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
                { value: 'Online', label: 'Online' },
                { value: 'Distance', label: 'Distance' }
              ]}
            />
          </div>

          {/* Campus Location */}
          <div className="finder-input-group">
            <label htmlFor="finder-campus">Campus</label>
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
          Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'Course' : 'Courses'}
          {hasActiveFilters && <span style={{ color: '#64748b', fontWeight: 400, marginLeft: '0.5rem' }}>of {activeCourses.length} total</span>}
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            style={{
              padding: '0.45rem 1rem',
              border: '1.5px solid #e31c23',
              borderRadius: '6px',
              background: 'transparent',
              color: '#e31c23',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#e31c23'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e31c23'; }}
          >
            ✕ Clear All Filters
          </button>
        )}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid-3">
          {filteredCourses.map(course => {
            const schoolObj = schools.find(s => s.id === course.school);
            return (
              <div 
                className="course-card" 
                key={course.id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (course.linkToContact && onSelectCourse) {
                    onSelectCourse(course);
                  } else if (onOpenDetailsModal) {
                    onOpenDetailsModal(course);
                  } else if (onSelectCourse) {
                    onSelectCourse(course);
                  }
                }}
              >
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
                  
                  <div className="course-meta">
                    <div className="course-meta-item" title="Duration">
                      <Clock size={14} /> <span>{course.duration}</span>
                    </div>
                    <div className="course-meta-item" title="Campuses">
                      <MapPin size={14} /> <span>{Array.isArray(course.campus) ? course.campus.join(', ') : (course.campus || 'Colombo & Kandy')}</span>
                    </div>
                    <div className="course-meta-item" title="Study Mode">
                      <Award size={14} /> <span>{Array.isArray(course.mode) ? course.mode.join(', ') : (course.mode || 'Online / Hybrid')}</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (course.linkToContact && onSelectCourse) {
                        onSelectCourse(course);
                      } else if (onOpenDetailsModal) {
                        onOpenDetailsModal(course);
                      } else if (onSelectCourse) {
                        onSelectCourse(course);
                      }
                    }}
                    className="btn btn-navy" 
                    style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', gap: '0.5rem', cursor: 'pointer' }}
                  >
                    {course.linkToContact ? 'Inquire Now' : 'View Details'} <ArrowRight size={16} />
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
