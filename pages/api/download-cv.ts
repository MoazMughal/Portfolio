import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/src/lib/mongodb';
import CV from '@/src/models/CV';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await connectDB();
    const cv = await CV.findOne().sort({ updatedAt: -1 });

    if (!cv) return res.status(404).json({ error: 'CV not uploaded yet' });

    const base64 = cv.data.replace(/^data:application\/pdf;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Moaz_Javed_CV.pdf"');
    res.send(buffer);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
