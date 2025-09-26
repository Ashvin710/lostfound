
const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Post item with image upload
router.post('/', upload.array('images', 4), async (req, res) => {
  const { title, description, category, location, date, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) throw error;
          imageUrls.push(result.secure_url);
        });
        result.end(file.buffer);
      }
    }

    const item = await Item.create({
      title,
      description,
      category,
      images: imageUrls,
      location,
      date,
      user: userId
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'name contact location');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
