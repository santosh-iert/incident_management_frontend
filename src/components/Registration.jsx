import React, { useState } from 'react';
import '../styles/Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    user_type: 'INDIVIDUAL',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    country: '',
    state: '',
    pin_code: '',
    phone_number: '',
    fax: '',
    password: '',
    confirm_password: ''
  });

  // const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/user/register/', formData);
        console.log(response)
        alert(response.data.message)
        navigate('/login');

    } catch (error) {
        console.log("Error", error.response.data.email[0])
        alert(error.response.data.email[0])
        // setMessage(error.response.data.email[0]);
    }
    // console.log(formData);
  };

  return (
    <div className="registration-container">
      <form className="registration-box" onSubmit={handleSubmit}>
        <h1 className="registration-title">USER REGISTRATION</h1>
        <div className="form-group">
          <label>Individual/Enterprise/Government *</label>
          <div className="radio-group user-type">
            <label>
              <input
                type="radio"
                name="user_type"
                value="INDIVIDUAL"
                checked={formData.user_type === 'INDIVIDUAL'}
                onChange={handleChange}
                required
              />
              Individual
            </label>
            <label>
              <input
                type="radio"
                name="user_type"
                value="ENTERPRISE"
                checked={formData.user_type === 'ENTERPRISE'}
                onChange={handleChange}
                required
              />
              Enterprise
            </label>
            <label>
              <input
                type="radio"
                name="user_type"
                value="GOVERNMENT"
                checked={formData.user_type === 'GOVERNMENT'}
                onChange={handleChange}
                required
              />
              Government
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="first_name">First Name *</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="registration-input"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name *</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="registration-input"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="registration-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            className="registration-input"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            className="registration-input"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select a country</option>
            <option value="india">India</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            name="state"
            className="registration-input"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select a state</option>
            <option value="delhi">Delhi</option>
            <option value="haryana">Haryana</option>
            <option value="uttar_pradesh">Uttar Pradesh</option>
            <option value="panjab">Punjab</option>
            <option value="bihar">Bihar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pin_code">Pin Code *</label>
          <input
            type="text"
            id="pin_code"
            name="pin_code"
            className="registration-input"
            value={formData.pin_code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Mobile Number *</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="registration-input"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fax">Fax</label>
          <input
            type="text"
            id="fax"
            name="fax"
            className="registration-input"
            value={formData.fax}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            className="registration-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password *</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="registration-input"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="registration-button">
          SIGN UP
        </button>
          <a href="/login" className="forgot-password">
              Already Registered? Login
          </a>
      </form>
    </div>
  );
};

export default RegistrationPage;

