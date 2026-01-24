import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="subscription-section">
        <div className="subscription-container">
          <h2>SUBSCRIPTION</h2>
          <p>Get the most recent updates from<br />our site and be updated your self...</p>
          <form onSubmit={handleSubscribe} className="subscription-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              <i className="fa fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="copyright-section">
        <p>Copyright © 2021 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
