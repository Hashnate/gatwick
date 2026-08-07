import React, { useState } from 'react';
import { Search, GraduationCap, Mail, Phone, Calendar, Filter, Trash2, CheckCircle2, ShieldCheck, Tag, Download, UserCheck, AlertCircle } from 'lucide-react';

export default function AdminConvocation({ registrations = [], onUpdateStatus, onDeleteRegistration, onSaveNotes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const filteredRegistrations = (registrations || []).filter((item) => {
    const matchesSearch = 
      (item.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.studentId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.program || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' };
      case 'Gown Allocated':
        return { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' };
      case 'Parchment Issued':
        return { bg: '#faf5ff', color: '#6b21a8', border: '#e9d5ff' };
      default:
        return { bg: '#fffbeb', color: '#b45309', border: '#fde68a' };
    }
  };

  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e31c23', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CONVOCATION REGISTRY DESK
          </span>
          <h1 style={{ color: '#0a2540', fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0 0' }}>
            Convocation Registrations
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.35rem 0 0' }}>
            Manage student convocation seating, gown fitting allocations, and degree parchment readiness.
          </p>
        </div>
        <div style={{ background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(10,37,64,0.04)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <GraduationCap size={24} color="#e31c23" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a2540', lineHeight: 1 }}>
              {registrations.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Total Registered</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by student name, ID, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', background: '#ffffff', fontWeight: 600, color: '#334155' }}
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Gown Allocated">Gown Allocated</option>
            <option value="Parchment Issued">Parchment Issued</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Registrations List / Table */}
      <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,37,64,0.04)', overflow: 'hidden' }}>
        {filteredRegistrations.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <GraduationCap size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#0a2540', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>No Convocation Registrations Found</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.35rem' }}>No student registrations match your current filter settings.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', width: '25%' }}>Student Details</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', width: '28%' }}>Program & Cohort</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', width: '22%' }}>Gown & Guest Tickets</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', width: '15%', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', width: '10%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((item) => {
                const badge = getStatusBadgeStyle(item.status);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 800, color: '#0a2540', fontSize: '0.98rem' }}>{item.fullName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#e31c23', fontWeight: 700, marginTop: '0.15rem' }}>ID: {item.studentId}</div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Mail size={13} /> {item.email}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Phone size={13} /> {item.phone}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>{item.program}</div>
                      <div style={{ fontSize: '0.78rem', color: '#1d4ed8', background: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px', display: 'inline-block', marginTop: '0.35rem', fontWeight: 600 }}>
                        {item.cohortYear}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem', verticalAlign: 'middle' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>🎟️ {item.tickets}</div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>🎓 Gown: {item.gownSize}</div>
                    </td>
                    <td style={{ padding: '1.25rem', textAlign: 'center', verticalAlign: 'middle' }}>
                      <select
                        value={item.status || 'Confirmed'}
                        onChange={(e) => onUpdateStatus && onUpdateStatus(item.id, e.target.value)}
                        style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, padding: '0.4rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, outline: 'none', cursor: 'pointer', textAlign: 'center', margin: '0 auto' }}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Gown Allocated">Gown Allocated</option>
                        <option value="Parchment Issued">Parchment Issued</option>
                        <option value="Pending Approval">Pending Approval</option>
                      </select>
                    </td>
                    <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                      <button
                        onClick={() => onDeleteRegistration && onDeleteRegistration(item.id)}
                        style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e31c23', width: '34px', height: '34px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Delete Registration"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
