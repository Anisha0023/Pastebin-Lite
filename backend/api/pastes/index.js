const { createPaste } = require('../../src/controllers/pasteController');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await createPaste(req);

    const url = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/p/${result.id}`;
    res.status(201).json({ id: result.id, url });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
  }
};
