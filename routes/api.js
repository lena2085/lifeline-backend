const express = require('express');
const router = express.Router();
const { triggerAlert, getAlerts } = require('../controllers/alertController');

router.post('/alert', triggerAlert);
router.get('/alerts/:userId', getAlerts);

module.exports = router;
