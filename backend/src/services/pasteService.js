const { v4: uuidv4 } = require('uuid');
const repo = require('../db/pasteRepo');
const { nowMs } = require('../utils/time');

async function createPaste({ content, ttl_seconds, max_views }) {
  const id = uuidv4().slice(0, 8);
  const created_at = Date.now();
  const expires_at = ttl_seconds ? created_at + ttl_seconds * 1000 : null;

  const data = {
    id,
    content,
    created_at,
    expires_at,
    max_views: max_views ?? null,
    views_used: 0
  };

  await repo.createPaste(data);
  return { id };
}

// async function getPasteById(id, req) {
//   const data = await repo.getPasteById(id);
//   if (!data) return null;

//   const now = nowMs(req);

//   // 1️⃣ Expiry check
//   if (data.expires_at && now >= data.expires_at) {
//     return null;
//   }

//   // 2️⃣ View limit check
//   if (data.max_views !== null && data.views_used >= data.max_views) {
//     return null;
//   }

//   // 3️⃣ Increment view count (ID REQUIRED)
//   const updated = await repo.incrementView(id);
//   if (!updated) return null; // safety

//   return {
//     content: data.content,
//     remaining_views:
//       data.max_views !== null
//         ? data.max_views - (data.views_used + 1)
//         : null,
//     expires_at: data.expires_at
//       ? new Date(data.expires_at).toISOString()
//       : null
//   };
// }

// pasteService.js
 async function getPasteById(id, req) {
   const data = await repo.getPasteById(id);
  if (!data) return null;

  const now = nowMs(req);

  if (data.expires_at && now >= data.expires_at) return null;
  if (data.max_views !== null && data.views_used >= data.max_views) return null;

  await repo.incrementView(id);

  return {
    content: data.content,
    remaining_views: data.max_views !== null
      ? data.max_views - (data.views_used + 1)
      : null,
    expires_at: data.expires_at ? new Date(data.expires_at).toISOString() : null
  };
}
module.exports = { createPaste,getPasteById };
