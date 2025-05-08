import React, { useEffect, useState } from 'react';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/v1/orders/my-orders', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          console.error("Order fetch failed:", data.message || data.error);
        }
      } catch (err) {
        console.error("Server error:", err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {orders.map(order => (
            <div key={order.order_id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
              <h3>Order ID: {order.order_id}</h3>
              <p><strong>Status:</strong> {order.order_status}</p>
              <p><strong>Total:</strong> ${order.total_price}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>

              <div>
                <h4>Items:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {order.items.map(item => (
                    <div key={item.product_id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '8px', width: '200px' }}>
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                      <p><strong>{item.product_name}</strong></p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
