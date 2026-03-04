import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = 'http://localhost:5000';

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
  const [loading, setLoading] = useState(true);

  // Load auth users from json-server on mount
  useEffect(() => {
    fetchUsers();
    loadCurrentUserFromSession();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/authUsers`);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const loadCurrentUserFromSession = () => {
    const savedCurrentUser = sessionStorage.getItem('currentUser');
    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
    }
  };

  // Save current user to sessionStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const signup = async (userData) => {
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

    try {
      // Save to json-server
      const response = await fetch(`${API_URL}/authUsers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const savedUser = await response.json();
        setUsers([...users, savedUser]);
        
        // Auto login after signup
        const userWithoutPassword = { id: savedUser.id, name: savedUser.name, email: savedUser.email };
        setCurrentUser(userWithoutPassword);

        return { success: true, message: 'Account created successfully!' };
      } else {
        return { success: false, message: 'Failed to create account!' };
      }
    } catch (error) {
      console.error('Error during signup:', error);
      return { success: false, message: 'Error creating account. Please try again.' };
    }
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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
