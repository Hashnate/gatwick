import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Premium CustomSelect component replacing native HTML select tags.
 * Includes smooth drop animations, checkmark selection indicators, keyboard navigation,
 * and WAI-ARIA accessibility attributes.
 */
export default function CustomSelect({
  id,
  value,
  onChange,
  options = [], // Can be array of strings OR array of { value, label, icon, badge }
  placeholder = 'Select an option',
  ariaLabel,
  disabled = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  // Normalize options array into standard objects: { value, label, icon, badge }
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value,
        label: opt.label || opt.value,
        icon: opt.icon || null,
        badge: opt.badge || null
      };
    }
    return { value: opt, label: opt, icon: null, badge: null };
  });

  // Find currently selected option object
  const selectedOption = normalizedOptions.find(opt => String(opt.value) === String(value));

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard events (ArrowUp, ArrowDown, Enter, Escape, Space)
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
        const item = normalizedOptions[highlightedIndex];
        onChange(item.value);
        setIsOpen(false);
      } else {
        setIsOpen(prev => !prev);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(prev => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(normalizedOptions.length - 1);
      } else {
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div 
      ref={containerRef} 
      className={`premium-select-container ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
    >
      <button
        type="button"
        id={id}
        aria-label={ariaLabel || placeholder}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="premium-select-trigger"
      >
        <span className="premium-select-value">
          {selectedOption ? (
            <span className="premium-select-label-wrapper">
              {selectedOption.icon && <span className="premium-select-icon">{selectedOption.icon}</span>}
              <span>{selectedOption.label}</span>
            </span>
          ) : (
            <span className="premium-select-placeholder">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="premium-select-chevron" size={18} />
      </button>

      {isOpen && (
        <div className="premium-select-dropdown" role="listbox">
          <div className="premium-select-options-list">
            {normalizedOptions.map((opt, index) => {
              const isSelected = String(opt.value) === String(value);
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={`${opt.value}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectOption(opt.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`premium-select-option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                >
                  <div className="premium-select-option-content">
                    {opt.icon && <span className="option-icon">{opt.icon}</span>}
                    <span className="option-label">{opt.label}</span>
                    {opt.badge && <span className="option-badge">{opt.badge}</span>}
                  </div>
                  {isSelected && (
                    <span className="option-check-icon">
                      <Check size={16} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
