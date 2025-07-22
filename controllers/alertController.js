const Alert = require('../models/alert');

// Trigger Alert
const triggerAlert = async (req, res) => {
  try {
    const { userId, alertType, location } = req.body;

    // Basic validation
    if (!userId || !alertType || !location) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create new alert
    const alert = new Alert({
      userId,
      alertType,
      location,
      triggeredAt: new Date(),
    });

    await alert.save();

    res.status(201).json({
      success: true,
      message: "Alert triggered successfully",
      alert,
    });
  } catch (err) {
    console.error("Trigger Alert Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to trigger alert",
      error: err.message,
    });
  }
};

// Get Alerts by User ID
const getAlerts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const alerts = await Alert.find({ userId }).sort({ triggeredAt: -1 });

    res.status(200).json({
      success: true,
      message: `Fetched ${alerts.length} alert(s)`,
      alerts,
    });
  } catch (err) {
    console.error("Get Alerts Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch alerts",
      error: err.message,
    });
  }
};

module.exports = { triggerAlert, getAlerts };
