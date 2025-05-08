// src/pages/MyProducts.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const MyProducts = () => {
  const token = sessionStorage.getItem("accessToken");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/v1/products/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        } else {
          setError(data.message || "Failed to load products");
        }
      } catch (err) {
        setError("Internal server error");
      }
    };

    if (token) fetchSellerProducts();
  }, [token]);

  return (
    <div>
      <h2>My Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong>: ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
