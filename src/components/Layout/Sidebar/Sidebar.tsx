import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import image from "../../../assets/img/lsqr-logo.png"
import './Sidebar.scss';
import briefcase from '../../../assets/img/sidebar-briefcase.png';
import dashboard from '../../../assets/img/sidebar-home.png';
import users from '../../../assets/img/sidebar-user.png';
import guarantors from '../../../assets/img/sidebar-guarantor.png';
import loans from '../../../assets/img/sidebar-loans.png';
import decisions from '../../../assets/img/sidebar-decisions.png';
import savings from '../../../assets/img/sidebar-savings.png';
import loanRequest from '../../../assets/img/sidebar-loan-request.png';
import whitelist from '../../../assets/img/sidebar-whitelist.png';
import karma from '../../../assets/img/sidebar-karma.png';
import savingsProduct from '../../../assets/img/sidebar-savings-product.png';
import feesCharges from '../../../assets/img/sidebar-fees.png';
import transactions from '../../../assets/img/sidebar-transaction.png';
import services from '../../../assets/img/sidebar-services.png';
import servicesAccount from '../../../assets/img/sidebar-service-account.png';
import settlements from '../../../assets/img/sidebar-settlements.png';
import reports from '../../../assets/img/sidebar-reports.png';
import preference from '../../../assets/img/sidebar-preference.png';
import audit from '../../../assets/img/sidebar-audit.png';

const ChevronDownIcon: React.FC = () => (
  <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navItems = [
  { section: null, items: [
    { icon: <img src={briefcase} />, label: 'Switch Organization', path: null, hasDropdown: true },
    { icon: <img src={dashboard} />, label: 'Dashboard', path: '/dashboard' }
  ]},
  { section: 'CUSTOMERS', items: [
    { icon: <img src={users} />, label: 'Users', path: '/users' },
    { icon:  <img src={guarantors} />, label: 'Guarantors', path: '/guarantors' },
    { icon: <img src={loans} />, label: 'Loans', path: '/loans' },
    { icon: <img src={decisions} />, label: 'Decision Models', path: '/decision-models' },
    { icon: <img src={savings} />, label: 'Savings', path: '/savings' },
    { icon: <img src={loanRequest} />, label: 'Loan Requests', path: '/loan-requests' },
    { icon: <img src={whitelist} />, label: 'Whitelist', path: '/whitelist' },
    { icon: <img src={karma} />, label: 'Karma', path: '/karma' }
  ]},
  { section: 'BUSINESSES', items: [
    { icon: <img src={briefcase} />, label: 'Organization', path: '/organization' },
    { icon: <img src={loans} />, label: 'Loan Products', path: '/loan-products' },
    { icon: <img src={savingsProduct} />, label: 'Savings Products', path: '/savings-products' },
    { icon: <img src={feesCharges} />, label: 'Fees and Charges', path: '/fees' },
    { icon: <img src={transactions} />, label: 'Transactions', path: '/transactions' },
    { icon: <img src={services} />, label: 'Services', path: '/services' },
    { icon: <img src={servicesAccount} />, label: 'Service Account', path: '/service-account' },
    { icon: <img src={settlements} />, label: 'Settlements', path: '/settlements' },
    { icon: <img src={reports} />, label: 'Reports', path: '/reports' }
  ]},
  { section: 'SETTINGS', items: [
    { icon: <img src={preference} />, label: 'Preferences', path: '/preferences' },
    { icon: <img src={feesCharges} />, label: 'Fees and Pricing', path: '/fees-pricing' },
    { icon: <img src={audit} />, label: 'Audit Logs', path: '/audit-logs' }
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
    localStorage.removeItem('lendsqr_user_details');
    navigate('/login');
  };

  const isActive = (path: string | null): boolean => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className={`dashboard-sidebar ${isOpen ? 'dashboard-sidebar--open' : ''}`}>
      <nav className="sidebar">
        <div className="sidebar__logo">
          <img src={image} alt="" />
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
