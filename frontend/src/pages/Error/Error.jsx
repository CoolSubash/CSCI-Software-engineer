import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/3855/3855833.png" 
          alt="Error Logo"
          className="error-logo" 
        />
       
        <h2 className="error-message">Oops! Page Not Found</h2>
        <p className="error-description">
          The page you are looking for might have been moved or deleted.
        </p>
        <a href="/" className="back-home-btn">Back to Home</a>
      </div>
    </div>
  );
};

export default Error;
