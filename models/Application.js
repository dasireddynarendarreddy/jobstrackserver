const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
  },
  appliedDate: Date,
  link: String,
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', applicationSchema, 'jobdata');
