// User Types for Lendsqr Dashboard

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export type UserTier = 1 | 2 | 3;

export interface UserPersonalInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

export interface UserEducationEmployment {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface UserSocials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface UserGuarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface UserBankDetails {
  bankName: string;
  accountNumber: string;
  accountBalance: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  tier: UserTier;
  accountBalance: string;
  bankName: string;
  accountNumber: string;
  personalInfo: UserPersonalInfo;
  educationEmployment: UserEducationEmployment;
  socials: UserSocials;
  guarantors: UserGuarantor[];
}

export interface UsersStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface UsersFilter {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: UserStatus | '';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    avatar: string;
  } | null;
}
