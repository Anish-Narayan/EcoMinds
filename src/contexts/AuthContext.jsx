import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
// This is the object that components will subscribe to for changes.
const AuthContext = createContext(null);

// 2. Create the Provider Component
// This component will wrap your entire application and provide the authentication state.
export const AuthProvider = ({ children }) => {
  // Initialize state by reading from localStorage.
  // The function inside useState runs only once on the initial render,
  // ensuring the user stays logged in if they refresh the page.
  const [role, setRole] = useState(() => localStorage.getItem('userRole'));

  // Use an effect to automatically update localStorage whenever the 'role' state changes.
  // This is a "side effect" that syncs our React state with the browser's storage.
  useEffect(() => {
    if (role) {
      // If a role is set (user logs in), store it.
      localStorage.setItem('userRole', role);
    } else {
      // If the role is null (user logs out), remove it from storage.
      localStorage.removeItem('userRole');
    }
  }, [role]); // This effect re-runs only when the 'role' value changes.

  /**
   * Logs in a user by setting their role.
   * @param {string} userRole - The role of the user, e.g., 'student' or 'teacher'.
   */
  const login = (userRole) => {
    if (userRole) {
      setRole(userRole);
    }
  };

  /**
   * Logs out the user by clearing their role.
   */
  const logout = () => {
    setRole(null);
  };

  // The 'value' object contains all the state and functions
  // that we want to make available to consuming components.
  const value = { role, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a Custom Hook for easier consumption
// This is a best practice that simplifies how other components access the context.
// Instead of importing `useContext` and `AuthContext` everywhere, they just import `useAuth`.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};