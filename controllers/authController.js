const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register New User
exports.register = async (req, res) => {
  console.log("Registering new user:",req.body);

  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({
  success: true,
  name: newUser.name,
  email: newUser.email,
  userId: newUser._id,
});

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login Existing User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }
    console.log("✅ Login response userId:", user._id);

 return res.status(200).json({
  success: true,
  name: user.name,
  email: user.email,
  userId: user._id, // 👈 required for backend alerts
});

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};