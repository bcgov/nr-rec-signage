import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createApiFetch } from '../utils/ApiUtils';

interface AuthContextType {
  token: string | null;
  logout: () => void;
  apiFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setToken(null);
  };

  const apiFetch = createApiFetch(logout, () => token);

  return (
    <AuthContext.Provider value={{ token, logout, apiFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
