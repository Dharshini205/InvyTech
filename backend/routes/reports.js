// routes/reports.js

const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");
const Bill = require("../models/Bill");
const Employee = require("../models/Employee");

// --- Inventory Report Summary ---
// routes/reports.js
router.get("/inventory", async (req, res) => {
  try {
    const products = await InventoryItem.find();

    const lowStockProducts = products.filter(p => p.quantity <=5);
    const totalProducts = products.length;

    res.json({
      totalProducts,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      productBreakdown: products.map(p => ({ name: p.name, quantity: p.quantity })) // 💡 Add this
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- Inventory Full Data for Charts ---
router.get("/inventory/all", async (req, res) => {
  try {
    const products = await InventoryItem.find();

    // Example response:
    // [
    //   { name: "Product A", quantity: 10, category: "Electronics" },
    //   { name: "Product B", quantity: 3, category: "Food" }
    // ]
    const formatted = products.map(p => ({
      name: p.name,
      quantity: p.quantity,
      category: p.category || "Uncategorized"
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Billing Report ---
router.get("/billing", async (req, res) => {
  try {
    const bills = await Bill.find();

    const totalRevenue = bills.reduce((sum, b) => sum + b.totalAmount, 0);
    const totalBills = bills.length;

    res.json({
      totalBills,
      totalRevenue
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- HR Report ---
router.get("/hr", async (req, res) => {
  try {
    const employees = await Employee.find();
    const totalEmployees = employees.length;

    const totalSalary = employees.reduce((sum, e) => sum + Number(e.salary), 0);

    res.json({
      totalEmployees,
      totalSalary
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
