import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User } from '../../types/user';
import { getUserById, getUserFromLocalStorage, saveUserToLocalStorage, updateUserStatus } from '../../services/mockApi';
import './UserDetails.scss';

// Icons
const BackArrowIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8334 10H4.16669" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 15.8333L4.16667 10L10 4.16666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserAvatarIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.3334 35V31.6667C33.3334 29.8986 32.6311 28.2029 31.3808 26.9526C30.1306 25.7024 28.4349 25 26.6668 25H13.3334C11.5653 25 9.86961 25.7024 8.61937 26.9526C7.36913 28.2029 6.66675 29.8986 6.66675 31.6667V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="13.3333" r="6.66667" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const StarFilledIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.33334L10.06 5.50667L14.6667 6.18001L11.3333 9.42668L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42668L1.33334 6.18001L5.94 5.50667L8 1.33334Z" fill="#E9B200" stroke="#E9B200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarEmptyIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.33334L10.06 5.50667L14.6667 6.18001L11.3333 9.42668L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42668L1.33334 6.18001L5.94 5.50667L8 1.33334Z" stroke="#E9B200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId) {
    //   setIsLoading(true);
      
      // First try to get from localStorage
      const cachedUser = getUserFromLocalStorage(userId);
      
      if (cachedUser) {
        setUser(cachedUser);
        setIsLoading(false);
      } else {
        // Fetch from mock API and save to localStorage
        const userData = getUserById(userId);
        if (userData) {
          saveUserToLocalStorage(userData);
          setUser(userData);
        }
        setIsLoading(false);
      }
    }
  }, [userId]);

  const handleBackClick = () => {
    navigate('/users');
  };

  const handleBlacklistUser = () => {
    if (user && userId) {
      updateUserStatus(userId, 'Blacklisted');
      setUser({ ...user, status: 'Blacklisted' });
    }
  };

  const handleActivateUser = () => {
    if (user && userId) {
      updateUserStatus(userId, 'Active');
      setUser({ ...user, status: 'Active' });
    }
  };

  const renderTierStars = (tier: number) => {
    const stars = [];
    for (let i = 1; i <= 3; i++) {
      if (i <= tier) {
        stars.push(<StarFilledIcon key={i} />);
      } else {
        stars.push(<StarEmptyIcon key={i} />);
      }
    }
    return stars;
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'general', label: 'General Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'app', label: 'App and System' },
  ];

  if (isLoading) {
    return (
      <div className="user-details">
        <div className="user-details__back" onClick={handleBackClick}>
          <BackArrowIcon />
          <span>Back to Users</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details">
        <div className="user-details__back" onClick={handleBackClick}>
          <BackArrowIcon />
          <span>Back to Users</span>
        </div>
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="user-details">
      <div className="user-details__back" onClick={handleBackClick} role="button" tabIndex={0}>
        <BackArrowIcon />
        <span>Back to Users</span>
      </div>

      <div className="user-details__header">
        <h1 className="user-details__title">User Details</h1>
        <div className="user-details__actions">
          <button 
            className="user-details__action-btn user-details__action-btn--danger"
            onClick={handleBlacklistUser}
          >
            Blacklist User
          </button>
          <button 
            className="user-details__action-btn user-details__action-btn--primary"
            onClick={handleActivateUser}
          >
            Activate User
          </button>
        </div>
      </div>

      <div className="user-profile-card">
        <div className="user-profile-card__top">
          <div className="user-profile-card__user-info">
            <div className="user-profile-card__avatar">
              <UserAvatarIcon />
            </div>
            <div>
              <h2 className="user-profile-card__name">{user.personalInfo.fullName}</h2>
              <p className="user-profile-card__id">{user.id}</p>
            </div>
          </div>

          <div className="user-profile-card__tier">
            <p className="user-profile-card__tier-label">User's Tier</p>
            <div className="user-profile-card__tier-stars">
              {renderTierStars(user.tier)}
            </div>
          </div>

          <div className="user-profile-card__balance">
            <p className="user-profile-card__balance-amount">{user.accountBalance}</p>
            <p className="user-profile-card__balance-bank">{user.accountNumber}/{user.bankName}</p>
          </div>
        </div>

        <div className="user-profile-card__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`user-profile-card__tab ${activeTab === tab.id ? 'user-profile-card__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'general' && (
        <div className="user-info-section">
          <div className="info-group">
            <h3 className="info-group__title">Personal Information</h3>
            <div className="info-group__grid">
              <div className="info-item">
                <p className="info-item__label">Full Name</p>
                <p className="info-item__value">{user.personalInfo.fullName}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Phone Number</p>
                <p className="info-item__value">{user.personalInfo.phoneNumber}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Email Address</p>
                <p className="info-item__value">{user.personalInfo.emailAddress}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">BVN</p>
                <p className="info-item__value">{user.personalInfo.bvn}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Gender</p>
                <p className="info-item__value">{user.personalInfo.gender}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Marital Status</p>
                <p className="info-item__value">{user.personalInfo.maritalStatus}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Children</p>
                <p className="info-item__value">{user.personalInfo.children}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Type of Residence</p>
                <p className="info-item__value">{user.personalInfo.typeOfResidence}</p>
              </div>
            </div>
          </div>

          <div className="info-group">
            <h3 className="info-group__title">Education and Employment</h3>
            <div className="info-group__grid">
              <div className="info-item">
                <p className="info-item__label">Level of Education</p>
                <p className="info-item__value">{user.educationEmployment.levelOfEducation}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Employment Status</p>
                <p className="info-item__value">{user.educationEmployment.employmentStatus}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Sector of Employment</p>
                <p className="info-item__value">{user.educationEmployment.sectorOfEmployment}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Duration of Employment</p>
                <p className="info-item__value">{user.educationEmployment.durationOfEmployment}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Office Email</p>
                <p className="info-item__value">{user.educationEmployment.officeEmail}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Monthly Income</p>
                <p className="info-item__value">{user.educationEmployment.monthlyIncome}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Loan Repayment</p>
                <p className="info-item__value">{user.educationEmployment.loanRepayment}</p>
              </div>
            </div>
          </div>

          <div className="info-group">
            <h3 className="info-group__title">Socials</h3>
            <div className="info-group__grid">
              <div className="info-item">
                <p className="info-item__label">Twitter</p>
                <p className="info-item__value">{user.socials.twitter}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Facebook</p>
                <p className="info-item__value">{user.socials.facebook}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Instagram</p>
                <p className="info-item__value">{user.socials.instagram}</p>
              </div>
            </div>
          </div>

          <div className="info-group">
            <h3 className="info-group__title">Guarantor</h3>
            {user.guarantors.map((guarantor, index) => (
              <div key={index} className="guarantor-card">
                <div className="info-group__grid">
                  <div className="info-item">
                    <p className="info-item__label">Full Name</p>
                    <p className="info-item__value">{guarantor.fullName}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-item__label">Phone Number</p>
                    <p className="info-item__value">{guarantor.phoneNumber}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-item__label">Email Address</p>
                    <p className="info-item__value">{guarantor.emailAddress}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-item__label">Relationship</p>
                    <p className="info-item__value">{guarantor.relationship}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="user-info-section">
          <div className="info-group">
            <h3 className="info-group__title">Documents</h3>
            <p style={{ color: '#545F7D' }}>No documents uploaded yet.</p>
          </div>
        </div>
      )}

      {activeTab === 'bank' && (
        <div className="user-info-section">
          <div className="info-group">
            <h3 className="info-group__title">Bank Details</h3>
            <div className="info-group__grid">
              <div className="info-item">
                <p className="info-item__label">Bank Name</p>
                <p className="info-item__value">{user.bankName}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Account Number</p>
                <p className="info-item__value">{user.accountNumber}</p>
              </div>
              <div className="info-item">
                <p className="info-item__label">Account Balance</p>
                <p className="info-item__value">{user.accountBalance}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'loans' && (
        <div className="user-info-section">
          <div className="info-group">
            <h3 className="info-group__title">Loans</h3>
            <p style={{ color: '#545F7D' }}>No active loans.</p>
          </div>
        </div>
      )}

      {activeTab === 'savings' && (
        <div className="user-info-section">
          <div className="info-group">
            <h3 className="info-group__title">Savings</h3>
            <p style={{ color: '#545F7D' }}>No savings accounts.</p>
          </div>
        </div>
      )}

      {activeTab === 'app' && (
        <div className="user-info-section">
          <div className="info-group">
            <h3 className="info-group__title">App and System</h3>
            <p style={{ color: '#545F7D' }}>No app data available.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
