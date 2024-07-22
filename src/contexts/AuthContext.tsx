import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean) => {
    const response = await fetch('https://bdonly-water.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include' 
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    if (data.success) {
      setIsAuthenticated(true);
      setUser(data.user);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    return new Promise<void>((resolve) => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('user');
      resolve();
    });
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  const value = { isAuthenticated, user, login, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
