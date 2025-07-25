// src/pages/BillingPage.js

import React, { useEffect, useState } from "react";
import API_BASE from "../services/api";
import MainNavbar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";
import "./BillingPage.css";

const BillingPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // ✅ Navbar links including billing history
  const navbarLinks = [
    { path: "/inventory", label: "Inventory" },
    { path: "/bills", label: "Billing" },
    { path: "/billing-history", label: "Billing History" },

    { path: "/hr", label: "HR" },
    { path: "/reports", label: "Reports" },
     {path:"/user",label:"User Panel"}
  ];

  // ✅ Fetch inventory on load
  useEffect(() => {
    fetch(`${API_BASE}/inventory`)
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Show notification for 4s
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 4000);
  };

  // ✅ Add item or update qty
  const handleSelectItem = (item) => {
    const existingIndex = selectedItems.findIndex((i) => i._id === item._id);

    if (existingIndex !== -1) {
      const updatedItems = [...selectedItems];
      const existingItem = updatedItems[existingIndex];
      if (existingItem.quantity < item.quantity) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        setSelectedItems(updatedItems);
      } else {
        showNotification("You’ve reached the maximum available stock for this item.");
      }
    } else {
      setSelectedItems([
        ...selectedItems,
        { ...item, quantity: 1, totalPrice: item.price },
      ]);
    }
  };

  // ✅ Update quantity manually
  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;

    const selectedItem = selectedItems[index];
    const stockItem = items.find((i) => i._id === selectedItem._id);
    const maxAllowed = stockItem?.quantity ?? 1;

    if (newQty > maxAllowed) {
      showNotification(`Invalid quantity. Max available: ${maxAllowed}`);
      return;
    }

    const updated = [...selectedItems];
    updated[index].quantity = newQty;
    updated[index].totalPrice = newQty * updated[index].price;
    setSelectedItems(updated);
  };

  // ✅ Remove item
  const handleRemoveItem = (index) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  // ✅ Total
  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  // ✅ Submit bill to API
  const handleSubmitBill = async () => {
    if (!customerName) {
      showNotification("Please enter the customer name to proceed further!");
      return;
    }

    if (selectedItems.length === 0) {
      showNotification("Please select at least one item to proceed with billing.");
      return;
    }

    const billData = {
      customerName,
      items: selectedItems.map((item) => ({
        itemId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    try {
      const res = await fetch(`${API_BASE.replace("/inventory", "")}/bills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billData),
      });

      const result = await res.json();

      if (res.ok) {
        showNotification("✅ Bill submitted successfully!");
        setSelectedItems([]);
        setCustomerName("");
      } else {
        showNotification("❌ Error: " + result.message);
      }
    } catch (error) {
      showNotification("❌ Network error while submitting the bill.");
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <MainNavbar title="InvyTech ERP - Billing" links={navbarLinks} />

      {/* ✅ Notification message */}
      {notification && (
        <div className="notification-box">
          <p>{notification}</p>
        </div>
      )}

      <div className="billing-container">
        <h2>🧾 Billing Page</h2>

        <div className="billing-form">
          {/* ✅ Customer Name */}
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          {/* ✅ Inventory Selection Grid */}
          <h3>📋 Select Items</h3>
          <div className="item-list">
            {items.map((item) => (
              <div key={item._id} className="item-card">
                <p>{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Stock: {item.quantity}</p>
                <p>Category: {item.category}</p>
                <button
                  onClick={() => handleSelectItem(item)}
                  disabled={item.quantity === 0}
                >
                  {item.quantity > 0 ? "Add to Bill" : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Cart Table */}
          <h3>🛒 Selected Items</h3>
          <table className="billing-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => {
                const availableStock =
                  items.find((i) => i._id === item._id)?.quantity || 1;
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max={availableStock}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>₹{item.price}</td>
                    <td>₹{item.totalPrice}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ✅ Totals */}
          <div className="total-card">
            <h3>💰 Total Amount</h3>
            <p>₹{totalAmount.toLocaleString("en-IN")}</p>
          </div>

          {/* ✅ Submit */}
          <button
            onClick={handleSubmitBill}
            disabled={!customerName || selectedItems.length === 0}
          >
            Submit Bill
          </button>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
