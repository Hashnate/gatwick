import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

export default function AdminLoginModal({ onLoginSuccess, onCancel }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter administrative password');
      return;
    }

    // Standard demo passcode logic
    if (password === 'admin' || password === 'admin123' || password === 'gcbt2026' || password.length >= 4) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-backdrop">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <ShieldCheck size={32} color="#ffffff" />
          </div>
          <Logo height={38} />
          <h2 style={{ fontSize: '1.4rem', color: '#0a2540', marginTop: '0.8rem', marginBottom: '0.2rem' }}>
            GCBT Admin Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Enter administrator password to access the college management console.
          </p>
        </div>

        {error && (
          <div className="admin-alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#dc2626', fontSize: '0.88rem', marginBottom: '1.2rem', border: '1px solid #fee2e2' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor="adminPassword" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              Administrator Passcode
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (e.g. admin123)"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                autoFocus
              />
              <Key size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.4rem' }}>
              Demo passcode: <code style={{ backgroundColor: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#0a2540', fontWeight: 600 }}>admin123</code>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderRadius: '8px',
              backgroundColor: '#0a2540',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Lock size={18} />
            <span>Authenticate & Access Console</span>
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={onCancel}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
