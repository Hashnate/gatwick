import React, { useState, useMemo } from 'react';
import { courses, schools } from '../data';
import { Search, MapPin, Clock, ArrowRight, Award, LayoutGrid, Table, DollarSign, BookOpen } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

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
      
      const matchesMode = selectedMode === 'all' || 
        (Array.isArray(course.mode) ? course.mode.includes(selectedMode) : String(course.mode).includes(selectedMode));
      
      const matchesCampus = selectedCampus === 'all' || 
        (Array.isArray(course.campus) ? course.campus.includes(selectedCampus) : String(course.campus).includes(selectedCampus));

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
                { value: 'In Person', label: 'In Person' },
                { value: 'Hybrid', label: 'Hybrid' },
                { value: 'Online', label: 'Online' }
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

      <div className="courses-status-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="courses-count">
          Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'Course' : 'Courses'}
          {hasActiveFilters && <span style={{ color: '#64748b', fontWeight: 400, marginLeft: '0.5rem' }}>of {activeCourses.length} total</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '3px', border: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? '#0a2540' : '#64748b',
                fontWeight: viewMode === 'grid' ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
              title="Card Grid View"
            >
              <LayoutGrid size={15} /> Card View
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                color: viewMode === 'table' ? '#0a2540' : '#64748b',
                fontWeight: viewMode === 'table' ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
              title="Official Price List & Fee Schedule Table"
            >
              <Table size={15} /> Price List Table
            </button>
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
              ✕ Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        viewMode === 'table' ? (
          /* Official Fee Schedule & Price List Table View */
          <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,37,64,0.05)', marginTop: '1rem' }}>
            <table className="entry-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              <thead>
                <tr style={{ backgroundColor: '#0a2540', color: '#ffffff' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800 }}>Course Title</th>
                  <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 800 }}>Level</th>
                  <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 800 }}>Credits</th>
                  <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 800 }}>Duration</th>
                  <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center', fontWeight: 800 }}>Study Mode</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 800, color: '#fef08a' }}>Local Tuition</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 800, color: '#93c5fd' }}>International</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: 800 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c, idx) => {
                  const feeLocalVal = c.feeLocal || c.fee_local || 'Contact College';
                  const feeIntVal = c.feeInternational || c.fee_international || 'Contact College';
                  
                  // Clean concise mode
                  const rawMode = Array.isArray(c.mode) ? c.mode.join(', ') : (c.mode || 'Online, Hybrid');
                  const modeText = rawMode.replace(/\//g, ', ');

                  // Clean concise duration
                  let durText = c.duration || '1 Year';
                  if (durText.toLowerCase().includes('12 to 18')) durText = '12–18 Months';
                  else if (durText.toLowerCase().includes('6 month')) durText = '6 Months';
                  else if (durText.toLowerCase().includes('1 year') || durText.toLowerCase().includes('12 month')) durText = '1 Year';
                  else durText = durText.split('(')[0].trim();

                  // Clean concise level
                  let lvlText = c.level || 'Diploma';
                  if (lvlText.toLowerCase().includes("master's") || lvlText.toLowerCase().includes('l7')) lvlText = 'Level 7 (Master)';
                  else if (lvlText.toLowerCase().includes("bachelor's")) lvlText = "Bachelor's";
                  else if (lvlText.toLowerCase().includes('level 6') || lvlText.toLowerCase().includes('l6')) lvlText = 'Level 6 (Grad)';
                  else if (lvlText.toLowerCase().includes('extended') || lvlText.includes('4 & 5')) lvlText = 'Level 4 & 5';
                  else if (lvlText.toLowerCase().includes('level 5') || lvlText.toLowerCase().includes('l5')) lvlText = 'Level 5';
                  else if (lvlText.toLowerCase().includes('level 4') || lvlText.toLowerCase().includes('l4')) lvlText = 'Level 4';
                  else if (lvlText.toLowerCase().includes('level 3') || lvlText.toLowerCase().includes('l3')) lvlText = 'Level 3 (Found.)';
                  else lvlText = lvlText.replace(/ofqual/i, '').trim();

                  return (
                    <tr 
                      key={c.id} 
                      style={{ 
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f8fafc'}
                    >
                      <td style={{ padding: '0.65rem 1rem', fontWeight: 700, color: '#0a2540', verticalAlign: 'middle', whiteSpace: 'normal', minWidth: '260px' }}>
                        {c.title}
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        <span style={{ 
                          display: 'inline-block',
                          backgroundColor: '#0a2540',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          padding: '0.22rem 0.55rem',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}>
                          {lvlText}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#475569', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        {c.credits ? `${c.credits} Credits` : '120 Credits'}
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        {durText}
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        {modeText}
                      </td>
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'right', fontWeight: 850, color: '#0a2540', fontSize: '0.88rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        {feeLocalVal}
                      </td>
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'right', fontWeight: 850, color: '#2563eb', fontSize: '0.88rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        {feeIntVal}
                      </td>
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => {
                            if (c.linkToContact && onSelectCourse) {
                              onSelectCourse(c);
                            } else if (onOpenDetailsModal) {
                              onOpenDetailsModal(c);
                            } else if (onSelectCourse) {
                              onSelectCourse(c);
                            }
                          }}
                          style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: '6px',
                            backgroundColor: '#0a2540',
                            color: '#ffffff',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e31c23'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a2540'}
                        >
                          {c.linkToContact ? 'Inquire' : 'Details'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid-3">
            {filteredCourses.map(course => {
              const schoolObj = schools.find(s => s.id === course.school);
              const feeLocalVal = course.feeLocal || course.fee_local;
              const feeIntVal = course.feeInternational || course.fee_international;
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

                    {/* Tuition Fee Badge on Card */}
                    {feeLocalVal && (
                      <div style={{
                        marginTop: '0.85rem',
                        padding: '0.55rem 0.85rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <span style={{ color: '#64748b', fontSize: '0.68rem', display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tuition (Local)</span>
                          <span style={{ fontWeight: 850, color: '#0f172a', fontSize: '0.86rem' }}>{feeLocalVal}</span>
                        </div>
                        {feeIntVal && (
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ color: '#64748b', fontSize: '0.68rem', display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>International</span>
                            <span style={{ fontWeight: 850, color: '#2563eb', fontSize: '0.86rem' }}>{feeIntVal}</span>
                          </div>
                        )}
                      </div>
                    )}

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
        )
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

