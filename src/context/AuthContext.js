import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users and current user from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    const savedCurrentUser = localStorage.getItem('currentUser');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const signup = (userData) => {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return { success: false, message: 'User with this email already exists!' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    
    // Auto login after signup
    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email };
    setCurrentUser(userWithoutPassword);

    return { success: true, message: 'Account created successfully!' };
  };

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password!' };
    }

    // Don't store password in current user
    const userWithoutPassword = { id: user.id, name: user.name, email: user.email };
    setCurrentUser(userWithoutPassword);

    return { success: true, message: 'Login successful!' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAuthenticated = () => {
    return currentUser !== null;
  };

  const getAllUsers = () => {
    // Return users without passwords for security
    return users.map(({ password, ...user }) => user);
  };

  const value = {
    currentUser,
    users: getAllUsers(),
    signup,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
