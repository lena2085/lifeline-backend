const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  emergencyContacts: [String],
  vaultData: {
    allergies: String,
    bloodType: String,
    medicalHistory: String,
    iceContact: String,
    idProofs: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
