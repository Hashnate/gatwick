import React from 'react';

export const WhatsAppIcon = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill={color}
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.677.15-.2.301-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.502.101-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.244-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.123 3.242 5.143 4.546.718.311 1.279.497 1.716.636.722.23 1.378.198 1.898.12.579-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.042 21.871h-.002c-1.725 0-3.418-.464-4.9-1.343l-.352-.209-3.642.955.972-3.551-.23-.366a9.832 9.832 0 0 1-1.509-5.277c0-5.452 4.437-9.889 9.893-9.889 2.64 0 5.122 1.028 6.987 2.895a9.824 9.824 0 0 1 2.894 6.991c-.001 5.454-4.439 9.895-9.891 9.895zM12.042 0C5.398 0 0 5.399 0 12.044a12.01 12.01 0 0 0 1.637 6.096L0 24l6.014-1.577a11.99 11.99 0 0 0 6.028 1.621h.005c6.643 0 12.042-5.399 12.042-12.044C24.089 5.399 18.685 0 12.042 0z" />
  </svg>
);

export default function WhatsAppButton() {
  const phoneNumber = '94773447878';
  const displayPhone = '077 344 7878';
  const defaultMessage = encodeURIComponent('Hello Gatwick College, I would like to inquire about your courses.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="whatsapp-floating-container">
      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label={`Connect via WhatsApp ${displayPhone}`}
        title={`Chat on WhatsApp (${displayPhone})`}
      >
        <span className="whatsapp-pulse-ring" />
        <WhatsAppIcon size={30} color="#ffffff" />
      </a>
    </div>
  );
}
