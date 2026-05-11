import mongoose, { Schema, models } from 'mongoose';

const SkillSchema = new Schema({
  category: { type: String, required: true },
  skills: [String],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Skill || mongoose.model('Skill', SkillSchema);
