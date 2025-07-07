const Alert = require('../models/alert');

const triggerAlert = async (req, res) => {
  try {
    
    const { userId, alertType, location } = req.body;
    console.log("Incoming request:", req.body);
    if (!userId || !alertType || !location) {
  return res.status(400).json({ error: "Missing required fields" });
}

    const alert = new Alert({
  userId,
  alertType,
  location,
  triggeredAt: new Date(),
});


    await alert.save();
    res.status(201).json({ message: 'Alert triggered', alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAlerts = async (req, res) => {
  try {
    const { userId } = req.params;
    const alerts = await Alert.find({ userId });
    res.status(200).json(alerts);
  } catch (err) {
    console.error("Error saving alert:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { triggerAlert, getAlerts };
