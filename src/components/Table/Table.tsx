import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, UserStatus, UsersFilter } from '../../types/user';
import { getOrganizations } from '../../services/mockApi';
import './Table.scss';
import FilterButton from './FilterButton';
import FilterDropdown from './FilterDropdown';
// import {FilterButton} from './FilterButton';
// import FilterDropdown from './FilterDropdown';

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
  // const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<UsersFilter>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const organizations = getOrganizations();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      // if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      //   setShowFilter(false);
      // }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewUser = (userId: string) => {
    navigate(`/users/${userId}`);
    setActiveDropdown(null);
  };

  const handleFilterChange = (field: keyof UsersFilter, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterSubmit = () => {
    onFilter(filters);
    // setShowFilter(false);
    setActiveFilterColumn(null);
  };

  const handleFilterReset = () => {
    setFilters({});
    onResetFilters();
    // setShowFilter(false);
    setActiveFilterColumn(null);
  };

  const handleFilterButtonClick = (columnName: string) => {
    // setShowFilter(!showFilter);
    setActiveFilterColumn(prev => prev === columnName ? null : columnName);
  };

  const handleFilterClose = () => {
    setActiveFilterColumn(null);
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
              <th className="users-table__header-cell" >
                {/* <div ref={filterRef} style={{ display: 'inline-block' }}> */}
                  

                  <FilterButton label="ORGANIZATION" onClick={() => handleFilterButtonClick('organization')} isActive={activeFilterColumn === 'organization'} />
                  {activeFilterColumn === 'organization' && (
                  
                  <FilterDropdown
                    isOpen={true}
                    onClose={handleFilterClose}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                    position='left'
                  />
                  )}
                {/* </div> */}
              </th>
              <th className="users-table__header-cell">
                {/* <button className="users-table__filter-btn" title="USERNAME">
                  <span className='filter-btn__text'>USERNAME</span> <FilterIcon />
                </button> */}
                <FilterButton 
                  label="USERNAME"
                  onClick={() => handleFilterButtonClick('username')}
                  isActive={activeFilterColumn === 'username'}
                />

{activeFilterColumn === 'username' && (
                  <FilterDropdown
                    isOpen={true}
                    onClose={handleFilterClose}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                    position="left"
                  />
                )}
              </th>
              <th className="users-table__header-cell">
                {/* <button className="users-table__filter-btn" title="EMAIL">
                  <span className='filter-btn__text'>EMAIL</span> <FilterIcon />
                </button> */}

<FilterButton 
                  label="EMAIL"
                  onClick={() => handleFilterButtonClick('email')}
                  isActive={activeFilterColumn === 'email'}
                />
                
                {activeFilterColumn === 'email' && (
                  <FilterDropdown
                    isOpen={true}
                    onClose={handleFilterClose}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                    position="left"
                  />
                )}
              </th>
              <th className="users-table__header-cell">
                {/* <button className="users-table__filter-btn" title="PHONE NUMBER">
                  <span className='filter-btn__text'>PHONE NUMBER</span> <FilterIcon />
                </button> */}
                <FilterButton 
                  label="PHONE NUMBER"
                  onClick={() => handleFilterButtonClick('phoneNumber')}
                  isActive={activeFilterColumn === 'phoneNumber'}
                />
                
                {activeFilterColumn === 'phoneNumber' && (
                  <FilterDropdown
                    isOpen={true}
                    onClose={handleFilterClose}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                    position="left"
                  />
                )}

              </th>
              <th className="users-table__header-cell">
                {/* <button className="users-table__filter-btn" title="DATE JOINED">
                  <span className='filter-btn__text'>DATE JOINED</span> <FilterIcon />
                </button> */}

<FilterButton 
                  label="DATE JOINED"
                  onClick={() => handleFilterButtonClick('dateJoined')}
                  isActive={activeFilterColumn === 'dateJoined'}
                />
                
                {activeFilterColumn === 'dateJoined' && (
                  <FilterDropdown
                    isOpen={true}
                    onClose={handleFilterClose}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                    position="left"
                  />
                )}
              </th>
              <th className="users-table__header-cell">
                {/* <button className="users-table__filter-btn" title="STATUS">
                  <span className='filter-btn__text'>STATUS</span> <FilterIcon />
                </button> */}

<FilterButton 
                  label="STATUS"
                  onClick={() => handleFilterButtonClick('status')}
                  isActive={activeFilterColumn === 'status'}
                />
                
                {activeFilterColumn === 'status' && (
                  <FilterDropdown
                    isOpen={true}
                    onClose={handleFilterClose}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                    position="left"
                  />
                )}
              </th>
              <th className="users-table__header-cell"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="users-table__body-row">
                <td className="users-table__body-cell truncate">{user.organization}</td>
                <td className="users-table__body-cell">{user.username}</td>
                <td className="users-table__body-cell truncate">
                  <span className="users-table__email truncate">{user.email}</span>
                </td>
                <td className="users-table__body-cell truncate">{user.phoneNumber}</td>
                <td className="users-table__body-cell truncate">{user.dateJoined}</td>
                <td className="users-table__body-cell  w-full lg:w-auto">
                  <span className={`${getStatusClass(user.status)} status-badge__text`}>{user.status}</span>
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
