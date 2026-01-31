export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "https://pastebin-lite-seven-sepia.vercel.app/"); 
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
