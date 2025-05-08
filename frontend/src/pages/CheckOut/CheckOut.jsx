import React, { useEffect, useState } from 'react';
import './Checkout.css';
import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const token = sessionStorage.getItem('accessToken');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
    const storedTotal = parseFloat(localStorage.getItem('checkoutTotal')) || 0;
    setCartItems(storedCart);
    setTotalPrice(storedTotal);
  }, []);

  const handlePlaceOrder = async () => {
    setPaymentProcessing(true);
    const cardElement = elements.getElement(CardElement);
    
    if (!stripe || !cardElement) return;

    // Create a PaymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      setErrorMessage(error.message);
      setPaymentProcessing(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
          })),
          total_price: totalPrice,
          payment_method_id: paymentMethod.id // Send payment method id
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        localStorage.removeItem('checkoutCart');
        localStorage.removeItem('checkoutTotal');
        window.location.href = '/order'; // Navigate to order page
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      alert('Error placing order');
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Order Summary</h2>
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <div className="stripe-payment">
          <h4  style={{ textAlign: 'center', marginTop:'20px', marginBottom: '20px' } } >Enter Payment Details</h4>
          <CardElement />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button style={{ marginTop: '40px',textAlign: 'center' ,width: '100%' }} className="btn btn-primary"x
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder || paymentProcessing || !stripe}
        >
          {paymentProcessing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>

      <div className="checkout-right">
        <h3 style={{margin:"40px 40px",textAlign:"center"}}  >Your Items</h3>
        {cartItems.map((item) => (
          <div key={item.cart_item_id} className="checkout-item">
            <img src={item.cart_image[0]} alt={item.name} className="checkout-image" />
            <div className="checkout-details">
              <h4>{item.name}</h4>
           
              <p>Price: ${item.price} × {item.quantity}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckOut;
