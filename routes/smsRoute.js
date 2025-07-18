const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// POST /send-sms
router.post('/send-sms', async (req, res) => {
  const { number, message } = req.body;

  const apiKey = process.env.eWYPytW1fBO4tmcMcWqoKA0SpUVlUZQ71CS5Dd4c8vmyOiQH9dFUFcI6A1hF;
  const url = "https://www.fast2sms.com/dev/bulkV2";

  const headers = {
    authorization: apiKey,
    "Content-Type": "application/json",
  };

  const data = {
    route: "q",
    message: message || "📢 Emergency Alert! Please respond immediately.",
    language: "english",
    numbers: number,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("📤 SMS API Result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

module.exports = router;
