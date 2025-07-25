import React from 'react';
import './Sidebar.css';
import { FaBoxes, FaFileInvoice, FaUsers, FaChartBar } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="sidebar">
      <h2>InvyTech</h2>
      <nav>
        <ul>
          <li><FaBoxes /> Inventory</li>
          <li><FaFileInvoice /> Billing</li>
          <li><FaUsers /> HR</li>
          <li><FaChartBar /> Reports</li>
        </ul>
      </nav>
      <button onClick={onLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
