import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ReportPage.css";
import ReportsNavbar from "../components/ReportsNavbar";

const API_BASE = "http://localhost:5000/api";

const ReportsPage = () => {
  const navigate = useNavigate();

  const [inventoryReport, setInventoryReport] = useState({});
  const [billingReport, setBillingReport] = useState({});
  const [hrReport, setHrReport] = useState({});

  useEffect(() => {
    fetchInventoryReport();
    fetchBillingReport();
    fetchHrReport();
  }, []);

  const fetchInventoryReport = async () => {
    const res = await fetch(`${API_BASE}/reports/inventory`);
    const data = await res.json();
    setInventoryReport(data);
  };

  const fetchBillingReport = async () => {
    const res = await fetch(`${API_BASE}/reports/billing`);
    const data = await res.json();
    setBillingReport(data);
  };

  const fetchHrReport = async () => {
    const res = await fetch(`${API_BASE}/reports/hr`);
    const data = await res.json();
    setHrReport(data);
  };

  return (
    <div className="erp-container">
      <ReportsNavbar />

      <header className="welcome-section">
        <h1>📊 Reports Dashboard</h1>
        <p>View overall ERP system stats</p>
      </header>

      <section className="reports-cards">
        {/* Inventory Report */}
        <Link to="/reports/inventory" className="report-card-link">
          <div className="report-card">
            <h3>📦 Inventory Report</h3>
            <p><strong>Total Products:</strong> {inventoryReport.totalProducts}</p>
            <p><strong>Low Stock Count:</strong> {inventoryReport.lowStockCount}</p>
          </div>
        </Link>

        {/* Billing Report */}
        <Link to="/reports/billing" className="report-card-link">
          <div className="report-card">
            <h3>🧾 Billing Report</h3>
            <p><strong>Total Bills:</strong> {billingReport.totalBills}</p>
            <p><strong>Total Revenue:</strong> ₹{billingReport.totalRevenue}</p>
          </div>
        </Link>

        {/* HR Report */}
        <Link to="/reports/hr" className="report-card-link">
          <div className="report-card">
            <h3>👥 HR Report</h3>
            <p><strong>Total Employees:</strong> {hrReport.totalEmployees}</p>
            <p><strong>Total Salary Payout:</strong> ₹{hrReport.totalSalary}</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ReportsPage;
