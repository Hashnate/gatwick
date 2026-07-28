import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  GraduationCap, 
  Phone, 
  Mail, 
  BookOpen, 
  X, 
  Check,
  UserCheck,
  Image as ImageIcon
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

export default function AdminFaculty({ faculty, onSaveFaculty, onDeleteFaculty, isOpenAddModal, setIsOpenAddModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [deletingFacultyId, setDeletingFacultyId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    program: 'Business & Management',
    qualifications: '',
    expertise: '',
    mobile: '+94 77 123 4567',
    email: '',
    image: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      program: 'Business & Management',
      qualifications: '',
      expertise: '',
      mobile: '+94 77 123 4567',
      email: '',
      image: ''
    });
    setEditingFaculty(null);
  };

  const handleOpenEdit = (lecturer) => {
    setEditingFaculty(lecturer);
    setFormData({
      id: lecturer.id,
      name: lecturer.name,
      program: lecturer.program || '',
      qualifications: lecturer.qualifications || '',
      expertise: lecturer.expertise || '',
      mobile: lecturer.mobile || '',
      email: lecturer.email || '',
      image: lecturer.image || 'assets/staff_faleel.jpg'
    });
    setIsOpenAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const lecturerToSave = {
      ...formData,
      id: formData.id || Date.now()
    };

    onSaveFaculty(lecturerToSave);
    setIsOpenAddModal(false);
    resetForm();
  };

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (f.qualifications && f.qualifications.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-faculty-container">
      {/* Header Row */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Academic Faculty & Staff Management</h1>
          <p className="admin-page-sub">Maintain the academic staff directory, lecturer profiles, and contact details.</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { resetForm(); setIsOpenAddModal(true); }}
        >
          <Plus size={18} /> Add New Lecturer
        </button>
      </div>

      {/* Search Bar */}
      <div className="admin-filter-card">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search faculty by name, department, or qualification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>
      </div>

      {/* Grid of Lecturers */}
      <div className="faculty-admin-grid">
        {filteredFaculty.map((member) => (
          <div key={member.id} className="admin-card faculty-card-item">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="faculty-avatar-box">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div className="faculty-avatar-fallback" style={{ display: member.image ? 'none' : 'flex' }}>
                  {member.name.charAt(0)}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#0a2540', fontSize: '1.05rem' }}>
                  {member.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, marginTop: '0.1rem' }}>
                  {member.program}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem', lineHeight: '1.35' }}>
                  <strong>Qualifications:</strong> {member.qualifications || 'N/A'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem', lineHeight: '1.35' }}>
                  <strong>Expertise:</strong> {member.expertise || 'Pedagogy & Lecturing'}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', fontSize: '0.78rem', color: '#475569', flexWrap: 'wrap' }}>
                  {member.mobile && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Phone size={13} color="#0284c7" /> {member.mobile}
                    </span>
                  )}
                  {member.email && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Mail size={13} color="#0284c7" /> {member.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => handleOpenEdit(member)}
                className="admin-btn-sm"
                style={{ backgroundColor: '#f1f5f9', color: '#0a2540' }}
              >
                <Pencil size={14} /> Edit Profile
              </button>
              <button
                onClick={() => setDeletingFacultyId(member.id)}
                className="admin-btn-sm"
                style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}

        {filteredFaculty.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            No academic staff found matching your search.
          </div>
        )}
      </div>

      {/* Add / Edit Faculty Modal */}
      {isOpenAddModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <h2 style={{ fontSize: '1.25rem', color: '#0a2540', margin: 0, fontWeight: 700 }}>
                {editingFaculty ? 'Edit Lecturer Profile' : 'Add New Academic Staff Member'}
              </h2>
              <button onClick={() => setIsOpenAddModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="form-group">
                <label className="form-label">Full Name & Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Faleel Jamaldeen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department / Program</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Financial Technology & Business Analytics"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Profile Photo</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
                  <input
                    type="text"
                    placeholder="Or paste image URL here..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-input"
                    style={{ flex: 1, height: '38px', boxSizing: 'border-box', margin: 0 }}
                  />
                </div>
                {formData.image && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem', padding: '0.4rem', borderRadius: '6px', border: '1px dashed #cbd5e1', backgroundColor: '#f8fafc' }}>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontSize: '0.78rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
                      {formData.image.startsWith('data:') ? 'Uploaded Photo' : formData.image}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Academic Qualifications</label>
                <input
                  type="text"
                  placeholder="e.g. DBA (California) | MBA Finance (UK) | BBA Marketing"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Area of Expertise & Teaching Focus</label>
                <input
                  type="text"
                  placeholder="e.g. FinTech, Strategic Management, Applied Psychology"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="+94 77 123 4567"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="lecturer@gcbt.edu.lk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
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
                  <Check size={18} /> {editingFaculty ? 'Save Lecturer Profile' : 'Add Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingFacultyId && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0a2540', marginBottom: '0.6rem' }}>Remove Faculty Profile</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Are you sure you want to remove this lecturer profile from the directory?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeletingFacultyId(null)}
                className="admin-btn admin-btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteFaculty(deletingFacultyId);
                  setDeletingFacultyId(null);
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
