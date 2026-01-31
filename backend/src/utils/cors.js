export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); 
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
