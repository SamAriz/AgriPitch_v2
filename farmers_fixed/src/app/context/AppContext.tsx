import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockUser, User } from '../data/mockData';

interface AppContextType {
  user: User;
  setUserRole: (role: 'farmowner' | 'marketplace') => void;
  unreadMessages: number;
  notifications: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('philagri-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setUserRole = (role: 'farmowner' | 'marketplace') => {
    setUser({ ...user, role });
  };

  return (
    <AppContext.Provider value={{ user, setUserRole, unreadMessages, notifications, isDarkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}