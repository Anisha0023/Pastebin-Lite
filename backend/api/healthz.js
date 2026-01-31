import { kv } from '@vercel/kv';
import { setCors } from '../src/utils/cors';


export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS"){
    return res.status(200).end()
  }
  try {
    await kv.set('healthz', 'ok', { ex: 5 });
    res.status(200).json({ ok: true });
  } catch (er) {
      console.log(er)
    
    res.status(500).json({ ok: false });
  }
}
