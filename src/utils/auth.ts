interface AuthData {
    isAuthenticated: boolean;
    user: {
      name: string;
      email: string;
      avatar: string;
    };
  }
  
  const AUTH_KEY = 'lendsqr_auth';
  
  export const getAuthData = (): AuthData | null => {
    try {
      const data = localStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading auth data:', error);
      return null;
    }
  };
  
  export const setAuthData = (email: string, name: string = 'User'): void => {
    const authData: AuthData = {
      isAuthenticated: true,
      user: {
        name,
        email,
        avatar: '',
      },
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  };
  
  export const clearAuthData = (): void => {
    localStorage.removeItem(AUTH_KEY);
  };
  
  export const isAuthenticated = (): boolean => {
    const authData = getAuthData();
    return authData?.isAuthenticated === true && !!authData?.user?.email;
  };