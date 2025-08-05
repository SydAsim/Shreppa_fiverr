import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';

export function useAuth() {
  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useAppContext();

  const login = async (username: string, password: string) => {
    // Mock authentication
    if (username === 'admin' && password === 'password123') {
      const user = {
        id: '1',
        username: 'admin',
        name: 'Admin User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150'
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('auth', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  };

  // Check if user is already authenticated on load
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const user = localStorage.getItem('user');
    if (auth === 'true' && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, [setIsAuthenticated, setCurrentUser]);

  return {
    isAuthenticated,
    currentUser,
    login,
    logout
  };
}
