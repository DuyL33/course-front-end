// components/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setLoggedIn(true);
      const roles = JSON.parse(localStorage.getItem('roles')) || [];
      setRoles(roles);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const login = (token, roles) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    setLoggedIn(true);
    setRoles(roles);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setLoggedIn(false);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
