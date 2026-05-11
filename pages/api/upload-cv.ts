import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/src/lib/mongodb';
import CV from '@/src/models/CV';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const adminKey = req.query?.adminKey || req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { fileData } = req.body as { fileData: string; fileName: string };
    if (!fileData) return res.status(400).json({ error: 'No file data provided' });

    await connectDB();
    // Upsert — always keep only one CV document
    await CV.findOneAndUpdate({}, { data: fileData, updatedAt: new Date() }, { upsert: true });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
