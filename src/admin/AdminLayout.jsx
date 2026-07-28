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
          <Logo height={36} />
          <div className="admin-badge-tag">
            <ShieldCheck size={14} /> Admin Portal
          </div>
          <button 
            className="admin-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-group-label">MAIN NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
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

        <div className="admin-sidebar-footer">
          <button
            onClick={onReturnToPublicSite}
            className="admin-sidebar-btn"
            style={{ marginBottom: '0.5rem', color: '#38bdf8' }}
          >
            <ExternalLink size={16} /> View Public Website
          </button>
          <button
            onClick={onLogout}
            className="admin-sidebar-btn"
            style={{ color: '#f87171' }}
          >
            <LogOut size={16} /> Sign Out Admin
          </button>
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
              <span onClick={onReturnToPublicSite} style={{ cursor: 'pointer', color: '#64748b' }}>
                GCBT
              </span>
              <ChevronRight size={14} color="#94a3b8" />
              <span style={{ color: '#0a2540', fontWeight: 600 }}>
                {navItems.find(i => i.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {newInquiriesCount > 0 && (
              <div 
                className="admin-notif-pill"
                onClick={() => handleTabClick('inquiries')}
                title={`${newInquiriesCount} new prospective student inquiries`}
              >
                <Bell size={16} color="#dc2626" />
                <span>{newInquiriesCount} New Leads</span>
              </div>
            )}

            <button
              onClick={onReturnToPublicSite}
              className="admin-btn-sm"
              style={{ backgroundColor: '#f1f5f9', color: '#0a2540' }}
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
