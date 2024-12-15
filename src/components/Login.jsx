import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/login/', credentials);
            // Store authentication token or user info
            localStorage.setItem('user', JSON.stringify(response.data));
            // Redirect to dashboard or incidents page
            window.location.href = '/';
        } catch (error) {
            setError('Invalid Email or password');
            console.error('Login failed', error);
        }
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
          <div className="login-box">
            <h1 className="login-title">USER LOGIN</h1> {error && <p className="error-message">{error}</p>}
            <input
              name="email"
              type="email"
              placeholder="Please Enter Email"
              className="login-input"
              value={credentials.email} 
              onChange={handleChange} 
              required 
            />
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="login-input"
              value={credentials.password} 
              onChange={handleChange} 
              required 
            />
            <button className="login-button" type="submit">LOGIN ME</button>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          </form>
        </div>
      );
};

export default LoginPage;
