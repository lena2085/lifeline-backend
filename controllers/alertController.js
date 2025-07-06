const Alert = require('../models/alert');

const triggerAlert = async (req, res) => {
  try {
    
    const { userId, alertType, location } = req.body;
    console.log("Incoming request:", req.body);
    const alert = new Alert({
      userId: req.body.userId,
      alertType: req.body.alertType,
      location: req.body.location,
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
