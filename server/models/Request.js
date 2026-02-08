const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  description: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'done'],
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
