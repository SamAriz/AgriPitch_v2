import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockUser, User } from '../data/mockData';

interface AppContextType {
  user: User;
  setUserRole: (role: 'farmowner' | 'marketplace') => void;
  unreadMessages: number;
  notifications: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  authName: string;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [unreadMessages] = useState(3);
  const [notifications] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('philagri-theme');
    return saved === 'dark';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!sessionStorage.getItem('philagri-auth');
  });
  const [authName, setAuthName] = useState(() => {
    const saved = sessionStorage.getItem('philagri-auth');
    if (saved) {
      try { return JSON.parse(saved).name || 'User'; } catch { return 'User'; }
    }
    return 'User';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('philagri-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const setUserRole = (role: 'farmowner' | 'marketplace') => {
    setUser({ ...user, role });
  };

  const logout = () => {
    sessionStorage.removeItem('philagri-auth');
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{
      user, setUserRole, unreadMessages, notifications,
      isDarkMode, toggleDarkMode, isLoggedIn, authName, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
