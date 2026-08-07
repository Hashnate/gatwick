// Script to patch compiled index.html for fast loading and file:// compatibility
import { readFileSync, writeFileSync, copyFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const file = './dist/index.html';
let html = readFileSync(file, 'utf-8');

// Inject navbar override CSS
const overrideCSS = `
<style>
/* CLEAN BRAND NAVBAR */
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

// Ensure crossorigin and fetch compatibility for local file protocols while preserving type="module" for ES module execution
html = html.replaceAll('fetch(e.href,n)', '(window.location.protocol==="file:"?Promise.resolve():fetch(e.href,n))');

writeFileSync(file, html, 'utf-8');

// Copy asset images to dist/assets
const distAssetsDir = './dist/assets';
if (!existsSync(distAssetsDir)) {
  mkdirSync(distAssetsDir, { recursive: true });
}

const sourceAssets = ['./assets', './public/assets'];
sourceAssets.forEach(srcDir => {
  if (existsSync(srcDir)) {
    const files = readdirSync(srcDir);
    files.forEach(f => {
      const srcFile = join(srcDir, f);
      const distFile = join(distAssetsDir, f);
      try {
        copyFileSync(srcFile, distFile);
      } catch (e) {}
    });
  }
});

// Also copy to root so opening index.html directly works instantly on refresh
copyFileSync('./dist/index.html', './index.html');
console.log('Optimized build complete. Light-weight index.html ready for instant page refresh.');
