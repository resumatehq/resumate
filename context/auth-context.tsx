'use client';

import { isClient } from '@/lib/http';
import { AccountResType } from '@/schemas/account.schema';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type User = AccountResType['data'];

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    if (isClient()) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (isClient()) {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('user');
    }
  }, [setUser]);

  useEffect(() => {
    if (isClient()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUserState(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
