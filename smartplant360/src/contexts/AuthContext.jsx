import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/dummyData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('sp360-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role) => {
    const u = getUser(role);
    sessionStorage.setItem('sp360-user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    sessionStorage.removeItem('sp360-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
