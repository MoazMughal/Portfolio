import mongoose, { Schema, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: 'https://placehold.co/600x400' },
  tags: [String],
  github: { type: String, default: '#' },
  demo: { type: String, default: '#' },
  view: { type: String, default: '#' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Project || mongoose.model('Project', ProjectSchema);
