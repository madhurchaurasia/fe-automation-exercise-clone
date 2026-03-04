import React, { useState, useEffect } from 'react';
import './CartNotification.css';

const CartNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleCartUpdate = (event) => {
      setNotification(event.detail.message);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  if (!notification) return null;

  return (
    <div className="cart-notification" data-testid="cart-notification">
      <i className="fa fa-check-circle"></i>
      <span data-testid="cart-notification-message">{notification}</span>
    </div>
  );
};

export default CartNotification;
