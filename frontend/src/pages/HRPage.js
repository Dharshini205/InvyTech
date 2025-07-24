import React, { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar"; // ✅ Use MainNavbar instead
import API_BASE from "../services/api";
import "./HRPage.css";

const HRPage = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }

    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch(`${API_BASE.replace("/inventory", "")}/hr/employees`)
      .then((res) => res.json())
      .then(setEmployees)
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.salary) {
      alert("Please fill all fields!");
      return;
    }

    const res = await fetch(`${API_BASE.replace("/inventory", "")}/hr/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });

    const data = await res.json();

    if (res.ok) {
      setNewEmployee({ name: "", email: "", position: "", salary: "" });
      setShowAddForm(false);
      fetchEmployees();

      // Show notification
      setMessage({ email: newEmployee.email });
      setTimeout(() => setMessage(""), 5000);
    } else {
      alert("Error: " + data.message);
    }
  };

  const handleEditEmployee = async () => {
    const res = await fetch(
      `${API_BASE.replace("/inventory", "")}/hr/employees/${editingEmployee._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEmployee),
      }
    );

    if (res.ok) {
      setEditingEmployee(null);
      fetchEmployees();
    } else {
      const error = await res.json();
      alert("Error: " + error.message);
    }
  };

  const handleDeleteEmployee = async () => {
    const res = await fetch(
      `${API_BASE.replace("/inventory", "")}/hr/employees/${deletingEmployee._id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setDeletingEmployee(null);
      fetchEmployees();
    } else {
      const error = await res.json();
      alert("Error: " + error.message);
    }
  };

  // ✅ HR-Specific Navbar Links
  const hrNavLinks = [
    { path: '/hr', label: 'Employees' },
    { path: '/attendance', label: 'Attendance' },
    { path: '/leave', label: 'Leave Requests' },
    { path: '/hr-approvals', label: 'Approvals' },
    { path: '/user', label: 'User Panel' }
  ];

  return (
    <>
      <MainNavbar title="InvyTech-HR Panel" links={hrNavLinks} />

      <div className="hr-container">
        <h2>👩‍💼 HR Management</h2>

        {/* ✅ Notification Box */}
        {message && (
          <div className="notification-box">
            <p><strong>Employee Added</strong></p>
            <p>Email: {message.email}</p>
            <p>Default Password: password123</p>
          </div>
        )}

        {/* ✅ Admin Only: Add Form Toggle */}
        {userRole === "admin" && (
          <>
            <button
              className="toggle-add-form-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "✖ Close Form" : " + Add Employee"}
            </button>

            {showAddForm && (
              <div className="add-employee-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, position: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Salary"
                  value={newEmployee.salary}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, salary: e.target.value })
                  }
                />
                <button onClick={handleAddEmployee}>Save Employee</button>
              </div>
            )}
          </>
        )}

        {/* ✅ Employee List */}
        <h3>📋 Employee List</h3>
        <table className="hr-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              {userRole === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>₹{emp.salary}</td>
                {userRole === "admin" && (
                  <td>
                    <button className="edit-btn" onClick={() => setEditingEmployee(emp)}>Edit</button>
                    <button className="delete-btn" onClick={() => setDeletingEmployee(emp)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      {editingEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <input
              type="text"
              value={editingEmployee.name}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, name: e.target.value })
              }
            />
            <input
              type="email"
              value={editingEmployee.email}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, email: e.target.value })
              }
            />
            <input
              type="text"
              value={editingEmployee.position}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, position: e.target.value })
              }
            />
            <input
              type="number"
              value={editingEmployee.salary}
              onChange={(e) =>
                setEditingEmployee({ ...editingEmployee, salary: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={handleEditEmployee}>Save</button>
              <button onClick={() => setEditingEmployee(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Modal */}
      {deletingEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{deletingEmployee.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteEmployee}>Yes, Delete</button>
              <button onClick={() => setDeletingEmployee(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HRPage;
