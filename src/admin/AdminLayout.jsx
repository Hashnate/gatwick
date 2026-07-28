import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Calendar, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight,
  Bell
} from 'lucide-react';
import Logo from '../components/Logo';
import AdminDashboard from './AdminDashboard';
import AdminCourses from './AdminCourses';
import AdminInquiries from './AdminInquiries';
import AdminFaculty from './AdminFaculty';
import AdminEvents from './AdminEvents';

export default function AdminLayout({ 
  courses, 
  inquiries, 
  faculty, 
  events,
  onSaveCourse,
  onDeleteCourse,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onSaveInquiryNotes,
  onSaveFaculty,
  onDeleteFaculty,
  onSaveEvent,
  onDeleteEvent,
  onLogout,
  onReturnToPublicSite
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenAddCourseModal, setIsOpenAddCourseModal] = useState(false);
  const [isOpenAddFacultyModal, setIsOpenAddFacultyModal] = useState(false);
  const [isOpenAddEventModal, setIsOpenAddEventModal] = useState(false);

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Programs & Courses', icon: BookOpen, count: courses.length },
    { id: 'inquiries', label: 'Inquiries & Leads', icon: MessageSquare, badge: newInquiriesCount },
    { id: 'faculty', label: 'Faculty Directory', icon: Users, count: faculty.length },
    { id: 'events', label: 'Events Calendar', icon: Calendar, count: events.length },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboard 
            courses={courses}
            inquiries={inquiries}
            faculty={faculty}
            events={events}
            onNavigateTab={handleTabClick}
            onOpenAddCourseModal={() => { setActiveTab('courses'); setIsOpenAddCourseModal(true); }}
            onOpenAddFacultyModal={() => { setActiveTab('faculty'); setIsOpenAddFacultyModal(true); }}
            onOpenAddEventModal={() => { setActiveTab('events'); setIsOpenAddEventModal(true); }}
          />
        );
      case 'courses':
        return (
          <AdminCourses 
            courses={courses}
            onSaveCourse={onSaveCourse}
            onDeleteCourse={onDeleteCourse}
            isOpenAddModal={isOpenAddCourseModal}
            setIsOpenAddModal={setIsOpenAddCourseModal}
          />
        );
      case 'inquiries':
        return (
          <AdminInquiries 
            inquiries={inquiries}
            onUpdateInquiryStatus={onUpdateInquiryStatus}
            onDeleteInquiry={onDeleteInquiry}
            onSaveInquiryNotes={onSaveInquiryNotes}
          />
        );
      case 'faculty':
        return (
          <AdminFaculty 
            faculty={faculty}
            onSaveFaculty={onSaveFaculty}
            onDeleteFaculty={onDeleteFaculty}
            isOpenAddModal={isOpenAddFacultyModal}
            setIsOpenAddModal={setIsOpenAddFacultyModal}
          />
        );
      case 'events':
        return (
          <AdminEvents 
            events={events}
            onSaveEvent={onSaveEvent}
            onDeleteEvent={onDeleteEvent}
            isOpenAddModal={isOpenAddEventModal}
            setIsOpenAddModal={setIsOpenAddEventModal}
          />
        );
      default:
        return (
          <AdminDashboard 
            courses={courses}
            inquiries={inquiries}
            faculty={faculty}
            events={events}
            onNavigateTab={handleTabClick}
          />
        );
    }
  };

  return (
    <div className="admin-root-layout">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="brand-header-row">
            <Logo height={32} />
          </div>
          <div className="brand-subtext">
            <span>Executive Admin Console</span>
          </div>
          <button 
            className="admin-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-group-label">NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <Icon size={18} className="nav-item-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="admin-nav-badge">{item.badge}</span>
                )}
                {item.count !== undefined && !item.badge && (
                  <span className="admin-nav-count">{item.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Administrator Profile Card & Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-profile-card">
            <div className="admin-avatar">
              <span>AD</span>
              <span className="online-dot" />
            </div>
            <div className="admin-profile-info">
              <div className="admin-name">Administrator</div>
              <div className="admin-role">System Operator</div>
            </div>
          </div>

          <div className="admin-footer-actions">
            <button
              onClick={onReturnToPublicSite}
              className="admin-sidebar-btn"
            >
              <ExternalLink size={14} /> Public Site
            </button>
            <button
              onClick={onLogout}
              className="admin-sidebar-btn danger"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="admin-mobile-toggle-btn"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div className="admin-breadcrumb">
              <span onClick={onReturnToPublicSite} style={{ cursor: 'pointer', color: '#64748b', fontWeight: 500 }}>
                GCBT
              </span>
              <ChevronRight size={14} color="#94a3b8" />
              <span style={{ color: '#0f172a', fontWeight: 700, backgroundColor: '#f1f5f9', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem' }}>
                {navItems.find(i => i.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Lead Alerts Pill */}
            {newInquiriesCount > 0 && (
              <div 
                className="admin-notif-pill"
                onClick={() => handleTabClick('inquiries')}
                title={`${newInquiriesCount} new prospective student inquiries`}
              >
                <span className="notif-ping" />
                <Bell size={15} style={{ color: '#dc2626' }} />
                <span>{newInquiriesCount} New Leads</span>
              </div>
            )}

            <button
              onClick={onReturnToPublicSite}
              className="admin-btn-sm"
              style={{ 
                backgroundColor: '#ffffff', 
                color: '#0a2540', 
                border: '1px solid #cbd5e1', 
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 600
              }}
            >
              <ExternalLink size={14} /> Public Website
            </button>
          </div>
        </header>

        {/* Dynamic Workspace Body */}
        <main className="admin-main-content">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}
