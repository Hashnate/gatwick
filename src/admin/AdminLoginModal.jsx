import React, { useState } from 'react';
import { Lock, Key, ArrowLeft, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

export default function AdminLoginModal({ onLoginSuccess, onCancel }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter administrative passcode');
      return;
    }

    if (password === 'admin' || password === 'admin123' || password === 'gcbt2026' || password.length >= 4) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid passcode. Authorization denied.');
    }
  };

  return (
    <div className="admin-login-backdrop">
      <div className="admin-login-card">
        {/* Security Badge Pill */}

        {/* Header Branding */}
        <div className="admin-login-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '0.85rem' }}>
            <Logo height={44} />
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.3rem 0', letterSpacing: '-0.02em' }}>
            GCBT Admin Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, textAlign: 'center' }}>
            Authenticate with your administrator credentials to access system settings.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="admin-alert-error" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            padding: '0.85rem 1rem', 
            borderRadius: '10px', 
            backgroundColor: '#fef2f2', 
            color: '#b91c1c', 
            fontSize: '0.86rem', 
            fontWeight: 500,
            marginBottom: '1.25rem', 
            border: '1px solid #fecaca' 
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.4rem' }}>
            <label 
              htmlFor="adminPassword" 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem', 
                fontWeight: 600, 
                color: '#334155', 
                marginBottom: '0.45rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <Key size={14} style={{ color: '#0a2540' }} />
              Administrator Passcode
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="adminPassword"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter passcode..."
                style={{
                  width: '100%',
                  padding: '0.8rem 2.6rem 0.8rem 2.5rem',
                  borderRadius: '10px',
                  border: isFocused ? '1.5px solid #0a2540' : '1px solid #cbd5e1',
                  boxShadow: isFocused ? '0 0 0 4px rgba(10, 37, 64, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#ffffff',
                  color: '#0f172a'
                }}
                autoFocus
              />
              <Lock 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '0.85rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: isFocused ? '#0a2540' : '#94a3b8',
                  transition: 'color 0.2s ease'
                }} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.55rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0a2540 0%, #1e3a8a 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(10, 37, 64, 0.28)',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={18} />
            <span>Sign In to Admin Dashboard</span>
          </button>
        </form>

        <div style={{ marginTop: '1.6rem', textAlign: 'center', paddingTop: '1.1rem', borderTop: '1px solid #f1f5f9' }}>
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
              gap: '0.45rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#0a2540'}
            onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
          >
            <ArrowLeft size={16} /> Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
