import { getPasteById } from '../../src/controllers/pasteController.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    return getPasteById(req, res, id);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
