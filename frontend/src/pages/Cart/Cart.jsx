import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import the new CSS file for styling

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/carts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCartItems(data.cart_items);
        const total = data.cart_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
      } else {
        alert(data.message || 'Failed to fetch cart');
      }
    } catch {
      alert('Error fetching cart');
    }
  };

  const handleCheckout = () => {
    // Save cart to localStorage or pass via navigate state
    localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
    localStorage.setItem('checkoutTotal', totalPrice);
    navigate('/checkout');
  };

  const handleQuantityChange = (cart_item_id, change) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.cart_item_id === cart_item_id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
  
      // Update total price after modifying the quantities
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(newTotal);
  
      return updatedItems;
    });
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = async (cart_item_id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/carts/${cart_item_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item.cart_item_id !== cart_item_id));
        // Update total price after removing
        const updatedTotal = cartItems
          .filter((item) => item.cart_item_id !== cart_item_id)
          .reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(updatedTotal);
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to remove item');
      }
    } catch {
      alert('Error removing item from cart');
    }
  };
  

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.cart_item_id} className="cart-item">
                <img src={item.cart_image[0]} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.cart_item_id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.cart_item_id, 1)}>+</button>
                  </div>
                  <p className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.cart_item_id)}>
  Remove
</button>

                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="checkout-button" onClick={handleCheckout}>Go to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
