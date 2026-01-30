const { kv } = require('@vercel/kv');

function key(id) {
  return `paste:${id}`;
}

async function createPaste(paste) {
  await kv.set(key(paste.id), paste);
}

async function getPasteById(id) {
  return await kv.get(key(id));
}

/**
 * Atomic view increment
 * Returns true if incremented, false if not found
 */
async function incrementView(id) {
  const exists = await kv.exists(key(id));
  if (!exists) return false;

  await kv.hincrby(key(id), 'views_used', 1);
  return true;
}

module.exports = {
  createPaste,
  getPasteById,
  incrementView
};
