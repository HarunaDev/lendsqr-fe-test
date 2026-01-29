// components/FilterButton/FilterButton.tsx
import React from 'react';

const FilterIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44445H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z" fill="currentColor"/>
  </svg>
);

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  onClick, 
  isActive = false 
}) => {
  return (
    <button 
      className={`users-table__filter-btn ${isActive ? 'users-table__filter-btn--active' : ''}`}
      onClick={onClick}
      title={label}
    >
      <span className='filter-btn__text'>{label}</span> 
      <FilterIcon />
    </button>
  );
};

export default FilterButton;