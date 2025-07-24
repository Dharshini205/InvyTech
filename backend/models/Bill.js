const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Bill", BillSchema);
