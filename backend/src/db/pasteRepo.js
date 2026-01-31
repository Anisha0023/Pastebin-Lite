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

async function incrementView(id) {
  const viewKey = key(`${id}:views`);
  const exists = await kv.exists(viewKey);
  if (!exists) return false;

  await kv.incr(viewKey);
  return true;
}

module.exports = {
  createPaste,
  getPasteById,
  incrementView
};
