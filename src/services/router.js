// Professional HTML5 History API Path Router for GCBT
// Provides clean URLs (e.g. /gatwick/admin/dashboard, /gatwick/about) without '#'

export const getBasePath = () => {
  const pathname = window.location.pathname.toLowerCase();
  if (pathname.startsWith('/gatwick')) {
    return '/gatwick';
  }
  return '';
};

export const getCleanUrl = (page = 'home', subPage = '') => {
  const base = getBasePath();
  if (!page || page === 'home') {
    return base ? `${base}/` : '/';
  }
  if (page === 'admin') {
    if (subPage && subPage !== 'dashboard') {
      return `${base}/admin/${subPage}`;
    }
    return `${base}/admin/dashboard`;
  }
  if (subPage) {
    return `${base}/${page}/${subPage}`;
  }
  return `${base}/${page}`;
};

export const parseCurrentRoute = () => {
  const base = getBasePath();
  let pathname = window.location.pathname.toLowerCase();
  if (base && pathname.startsWith(base)) {
    pathname = pathname.substring(base.length);
  }
  // Strip leading and trailing slashes
  const segments = pathname.split('/').filter(Boolean);
  const hash = window.location.hash.replace('#', '').toLowerCase();

  const first = segments[0] || '';
  const second = segments[1] || '';

  // 1. Check pathname segments first (clean routing)
  if (first === 'admin') {
    return {
      page: 'admin',
      adminTab: second || 'dashboard',
      aboutTab: 'story'
    };
  }

  // 2. Handle hash fallback (for backwards compatibility if user typed #admin or #admin-courses)
  if (hash.startsWith('admin-')) {
    return {
      page: 'admin',
      adminTab: hash.replace('admin-', ''),
      aboutTab: 'story'
    };
  }
  if (hash === 'admin') {
    return {
      page: 'admin',
      adminTab: 'dashboard',
      aboutTab: 'story'
    };
  }

  if (first === 'about') {
    return {
      page: 'about',
      adminTab: 'dashboard',
      aboutTab: second || (hash.startsWith('about-') ? hash.replace('about-', '') : 'story')
    };
  }

  const validPages = [
    'home', 'about', 'programs', 'admissions', 'student-life',
    'contact', 'privacy-policy', 'privacy', 'policies', 'college-policies', 'legal'
  ];

  if (validPages.includes(first)) {
    let p = first;
    if (p === 'privacy') p = 'privacy-policy';
    if (p === 'college-policies' || p === 'legal') p = 'policies';
    return {
      page: p,
      adminTab: 'dashboard',
      aboutTab: 'story'
    };
  }

  if (validPages.includes(hash)) {
    let p = hash;
    if (p === 'privacy') p = 'privacy-policy';
    if (p === 'college-policies' || p === 'legal') p = 'policies';
    return {
      page: p,
      adminTab: 'dashboard',
      aboutTab: 'story'
    };
  }

  if (hash.startsWith('about-')) {
    return {
      page: 'about',
      adminTab: 'dashboard',
      aboutTab: hash.replace('about-', '')
    };
  }

  return {
    page: 'home',
    adminTab: 'dashboard',
    aboutTab: 'story'
  };
};
