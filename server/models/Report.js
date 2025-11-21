// models/Report.js
import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  contactMethod: { type: String, enum: ['anonymous', 'email'], default: 'anonymous' },
  contactInfo: String,
  status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Report', ReportSchema);