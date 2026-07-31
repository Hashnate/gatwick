import React, { useState } from 'react';
import { 
  Plus, 
  Star, 
  MapPin, 
  Pencil, 
  Trash2, 
  X, 
  MessageSquare,
  TrendingUp,
  Award
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

export default function AdminTestimonials({ 
  testimonials, 
  onSaveTestimonial, 
  onDeleteTestimonial, 
  isOpenAddModal, 
  setIsOpenAddModal 
}) {
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    course: '',
    rating: 5,
    campus: 'Colombo',
    quote: '',
    avatarBg: '#e31c23'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      course: '',
      rating: 5,
      campus: 'Colombo',
      quote: '',
      avatarBg: '#e31c23'
    });
    setEditingTestimonial(null);
  };

  const handleOpenEdit = (tItem) => {
    setEditingTestimonial(tItem);
    setFormData({
      id: tItem.id,
      name: tItem.name || '',
      course: tItem.course || '',
      rating: tItem.rating || 5,
      campus: tItem.campus || 'Colombo',
      quote: tItem.quote || '',
      avatarBg: tItem.avatarBg || '#e31c23'
    });
    setIsOpenAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    // Calculate initial
    const initial = formData.name.trim().charAt(0).toUpperCase();

    const tToSave = {
      ...formData,
      initial,
      id: formData.id || 't_' + Date.now()
    };

    onSaveTestimonial(tToSave);
    setIsOpenAddModal(false);
    resetForm();
  };

  const handleDeleteConfirm = () => {
    if (deletingTestimonialId) {
      onDeleteTestimonial(deletingTestimonialId);
      setDeletingTestimonialId(null);
    }
  };

  // KPIs
  const totalReviews = testimonials.length;
  const averageRating = totalReviews > 0 
    ? (testimonials.reduce((sum, t) => sum + Number(t.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0';
  const fiveStarReviews = testimonials.filter(t => Number(t.rating) === 5).length;

  const bgColors = [
    { value: '#e31c23', label: 'Gatwick Red' },
    { value: '#0a2540', label: 'Deep Blue' },
    { value: '#0284c7', label: 'Sky Blue' },
    { value: '#16a34a', label: 'Emerald Green' },
    { value: '#8b5cf6', label: 'Purple' }
  ];

  return (
    <div className="admin-testimonials-container" style={{ padding: '0 0.5rem' }}>
      {/* Header Row */}
      <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="admin-page-title" style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 700, margin: '0 0 0.25rem 0' }}>
            Student Reviews & Testimonials
          </h1>
          <p className="admin-page-sub" style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
            Manage the student reviews, ratings, and quotes displayed on the Home, About, and Student Life pages.
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { resetForm(); setIsOpenAddModal(true); }}
          style={{
            backgroundColor: '#e31c23',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.55rem 1rem',
            fontWeight: 600,
            fontSize: '0.86rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} /> Add Review
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="admin-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="admin-metric-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div className="metric-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <span>Total Reviews</span>
            <MessageSquare size={18} style={{ color: '#0284c7' }} />
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>{totalReviews}</div>
          <div className="metric-footer" style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '0.25rem' }}>Live on public pages</div>
        </div>

        <div className="admin-metric-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div className="metric-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <span>Average Rating</span>
            <Award size={18} style={{ color: '#eab308' }} />
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>{averageRating} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ 5.0</span></div>
          <div className="metric-footer" style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '0.25rem' }}>Out of 5 Stars maximum</div>
        </div>

        <div className="admin-metric-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div className="metric-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <span>5-Star Reviews</span>
            <TrendingUp size={18} style={{ color: '#16a34a' }} />
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>{fiveStarReviews}</div>
          <div className="metric-footer" style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600, marginTop: '0.25rem' }}>
            {totalReviews > 0 ? ((fiveStarReviews / totalReviews) * 100).toFixed(0) : 0}% of all entries
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="admin-events-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {testimonials.map((t) => (
          <div 
            key={t.id} 
            className="admin-card" 
            style={{ 
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              {/* Profile Circle */}
              <div 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: t.avatarBg || '#e31c23', 
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}
              >
                {t.initial || (t.name ? t.name.charAt(0).toUpperCase() : 'S')}
              </div>

              {/* Review Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#0a2540', margin: 0, fontWeight: 700 }}>
                    {t.name}
                  </h3>
                  <span className="campus-pill" style={{ fontSize: '0.72rem', backgroundColor: '#f1f5f9', color: '#475569', padding: '0.15rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                    {t.campus}
                  </span>
                  <div style={{ display: 'flex', gap: '0.05rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < (t.rating || 5) ? '#eab308' : 'none'} 
                        stroke="#eab308" 
                      />
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#e31c23', fontWeight: 600, marginBottom: '0.65rem' }}>
                  {t.course}
                </div>

                <blockquote style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.4rem', alignSelf: 'center' }}>
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="icon-action-btn edit-btn"
                  title="Edit Review"
                  style={{
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.4rem',
                    cursor: 'pointer',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setDeletingTestimonialId(t.id)}
                  className="icon-action-btn delete-btn"
                  title="Delete Review"
                  style={{
                    border: '1px solid #fee2e2',
                    background: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.4rem',
                    cursor: 'pointer',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            No student reviews present. Click "Add Review" to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Review Modal */}
      {isOpenAddModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '520px' }}>
            <div className="admin-modal-header">
              <h2 style={{ fontSize: '1.25rem', color: '#0a2540', margin: 0, fontWeight: 700 }}>
                {editingTestimonial ? 'Edit Student Review' : 'Create New Student Review'}
              </h2>
              <button onClick={() => { setIsOpenAddModal(false); resetForm(); }} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sadhiya Fazal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Degree / Course Pathway *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diploma in Psychology"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Campus Branch</label>
                  <CustomSelect
                    value={formData.campus}
                    onChange={(val) => setFormData({ ...formData, campus: val })}
                    options={[
                      { value: 'Colombo', label: 'Colombo Campus' },
                      { value: 'Kandy', label: 'Kandy Campus' }
                    ]}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Star Rating</label>
                  <CustomSelect
                    value={String(formData.rating)}
                    onChange={(val) => setFormData({ ...formData, rating: Number(val) })}
                    options={[
                      { value: '5', label: '5 Stars ⭐⭐⭐⭐⭐' },
                      { value: '4', label: '4 Stars ⭐⭐⭐⭐' },
                      { value: '3', label: '3 Stars ⭐⭐⭐' },
                      { value: '2', label: '2 Stars ⭐⭐' },
                      { value: '1', label: '1 Star ⭐' }
                    ]}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Avatar Badge Theme</label>
                  <CustomSelect
                    value={formData.avatarBg}
                    onChange={(val) => setFormData({ ...formData, avatarBg: val })}
                    options={bgColors}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Student Quote / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Paste the student testimonial details here..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="form-input"
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => { setIsOpenAddModal(false); resetForm(); }}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  style={{ backgroundColor: '#e31c23', color: '#ffffff' }}
                >
                  {editingTestimonial ? 'Save Changes' : 'Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTestimonialId && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
            <div style={{ color: '#dc2626', marginBottom: '1rem' }}>
              <Trash2 size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#0a2540', margin: '0 0 0.5rem 0', fontWeight: 700 }}>
              Delete Review?
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
              Are you sure you want to delete this student testimonial? This action is permanent and will remove it from all public pages.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeletingTestimonialId(null)}
                className="admin-btn admin-btn-outline"
              >
                No, Keep It
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="admin-btn admin-btn-danger"
                style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Yes, Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
