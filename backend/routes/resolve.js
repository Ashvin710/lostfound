
const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Mark item as resolved
router.patch('/:itemId', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId, { status: 'Resolved' }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Archive resolved items
router.get('/archive', async (req, res) => {
  try {
    const items = await Item.find({ status: 'Resolved' });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
