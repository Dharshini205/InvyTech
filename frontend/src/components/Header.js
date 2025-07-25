import React from 'react';
import './Header.css';

const Header = ({ user }) => {
  return (
    <header className="dashboard-header">
      <h2>Welcome, {user.name || "User"} 👋</h2>
    </header>
  );
};

export default Header;
