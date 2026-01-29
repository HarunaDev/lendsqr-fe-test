import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, UserStatus, UsersFilter } from '../../types/user';
import { getOrganizations } from '../../services/mockApi';
import './Table.scss';

interface UsersTableProps {
  users: User[];
  onFilter: (filters: UsersFilter) => void;
  onResetFilters: () => void;
}

const FilterIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44445H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z" fill="currentColor"/>
  </svg>
);

const MoreIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="4" r="2" fill="currentColor"/>
    <circle cx="10" cy="10" r="2" fill="currentColor"/>
    <circle cx="10" cy="16" r="2" fill="currentColor"/>
  </svg>
);

const ViewIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.666672 8C0.666672 8 3.33334 2.66667 8.00001 2.66667C12.6667 2.66667 15.3333 8 15.3333 8C15.3333 8 12.6667 13.3333 8.00001 13.3333C3.33334 13.3333 0.666672 8 0.666672 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const BlacklistIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33334 4.3181 1.33334 8C1.33334 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ActivateIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33334 4.3181 1.33334 8C1.33334 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5.33334 8L7.33334 10L11.3333 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Table: React.FC<UsersTableProps> = ({ users, onFilter, onResetFilters }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<UsersFilter>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const organizations = getOrganizations();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewUser = (userId: string) => {
    navigate(`/dashboard/users/${userId}`);
    setActiveDropdown(null);
  };

  const handleFilterChange = (field: keyof UsersFilter, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterSubmit = () => {
    onFilter(filters);
    setShowFilter(false);
  };

  const handleFilterReset = () => {
    setFilters({});
    onResetFilters();
    setShowFilter(false);
  };

  const getStatusClass = (status: UserStatus): string => {
    return `status-badge status-badge--${status.toLowerCase()}`;
  };

  return (
    <div className="users-table-container">
      <div className="table-responsive">
        <table className="users-table">
          <thead className="users-table__header">
            <tr className="users-table__header-row">
              <th className="users-table__header-cell" style={{ position: 'relative' }}>
                <div ref={filterRef} style={{ display: 'inline-block' }}>
                  <button 
                    className="users-table__filter-btn"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    ORGANIZATION <FilterIcon />
                  </button>
                  {showFilter && (
                  <div className="filter-dropdown">
                    <div className="filter-dropdown__field">
                      <label className="filter-dropdown__label">Organization</label>
                      <select 
                        className="filter-dropdown__select"
                        value={filters.organization || ''}
                        onChange={(e) => handleFilterChange('organization', e.target.value)}
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
                        onChange={(e) => handleFilterChange('username', e.target.value)}
                      />
                    </div>
                    <div className="filter-dropdown__field">
                      <label className="filter-dropdown__label">Email</label>
                      <input 
                        type="email" 
                        className="filter-dropdown__input"
                        placeholder="Email"
                        value={filters.email || ''}
                        onChange={(e) => handleFilterChange('email', e.target.value)}
                      />
                    </div>
                    <div className="filter-dropdown__field">
                      <label className="filter-dropdown__label">Date</label>
                      <input 
                        type="date" 
                        className="filter-dropdown__input"
                        value={filters.date || ''}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                      />
                    </div>
                    <div className="filter-dropdown__field">
                      <label className="filter-dropdown__label">Phone Number</label>
                      <input 
                        type="text" 
                        className="filter-dropdown__input"
                        placeholder="Phone Number"
                        value={filters.phoneNumber || ''}
                        onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                      />
                    </div>
                    <div className="filter-dropdown__field">
                      <label className="filter-dropdown__label">Status</label>
                      <select 
                        className="filter-dropdown__select"
                        value={filters.status || ''}
                        onChange={(e) => handleFilterChange('status', e.target.value as UserStatus | '')}
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Blacklisted">Blacklisted</option>
                      </select>
                    </div>
                    <div className="filter-dropdown__actions">
                      <button className="filter-dropdown__reset" onClick={handleFilterReset}>
                        Reset
                      </button>
                      <button className="filter-dropdown__submit" onClick={handleFilterSubmit}>
                        Filter
                      </button>
                    </div>
                  </div>
                  )}
                </div>
              </th>
              <th className="users-table__header-cell">
                <button className="users-table__filter-btn">
                  USERNAME <FilterIcon />
                </button>
              </th>
              <th className="users-table__header-cell">
                <button className="users-table__filter-btn">
                  EMAIL <FilterIcon />
                </button>
              </th>
              <th className="users-table__header-cell">
                <button className="users-table__filter-btn">
                  PHONE NUMBER <FilterIcon />
                </button>
              </th>
              <th className="users-table__header-cell">
                <button className="users-table__filter-btn">
                  DATE JOINED <FilterIcon />
                </button>
              </th>
              <th className="users-table__header-cell">
                <button className="users-table__filter-btn">
                  STATUS <FilterIcon />
                </button>
              </th>
              <th className="users-table__header-cell"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="users-table__body-row">
                <td className="users-table__body-cell">{user.organization}</td>
                <td className="users-table__body-cell">{user.username}</td>
                <td className="users-table__body-cell">
                  <span className="users-table__email">{user.email}</span>
                </td>
                <td className="users-table__body-cell">{user.phoneNumber}</td>
                <td className="users-table__body-cell">{user.dateJoined}</td>
                <td className="users-table__body-cell">
                  <span className={getStatusClass(user.status)}>{user.status}</span>
                </td>
                <td className="users-table__body-cell users-table__actions">
                  <div ref={activeDropdown === user.id ? dropdownRef : null}>
                    <button 
                      className="users-table__actions-btn"
                      onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                      aria-label="More actions"
                    >
                      <MoreIcon />
                    </button>
                    {activeDropdown === user.id && (
                      <div className="actions-dropdown">
                      <div 
                        className="actions-dropdown__item"
                        onClick={() => handleViewUser(user.id)}
                      >
                        <ViewIcon />
                        <span>View Details</span>
                      </div>
                      <div className="actions-dropdown__item actions-dropdown__item--danger">
                        <BlacklistIcon />
                        <span>Blacklist User</span>
                      </div>
                      <div className="actions-dropdown__item">
                        <ActivateIcon />
                        <span>Activate User</span>
                      </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
