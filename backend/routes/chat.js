
const express = require('express');
const Chat = require('../models/Chat');

const router = express.Router();

// Send message
router.post('/', async (req, res) => {
  const { sender, receiver, text } = req.body;
  try {
    let chat = await Chat.findOne({ sender, receiver });
    if (!chat) {
      chat = await Chat.create({ sender, receiver, messages: [{ text }] });
    } else {
      chat.messages.push({ text });
      await chat.save();
    }
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get chat messages
router.get('/:userId/:otherUserId', async (req, res) => {
  const { userId, otherUserId } = req.params;
  try {
    const chat = await Chat.findOne({ sender: userId, receiver: otherUserId });
    res.json(chat ? chat.messages : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
