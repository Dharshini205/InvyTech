const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      role: "user",          
      isApproved: false     
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully. Awaiting admin approval.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

   
    if (!user.isApproved) {
      return res.status(403).json({ error: "Your account is not yet approved by admin." });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/change-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect current password" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
