import React from 'react';
import './ProductCard.css'; // Assuming you have a CSS file for styling
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <span className="product-price">${product.price}</span>
      </div>
      <div className="product-actions">
        <button className="add-to-cart-btn">Add to Cart</button>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
