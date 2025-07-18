const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config(); 

const authRoutes = require('./routes/auth');
const alertRoutes = require('./routes/api');
const smsRoute = require('./routes/smsRoute'); // ✅ Include SMS route

const app = express(); // ✅ Only declared once

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', alertRoutes);
app.use('/api', smsRoute); // ✅ All API routes under /api
 // ✅ Mount SMS route

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

