import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Show a temporary success message
    const event = new CustomEvent('cartUpdated', { 
      detail: { message: `${product.name} added to cart!` } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
        <div className="overlay">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <i className="fa fa-shopping-cart"></i> Add to cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3>Rs. {product.price}</h3>
        <p>{product.name}</p>
        <button className="view-product-btn">
          <i className="fa fa-eye"></i> View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
