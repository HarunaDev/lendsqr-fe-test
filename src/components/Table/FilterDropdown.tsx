// components/FilterDropdown/FilterDropdown.tsx
import React, { useRef, useEffect } from 'react';
import type { UserStatus, UsersFilter } from '../../types/user';
import { getOrganizations } from '../../services/mockApi';

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  filters: UsersFilter;
  onFilterChange: (field: keyof UsersFilter, value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  position?: 'left' | 'right';
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onSubmit,
  onReset,
  position = 'left'
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const organizations = getOrganizations();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="filter-dropdown"
      style={{ 
        position: 'absolute',
        [position]: 0,
        top: '100%',
        zIndex: 1000
      }}
    >
      <div className="filter-dropdown__content">
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Organization</label>
          <select 
            className="filter-dropdown__select"
            value={filters.organization || ''}
            onChange={(e) => onFilterChange('organization', e.target.value)}
          >
            <option value="">Select</option>
            {organizations.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Username</label>
          <input 
            type="text" 
            className="filter-dropdown__input"
            placeholder="User"
            value={filters.username || ''}
            onChange={(e) => onFilterChange('username', e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Email</label>
          <input 
            type="email" 
            className="filter-dropdown__input"
            placeholder="Email"
            value={filters.email || ''}
            onChange={(e) => onFilterChange('email', e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Date</label>
          <input 
            type="date" 
            className="filter-dropdown__input"
            value={filters.date || ''}
            onChange={(e) => onFilterChange('date', e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Phone Number</label>
          <input 
            type="text" 
            className="filter-dropdown__input"
            placeholder="Phone Number"
            value={filters.phoneNumber || ''}
            onChange={(e) => onFilterChange('phoneNumber', e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Status</label>
          <select 
            className="filter-dropdown__select"
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value as UserStatus | '')}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
        
        <div className="filter-dropdown__actions">
          <button className="filter-dropdown__reset" onClick={onReset}>
            Reset
          </button>
          <button className="filter-dropdown__submit" onClick={onSubmit}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;