import { getPasteById } from '../../backend/src/controllers/pasteController.js';
import { setCors } from '../../backend/src/utils/cors.js';

export default async function handler(req, res) {
  setCors(res)
  const { id } = req.query;

  if (req.method === 'GET') {
    return getPasteById(req, res, id);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
