import React from 'react';
import { Link } from 'react-router';
import './Navbar.css';
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <>
      <section id="header">
        <div className="navbar-logo">
          <Link to="/"><img src={logo} className='logo' alt="" /></Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
          <button className="logout-button">Logout</button>
        </div>
      </section>
    </>
  );
};

export default Navbar;
