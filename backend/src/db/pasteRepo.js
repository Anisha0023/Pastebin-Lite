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

  const current = await kv.get(viewKey);
  if (parseInt(current, 10) <= 0) return false;

  await kv.decr(viewKey);
  return true;
}

module.exports = {
  createPaste,
  getPasteById,
  incrementView
};
