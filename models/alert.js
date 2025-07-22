const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' },
  alertType: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number
  },
  triggeredAt: {
    type: Date,
    default: Date.now,
  },
  isResolved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
