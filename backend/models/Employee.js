// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // <-- added
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: String,
  department: String,
  phone: String,
  address: String,
  joiningDate: Date,
  salary: Number,
  status: { type: String, enum: ["Active", "Inactive", "Terminated"], default: "Active" },
  role: { type: String, enum: ["Admin", "Manager", "Employee"], default: "Employee" },
  profilePhoto: String,
});


module.exports = mongoose.model("Employee", employeeSchema);
