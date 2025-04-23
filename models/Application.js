const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
  company: String,
  role: String,
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
  },
  appliedDate: Date,
  link: String,
  userkey:String
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', applicationSchema, 'jobdata');
