// routes/inventory.js
const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");

// @route   GET /api/inventory
// @desc    Get all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items", details: err.message });
  }
});

// @route   POST /api/inventory
// @desc    Add a new inventory item
router.post("/", async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    // Backend validation (optional but recommended)
    if (!name || quantity == null || price == null || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new InventoryItem({ name, quantity, price, category });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to create item", details: err.message });
  }
});

// @route   PUT /api/inventory/:id
// @desc    Update an inventory item by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update item", details: err.message });
  }
});

// @route   DELETE /api/inventory/:id
// @desc    Delete an inventory item by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item", details: err.message });
  }
});

module.exports = router;
