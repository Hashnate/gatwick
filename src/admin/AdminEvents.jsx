import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Edit3, 
  Trash2, 
  X, 
  Check 
} from 'lucide-react';

export default function AdminEvents({ events, onSaveEvent, onDeleteEvent, isOpenAddModal, setIsOpenAddModal }) {
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    day: '28',
    month: 'Aug',
    time: '09:00 AM - 02:00 PM',
    venue: 'BMICH, Colombo'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      day: '28',
      month: 'Aug',
      time: '09:00 AM - 02:00 PM',
      venue: 'BMICH, Colombo'
    });
    setEditingEvent(null);
  };

  const handleOpenEdit = (eventItem) => {
    setEditingEvent(eventItem);
    setFormData({
      id: eventItem.id,
      title: eventItem.title,
      day: eventItem.day || '28',
      month: eventItem.month || 'Aug',
      time: eventItem.time || '',
      venue: eventItem.venue || ''
    });
    setIsOpenAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const eventToSave = {
      ...formData,
      id: formData.id || Date.now()
    };

    onSaveEvent(eventToSave);
    setIsOpenAddModal(false);
    resetForm();
  };

  return (
    <div className="admin-events-container">
      {/* Header Row */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Institutional Events & Calendar</h1>
          <p className="admin-page-sub">Schedule graduation ceremonies, career fairs, and educational seminars.</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => { resetForm(); setIsOpenAddModal(true); }}
        >
          <Plus size={18} /> Schedule New Event
        </button>
      </div>

      {/* Events List */}
      <div className="admin-events-grid">
        {events.map((evt) => (
          <div key={evt.id} className="admin-card event-admin-card">
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div className="event-date-badge">
                <span className="event-date-day">{evt.day}</span>
                <span className="event-date-month">{evt.month}</span>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', color: '#0a2540', margin: '0 0 0.4rem 0', fontWeight: 700 }}>
                  {evt.title}
                </h3>
                <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.85rem', color: '#64748b', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} color="#0284c7" /> {evt.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="#e31c23" /> {evt.venue}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={() => handleOpenEdit(evt)}
                  className="icon-action-btn edit-btn"
                  title="Edit Event"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => setDeletingEventId(evt.id)}
                  className="icon-action-btn delete-btn"
                  title="Delete Event"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            No scheduled events present. Click "Schedule New Event" to add one.
          </div>
        )}
      </div>

      {/* Add / Edit Event Modal */}
      {isOpenAddModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '520px' }}>
            <div className="admin-modal-header">
              <h2 style={{ fontSize: '1.25rem', color: '#0a2540', margin: 0, fontWeight: 700 }}>
                {editingEvent ? 'Edit Scheduled Event' : 'Schedule New College Event'}
              </h2>
              <button onClick={() => setIsOpenAddModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Graduation Ceremony 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Date Day (1-31)</label>
                  <input
                    type="text"
                    required
                    placeholder="28"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date Month</label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="form-select"
                  >
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Event Time Window</label>
                <input
                  type="text"
                  placeholder="09:00 AM - 02:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Venue Location</label>
                <input
                  type="text"
                  placeholder="e.g. BMICH, Colombo / GCBT Kandy Campus"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="form-input"
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
                  <Check size={18} /> {editingEvent ? 'Save Event' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingEventId && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0a2540', marginBottom: '0.6rem' }}>Cancel Scheduled Event</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Are you sure you want to remove this event from the calendar?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeletingEventId(null)}
                className="admin-btn admin-btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteEvent(deletingEventId);
                  setDeletingEventId(null);
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
