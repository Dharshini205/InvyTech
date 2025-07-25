import React, { useEffect, useState } from "react";
import HRNavbar from "../components/HRNavbar";
import API_BASE from "../services/api";
import "./LeavePage.css";

const LeavePage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [notification, setNotification] = useState(null);


  const [employeeObjectId, setEmployeeObjectId] = useState("");

  // ✅ FETCH LEAVE REQUESTS
  const fetchLeaveRequests = async (role = userRole, user = currentUser) => {
    try {
      const res = await fetch(`${API_BASE}/leave`);
      const data = await res.json();
      console.log("🔁 [fetchLeaveRequests] Fetched data:", data);
      console.log("🔁 [fetchLeaveRequests] Role:", role, "User ID:", user._id || user.id);

      if (Array.isArray(data)) {
        if (role === "employee") {
          const filtered = data.filter((leave) => {
            const empId = leave.employeeId;
            if (!empId) return false;

            return (
              empId === employeeObjectId ||
              (typeof empId === "object" && empId._id === employeeObjectId)
            );
          });

          console.log("🔍 Filtered leaveRequests for employee:", filtered);
          setLeaveRequests(filtered);
        } else {
          setLeaveRequests(data);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching leave requests:", error);
    }
  };

  // ✅ FETCH EMPLOYEES
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/hr/employees`);
      const data = await res.json();
      console.log("📥 [fetchEmployees] Fetched employees:", data);
      if (Array.isArray(data)) {
        setEmployees(data);
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  // ✅ INITIALIZE ON LOAD
  useEffect(() => {
    const initialize = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("🗂️ [initialize] Loaded user from localStorage:", storedUser);

      if (storedUser) {
        setUserRole(storedUser.role);
        setCurrentUser(storedUser);
      }

      await fetchEmployees();
    };

    initialize();
  }, []);

  // ✅ MAP USER → EMPLOYEE AFTER EMPLOYEES FETCHED
  useEffect(() => {
    if (userRole === "employee" && currentUser && employees.length > 0) {
      const emp = employees.find(
        (e) => e.userId === currentUser._id || e.userId === currentUser.id
      );

      if (emp) {
        setSelectedEmployee(emp._id);
        setEmployeeObjectId(emp._id);
        console.log("✅ Mapped employeeId:", emp._id);
      } else {
        console.warn("⚠️ Could not find matching employee for logged in user:", currentUser);
      }
    }
  }, [userRole, currentUser, employees]);

  // ✅ FETCH LEAVES AFTER ROLE & USER DATA IS KNOWN
  useEffect(() => {
    if (
      userRole &&
      (currentUser._id || currentUser.id) &&
      (userRole !== "employee" || employeeObjectId)
    ) {
      fetchLeaveRequests(userRole, currentUser);
    }
  }, [userRole, currentUser, employeeObjectId]);

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedEmployee ||
      selectedEmployee.trim() === "" ||
      !fromDate ||
      !toDate ||
      !reason.trim()
    ) {
      
      setNotification({ type: "error", message: "Please fill in all fields!!!" });
  setTimeout(() => setNotification(null), 5000);
  return;
    }

    const leaveData = {
      employeeId: selectedEmployee,
      fromDate,
      toDate,
      reason,
    };

    console.log("📤 [handleSubmit] Submitting leave data:", leaveData);

    try {
      const res = await fetch(`${API_BASE}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveData),
      });

      if (res.ok) {
        const responseLeave = await res.json();
        console.log("✅ [handleSubmit] Leave submission successful:", responseLeave);

       setNotification({ type: "success", message: "Leave request submitted." });
setTimeout(() => setNotification(null), 5000);

        if (userRole !== "employee") setSelectedEmployee("");
        setFromDate("");
        setToDate("");
        setReason("");

        setTimeout(() => {
          fetchLeaveRequests(currentUser.role, currentUser);
        }, 300);
      } else {
        const err = await res.text();
        console.error("❌ [handleSubmit] Error response:", err);
        setNotification({ type: "error", message: "Error submitting leave: " + err });
setTimeout(() => setNotification(null), 5000);

      }
    } catch (error) {
      console.error("❌ [handleSubmit] Server error:", error);
      setNotification({ type: "error", message: "Server error while submitting leave." });
setTimeout(() => setNotification(null), 5000);

    }
  };

  console.log("📦 [render] leaveRequests state:", leaveRequests);
  // ✅ Admin Approve/Reject Logic
const handleApproveReject = async (leaveId, newStatus) => {
  try {
    const res = await fetch(`${API_BASE}/leave/${leaveId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
     setNotification({ type: "success", message: `Leave ${newStatus.toLowerCase()} successfully.` });
setTimeout(() => setNotification(null), 5000);

      fetchLeaveRequests(userRole, currentUser); // 🔁 Refresh list
    } else {
      setNotification({ type: "error", message: "Failed to update leave status." });
setTimeout(() => setNotification(null), 5000);

    }
  } catch (error) {
    console.error("❌ Error updating status:", error);
    setNotification({ type: "error", message: "Server error." });
setTimeout(() => setNotification(null), 5000);

  }
};

  return (
    <div className="leave-page">
      <HRNavbar />
      {notification && (
  <div
    className={`notification-box ${notification.type === "success" ? "success" : "error"}`}
  >
    <p><strong>{notification.type === "success" ? " Success" : " Error"}</strong></p>
    <p>{notification.message}</p>
  </div>
)}

      <div className="leave-container">
        <h2>Leave Request Management</h2>

        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              disabled={userRole === "employee"}
            >
              {userRole === "employee" ? (
                <option value={selectedEmployee}>
                  {currentUser?.username} ({currentUser?.email})
                </option>
              ) : (
                <>
                  <option value="">Select</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.email})
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: "1 1 100%" }}>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={userRole === "employee" && !selectedEmployee}
          >
            Submit Leave Request
          </button>
        </form>

        <h3>Leave Requests</h3>
        <table className="leave-table">
          <thead>
  <tr>
    <th>Employee Name</th>
    <th>Email</th>
    <th>From</th>
    <th>To</th>
    <th>Reason</th>
    <th>Status</th>
    {userRole === "admin" && <th>Actions</th>} {/* Only admin sees Actions th */}
  </tr>
</thead>

         <tbody>
  {leaveRequests.length === 0 ? (
    <tr>
      <td colSpan={userRole === "admin" ? "7" : "6"}>No leave requests found.</td>
    </tr>
  ) : (
    leaveRequests.map((leave) => (
      <tr key={leave._id}>
        <td>{leave?.employeeId?.name || "N/A"}</td>
        <td>{leave?.employeeId?.email || "N/A"}</td>
        <td>
          {leave.fromDate
            ? new Date(leave.fromDate).toLocaleDateString()
            : "Invalid"}
        </td>
        <td>
          {leave.toDate
            ? new Date(leave.toDate).toLocaleDateString()
            : "Invalid"}
        </td>
        <td>{leave.reason}</td>
        <td>{leave.status}</td>

        {/* ✅ Admin-only Action buttons */}
        {userRole === "admin" && (
          <td>
            {leave.status === "Pending" ? (
              <>
                <button
                  className="approve-btn"
                  onClick={() => handleApproveReject(leave._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleApproveReject(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </>
            ) : (
              <span className="readonly-status">No Actions</span>
            )}
          </td>
        )}
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default LeavePage;
