import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import image from "../../../assets/img/lsqr-logo.png"

// Icons as inline SVG components for precise control
const BriefcaseIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4H2C1.44772 4 1 4.44772 1 5V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V5C15 4.44772 14.5523 4 14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 4V2.66667C10 2.31305 9.85952 1.97391 9.60948 1.72386C9.35943 1.47381 9.02029 1.33334 8.66667 1.33334H7.33333C6.97971 1.33334 6.64057 1.47381 6.39052 1.72386C6.14048 1.97391 6 2.31305 6 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6L8 1L14 6V14C14 14.3536 13.8595 14.6928 13.6095 14.9428C13.3594 15.1929 13.0203 15.3333 12.6667 15.3333H3.33333C2.97971 15.3333 2.64057 15.1929 2.39052 14.9428C2.14048 14.6928 2 14.3536 2 14V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 15.3333V8H10V15.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3334 14V12.6667C11.3334 11.9594 11.0524 11.2812 10.5523 10.781C10.0522 10.2809 9.37393 10 8.66671 10H3.33337C2.62613 10 1.94785 10.2809 1.44776 10.781C0.947665 11.2812 0.666706 11.9594 0.666706 12.6667V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="4" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15.3334 14V12.6667C15.333 12.0758 15.1362 11.5018 14.7742 11.0349C14.4122 10.5681 13.9054 10.2343 13.3334 10.0867" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6667 2.08667C11.2404 2.23354 11.749 2.56714 12.1121 3.03488C12.4752 3.50262 12.6722 4.0782 12.6722 4.67C12.6722 5.2618 12.4752 5.83739 12.1121 6.30513C11.749 6.77286 11.2404 7.10647 10.6667 7.25334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersGuarantorsIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3334 14V12.6667C11.3334 11.9594 11.0524 11.2812 10.5523 10.781C10.0522 10.2809 9.37393 10 8.66671 10H3.33337C2.62613 10 1.94785 10.2809 1.44776 10.781C0.947665 11.2812 0.666706 11.9594 0.666706 12.6667V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="4" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SackIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3L4 1H12L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 3C11 3 13 5 14 8C15 11 14 15 8 15C2 15 1 11 2 8C3 5 5 3 5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 9H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HandshakeIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12L5 15L2 12L1 6L5 3H11L15 6L14 12L11 15L8 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PiggyBankIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 5V4C13 3 12 2 11 2H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 10V11C3 12.6569 4.34315 14 6 14H10C11.6569 14 13 12.6569 13 11V8C13 6 11 4 8 4C5 4 3 6 3 8V10Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6" cy="7" r="1" fill="currentColor"/>
    <path d="M1 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DocumentIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.33333 1.33334H4C3.64638 1.33334 3.30724 1.47381 3.05719 1.72386C2.80714 1.97391 2.66667 2.31305 2.66667 2.66667V13.3333C2.66667 13.687 2.80714 14.0261 3.05719 14.2761C3.30724 14.5262 3.64638 14.6667 4 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2761C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V5.33334L9.33333 1.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.33337 1.33334V5.33334H13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GalaxyIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="1" x2="8" y2="5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="11" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const CoinIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TransactionsIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 1L1 4L3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 12H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 9L15 12L13 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GearIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.05 3.05L4.46 4.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11.54 11.54L12.95 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.05 12.95L4.46 11.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11.54 4.46L12.95 3.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ChartIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 13V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 13V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SlidersIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
    <circle cx="5" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

const LogoutIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClipboardIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6667 2.66667H12C12.3536 2.66667 12.6928 2.80714 12.9428 3.05719C13.1929 3.30724 13.3333 3.64638 13.3333 4V13.3333C13.3333 13.687 13.1929 14.0261 12.9428 14.2761C12.6928 14.5262 12.3536 14.6667 12 14.6667H4C3.64638 14.6667 3.30724 14.5262 3.05719 14.2761C2.80714 14.0261 2.66667 13.687 2.66667 13.3333V4C2.66667 3.64638 2.80714 3.30724 3.05719 3.05719C3.30724 2.80714 3.64638 2.66667 4 2.66667H5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="5.33333" y="1.33334" width="5.33333" height="2.66667" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const navItems = [
  { section: null, items: [
    { icon: <BriefcaseIcon />, label: 'Switch Organization', path: null, hasDropdown: true },
    { icon: <HomeIcon />, label: 'Dashboard', path: '/dashboard' }
  ]},
  { section: 'CUSTOMERS', items: [
    { icon: <UsersIcon />, label: 'Users', path: '/dashboard/users' },
    { icon: <UsersGuarantorsIcon />, label: 'Guarantors', path: '/dashboard/guarantors' },
    { icon: <SackIcon />, label: 'Loans', path: '/dashboard/loans' },
    { icon: <HandshakeIcon />, label: 'Decision Models', path: '/dashboard/decision-models' },
    { icon: <PiggyBankIcon />, label: 'Savings', path: '/dashboard/savings' },
    { icon: <DocumentIcon />, label: 'Loan Requests', path: '/dashboard/loan-requests' },
    { icon: <UsersGuarantorsIcon />, label: 'Whitelist', path: '/dashboard/whitelist' },
    { icon: <UsersGuarantorsIcon />, label: 'Karma', path: '/dashboard/karma' }
  ]},
  { section: 'BUSINESSES', items: [
    { icon: <BriefcaseIcon />, label: 'Organization', path: '/dashboard/organization' },
    { icon: <DocumentIcon />, label: 'Loan Products', path: '/dashboard/loan-products' },
    { icon: <PiggyBankIcon />, label: 'Savings Products', path: '/dashboard/savings-products' },
    { icon: <CoinIcon />, label: 'Fees and Charges', path: '/dashboard/fees' },
    { icon: <TransactionsIcon />, label: 'Transactions', path: '/dashboard/transactions' },
    { icon: <GalaxyIcon />, label: 'Services', path: '/dashboard/services' },
    { icon: <UsersGuarantorsIcon />, label: 'Service Account', path: '/dashboard/service-account' },
    { icon: <ClipboardIcon />, label: 'Settlements', path: '/dashboard/settlements' },
    { icon: <ChartIcon />, label: 'Reports', path: '/dashboard/reports' }
  ]},
  { section: 'SETTINGS', items: [
    { icon: <SlidersIcon />, label: 'Preferences', path: '/dashboard/preferences' },
    { icon: <CoinIcon />, label: 'Fees and Pricing', path: '/dashboard/fees-pricing' },
    { icon: <ClipboardIcon />, label: 'Audit Logs', path: '/dashboard/audit-logs' }
  ]}
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string | null) => {
    if (path) {
      navigate(path);
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('lendsqr_auth');
    navigate('/');
  };

  const isActive = (path: string | null): boolean => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className={`dashboard-sidebar ${isOpen ? 'dashboard-sidebar--open' : ''}`}>
      <nav className="sidebar">
        <div className="sidebar__logo">
          {/* <img src={image} alt="" /> */}

          <svg width="144" height="30" viewBox="0 0 174 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="4" width="25" height="25" rx="4" fill="#39CDCC"/>
            <path d="M7 10V24H17V20H11V10H7Z" fill="white"/>
            <text x="32" y="26" fontFamily="Work Sans, sans-serif" fontWeight="700" fontSize="28" fill="#213F7D">lends</text>
            <text x="110" y="26" fontFamily="Work Sans, sans-serif" fontWeight="700" fontSize="28" fill="#39CDCC">qr</text>
          </svg>
        </div>

        

        {navItems.map((group, groupIndex) => (
          <div key={groupIndex} className="sidebar__section">
            {group.section && (
              <div className="sidebar__section-title">{group.section}</div>
            )}
            <div className="sidebar__nav">
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`sidebar__nav-item ${isActive(item.path) ? 'sidebar__nav-item--active' : ''} ${item.label === 'Switch Organization'
                    ? 'sidebar__nav-label sidebar__nav-label--with-margin'
                    : 'sidebar__nav-label'}`}
                  onClick={() => handleNavigation(item.path)}
                  role="button"
                  tabIndex={0}
                >
                  {item.icon}
                  <span>
  {item.label}
</span>
                  {/* <span>{item.label}</span> */}
                  {'hasDropdown' in item && item.hasDropdown && <ChevronDownIcon />}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="sidebar__footer">
          <div className="sidebar__logout" onClick={handleLogout} role="button" tabIndex={0}>
            <LogoutIcon/>
            <span>Logout</span>
          </div>
          <div className="sidebar__version">v1.2.0</div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
