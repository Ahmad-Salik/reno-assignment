import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Notice id is required' });
  }

  if (req.method === 'GET') {
    const notice = await prisma.notice.findUnique({ where: { id: Number(id) } });
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    return res.status(200).json(notice);
  }

  if (req.method === 'PUT') {
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

    const existingNotice = await prisma.notice.findUnique({ where: { id: Number(id) } });
    if (!existingNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const updatedNotice = await prisma.notice.update({
      where: { id: Number(id) },
      data: {
        title: title.trim(),
        body: body.trim(),
        category: category || 'General',
        priority: priority || 'Normal',
        publishDate: date,
        image: image || null
      }
    });

    return res.status(200).json(updatedNotice);
  }

  if (req.method === 'DELETE') {
    const existingNotice = await prisma.notice.findUnique({ where: { id: Number(id) } });
    if (!existingNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await prisma.notice.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
