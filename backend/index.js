const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const billRoutes = require("./routes/bills"); 
const hrRoutes = require("./routes/hr");
const attendanceRoutes = require("./routes/attendanceRoutes");   // NEW
const leaveRoutes = require("./routes/leaveRoutes");              // NEW
const reportsRoutes = require("./routes/reports");

// API endpoints
app.use("/api/auth", authRoutes);            // Signup/Login route
app.use("/api/inventory", inventoryRoutes);  // Inventory CRUD route
app.use("/api/bills", billRoutes);           // Billing route
app.use("/api/hr", hrRoutes);                // HR Employees route
app.use("/api/attendance", attendanceRoutes); // NEW Attendance route
app.use("/api/leave", leaveRoutes);           // NEW Leave requests route
app.use("/api/reports", reportsRoutes); 
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
