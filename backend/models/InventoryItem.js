const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
