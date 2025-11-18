/**
 * Auth Context
 * Global state management for authentication
 */

'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/user';
import { getUserProfile } from '../controllers/authController';

/**
 * Auth Context Type
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

/**
 * Create Auth Context
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Check if user is authenticated on mount
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        // User not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login function
   * Sets user data in state
   */
  const login = (userData: User) => {
    setUser(userData);
  };

  /**
   * Logout function
   * Clears user data from state
   */
  const logout = () => {
    setUser(null);
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
