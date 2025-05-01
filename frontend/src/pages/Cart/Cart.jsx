import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/v1/carts", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setCartItems(data.cart_items);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [token]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.cart_image[0]} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{item.description.slice(0, 80)}...</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
