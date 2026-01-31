import { viewPasteHtml } from "../../src/controllers/pasteController.js";
import { setCors } from "../../src/utils/cors.js";


export default async function handler(req, res) {
  setCors(res)
  const { id } = req.query;
  try {
    await viewPasteHtml(req, res,id);

  } catch {
    res.status(404).send('Not Found');
  }
}
