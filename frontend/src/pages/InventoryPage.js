// src/pages/InventoryPage.js

import React, { useEffect, useState } from "react";
import API_BASE from "../services/api";
import MainNavbar from "../components/MainNavbar"; // ✅ Replace InventoryNavbar
import "./InventoryPage.css";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userRole, setUserRole] = useState("user");
  const [notification, setNotification] = useState("");

  // ✅ Navbar links for MainNavbar
  const navbarLinks = [
    { path: "/inventory", label: "Inventory" },
    { path: "/bills", label: "Billing" },
    
    { path: "/hr", label: "HR" },
    { path: "/reports", label: "Reports" },
    {path:"/user",label:"User Panel"},
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role) setUserRole(user.role);
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(`${API_BASE}/inventory`)
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => console.error("Fetch error:", err));
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 5000);
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.quantity || !newItem.price || !newItem.category) {
      showNotification("❌ Please fill in all fields before adding.");
      return;
    }

    const res = await fetch(`${API_BASE}/inventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    const data = await res.json();
    if (res.ok) {
      setItems([...items, data]);
      setNewItem({ name: "", quantity: "", price: "", category: "" });
      showNotification("✅ Item added successfully.");
    } else {
      showNotification("❌ Failed to add item.");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API_BASE}/inventory/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems(items.filter((item) => item._id !== id));
      showNotification("🗑️ Item deleted successfully.");
    } else {
      showNotification("❌ Failed to delete item.");
    }
  };

  const handleEdit = (item) => setEditingItem({ ...item });

  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`${API_BASE}/inventory/${editingItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    });

    const updated = await res.json();
    if (res.ok) {
      setItems(items.map((item) => (item._id === updated._id ? updated : item)));
      setEditingItem(null);
      showNotification("✅ Item updated successfully.");
    } else {
      showNotification("❌ Failed to update item.");
    }
  };

  const filteredAndSortedItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = Number(a[sortKey]);
      const valB = Number(b[sortKey]);
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

  return (
    <>
      <MainNavbar title="InvyTech ERP - Inventory" links={navbarLinks} />

      <div className="inventory-container">
        <h2>📦 Inventory Management</h2>

        {/* ✅ Notification */}
        {notification && (
          <div className="notification-box">
            <p>{notification}</p>
          </div>
        )}

        {/* ✅ Add new item (admin only) */}
        {userRole === "admin" && (
          <div className="add-form">
            <input
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <input
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <button onClick={handleAdd}>Add Item</button>
          </div>
        )}

        {/* ✅ Search & sort controls */}
        <div className="filter-sort-controls">
          <input
            type="text"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc"}
          </button>
        </div>

        {/* ✅ Data table */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  {userRole === "admin" ? (
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <span title="Only admin can edit/delete">🔒</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ Edit modal */}
        {editingItem && (
          <div className="modal-overlay" onClick={() => setEditingItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Inventory Item</h3>
              <input
                name="name"
                value={editingItem.name}
                onChange={handleEditChange}
              />
              <input
                name="quantity"
                type="number"
                value={editingItem.quantity}
                onChange={handleEditChange}
              />
              <input
                name="price"
                type="number"
                value={editingItem.price}
                onChange={handleEditChange}
              />
              <input
                name="category"
                value={editingItem.category}
                onChange={handleEditChange}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingItem(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryPage;
