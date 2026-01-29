const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a folder 'data' at root if not already created
const dbPath = path.join(__dirname, '../../data/pasteBin.db');

// Open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Database opening error:', err.message);
	} else {
		console.log('SQLite DB connected:', dbPath);
	}
});

// Create table if it doesn't exist
db.serialize(() => {
	db.run(
		`
    CREATE TABLE IF NOT EXISTS pastes (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      expires_at INTEGER,
      max_views INTEGER,
      views_used INTEGER DEFAULT 0
    )
  `,
		(err) => {
			if (err) console.error('Table creation failed:', err.message);
			else console.log("Table 'pastes' is ready ✅");
		},
	);
});

module.exports = db;
