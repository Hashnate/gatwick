import React from 'react';
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
  ArrowUpRight
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
          <h1 style={{ fontSize: '1.6rem', color: '#0a2540', marginBottom: '0.4rem', fontWeight: 700 }}>
            Executive Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Welcome back, Administrator. Overview of Gatwick College operations & student leads.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenAddCourseModal}
            className="admin-btn admin-btn-primary"
          >
            <PlusCircle size={16} /> Add New Course
          </button>
          <button
            onClick={onOpenAddFacultyModal}
            className="admin-btn admin-btn-outline"
          >
            <Users size={16} /> Add Lecturer
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="admin-metrics-grid">
        <div className="admin-metric-card" onClick={() => onNavigateTab('courses')}>
          <div className="metric-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <BookOpen size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{courses.length}</div>
            <div className="metric-label">Active Programs</div>
          </div>
          <ArrowUpRight size={18} className="metric-arrow" />
        </div>

        <div className="admin-metric-card" onClick={() => onNavigateTab('inquiries')}>
          <div className="metric-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <MessageSquare size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{inquiries.length}</div>
            <div className="metric-label">
              Total Inquiries {newInquiriesCount > 0 && <span className="metric-badge-new">{newInquiriesCount} New</span>}
            </div>
          </div>
          <ArrowUpRight size={18} className="metric-arrow" />
        </div>

        <div className="admin-metric-card" onClick={() => onNavigateTab('faculty')}>
          <div className="metric-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#9333ea' }}>
            <GraduationCap size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{faculty.length}</div>
            <div className="metric-label">Academic Faculty</div>
          </div>
          <ArrowUpRight size={18} className="metric-arrow" />
        </div>

        <div className="admin-metric-card" onClick={() => onNavigateTab('events')}>
          <div className="metric-icon-box" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <Calendar size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{events.length}</div>
            <div className="metric-label">Scheduled Events</div>
          </div>
          <ArrowUpRight size={18} className="metric-arrow" />
        </div>
      </div>

      {/* Main Grid: Inquiries Feed & Campus Overview */}
      <div className="admin-grid-2col">
        {/* Left Column: Recent Student Inquiries */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2 className="admin-card-title">Recent Inquiries & Leads</h2>
              <p className="admin-card-sub">Latest applications and contact requests</p>
            </div>
            <button 
              className="admin-link-btn"
              onClick={() => onNavigateTab('inquiries')}
            >
              View All ({inquiries.length})
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course / Program</th>
                  <th>Campus</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0a2540' }}>{inquiry.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{inquiry.email}</div>
                    </td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {inquiry.course}
                    </td>
                    <td>
                      <span className="campus-pill">{inquiry.campus}</span>
                    </td>
                    <td>
                      <span className="status-badge" style={getStatusBadgeStyle(inquiry.status)}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn-sm"
                        onClick={() => onNavigateTab('inquiries')}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                      No inquiries recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Campus & Schools Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Campuses Widget */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Campus Operations</h2>
              <span className="status-badge" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
                Operational
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div className="campus-status-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={20} color="#e31c23" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0a2540' }}>Colombo Main Campus</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No. 33 1/1, Station Road, Colombo 03</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7' }}>
                    {courses.filter(c => c.campus?.includes('Colombo')).length} Courses
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Intake Open</div>
                </div>
              </div>

              <div className="campus-status-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={20} color="#0284c7" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0a2540' }}>Kandy Branch Campus</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No. 11, Yatinuwara Veediya, Kandy</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7' }}>
                    {courses.filter(c => c.campus?.includes('Kandy')).length} Courses
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Intake Open</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Schools Overview */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Academic Schools ({schools.length})</h2>
              <button className="admin-link-btn" onClick={() => onNavigateTab('courses')}>
                Manage Courses
              </button>
            </div>
            
            <div className="schools-mini-grid">
              {schools.map((school) => {
                const count = courses.filter(c => c.school === school.id).length;
                return (
                  <div key={school.id} className="school-mini-card">
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0a2540' }}>
                      {school.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                      {count} {count === 1 ? 'Course' : 'Courses'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
