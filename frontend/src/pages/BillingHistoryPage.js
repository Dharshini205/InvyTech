// src/pages/BillingHistoryPage.js

import React, { useEffect, useState } from "react";
import API_BASE from "../services/api";
import MainNavbar from "../components/MainNavbar"; // ✅ Changed navbar
import "./BillingHistoryPage.css";

const BillingHistoryPage = () => {
  const [billingHistory, setBillingHistory] = useState([]);

  // ✅ Define nav links (including Billing)
  const navbarLinks = [
    { path: "/inventory", label: "Inventory" },
    { path: "/bills", label: "Billing" },
    { path: "/billing-history", label: "Billing History" },
    { path: "/hr", label: "HR" },
    { path: "/reports", label: "Reports" },
     {path:"/user",label:"User Panel"}
  ];

  useEffect(() => {
    fetch(`${API_BASE.replace("/inventory", "")}/bills`)
      .then((res) => res.json())
      .then((data) => setBillingHistory(data.reverse()))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <MainNavbar title="InvyTech ERP - Billing History" links={navbarLinks} />

      <div className="billing-history-container">
        <div className="history-header">
          <h2>📜 Billing History</h2>
          <p className="subtext">View all your past billing transactions</p>
        </div>

        {billingHistory.length === 0 ? (
          <p className="info-text">No bills found.</p>
        ) : (
          <table className="billing-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill._id}>
                  <td>{new Date(bill.createdAt).toLocaleString()}</td>
                  <td>₹{bill.totalAmount.toLocaleString("en-IN")}</td>
                  <td>
                    {bill.items
                      .map((item) => `${item.name} ×${item.quantity}`)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default BillingHistoryPage;
