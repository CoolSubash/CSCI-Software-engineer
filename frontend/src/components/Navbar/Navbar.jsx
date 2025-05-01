import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../../assets/logo.png";
import { useCart } from '../../pages/context/CartContext';

const Navbar = () => {
  const token = sessionStorage.getItem("accessToken");
  const isAuthenticated = !!token;
  const { cartCount, setCartCount } = useCart();
  console.log(cartCount);

  // Fetch cart count from backend on mount
  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/carts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCartCount(data.cart_items.length); // Adjust if response structure differs
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartCount();
    } else {
      setCartCount(0); // Reset on logout
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setCartCount(0);
    window.location.reload();
  };

  return (
    <section id="header">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} className='logo' alt="Logo" /></Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/product">Products</Link>
        {isAuthenticated ? (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/cart">Cart <span className="cart-badge">{cartCount}</span></Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Navbar;
