import React from 'react';
import type { UsersStats } from '../../types/user';
import './StatsCards.scss';
import usersImg from "../../assets/img/user-card.png";
import activeUsersImg from "../../assets/img/activeUsers.png";
import loanImg from "../../assets/img/users-loan-card.png";
import savingsImg from "../../assets/img/users-savings-card.png";

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
          {/* <UsersIcon /> */}
          <img src={usersImg} alt="" />
        </div>
        <div className="stats-card__label">Users</div>
        <div className="stats-card__value">{formatNumber(stats.totalUsers)}</div>
      </div>

      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--active">
        <img src={activeUsersImg} alt="" />
        </div>
        <div className="stats-card__label">Active Users</div>
        <div className="stats-card__value">{formatNumber(stats.activeUsers)}</div>
      </div>

      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--loans">
        <img src={loanImg} alt="" />
        </div>
        <div className="stats-card__label">Users with Loans</div>
        <div className="stats-card__value">{formatNumber(stats.usersWithLoans)}</div>
      </div>

      <div className="stats-card">
        <div className="stats-card__icon stats-card__icon--savings">
        <img src={savingsImg} alt="" />
        </div>
        <div className="stats-card__label">Users with Savings</div>
        <div className="stats-card__value">{formatNumber(stats.usersWithSavings)}</div>
      </div>
    </div>
  );
};

export default StatsCards;
