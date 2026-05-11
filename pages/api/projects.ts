import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/src/lib/mongodb';
import Project from '@/src/models/Project';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json(projects);
  }

  const { adminKey } = req.body || req.query;
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  }

  if (req.method === 'PUT') {
    const { _id, adminKey: _key, ...data } = req.body;
    const project = await Project.findByIdAndUpdate(_id, data, { new: true });
    return res.status(200).json(project);
  }

  if (req.method === 'DELETE') {
    await Project.findByIdAndDelete(req.body._id);
    return res.status(200).json({ success: true });
  }

  // PATCH: bulk update order values [{ _id, order }, ...]
  if (req.method === 'PATCH') {
    const { items } = req.body as { items: { _id: string; order: number }[] };
    await Promise.all(items.map(({ _id, order }) => Project.findByIdAndUpdate(_id, { order })));
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
