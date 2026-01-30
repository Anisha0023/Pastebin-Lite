import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    await kv.set('healthz', 'ok', { ex: 5 });
    res.status(200).json({ ok: true });
  } catch (er) {
      console.log(er)
    
    res.status(500).json({ ok: false });
  }
}
