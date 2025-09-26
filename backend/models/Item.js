const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Lost', 'Found'], required: true },
  images: [{ type: String }],
  location: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
