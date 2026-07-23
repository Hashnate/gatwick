// Script to patch the compiled index.html with CSS overrides and file:// compatibility
import { readFileSync, writeFileSync, copyFileSync } from 'fs';

const file = './dist/index.html';
let html = readFileSync(file, 'utf-8');

// Inject a <style> tag with our overrides just before </head> if not already present
const overrideCSS = `
<style>
/* CLEAN BRAND NAVBAR (NO RED BOTTOM BORDER LINE) */
.header-wrapper {
  box-shadow: 0 4px 20px rgba(10, 37, 64, 0.08) !important;
}
.main-header {
  padding: 1.05rem 0 !important;
  background-color: #ffffff !important;
  border-bottom: none !important;
  transition: all 0.3s ease !important;
}
.main-header.scrolled {
  padding: 0.75rem 0 !important;
  background-color: #ffffff !important;
  box-shadow: 0 4px 20px rgba(10, 37, 64, 0.12) !important;
}
.nav-menu {
  gap: 2.15rem !important;
}
.nav-link {
  font-size: 0.95rem !important;
  padding: 0.5rem 0 !important;
  white-space: nowrap !important;
  color: #0a2540 !important;
  font-weight: 700 !important;
}
.nav-link:hover, .nav-link.active {
  color: #e31c23 !important;
}
.nav-link:after {
  background-color: #e31c23 !important;
  height: 3px !important;
}
</style>`;

if (!html.includes('CLEAN BRAND NAVBAR')) {
  html = html.replace('</head>', overrideCSS + '\n</head>');
}

// Remove type="module" and crossorigin so Chrome runs inline scripts over file:// protocol without CORS blocking
html = html.replaceAll('type="module"', '').replaceAll('crossorigin', '');
// Safely bypass fetch on modulepreload polyfill when running over file:// protocol
html = html.replaceAll('fetch(e.href,n)', '(window.location.protocol==="file:"?Promise.resolve():fetch(e.href,n))');

writeFileSync(file, html, 'utf-8');

// Also copy to root so opening index.html directly works on refresh
copyFileSync('./dist/index.html', './index.html');
console.log('Done! CSS overrides and file:// compatibility injected successfully into dist/index.html and index.html.');
