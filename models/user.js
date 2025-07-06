const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
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
