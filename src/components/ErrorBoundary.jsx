import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    sessionStorage.removeItem('gcbt_current_page');
    window.location.hash = '';
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#0a2540', marginBottom: '0.5rem' }}>Something went wrong</h2>
          <p style={{ color: '#64748b', marginBottom: '1.25rem', maxWidth: '500px', fontSize: '0.9rem' }}>
            {this.state.error ? this.state.error.toString() : 'An unexpected error occurred.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              backgroundColor: '#e31c23', color: '#fff', border: 'none',
              padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700,
              cursor: 'pointer', fontSize: '0.95rem'
            }}
          >
            Return to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
