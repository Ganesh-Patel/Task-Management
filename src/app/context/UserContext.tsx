// context/UserContext.tsx
"use client"; 
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {logoutUser,isUserLoggedIn} from '@/services/authService.js'

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


  useEffect(() => {
    console.log('checking loin from conext')
    checkLoginStatus();

  }, []);
  
  const checkLoginStatus = async () => {
    try {
        const response = await isUserLoggedIn();
        if (response && response.status === 200) {
            console.log(response);
            setUser(response.data.user); 
            setIsLoggedIn(true);          
        } else {
            setUser(null);                
            setIsLoggedIn(false);
        }
    } catch (error) {
        console.error('Failed to check login status:', error);
        setUser(null);
        setIsLoggedIn(false);
    } finally {

        setLoading(false);
    }
};

  const login = (userData: User) => {
    setUser(userData);     
    setIsLoggedIn(true);    
    setLoading(false); 
  };

  const logout = async () => {
    const res=await logoutUser();
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
