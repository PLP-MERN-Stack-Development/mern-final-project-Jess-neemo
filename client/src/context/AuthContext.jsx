// client/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    const agencyName = localStorage.getItem('agencyName');
    return { token, agencyName, isAuthenticated: !!token };
  });

  const login = (token, agencyName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('agencyName', agencyName);
    setAuthState({ token, agencyName, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('agencyName');
    setAuthState({ token: null, agencyName: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}