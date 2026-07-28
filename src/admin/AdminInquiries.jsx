import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Edit, 
  Trash2, 
  FileText, 
  Download,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AdminInquiries({ inquiries, onUpdateInquiryStatus, onDeleteInquiry, onSaveInquiryNotes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campusFilter, setCampusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Notes Modal State
  const [activeNotesInquiry, setActiveNotesInquiry] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, campusFilter]);

  const handleOpenNotes = (inquiry) => {
    setActiveNotesInquiry(inquiry);
    setNoteText(inquiry.notes || '');
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (activeNotesInquiry) {
      onSaveInquiryNotes(activeNotesInquiry.id, noteText);
      setActiveNotesInquiry(null);
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    const matchesCampus = campusFilter === 'all' || i.campus === campusFilter;
    return matchesSearch && matchesStatus && matchesCampus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / itemsPerPage));
  const paginatedInquiries = filteredInquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const headers = ['Inquiry ID', 'Date', 'Name', 'Email', 'Phone', 'Campus', 'Course', 'Status', 'Notes'];
    const rows = filteredInquiries.map(i => [
      i.id,
      i.createdAt ? new Date(i.createdAt).toLocaleDateString() : '',
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      i.phone,
      i.campus,
      `"${i.course.replace(/"/g, '""')}"`,
      i.status,
      `"${(i.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gcbt_student_inquiries_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'New':
        return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
      case 'Contacted':
        return { backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd' };
      case 'In Progress':
        return { backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' };
      case 'Enrolled':
        return { backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' };
      case 'Closed':
        return { backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' };
      default:
        return { backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' };
    }
  };

  return (
    <div className="admin-inquiries-container">
      {/* Header Row */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Student Inquiries & Admissions Leads</h1>
          <p className="admin-page-sub">Track and respond to inquiries submitted via the public contact and admission forms.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="admin-btn admin-btn-outline"
        >
          <Download size={18} /> Export Leads CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="admin-filter-card">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by student name, email, phone number, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Statuses ({inquiries.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Campuses</option>
            <option value="Colombo">Colombo Campus</option>
            <option value="Kandy">Kandy Campus</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date & Contact</th>
                <th>Program Enquired</th>
                <th>Campus</th>
                <th>Status Pipeline</th>
                <th>Message & Notes</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.95rem' }}>{inquiry.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                      <Mail size={13} /> {inquiry.email}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.1rem' }}>
                      <Phone size={13} /> {inquiry.phone}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                      {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : 'Recent'}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.88rem' }}>{inquiry.course}</div>
                  </td>

                  <td>
                    <span className="campus-pill">{inquiry.campus}</span>
                  </td>

                  <td>
                    <select
                      value={inquiry.status}
                      onChange={(e) => onUpdateInquiryStatus(inquiry.id, e.target.value)}
                      className="admin-status-select"
                      style={getStatusBadgeStyle(inquiry.status)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  <td style={{ maxWidth: '280px' }}>
                    <div style={{ fontSize: '0.82rem', color: '#334155', fontStyle: 'italic', marginBottom: '0.3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      "{inquiry.message}"
                    </div>
                    {inquiry.notes ? (
                      <div style={{ fontSize: '0.78rem', color: '#0284c7', backgroundColor: '#f0f9ff', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #bae6fd' }}>
                        Note: {inquiry.notes}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenNotes(inquiry)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                      >
                        + Add Admin Note
                      </button>
                    )}
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleOpenNotes(inquiry)}
                        className="icon-action-btn edit-btn"
                        title="Add/Edit Admin Note"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteInquiry(inquiry.id)}
                        className="icon-action-btn delete-btn"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    No inquiries found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredInquiries.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredInquiries.length)}–{Math.min(currentPage * itemsPerPage, filteredInquiries.length)} of {filteredInquiries.length} leads
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="admin-btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  backgroundColor: currentPage === 1 ? '#f1f5f9' : '#ffffff',
                  color: currentPage === 1 ? '#94a3b8' : '#0f172a',
                  border: '1px solid #cbd5e1',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                <ChevronLeft size={15} /> Previous
              </button>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', padding: '0 0.35rem' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="admin-btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  backgroundColor: currentPage === totalPages ? '#f1f5f9' : '#ffffff',
                  color: currentPage === totalPages ? '#94a3b8' : '#0f172a',
                  border: '1px solid #cbd5e1',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {activeNotesInquiry && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '480px' }}>
            <div className="admin-modal-header">
              <h2 style={{ fontSize: '1.2rem', color: '#0a2540', margin: 0, fontWeight: 700 }}>
                Admin Notes for {activeNotesInquiry.name}
              </h2>
              <button onClick={() => setActiveNotesInquiry(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveNotes} className="admin-modal-body">
              <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                <div>Course: <strong>{activeNotesInquiry.course}</strong></div>
                <div>Campus: <strong>{activeNotesInquiry.campus}</strong></div>
              </div>

              <div className="form-group">
                <label className="form-label">Internal Follow-up Notes</label>
                <textarea
                  rows="4"
                  placeholder="Record call details, email responses, or admission counselor remarks..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="form-textarea"
                  autoFocus
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setActiveNotesInquiry(null)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                >
                  <Check size={18} /> Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
