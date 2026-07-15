import { createContext, useContext, useState } from 'react';
import { registerOrLoginUser } from '../services/dummyData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('sp360-user');
    return saved ? JSON.parse(saved) : null;
  });

  // Logging in with a new email auto-registers an account under that name;
  // logging in again with the same email signs back into that same account.
  const login = ({ name, email, mobile, role }) => {
    const u = registerOrLoginUser({ name, email, mobile, role });
    sessionStorage.setItem('sp360-user', JSON.stringify(u));
    setUser(u);
    return u;
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
