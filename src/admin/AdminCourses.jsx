import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  BookOpen, 
  Check, 
  X, 
  Filter, 
  Image as ImageIcon,
  MapPin,
  Clock,
  Award,
  ChevronDown
} from 'lucide-react';
import { schools } from '../data';
import CustomSelect from '../components/CustomSelect';

const DEFAULT_IMAGES = [
  'assets/course_business_accountancy.jpg',
  'assets/course_business_management.jpg',
  'assets/course_business_extended.jpg',
  'assets/course_strategic_management.jpg',
  'assets/course_education_training.jpg',
  'assets/course_health_social_care.jpg',
  'assets/course_health_management.jpg',
  'assets/course_applied_psychology.jpg',
  'assets/course_information_technology.jpg',
  'assets/course_cloud_cybersecurity.jpg',
  'assets/course_ielts_linguistics.jpg',
  'assets/course_acca_finance.jpg',
  'assets/course_tourism_hospitality.jpg'
];

const getCleanImageLabel = (img) => {
  if (!img) return '';
  const filename = img.replace('assets/course_', '').replace('assets/', '').replace('.jpg', '');
  return filename
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function AdminCourses({ courses, onSaveCourse, onDeleteCourse, onResetCourses, isOpenAddModal, setIsOpenAddModal, initialSchoolFilter = 'all' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(initialSchoolFilter);
  const [selectedCampus, setSelectedCampus] = useState('all');

  React.useEffect(() => {
    if (initialSchoolFilter) {
      setSelectedSchool(initialSchoolFilter);
    }
  }, [initialSchoolFilter]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);
  const [isOpenImageDropdown, setIsOpenImageDropdown] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    school: 'business',
    level: 'L4 Ofqual',
    duration: '12 Months',
    mode: ['On-Campus', 'Hybrid'],
    campus: ['Colombo', 'Kandy'],
    image: 'assets/course_business_management.jpg',
    desc: '',
    credits: 120,
    feeLocal: '',
    feeInternational: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      school: 'business',
      level: 'L4 Ofqual',
      duration: '12 Months',
      mode: ['On-Campus', 'Hybrid'],
      campus: ['Colombo', 'Kandy'],
      image: 'assets/course_business_management.jpg',
      desc: '',
      credits: 120,
      feeLocal: '',
      feeInternational: ''
    });
    setEditingCourse(null);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      id: course.id,
      title: course.title,
      school: course.school,
      level: course.level,
      duration: course.duration,
      mode: course.mode || ['On-Campus'],
      campus: course.campus || ['Colombo'],
      image: course.image || 'assets/course_business_management.jpg',
      desc: course.desc || '',
      credits: course.credits || 120,
      feeLocal: course.feeLocal || '',
      feeInternational: course.feeInternational || ''
    });
    setIsOpenAddModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const courseToSave = {
      ...formData,
      id: formData.id || `course-${Date.now()}`
    };

    onSaveCourse(courseToSave);
    setIsOpenAddModal(false);
    resetForm();
  };

  const handleToggleMode = (modeName) => {
    setFormData(prev => {
      const exists = prev.mode.includes(modeName);
      const updated = exists ? prev.mode.filter(m => m !== modeName) : [...prev.mode, modeName];
      return { ...prev, mode: updated.length ? updated : [modeName] };
    });
  };

  const handleToggleCampus = (campusName) => {
    setFormData(prev => {
      const exists = prev.campus.includes(campusName);
      const updated = exists ? prev.campus.filter(c => c !== campusName) : [...prev.campus, campusName];
      return { ...prev, campus: updated.length ? updated : [campusName] };
    });
  };

  // Filter Courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = selectedSchool === 'all' || course.school === selectedSchool;
    const matchesCampus = selectedCampus === 'all' || (course.campus && course.campus.includes(selectedCampus));
    return matchesSearch && matchesSchool && matchesCampus;
  });

  return (
    <div className="admin-courses-container">
      {/* Header & Controls */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Programs & Course Management</h1>
          <p className="admin-page-sub">Create, update, and organize courses across all academic schools.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            onClick={() => {
              if (window.confirm("Are you sure you want to restore the courses database to the default 45+ spreadsheet courses? This will overwrite your current courses data.")) {
                if (onResetCourses) onResetCourses();
              }
            }}
            style={{ borderColor: '#cbd5e1', color: '#475569' }}
          >
            Restore Default Courses
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => { resetForm(); setIsOpenAddModal(true); }}
          >
            <Plus size={18} /> Add New Program
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-filter-card">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search programs by keyword or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ width: '200px' }}>
            <CustomSelect
              value={selectedSchool}
              onChange={(val) => setSelectedSchool(val)}
              options={[
                { value: 'all', label: `All Schools (${schools.length})` },
                ...schools.map(s => ({ value: s.id, label: s.name }))
              ]}
            />
          </div>

          <div style={{ width: '180px' }}>
            <CustomSelect
              value={selectedCampus}
              onChange={(val) => setSelectedCampus(val)}
              options={[
                { value: 'all', label: 'All Campuses' },
                { value: 'Colombo', label: 'Colombo' },
                { value: 'Kandy', label: 'Kandy' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Course List Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '42%' }}>Program Details</th>
                <th style={{ width: '20%' }}>School / Dept</th>
                <th style={{ width: '15%' }}>Level & Duration</th>
                <th style={{ width: '15%' }}>Campuses & Mode</th>
                <th style={{ width: '8%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => {
                const schoolObj = schools.find(s => s.id === course.school);
                return (
                  <tr key={course.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '8px', 
                          overflow: 'hidden', 
                          backgroundColor: '#f1f5f9',
                          flexShrink: 0,
                          border: '1px solid #e2e8f0'
                        }}>
                          <img 
                            src={course.image || 'assets/course_business_management.jpg'} 
                            alt={course.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100'; }}
                          />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.95rem', wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: '1.3' }}>{course.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {course.desc}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="school-pill">
                        {schoolObj ? schoolObj.name : course.school}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0a2540' }}>{course.level}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                        <Clock size={12} /> {course.duration}
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                        {course.campus?.map(c => (
                          <span key={c} className="campus-pill">{c}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {course.mode?.join(', ')}
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenEditModal(course)}
                          className="icon-action-btn edit-btn"
                          title="Edit Course"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeletingCourseId(course.id)}
                          className="icon-action-btn delete-btn"
                          title="Delete Course"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    No programs found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Course Modal */}
      {isOpenAddModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '640px' }}>
            <div className="admin-modal-header">
              <h2 style={{ fontSize: '1.25rem', color: '#0a2540', margin: 0, fontWeight: 700 }}>
                {editingCourse ? 'Edit Program Details' : 'Add New Academic Program'}
              </h2>
              <button onClick={() => setIsOpenAddModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="admin-modal-body">
              <div className="form-group">
                <label className="form-label">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OTHM Level 5 Extended Diploma in Business Management"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Academic School</label>
                  <CustomSelect
                    value={formData.school}
                    onChange={(val) => setFormData({ ...formData, school: val })}
                    options={schools.map(s => ({ value: s.id, label: s.name }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ofqual Level / Qualification</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. L5 Ofqual, Advanced Diploma"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 12 Months"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Credits (RQF)</label>
                  <input
                    type="number"
                    placeholder="e.g. 120"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Local Fee</label>
                  <input
                    type="text"
                    placeholder="e.g. LKR 165,000"
                    value={formData.feeLocal}
                    onChange={(e) => setFormData({ ...formData, feeLocal: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">International Fee</label>
                  <input
                    type="text"
                    placeholder="e.g. USD 750"
                    value={formData.feeInternational}
                    onChange={(e) => setFormData({ ...formData, feeInternational: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image Preset / URL</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div className="premium-select-wrapper">
                      <button
                        type="button"
                        onClick={() => setIsOpenImageDropdown(!isOpenImageDropdown)}
                        className={`premium-select-trigger ${isOpenImageDropdown ? 'active' : ''}`}
                      >
                        <div className="premium-select-trigger-content">
                          {DEFAULT_IMAGES.includes(formData.image) ? (
                            <>
                              <img src={formData.image} alt="" className="premium-select-thumbnail" />
                              <span className="premium-select-label">{getCleanImageLabel(formData.image)}</span>
                            </>
                          ) : formData.image ? (
                            <>
                              <img src={formData.image} alt="" className="premium-select-thumbnail" />
                              <span className="premium-select-label">Custom Uploaded Image</span>
                            </>
                          ) : (
                            <>
                              <div className="premium-select-fallback">
                                <ImageIcon size={12} />
                              </div>
                              <span className="premium-select-label">-- Custom Image / Upload --</span>
                            </>
                          )}
                        </div>
                        <ChevronDown className="premium-select-arrow" size={16} style={{ transform: isOpenImageDropdown ? 'rotate(180deg)' : 'none' }} />
                      </button>

                      {isOpenImageDropdown && (
                        <>
                          <div 
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} 
                            onClick={() => setIsOpenImageDropdown(false)} 
                          />
                          <div className="premium-select-dropdown">
                            {DEFAULT_IMAGES.map((img) => (
                              <div
                                key={img}
                                onClick={() => {
                                  setFormData({ ...formData, image: img });
                                  setIsOpenImageDropdown(false);
                                }}
                                className={`premium-select-item ${formData.image === img ? 'selected' : ''}`}
                              >
                                <img 
                                  src={img} 
                                  alt="" 
                                  className="premium-select-item-img"
                                />
                                <span className="premium-select-item-label">
                                  {getCleanImageLabel(img)}
                                </span>
                                {formData.image === img && (
                                  <span className="premium-select-item-check">✓</span>
                                )}
                              </div>
                            ))}
                            <div className="premium-select-divider" />
                            <div
                              onClick={() => {
                                setFormData({ ...formData, image: '' });
                                setIsOpenImageDropdown(false);
                              }}
                              className={`premium-select-item ${!DEFAULT_IMAGES.includes(formData.image) && formData.image !== '' ? 'selected' : ''}`}
                            >
                              <div className="premium-select-fallback" style={{ width: '30px', height: '30px' }}>
                                <ImageIcon size={14} />
                              </div>
                              <span className="premium-select-item-label">
                                -- Custom Image / Upload --
                              </span>
                              {!DEFAULT_IMAGES.includes(formData.image) && formData.image !== '' && (
                                <span className="premium-select-item-check">✓</span>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <label 
                      className="admin-btn admin-btn-outline" 
                      style={{ 
                        padding: '0.5rem 0.85rem', 
                        margin: 0, 
                        fontSize: '0.8rem', 
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        height: '38px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <ImageIcon size={14} />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, image: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {(!DEFAULT_IMAGES.includes(formData.image) || formData.image === '') && (
                    <input
                      type="text"
                      placeholder="Or paste custom image URL here..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.8rem' }}
                    />
                  )}

                  {formData.image && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem', borderRadius: '6px', border: '1px dashed #cbd5e1', backgroundColor: '#f8fafc' }}>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                      />
                      <span style={{ fontSize: '0.78rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                        {formData.image.startsWith('data:') ? 'Uploaded Custom Image' : getCleanImageLabel(formData.image)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: DEFAULT_IMAGES[0] })}
                        style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Modes</label>
                <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {['On-Campus', 'Hybrid', 'Distance'].map((modeName) => (
                    <label key={modeName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      <input
                        type="checkbox"
                        checked={formData.mode.includes(modeName)}
                        onChange={() => handleToggleMode(modeName)}
                      />
                      <span>{modeName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Available Campuses</label>
                <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {['Colombo', 'Kandy'].map((campusName) => (
                    <label key={campusName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      <input
                        type="checkbox"
                        checked={formData.campus.includes(campusName)}
                        onChange={() => handleToggleCampus(campusName)}
                      />
                      <span>{campusName} Campus</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description & Syllabus Overview</label>
                <textarea
                  rows="3"
                  placeholder="Provide a clear description of the course content, career pathways, and UK progression routes..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsOpenAddModal(false)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                >
                  <Check size={18} /> {editingCourse ? 'Save Changes' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCourseId && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0a2540', marginBottom: '0.6rem' }}>Confirm Program Deletion</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeletingCourseId(null)}
                className="admin-btn admin-btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCourse(deletingCourseId);
                  setDeletingCourseId(null);
                }}
                className="admin-btn"
                style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none' }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
