import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage('❌ New passwords do not match!');
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('❌ New password must be at least 6 characters!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || 'Failed to change password'}`);
      } else {
        setMessage('✅ Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Change Password</button>
      </form>
      {message && <p className="message">{message}</p>}

      <button
        className="back-btn"
        onClick={() => navigate('/user')}
      >
        ← Back to User Page
      </button>
    </div>
  );
};

export default ChangePasswordPage;
