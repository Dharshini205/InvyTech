import React, { useEffect, useState } from "react";
import HRNavbar from "../components/HRNavbar";
import API_BASE from "../services/api";
import "./HRPage.css";

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [userRole, setUserRole] = useState("user");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [newRecord, setNewRecord] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role);
      setCurrentUser(user);

      fetchEmployees().then((employeesList) => {
        const employee = employeesList.find(
          (emp) => emp.userId === user._id || emp.email === user.email
        );

        if (employee) {
          setCurrentEmployee(employee);
          setNewRecord((prev) => ({ ...prev, employeeId: employee._id }));
        }

        fetchAttendance(employee); // pass employee for filtering
      });
    } else {
      fetchEmployees().then(() => {
        fetchAttendance(); // fallback if no user
      });
    }
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE.replace("/inventory", "")}/hr/employees`);
      const data = await res.json();
      setEmployees(data);
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };

  const fetchAttendance = (employee = null) => {
    let url = `${API_BASE.replace("/inventory", "")}/attendance`;

    if (userRole === "user" && employee) {
      url += `?employeeId=${employee._id}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then(setAttendance)
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleAddAttendance = async () => {
    if (!newRecord.employeeId || !newRecord.date || !newRecord.status) {
      alert("Please fill all fields!");
      return;
    }

    const res = await fetch(`${API_BASE.replace("/inventory", "")}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecord),
    });

    if (res.ok) {
      setNewRecord({ employeeId: "", date: "", status: "Present" });
      const updatedAttendance = await res.json();
      setAttendance(updatedAttendance);
    } else {
      const error = await res.json();
      alert("Error: " + error.message);
    }
  };

  const handleDeleteAttendance = async (id) => {
    const res = await fetch(`${API_BASE.replace("/inventory", "")}/attendance/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updatedAttendance = await res.json();
      setAttendance(updatedAttendance);
    } else {
      const error = await res.json();
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <HRNavbar />
      <div className="hr-container">
        <h2>📅 Attendance</h2>

        {userRole === "admin" && (
          <div className="add-employee-form">
            <select
              value={newRecord.employeeId}
              onChange={(e) => setNewRecord({ ...newRecord, employeeId: e.target.value })}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.position})
                </option>
              ))}
            </select>

            <input
              type="date"
              value={newRecord.date}
              onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
            />

            <select
              value={newRecord.status}
              onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>

            <button onClick={handleAddAttendance}>Save Attendance</button>
          </div>
        )}

        <h3>📋 Attendance Records</h3>
        <table className="hr-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              {userRole === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record._id}>
                <td>{record.employeeId?.name}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.status}</td>
                {userRole === "admin" && (
                  <td>
                    <button className="delete-btn"onClick={() => handleDeleteAttendance(record._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AttendancePage;
