// context/UserContext.tsx
"use client"; 
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    email: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    role: string;
}

interface UserContextType {
  user: User | null;        
  isLoggedIn: boolean;       
  loading: boolean;          
  login: (userData: User) => void; 
  logout: () => void;       
  setLoading: (value: boolean) => void; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [loading, setLoading] = useState(true); 

  const login = (userData: User) => {
    setUser(userData);     
    setIsLoggedIn(true);    
    setLoading(false); 
  };

  const logout = () => {
    setUser(null);           
    setIsLoggedIn(false);   
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, loading, login, logout, setLoading}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
