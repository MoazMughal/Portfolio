import mongoose, { Schema } from 'mongoose';

const CVSchema = new Schema({
  data: { type: String, required: true }, // base64 PDF
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.CV || mongoose.model('CV', CVSchema);
