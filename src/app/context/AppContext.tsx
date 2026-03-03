import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockUser, User } from '../data/mockData';

interface AppContextType {
  user: User;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUserRole: (role: 'farmowner' | 'marketplace') => void;
  unreadMessages: number;
  notifications: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('philagri-logged-in') === 'true';
  });
  const [unreadMessages] = useState(3);
  const [notifications] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('philagri-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('philagri-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('philagri-logged-in', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(mockUser);
    localStorage.removeItem('philagri-logged-in');
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const setUserRole = (role: 'farmowner' | 'marketplace') => {
    setUser({ ...user, role });
  };

  return (
    <AppContext.Provider value={{ user, isLoggedIn, login, logout, setUserRole, unreadMessages, notifications, isDarkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
