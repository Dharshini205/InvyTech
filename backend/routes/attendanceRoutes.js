const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// GET /attendance → Get all attendance records OR for a specific employee
router.get("/", async (req, res) => {
  const { employeeId } = req.query;

  try {
    let query = {};
    if (employeeId) {
      query.employeeId = employeeId;
    }

    const records = await Attendance.find(query).populate("employeeId", "name email position");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance records" });
  }
});

// POST /attendance → Add new attendance record
router.post("/", async (req, res) => {
  const { employeeId, date, status } = req.body;

  if (!employeeId || !date || !status) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newRecord = new Attendance({ employeeId, date, status });
    await newRecord.save();

    const records = await Attendance.find().populate("employeeId", "name email position");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error adding attendance record" });
  }
});

// DELETE /attendance/:id → Delete an attendance record
router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    const records = await Attendance.find().populate("employeeId", "name email position");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error deleting attendance record" });
  }
});

module.exports = router;
