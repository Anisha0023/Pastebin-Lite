import { viewPasteHtml } from "../../src/controllers/pasteController.js";


export default async function handler(req, res) {
    try {
    const html = await viewPasteHtml(req);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch {
    res.status(404).send('Not Found');
  }
}
