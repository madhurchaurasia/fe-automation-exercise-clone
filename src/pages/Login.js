import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(loginData.email, loginData.password);
    
    if (result.success) {
      setMessage({ text: result.message, type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setMessage({ text: result.message, type: 'error' });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!signupData.password || signupData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long!', type: 'error' });
      return;
    }
    
    const result = signup(signupData);
    
    if (result.success) {
      setMessage({ text: result.message, type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <div className="login-section">
          <div className="form-wrapper">
            <h2>Login to your account</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button type="submit" className="btn-submit">Login</button>
            </form>
          </div>
        </div>

        <div className="or-divider">
          <h2>OR</h2>
        </div>

        <div className="signup-section">
          <div className="form-wrapper">
            <h2>New User Signup!</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
                minLength="6"
              />
              <button type="submit" className="btn-submit">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
