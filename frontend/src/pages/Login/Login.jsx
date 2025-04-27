import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!usernameOrEmail || !password) {
      setError('Both fields are required.');
      return;
    }
    
    try {
      // Using the exact payload format
      const payload = {
        username_or_email: usernameOrEmail,
        password: password
      };
      
      const response = await fetch('http://127.0.0.1:5000/api/v1/auths/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
       console.log(data)
      if (!response.ok) {
        setError(data.error || 'Login failed.');
      } else {
        // Store token in sessionStorage
        sessionStorage.setItem('accessToken', data.access_token);
        alert('Login successful!');
        window.location.href = '/'
        // Redirect or update app state here
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleRegisterClick = () => {
    // Redirect to register page
    window.location.href = '/signup';
    // If you're using React Router, you could use:
    // history.push('/register');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        
        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">Login</button>
        
        <div className="register-section">
          <p>Don't have an account?</p>
          <button 
            type="button" 
            className="register-button" 
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;