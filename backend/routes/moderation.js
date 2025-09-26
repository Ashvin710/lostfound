
const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');

const router = express.Router();

// Report item
router.post('/report', async (req, res) => {
  const { itemId, reason, userId } = req.body;
  // For simplicity, just add a 'reported' field to item
  try {
    const item = await Item.findByIdAndUpdate(itemId, { $set: { reported: true, reportReason: reason, reportedBy: userId } }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get reported items
router.get('/reported', async (req, res) => {
  try {
    const items = await Item.find({ reported: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: resolve report
router.patch('/resolve/:itemId', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId, { $set: { reported: false, reportReason: '', reportedBy: null } }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
