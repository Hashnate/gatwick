import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Check, 
  X, 
  Filter, 
  Image as ImageIcon,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import { schools } from '../data';

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

export default function AdminCourses({ courses, onSaveCourse, onDeleteCourse, isOpenAddModal, setIsOpenAddModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('all');
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    school: 'business',
    level: 'L4 Ofqual',
    duration: '12 Months',
    mode: ['On-Campus', 'Hybrid'],
    campus: ['Colombo', 'Kandy'],
    image: 'assets/course_business_management.jpg',
    desc: ''
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
      desc: ''
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
      desc: course.desc || ''
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
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { resetForm(); setIsOpenAddModal(true); }}
        >
          <Plus size={18} /> Add New Program
        </button>
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

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Schools ({schools.length})</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Campuses</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
          </select>
        </div>
      </div>

      {/* Course List Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Program Details</th>
                <th>School / Dept</th>
                <th>Level & Duration</th>
                <th>Campuses & Mode</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
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
                        <div>
                          <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.95rem' }}>{course.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.1rem', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                          <Edit3 size={16} />
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
                  <select
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="form-select"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
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

              <div className="form-row-2">
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

                <div className="form-group">
                  <label className="form-label">Cover Image Preset / URL</label>
                  <select
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-select"
                  >
                    {DEFAULT_IMAGES.map((img) => (
                      <option key={img} value={img}>{img.replace('assets/', '')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Modes</label>
                <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem' }}>
                  {['On-Campus', 'Hybrid', 'Distance'].map((modeName) => (
                    <label key={modeName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
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
                <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem' }}>
                  {['Colombo', 'Kandy'].map((campusName) => (
                    <label key={campusName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
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
