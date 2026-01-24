import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { getCartCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const cartCount = getCartCount();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/">
            <div className="logo">
              <span className="logo-automation">Automation</span>
              <span className="logo-exercise">Exercise</span>
            </div>
          </Link>
        </div>
        <nav className="nav-menu">
          <ul>
            <li>
              <Link to="/">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/products">
                <i className="fa fa-th"></i> Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="cart-link">
                <i className="fa fa-shopping-cart"></i> Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
            {isAuthenticated() ? (
              <>
                <li className="user-info">
                  <i className="fa fa-user"></i> {currentUser.name}
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    <i className="fa fa-sign-out"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  <i className="fa fa-lock"></i> Signup / Login
                </Link>
              </li>
            )}
            <li>
              <Link to="/test-cases">
                <i className="fa fa-list"></i> Test Cases
              </Link>
            </li>
            <li>
              <Link to="/api-testing">
                <i className="fa fa-list"></i> API Testing
              </Link>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-youtube-play"></i> Video Tutorials
              </a>
            </li>
            <li>
              <Link to="/contact">
                <i className="fa fa-envelope"></i> Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
