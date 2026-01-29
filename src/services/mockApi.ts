// Mock API Service for Lendsqr Dashboard
// Mock API Service for Lendsqr Dashboard
import type { User, UserStatus, UserTier, UsersStats, UsersFilter } from '../types/user';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Cowrywise', 'Paystack', 'Flutterwave', 'Kuda', 'Opay'];
const firstNames = ['Grace', 'Tosin', 'Debby', 'Adedeji', 'Chukwuma', 'Oluwaseun', 'Funke', 'Emeka', 'Ngozi', 'Tunde', 'Aisha', 'Yusuf', 'Blessing', 'Ibrahim', 'Chioma'];
const lastNames = ['Effiom', 'Dokunmu', 'Ogana', 'Abiodun', 'Okonkwo', 'Adeyemi', 'Williams', 'Okafor', 'Balogun', 'Ahmed', 'Nwosu', 'Olayinka', 'Eze', 'Musa', 'Udeh'];
const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const genders = ['Male', 'Female'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const residenceTypes = ["Parent's Apartment", 'Own Apartment', 'Rented', 'Shared'];
const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'Ph.D', 'B.A', 'MBA'];
const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed', 'Student'];
const sectors = ['FinTech', 'Technology', 'Banking', 'Healthcare', 'Education', 'Retail', 'Agriculture'];
const banks = ['Providus Bank', 'GTBank', 'First Bank', 'Access Bank', 'Zenith Bank', 'UBA', 'Kuda', 'Opay'];
const relationships = ['Sister', 'Brother', 'Friend', 'Colleague', 'Parent', 'Spouse'];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePhoneNumber = (): string => {
  const prefixes = ['0803', '0806', '0810', '0813', '0816', '0703', '0706', '0903', '0906'];
  return `${getRandomItem(prefixes)}${getRandomNumber(1000000, 9999999)}`;
};

const generateBVN = (): string => {
  return `${getRandomNumber(10000000000, 99999999999)}`;
};

const generateAccountNumber = (): string => {
  return `${getRandomNumber(1000000000, 9999999999)}`;
};

const generateDate = (): string => {
  const year = getRandomNumber(2019, 2024);
  const month = getRandomNumber(1, 12);
  const day = getRandomNumber(1, 28);
  const hours = getRandomNumber(0, 23);
  const minutes = getRandomNumber(0, 59);
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  return `${monthNames[month - 1]} ${day}, ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
};

const generateUser = (index: number): User => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const organization = getRandomItem(organizations);
  const email = `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`;
  const username = `${firstName} ${lastName}`;
  
  return {
    id: `LSQFf${getRandomNumber(100000, 999999)}g${getRandomNumber(10, 99)}`,
    organization,
    username,
    email,
    phoneNumber: generatePhoneNumber(),
    dateJoined: generateDate(),
    status: getRandomItem(statuses),
    tier: getRandomItem([1, 2, 3]) as UserTier,
    accountBalance: `₦${getRandomNumber(10000, 500000).toLocaleString()}.00`,
    bankName: getRandomItem(banks),
    accountNumber: generateAccountNumber(),
    personalInfo: {
      fullName,
      phoneNumber: generatePhoneNumber(),
      emailAddress: `${firstName.toLowerCase()}@gmail.com`,
      bvn: generateBVN(),
      gender: getRandomItem(genders),
      maritalStatus: getRandomItem(maritalStatuses),
      children: getRandomItem(['None', '1', '2', '3', '4+']),
      typeOfResidence: getRandomItem(residenceTypes),
    },
    educationEmployment: {
      levelOfEducation: getRandomItem(educationLevels),
      employmentStatus: getRandomItem(employmentStatuses),
      sectorOfEmployment: getRandomItem(sectors),
      durationOfEmployment: `${getRandomNumber(1, 10)} years`,
      officeEmail: email,
      monthlyIncome: `₦${getRandomNumber(100000, 400000).toLocaleString()}.00 - ₦${getRandomNumber(400001, 1000000).toLocaleString()}.00`,
      loanRepayment: getRandomNumber(20000, 100000).toLocaleString(),
    },
    socials: {
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: fullName,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    },
    guarantors: [
      {
        fullName: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        phoneNumber: generatePhoneNumber(),
        emailAddress: `${getRandomItem(firstNames).toLowerCase()}@gmail.com`,
        relationship: getRandomItem(relationships),
      },
      {
        fullName: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        phoneNumber: generatePhoneNumber(),
        emailAddress: `${getRandomItem(firstNames).toLowerCase()}@gmail.com`,
        relationship: getRandomItem(relationships),
      },
    ],
  };
};

// Generate 500 users
let usersCache: User[] | null = null;

export const generateUsers = (count: number = 500): User[] => {
  if (usersCache && usersCache.length === count) {
    return usersCache;
  }
  usersCache = Array.from({ length: count }, (_, i) => generateUser(i));
  return usersCache;
};

export const getUsersStats = (): UsersStats => {
  const users = generateUsers();
  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    usersWithLoans: getRandomNumber(8000, 15000),
    usersWithSavings: getRandomNumber(80000, 120000),
  };
};

export const getUsers = (
  page: number = 1,
  pageSize: number = 10,
  filters?: UsersFilter
): { users: User[]; total: number } => {
  let users = generateUsers();

  // Apply filters
  if (filters) {
    if (filters.organization) {
      users = users.filter(u => 
        u.organization.toLowerCase().includes(filters.organization!.toLowerCase())
      );
    }
    if (filters.username) {
      users = users.filter(u => 
        u.username.toLowerCase().includes(filters.username!.toLowerCase())
      );
    }
    if (filters.email) {
      users = users.filter(u => 
        u.email.toLowerCase().includes(filters.email!.toLowerCase())
      );
    }
    if (filters.phoneNumber) {
      users = users.filter(u => 
        u.phoneNumber.includes(filters.phoneNumber!)
      );
    }
    if (filters.status) {
      users = users.filter(u => u.status === filters.status);
    }
  }

  const total = users.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    users: users.slice(start, end),
    total,
  };
};

export const getUserById = (id: string): User | undefined => {
  const users = generateUsers();
  return users.find(u => u.id === id);
};

export const getOrganizations = (): string[] => {
  return organizations;
};

// LocalStorage helpers for user details
const USER_DETAILS_KEY = 'lendsqr_user_details';

export const saveUserToLocalStorage = (user: User): void => {
  try {
    const existingData = localStorage.getItem(USER_DETAILS_KEY);
    const users: Record<string, User> = existingData ? JSON.parse(existingData) : {};
    users[user.id] = user;
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const getUserFromLocalStorage = (id: string): User | null => {
  try {
    const existingData = localStorage.getItem(USER_DETAILS_KEY);
    if (!existingData) return null;
    const users: Record<string, User> = JSON.parse(existingData);
    return users[id] || null;
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

export const updateUserStatus = (id: string, status: UserStatus): void => {
  const user = getUserById(id);
  if (user) {
    user.status = status;
    saveUserToLocalStorage(user);
  }
};
