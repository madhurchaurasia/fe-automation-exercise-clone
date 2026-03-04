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
    <div
      className="product-card"
      data-testid="product-card"
      data-product-id={product.id}
    >
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
        <div className="overlay" data-testid="product-overlay" data-product-id={product.id}>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            data-testid="add-to-cart-button"
            data-product-id={product.id}
          >
            <i className="fa fa-shopping-cart"></i> Add to cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 data-testid="product-price" data-product-id={product.id}>
          Rs. {product.price}
        </h3>
        <p data-testid="product-name" data-product-id={product.id}>{product.name}</p>
        <button
          className="view-product-btn"
          data-testid="view-product-button"
          data-product-id={product.id}
        >
          <i className="fa fa-eye"></i> View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
