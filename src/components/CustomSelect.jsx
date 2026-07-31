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
  className = '',
  showSearch = options.length > 6
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter options based on search query
  const filteredOptions = normalizedOptions.filter(opt =>
    String(opt.label).toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Reset search query when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Handle keyboard events (ArrowUp, ArrowDown, Enter, Escape, Space)
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        const item = filteredOptions[highlightedIndex];
        handleSelectOption(item.value);
      } else {
        setIsOpen(prev => !prev);
      }
    } else if (e.key === ' ') {
      // If open and search is visible, space bar should type a space in input, not select/toggle
      if (isOpen && showSearch) {
        return;
      }
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(filteredOptions.length - 1);
      } else {
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
    setSearchQuery('');
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
          {showSearch && (
            <div className="premium-select-search-wrapper" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="premium-select-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                autoFocus
              />
            </div>
          )}
          <div className="premium-select-options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => {
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
              })
            ) : (
              <div className="premium-select-no-results">No matching options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
