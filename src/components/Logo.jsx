import React from 'react';

export default function Logo({ isDark = false, height = 48 }) {
  if (isDark) {
    return (
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        backgroundColor: '#ffffff', 
        padding: '0.4rem 0.85rem', 
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <img 
          src="assets/campus_logo.jpeg" 
          alt="Gatwick College of Business & Technology" 
          style={{ height: `${height}px`, width: 'auto', display: 'block', objectFit: 'contain' }} 
        />
      </div>
    );
  }

  return (
    <img 
      src="assets/campus_logo.jpeg" 
      alt="Gatwick College of Business & Technology" 
      style={{ height: `${height}px`, width: 'auto', display: 'block', objectFit: 'contain' }} 
    />
  );
}
