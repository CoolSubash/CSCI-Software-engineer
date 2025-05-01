import React from 'react';
import './ProductCard.css';
import { useCart } from '../../pages/context/CartContext'; // <-- Importing context

const ProductCard = ({ product, onViewDetails }) => {
  const token = sessionStorage.getItem('accessToken');
  const { cartCount, setCartCount } = useCart(); // <-- Context usage
  console.log(cartCount);

  const addtoCart = async (productId) => {
    if (!token) {
      alert("Please login first to add to cart.");
      return;
    }

    try {
      // Step 1: Fetch current cart items to check if the product is already in the cart
      const cartRes = await fetch('http://127.0.0.1:5000/api/v1/carts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const cartData = await cartRes.json();
      console.log(cartData);
      if (!cartRes.ok) {
        console.log(cartData.error || 'Failed to fetch cart');
        return;
      }

      // Step 2: Check if the product is already in the cart
      const existingItem = cartData.cart_items.find(item => item.product_id === productId);
      console.log(existingItem);
      if (existingItem) {
        console.log('Product already in cart:', existingItem);
        // If product is already in the cart, update the quantity
        const updateRes = await fetch(`http://127.0.0.1:5000/api/v1/carts/${existingItem.cart_item_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: existingItem.quantity + 1 // Increase the quantity by 1
          })
        });

        const updateData = await updateRes.json();

        if (updateRes.ok) {
          // Increment the cart count
          alert('Product quantity updated in cart!');
        } else {
          alert(updateData.error || 'Failed to update cart');
        }

      } else {
        // If product is not in the cart, add it to the cart
        const addRes = await fetch('http://127.0.0.1:5000/api/v1/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            product_id: productId,
            product_quantity: 1 // Add with quantity 1
          })
        });

        const addData = await addRes.json();

        if (addRes.ok) {
          setCartCount(prev => prev + 1); // Increment the cart count
          alert('Product added to cart!');
        } else {
          alert(addData.error || 'Failed to add to cart');
        }
      }

    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="product-card">
      <img
        src={product?.product_image?.[0]?.image_url}
        alt={product?.name}
        className="product-image"
      />

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.product_details?.detailed_description?.slice(0, 40)}...
        </p>
        <span className="product-price">${product.price}</span>
      </div>

      <div className="product-actions">
        <button
          className="add-to-cart-btn"
          onClick={() => addtoCart(product.product_id)}
        >
          Add to Cart
        </button>
        <button
          className="view-details-btn"
          onClick={() => onViewDetails(product.product_id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
