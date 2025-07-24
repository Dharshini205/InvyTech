import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import { Link } from 'react-router-dom';
import API_BASE from '../services/api';  // Add this to use API

const UserPage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/login');
  }, [navigate]);

  const storedUser = localStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};
  const [user, setUser] = useState(parsedUser);
  const [editedUser, setEditedUser] = useState(parsedUser);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const openModal = () => {
    setEditedUser(user);
    setModalOpen(true);
    setDropdownOpen(false);
  };
  const closeModal = () => setModalOpen(false);

  const openPasswordModal = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordMessage('');
    setPasswordModalOpen(true);
    setDropdownOpen(false);
  };
  const closePasswordModal = () => setPasswordModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem('user', JSON.stringify(editedUser));
    closeModal();
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage(' New passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${API_BASE.replace('/inventory', '')}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordMessage('Password changed successfully!');
        setTimeout(() => closePasswordModal(), 2000);
      } else {
        setPasswordMessage( (data.error || 'Error occurred'));
      }
    } catch (err) {
      setPasswordMessage(' Network error');
    }
  };

  return (
    <div className="erp-container">
      <nav className="top-nav">
        <div className="logo">InvyTech</div>
        <ul className="nav-items">
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/bills">Billing</Link></li>
          <li><Link to="/hr">HR</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        
        </ul>

        <div className="profile-wrapper">
          <div className="profile-circle" onClick={toggleDropdown}>
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
          {dropdownOpen && (
            <div className="profile-dropdown">
              <p><strong>{user.username}</strong></p>
              <p>{user.email}</p>
              <button onClick={openModal}>Edit Profile</button>
              <button onClick={openPasswordModal}>Change Password</button>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </nav>

      <header className="welcome-section">
        <h1>Welcome, {user.username || 'User'} 👋</h1>
        <p>Manage your operations efficiently with InvyTech ERP</p>
      </header>

      <section className="dashboard-cards">
        <Link to="/inventory" className="card-link">
          <div className="card">
            <h3>📦 Inventory</h3>
            <p>Track and manage product flow</p>
          </div>
        </Link>
        <Link to="/bills" className="card-link">
          <div className="card">
            <h3>🧾 Billing</h3>
            <p>Manage invoices and payments</p>
          </div>
        </Link>
        <Link to="/hr" className="card-link">
          <div className="card">
            <h3>👥 HR</h3>
            <p>Handle payroll and attendance</p>
          </div>
        </Link>
        <Link to="/reports" className="card-link">
          <div className="card">
            <h3>📊 Reports</h3>
            <p>View performance and stats</p>
          </div>
        </Link>
       
      </section>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <div className="input-group">
              <input type="text" name="username" value={editedUser.username || ''} onChange={handleInputChange} required />
              <label>Username</label>
            </div>
            <div className="input-group">
              <input type="email" name="email" value={editedUser.email || ''} onChange={handleInputChange} required />
              <label>Email</label>
            </div>
            <div className="modal-buttons">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={closeModal} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {passwordModalOpen && (
        <div className="modal-overlay" onClick={closePasswordModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Change Password</h2>
            <div className="input-group">
              <input type="password" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} required />
              <label>Current Password</label>
            </div>
            <div className="input-group">
              <input type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} required />
              <label>New Password</label>
            </div>
            <div className="input-group">
              <input type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} required />
              <label>Confirm New Password</label>
            </div>
            {passwordMessage && (
              <p style={{ marginBottom: '10px', color: passwordMessage.startsWith('✅') ? 'green' : 'red' }}>
                {passwordMessage}
              </p>
            )}
            <div className="modal-buttons">
              <button onClick={submitPasswordChange} className="save-btn">Change</button>
              <button onClick={closePasswordModal} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
