// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login function
  const login = () => {
    console.log("Logging in..."); // Log to console for debugging
    setIsLoggedIn(true); // Set the login state to true
  };

  // Logout function
  const logout = () => {
    console.log("Logging out..."); // Debugging log
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
