import * as pasteService from '../services/pasteService.js';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function createPaste(req) {
  const { content, max_views, ttl_seconds } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    throw { status: 400, message: 'Content is required' };
  }
  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    throw { status: 400, message: 'ttl_seconds must be >= 1' };
  }
  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    throw { status: 400, message: 'max_views must be >= 1' };
  }

  return await pasteService.createPaste({
    content,
    ttl_seconds,
    max_views,
    req
  });
}

export async function getPasteById(req, res, id) {
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const paste = await pasteService.getPasteById(id);

  if (!paste) {
    return res.status(404).json({ error: 'Paste not found' });
  }

  return res.status(200).json(paste);
}


export async function viewPasteHtml(req, res, id) {
 
  const data = await pasteService.getPasteById(id);

  if (!data) {
    return res.status(404).send('Paste not found');
  }

  res.send(`
<!DOCTYPE html>
<html>
<head><title>PasteBin</title></head>
<body>
<pre>${escapeHtml(data.content)}</pre>
</body>
</html>
  `);
}

