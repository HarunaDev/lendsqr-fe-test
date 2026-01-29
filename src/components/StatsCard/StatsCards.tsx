import React from 'react';
import type { UsersStats } from '../../types/user';
import './StatsCards.scss';

// Icons
const UsersIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.3333 35V31.6667C28.3333 29.8986 27.6309 28.2029 26.3807 26.9526C25.1305 25.7024 23.4348 25 21.6667 25H8.33333C6.56522 25 4.86953 25.7024 3.61929 26.9526C2.36905 28.2029 1.66667 29.8986 1.66667 31.6667V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="15" cy="11.6667" r="6.66667" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M38.3333 35V31.6667C38.332 30.1887 37.835 28.7542 36.9218 27.5871C36.0086 26.4199 34.7319 25.5858 33.3 25.2167" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26.6667 5.21667C28.1013 5.58362 29.3813 6.41753 30.2967 7.58602C31.2121 8.75452 31.71 10.1912 31.71 11.6717C31.71 13.1521 31.2121 14.5888 30.2967 15.7573C29.3813 16.9258 28.1013 17.7597 26.6667 18.1267" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ActiveUsersIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.3333 35V31.6667C28.3333 29.8986 27.6309 28.2029 26.3807 26.9526C25.1305 25.7024 23.4348 25 21.6667 25H8.33333C6.56522 25 4.86953 25.7024 3.61929 26.9526C2.36905 28.2029 1.66667 29.8986 1.66667 31.6667V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="15" cy="11.6667" r="6.66667" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M30 18.3333L33.3333 21.6667L40 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoansIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 18.3333H5C3.15905 18.3333 1.66667 19.8257 1.66667 21.6667V35C1.66667 36.841 3.15905 38.3333 5 38.3333H35C36.8409 38.3333 38.3333 36.841 38.3333 35V21.6667C38.3333 19.8257 36.8409 18.3333 35 18.3333Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.6667 18.3333V11.6667C11.6667 9.45653 12.5446 7.33691 14.1074 5.77411C15.6702 4.21131 17.7899 3.33334 20 3.33334C22.2101 3.33334 24.3298 4.21131 25.8926 5.77411C27.4554 7.33691 28.3333 9.45653 28.3333 11.6667V18.3333" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SavingsIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66666 13.3333H3.33333C2.89131 13.3333 2.46738 13.5089 2.15482 13.8215C1.84226 14.1341 1.66666 14.558 1.66666 15V25C1.66666 25.442 1.84226 25.8659 2.15482 26.1785C2.46738 26.4911 2.89131 26.6667 3.33333 26.6667H6.66666" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66666 30V10C6.66666 8.15906 8.15904 6.66667 9.99999 6.66667H30C31.8409 6.66667 33.3333 8.15906 33.3333 10V30C33.3333 31.8409 31.8409 33.3333 30 33.3333H9.99999C8.15904 33.3333 6.66666 31.8409 6.66666 30Z" stroke="currentColor" strokeWidth="2.5"/>
    <circle cx="20" cy="20" r="6.66667" stroke="currentColor" strokeWidth="2.5"/>
    <line x1="33.3333" y1="13.3333" x2="38.3333" y2="13.3333" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="33.3333" y1="26.6667" x2="38.3333" y2="26.6667" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

interface StatsCardsProps {
  stats: UsersStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="stats-cards">
      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--users">
          <UsersIcon />
        </div>
        <div className="stats-card__label">Users</div>
        <div className="stats-card__value">{formatNumber(stats.totalUsers)}</div>
      </div>

      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--active">
          <ActiveUsersIcon />
        </div>
        <div className="stats-card__label">Active Users</div>
        <div className="stats-card__value">{formatNumber(stats.activeUsers)}</div>
      </div>

      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--loans">
          <LoansIcon />
        </div>
        <div className="stats-card__label">Users with Loans</div>
        <div className="stats-card__value">{formatNumber(stats.usersWithLoans)}</div>
      </div>

      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--savings">
          <SavingsIcon />
        </div>
        <div className="stats-card__label">Users with Savings</div>
        <div className="stats-card__value">{formatNumber(stats.usersWithSavings)}</div>
      </div>
    </div>
  );
};

export default StatsCards;
