'use client';

import { getAccessTokenFromLocalStorage } from '@/lib/utils';
import { useGetMeMutation } from '@/queries/useAccount';
import { AccountType } from '@/schemas/account.schema';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserContextProps {
  user: AccountType | null;
  setUser: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AccountType | null>(null);
  const me = useGetMeMutation(); // Gọi hook ở đây

  const isLoggin =
    getAccessTokenFromLocalStorage() && getAccessTokenFromLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await me.mutateAsync();
        if (response && response.payload && response.payload.data) {
          setUser(response.payload.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    if (isLoggin) {
      fetchData();
    }
  }, []); // Dependency array rỗng để chỉ gọi API khi component được mount (F5 hoặc load trang)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
