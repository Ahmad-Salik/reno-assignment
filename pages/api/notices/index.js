import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const notices = await prisma.notice.findMany({
      orderBy: [{ priority: 'desc' }, { publishDate: 'desc' }]
    });
    return res.status(200).json(notices);
  }

  if (req.method === 'POST') {
    const { title, body, category, priority, publishDate, image } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!body || typeof body !== 'string' || !body.trim()) {
      return res.status(400).json({ message: 'Body is required' });
    }
    if (!publishDate) {
      return res.status(400).json({ message: 'Publish date is required' });
    }
    const date = new Date(publishDate);
    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Publish date is invalid' });
    }

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        category: category || 'General',
        priority: priority || 'Normal',
        publishDate: date,
        image: image || null
      }
    });

    return res.status(201).json(notice);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
