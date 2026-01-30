import React from 'react';
import './Header.scss';
import bellImg from "../../../assets/img/header-notification.png"
import avatar from "../../../assets/img/avatar.png"
import logo from "../../../assets/img/lsqr-logo.png"

interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
}

const SearchIcon: React.FC = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="2"/>
    <line x1="10.5" y1="10.5" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Header: React.FC<HeaderProps> = ({ onMenuClick, userName }) => {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__hamburger" onClick={onMenuClick} aria-label="Toggle menu">
          <MenuIcon />
        </button>

        <div className="header__logo">
          {/* <svg width="120" height="30" viewBox="0 0 174 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="4" width="25" height="25" rx="4" fill="#39CDCC"/>
            <path d="M7 10V24H17V20H11V10H7Z" fill="white"/>
            <text x="32" y="26" fontFamily="Work Sans, sans-serif" fontWeight="700" fontSize="28" fill="#213F7D">lends</text>
            <text x="110" y="26" fontFamily="Work Sans, sans-serif" fontWeight="700" fontSize="28" fill="#39CDCC">qr</text>
          </svg> */}
          <img src={logo} alt="" />
        </div>

        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Search for anything"
          />
          <button className="header__search-btn" aria-label="Search">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="header__right">
        <a href="#docs" className="header__docs">Docs</a>

        <div className="header__notifications">
          {/* <BellIcon /> */}
          <img src={bellImg} alt="" />
        </div>

        <div className="header__profile">
          <img
            src={avatar}
            alt="User avatar"
            className="header__avatar"
          />
          <div className="header__name">
            {userName}
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
