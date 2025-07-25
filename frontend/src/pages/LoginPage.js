// src/pages/LoginPage.js
import React, { useState } from "react";
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("❗ Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "Login failed"}`);
      } else {
        if (!data.user.isApproved) {
          setMessage("❗ Your account is not yet approved by the admin.");
          return;
        }

        setMessage("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate based on role
        navigate("/user");
      }
    } catch (err) {
      setMessage("❌ Error connecting to server.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login to InvyTech</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        
        {message && <p className={`message ${message.startsWith("✅") ? 'success' : 'error'}`}>{message}</p>}

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <footer className="login-footer">
        <p>&copy; {new Date().getFullYear()} InvyTech ERP</p>
      </footer>
    </div>
  );
};

export default LoginPage;
