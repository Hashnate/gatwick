import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  ExternalLink,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { schools } from '../data';

export default function AdminDashboard({ 
  courses, 
  inquiries, 
  faculty, 
  events, 
  onNavigateTab,
  onOpenAddCourseModal,
  onOpenAddFacultyModal,
  onOpenAddEventModal
}) {
  const [inquiryPage, setInquiryPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(inquiries.length / itemsPerPage));
  const paginatedInquiries = inquiries.slice((inquiryPage - 1) * itemsPerPage, inquiryPage * itemsPerPage);

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const inProgressInquiriesCount = inquiries.filter(i => i.status === 'In Progress' || i.status === 'Contacted').length;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return isoString;
    }
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
      default:
        return { backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' };
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Dashboard Top Banner */}
      <div className="admin-welcome-banner">
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.35rem 0', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Dashboard Overview
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0, lineHeight: '1.4' }}>
            Overview of academic programs, prospective student leads, faculty members, and campus events.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenAddCourseModal}
            className="admin-btn admin-btn-primary"
            style={{ 
              backgroundColor: '#0f172a', 
              color: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontWeight: 600,
              fontSize: '0.86rem'
            }}
          >
            <PlusCircle size={16} /> Add Course
          </button>
          <button
            onClick={onOpenAddFacultyModal}
            className="admin-btn admin-btn-outline"
            style={{ 
              backgroundColor: '#ffffff', 
              color: '#0f172a', 
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontWeight: 600,
              fontSize: '0.86rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Users size={16} /> Add Lecturer
          </button>
        </div>
      </div>

      {/* Standard Enterprise KPI Cards Grid */}
      <div className="admin-metrics-grid">
        <div className="admin-metric-card" onClick={() => onNavigateTab('courses')}>
          <div className="metric-header">
            <span className="metric-label">Active Programs</span>
            <BookOpen size={18} className="metric-icon blue" />
          </div>
          <div className="metric-value">{courses.length}</div>
          <div className="metric-footer">6 Academic Schools</div>
        </div>

        <div className="admin-metric-card" onClick={() => onNavigateTab('inquiries')}>
          <div className="metric-header">
            <span className="metric-label">Student Leads</span>
            <MessageSquare size={18} className="metric-icon rose" />
          </div>
          <div className="metric-value">{inquiries.length}</div>
          <div className="metric-footer">
            {newInquiriesCount > 0 ? (
              <span style={{ color: '#dc2626', fontWeight: 600 }}>{newInquiriesCount} new lead{newInquiriesCount > 1 ? 's' : ''} require action</span>
            ) : (
              <span>{inProgressInquiriesCount} in progress</span>
            )}
          </div>
        </div>

        <div className="admin-metric-card" onClick={() => onNavigateTab('faculty')}>
          <div className="metric-header">
            <span className="metric-label">Academic Faculty</span>
            <GraduationCap size={18} className="metric-icon purple" />
          </div>
          <div className="metric-value">{faculty.length}</div>
          <div className="metric-footer">Lecturers & Professors</div>
        </div>

        <div className="admin-metric-card" onClick={() => onNavigateTab('events')}>
          <div className="metric-header">
            <span className="metric-label">Scheduled Events</span>
            <Calendar size={18} className="metric-icon green" />
          </div>
          <div className="metric-value">{events.length}</div>
          <div className="metric-footer">Campus & Open Days</div>
        </div>
      </div>

      {/* Main Grid: Inquiries Feed & Campus Overview */}
      <div className="admin-grid-2col">
        {/* Left Column: Recent Student Inquiries & Academic Schools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          
          {/* Recent Inquiries & Leads */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2 className="admin-card-title">Recent Inquiries & Leads</h2>
                <p className="admin-card-sub">Latest applications and contact requests</p>
              </div>
              <button className="admin-link-btn" onClick={() => onNavigateTab('inquiries')}>
                View All ({inquiries.length})
              </button>
            </div>
            <div className="admin-table-wrapper" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <table className="admin-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ width: '23%', padding: '0.75rem 0.5rem' }}>Student Name</th>
                    <th style={{ width: '40%', padding: '0.75rem 0.5rem' }}>Course / Program</th>
                    <th style={{ width: '11%', padding: '0.75rem 0.4rem' }}>Campus</th>
                    <th style={{ width: '12%', padding: '0.75rem 0.4rem' }}>Status</th>
                    <th style={{ width: '14%', padding: '0.75rem 0.85rem 0.75rem 0.4rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td style={{ padding: '0.75rem 0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.84rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.name}</div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.email}</div>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '0.82rem', color: '#1e293b', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.course}</div>
                      </td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>
                        <span className="campus-pill">{inquiry.campus}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.4rem' }}>
                        <span className="status-badge" style={getStatusBadgeStyle(inquiry.status)}>{inquiry.status}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.85rem 0.75rem 0.4rem', textAlign: 'right' }}>
                        <button className="admin-btn-sm" onClick={() => onNavigateTab('inquiries')}>Manage</button>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No inquiries recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {inquiries.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.85rem', paddingRight: '0.35rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Showing {Math.min((inquiryPage - 1) * itemsPerPage + 1, inquiries.length)}–{Math.min(inquiryPage * itemsPerPage, inquiries.length)} of {inquiries.length} leads
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setInquiryPage(p => Math.max(1, p - 1))} disabled={inquiryPage === 1} className="admin-btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: inquiryPage === 1 ? '#f1f5f9' : '#ffffff', color: inquiryPage === 1 ? '#94a3b8' : '#0f172a', border: '1px solid #cbd5e1', cursor: inquiryPage === 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                    <ChevronLeft size={15} /> Previous
                  </button>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', padding: '0 0.25rem' }}>{inquiryPage} / {totalPages}</span>
                  <button type="button" onClick={() => setInquiryPage(p => Math.min(totalPages, p + 1))} disabled={inquiryPage === totalPages} className="admin-btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: inquiryPage === totalPages ? '#f1f5f9' : '#ffffff', color: inquiryPage === totalPages ? '#94a3b8' : '#0f172a', border: '1px solid #cbd5e1', cursor: inquiryPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                    Next <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Academic Schools */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Academic Schools ({schools.length})</h2>
              <button className="admin-link-btn" onClick={() => onNavigateTab('courses')}>Manage Courses</button>
            </div>
            <div className="schools-mini-grid">
              {schools.map((school) => {
                const count = courses.filter(c => c.school === school.id).length;
                return (
                  <div key={school.id} className="school-mini-card clickable" onClick={() => onNavigateTab('courses', school.id)} title={`Click to view and manage courses in ${school.name}`}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0a2540', lineHeight: 1.3 }}>{school.name}</div>
                      <ArrowUpRight size={16} className="school-card-arrow" />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600, marginTop: '0.35rem' }}>
                      {count} {count === 1 ? 'Course' : 'Courses'} →
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Campus Operations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          {/* Campus Operations */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Campus Operations</h2>
              <span className="status-badge" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>Operational</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div className="campus-status-box">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', minWidth: 0, flex: 1 }}>
                  <MapPin size={20} color="#e31c23" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.88rem', lineHeight: '1.3' }}>Colombo Main Campus</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem', lineHeight: '1.4' }}>No. 33 1/1, Station Road, Colombo 03</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7', whiteSpace: 'nowrap' }}>{courses.filter(c => c.campus?.includes('Colombo')).length} Courses</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>Intake Open</div>
                </div>
              </div>
              <div className="campus-status-box">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', minWidth: 0, flex: 1 }}>
                  <MapPin size={20} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#0a2540', fontSize: '0.88rem', lineHeight: '1.3' }}>Kandy Branch Campus</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem', lineHeight: '1.4' }}>No. 11, Yatinuwara Veediya, Kandy</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7', whiteSpace: 'nowrap' }}>{courses.filter(c => c.campus?.includes('Kandy')).length} Courses</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>Intake Open</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

