import React, { useState } from 'react';
import { X, User, Lock, CheckCircle, Shield, LogOut } from 'lucide-react';

export default function PortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'staff'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Simulate login success
    setError('');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {!isLoggedIn ? (
          <div>
            <div className="portal-tabs">
              <button 
                className={`portal-tab-btn ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => { setActiveTab('student'); setError(''); }}
              >
                Student Portal
              </button>
              <button 
                className={`portal-tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => { setActiveTab('staff'); setError(''); }}
              >
                Staff Portal
              </button>
            </div>

            <form onSubmit={handleLogin} className="portal-form">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  padding: '1rem', 
                  borderRadius: '50%', 
                  backgroundColor: '#f7f4f0', 
                  color: '#e31c23', 
                  marginBottom: '1rem' 
                }}>
                  <Shield size={36} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>GCBT Moodle Portal</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Secure gateway for registered {activeTab}s
                </p>
              </div>

              {error && (
                <div style={{ 
                  backgroundColor: '#fef2f2', 
                  color: '#991b1b', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '6px', 
                  marginBottom: '1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: '1px solid #fee2e2'
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="username">Username / ID Number</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={activeTab === 'student' ? 'e.g., GCBT-2026-8802' : 'e.g., GCBT-STF-059'}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="password" 
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                </div>
              </div>

              <a 
                href="https://lms.gcbt.edu.lk/login/index.php" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                Access Moodle Portal
              </a>

              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                Having trouble signing in? <a href="#contact" onClick={() => { onClose(); window.location.hash = 'contact'; }} style={{ color: '#e31c23', fontWeight: 600 }}>Contact IT Support</a>
              </div>
            </form>
          </div>
        ) : (
          <div className="portal-dashboard">
            <div className="dashboard-avatar">
              <User size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Welcome Back, User!</h3>
            <p style={{ fontSize: '0.85rem', color: '#e31c23', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Authenticated {activeTab} Account
            </p>

            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px', 
              padding: '1.25rem', 
              textAlign: 'left',
              marginBottom: '2rem',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>Account ID:</span>
                <span style={{ fontWeight: 600, color: '#0a2540' }}>{username}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>Campus Registered:</span>
                <span style={{ fontWeight: 600, color: '#0a2540' }}>Colombo Main Campus</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>System Status:</span>
                <span style={{ fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle size={14} /> Active / Online
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => alert('Simulated Link: Redirecting to complete dashboard portal...')} 
                className="btn btn-primary" 
                style={{ flex: 2 }}
              >
                Enter Workspace
              </button>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary" 
                style={{ flex: 1, padding: '0.875rem' }}
                title="Log out"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
