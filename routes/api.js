const express = require('express');
const router = express.Router();
const { triggerAlert, getAlerts } = require('../controllers/alertController');

router.post('/alerts', triggerAlert);
router.get('/alerts/:userId', getAlerts);

module.exports = router;
