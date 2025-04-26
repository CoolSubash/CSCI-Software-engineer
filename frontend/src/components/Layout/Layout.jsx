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

      <footer>
        <p>&copy; 2025 MyApp</p>
      </footer>
    </div>
  );
}

export default Layout;
