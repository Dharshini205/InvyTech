// routes/hr.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const User = require("../models/User");  // Import User model

// GET all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching employees." });
  }
});

// ADD employee (+ auto-create user)
router.post("/employees", async (req, res) => {
  try {
    const employeeData = req.body;

    // Check if user already exists with same email
    const existingUser = await User.findOne({ email: employeeData.email });
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists." });
    }

    // Create User with default password
    const defaultPassword = "password123"; // you can change this
    const user = new User({
      username: employeeData.name,
      email: employeeData.email,
      password: defaultPassword,
      role: "user",
    });

    await user.save();

    // Now create Employee linked to User
    const employee = new Employee({
      ...employeeData,
      userId: user._id,
    });

    await employee.save();

    // Return updated employee list
    const employees = await Employee.find().sort({ name: 1 });
    res.json(employees);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding employee." });
  }
});

// UPDATE employee
router.put("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    const employees = await Employee.find().sort({ name: 1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating employee." });
  }
});

// DELETE employee (+ optional delete user)
router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Optionally, delete linked User
    if (employee.userId) {
      await User.findByIdAndDelete(employee.userId);
    }

    await Employee.findByIdAndDelete(req.params.id);

    const employees = await Employee.find().sort({ name: 1 });
    res.json(employees);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting employee." });
  }
});
// Approve user by email
router.post("/approve-user", async (req, res) => {
  const { email, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isApproved = true;
    user.role = role || "employee"; // default role is employee
    await user.save();

    res.json({ message: "User approved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all unapproved users
router.get("/pending-users", async (req, res) => {
  try {
    const users = await User.find({ isApproved: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
