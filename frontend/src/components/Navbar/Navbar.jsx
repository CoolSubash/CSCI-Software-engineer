import React from 'react';
import { Link } from 'react-router-dom'; // Changed to 'react-router-dom' if you're using React Router v6
import './Navbar.css';
import logo from "../../assets/logo.png";

const Navbar = () => {
  // Check if the user is authenticated by checking if the access token is present in sessionStorage
  const isAuthenticated = !!sessionStorage.getItem("accessToken");

  // Handle Logout functionality
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken"); // Remove the token from sessionStorage
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <>
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
              <Link to="/cart">Cart</Link>
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
    </>
  );
};

export default Navbar;
