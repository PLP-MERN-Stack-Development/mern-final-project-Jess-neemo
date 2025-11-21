// models/Resource.js
import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['hotline', 'safe-house', 'legal'], required: true },
  contact: { type: String, required: true },
  location: String
});

export default mongoose.model('Resource', ResourceSchema);