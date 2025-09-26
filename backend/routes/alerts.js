
const express = require('express');
const Alert = require('../models/Alert');

const router = express.Router();

// Create alert
router.post('/', async (req, res) => {
  const { user, item, matchInfo } = req.body;
  try {
    const alert = await Alert.create({ user, item, matchInfo });
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get alerts for user
router.get('/:userId', async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.params.userId });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark alert as read
router.patch('/:alertId/read', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.alertId, { read: true }, { new: true });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
