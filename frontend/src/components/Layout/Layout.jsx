import React from 'react';
import { Link, Outlet } from 'react-router-dom';  // Outlet is used for child routes
import Navbar from '../Navbar/Navbar';
import "./Layout.css"
function Layout() {
  return (
    <div className='layout-container'>
      <header>
       <Navbar/>
      </header>

      <main>
        {/* Child routes will be injected here */}
        <Outlet />
      </main>

      <footer className="footer">
  <div className="footer-content">
    <div className="company-info">
      <h3>CozyHome</h3>
      <p>Empowering your shopping experience with quality products and unbeatable service.</p>
      <p><strong>Location:</strong> 1234 Innovation Drive, San Francisco, CA, USA</p>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2025 CozyHome— Made with <span style={{ color: 'red' }}>♥</span> by Cozy Team</p>
  </div>
</footer>

    </div>
  );
}

export default Layout;
