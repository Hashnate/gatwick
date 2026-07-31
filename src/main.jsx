import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Pre-cache critical images in browser memory immediately for instant refresh rendering
const criticalAssets = [
  'assets/campus_logo.webp',
  'assets/slide_show_1.webp',
  'assets/slide_show_2.webp',
  'assets/slide_show_3.webp',
  'assets/slide_show_4.webp',
  'assets/slide_show_5.webp',
  'assets/campus_colombo.webp',
  'assets/campus_kandy.webp'
];

criticalAssets.forEach(src => {
  const img = new Image();
  img.src = src;
});

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}

