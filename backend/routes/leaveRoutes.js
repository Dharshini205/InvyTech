const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");

// GET /leave → Get all leave requests with employee details
router.get("/", async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate("employeeId", "name email position");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leave requests" });
  }
});

// POST /leave → Submit a new leave request
router.post("/", async (req, res) => {
  const { employeeId, fromDate, toDate, reason } = req.body;

  if (!employeeId || !fromDate || !toDate) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newRequest = new LeaveRequest({
      employeeId,
      fromDate,
      toDate,
      reason,
      status: "Pending",
    });

    await newRequest.save();

    // Populate employee details before responding
    const populated = await LeaveRequest.findById(newRequest._id)
      .populate("employeeId", "name email");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Error submitting leave request" });
  }
});

// PUT /leave/:id → Update status (Pending, Approved, Rejected)
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    await LeaveRequest.findByIdAndUpdate(req.params.id, { status });

    const updatedLeaves = await LeaveRequest.find()
      .populate("employeeId", "name email position");

    res.json(updatedLeaves);
  } catch (err) {
    res.status(500).json({ message: "Error updating leave request" });
  }
});

// DELETE /leave/:id → Delete a leave request
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await LeaveRequest.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json({ message: "Leave request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting leave request" });
  }
});

module.exports = router;
