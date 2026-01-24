import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h2>Shopping Cart</h2>
          <div className="empty-cart">
            <i className="fa fa-shopping-cart"></i>
            <p>Your cart is empty</p>
            <Link to="/products">
              <button className="continue-shopping">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="cart-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="product-cell">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td>Rs. {item.price}</td>
                  <td>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <i className="fa fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="total-cell">Rs. {item.price * item.quantity}</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="cart-actions">
              <Link to="/products">
                <button className="continue-shopping-btn">
                  <i className="fa fa-arrow-left"></i> Continue Shopping
                </button>
              </Link>
              <button className="clear-cart-btn" onClick={clearCart}>
                <i className="fa fa-trash"></i> Clear Cart
              </button>
            </div>
            <div className="cart-total">
              <h3>Cart Total</h3>
              <div className="total-row">
                <span>Subtotal:</span>
                <span>Rs. {getCartTotal()}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>Rs. {getCartTotal()}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
