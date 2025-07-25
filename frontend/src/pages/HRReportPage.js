// src/pages/HRReportPage.js

import React, { useEffect, useState } from "react";
import ReportsNavbar from "../components/ReportsNavbar";
import API_BASE from "../services/api";
import "./HRReportPage.css";

const HRReportPage = () => {
  const [employees, setEmployees] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE.replace("/inventory", "")}/hr/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        const salarySum = data.reduce((sum, e) => sum + Number(e.salary), 0);
        setTotalSalary(salarySum);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <ReportsNavbar />
      <div className="hr-report-container">
        <h2>👥 HR Report</h2>

        <div className="summary-box">
          <p><strong>Total Employees:</strong> {employees.length}</p>
          <p><strong>Total Salary Payout:</strong> ₹{totalSalary}</p>
        </div>

        <h3>📋 Employee Breakdown</h3>
        <table className="hr-report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>₹{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HRReportPage;
