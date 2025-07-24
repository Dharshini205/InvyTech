// src/pages/HRApprovalPage.js
import React, { useEffect, useState } from "react";
import "./HRApprovalPage.css";
import HRNavbar from "../components/HRNavbar";

const HRApprovalPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hr/pending-users")
      .then((res) => res.json())
      .then(setPendingUsers)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleApprove = async (email) => {
    try {
      const res = await fetch("http://localhost:5000/api/hr/approve-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "employee" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Approval failed");

      setMessage("✅ User approved successfully");
      setPendingUsers(pendingUsers.filter((u) => u.email !== email));

      // Auto-hide message after 4 seconds
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ " + err.message);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <>
      <HRNavbar />
      <div className="hr-approval-container">
        <h2>🧑‍💼 Pending User Approvals</h2>

        {message && (
          <div className="notification-box">
            <p>{message}</p>
          </div>
        )}

        <table className="approval-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleApprove(user.email)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HRApprovalPage;
