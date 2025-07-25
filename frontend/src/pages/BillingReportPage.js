// src/pages/BillingReportPage.js
import React, { useEffect, useState } from "react";
import ReportsNavbar from "../components/ReportsNavbar";
import API_BASE from "../services/api";
import "./BillingReportPage.css";

const BillingReportPage = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE.replace("/inventory", "")}/bills`)
      .then((res) => res.json())
      .then((data) => {
        setBillingData(data.reverse()); // latest bills first
        setLoading(false);
      })
      .catch((err) => {
        console.error("Billing data fetch failed:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="report-container">
      <ReportsNavbar />

      <header className="report-header">
        <h2>🧾 Detailed Billing Report</h2>
        <p className="subtext">Summary of all billing transactions and total revenue</p>
      </header>
      
      {loading ? (
        <p className="info-text">Loading data...</p>
      ) : billingData.length === 0 ? (
        <p className="info-text">No billing data found.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Total Amount (₹)</th>
              <th>Items</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((bill, index) => (
              <tr key={bill._id}>
                <td>{index + 1}</td>
                <td>{bill.customerName}</td>
                <td>₹{bill.totalAmount}</td>
                <td>
                  {bill.items.map((item) => (
                    <div key={item.itemId}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>{new Date(bill.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillingReportPage;
