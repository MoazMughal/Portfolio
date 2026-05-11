import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/src/lib/mongodb';
import Skill from '@/src/models/Skill';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const skills = await Skill.find().sort({ order: 1 });
    return res.status(200).json(skills);
  }

  const { adminKey } = req.body || req.query;
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const skill = await Skill.create(req.body);
    return res.status(201).json(skill);
  }

  if (req.method === 'PUT') {
    const { _id, ...data } = req.body;
    const skill = await Skill.findByIdAndUpdate(_id, data, { new: true });
    return res.status(200).json(skill);
  }

  if (req.method === 'DELETE') {
    await Skill.findByIdAndDelete(req.body._id);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
