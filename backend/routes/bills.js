const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const InventoryItem = require("../models/InventoryItem");

// Create new bill + update inventory
router.post("/", async (req, res) => {
  try {
    const { customerName, items, totalAmount } = req.body;

    if (!customerName || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Update inventory quantities
    for (const item of items) {
      await InventoryItem.findByIdAndUpdate(
        item.itemId,
        { $inc: { quantity: -item.quantity } }
      );
    }

    // Save bill
    const newBill = new Bill({ customerName, items, totalAmount });
    const savedBill = await newBill.save();

    res.status(201).json(savedBill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
