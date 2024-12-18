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
  const [role, setRole] = useState(null); // Store role here (e.g., 'admin', 'user')
  const [managerFullName, setManagerFullName] = useState(''); // Store the manager's full name

  // Login function
  const login = (role, fullName) => {
    alert(`${fullName} has logged in`); // Show an alert with the full name
    console.log("Logging in..."); // Log to console for debugging
    setIsLoggedIn(true); // Set the login state to true
    setRole(role); // Set the user's role (e.g., 'admin', 'user')
    setManagerFullName(fullName); // Set the full name
  };

  // Logout function
  const logout = () => {
    console.log("Logging out..."); // Debugging log
    setIsLoggedIn(false);
    setRole(null); // Reset role on logout
    setManagerFullName(''); // Reset the full name
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, managerFullName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
