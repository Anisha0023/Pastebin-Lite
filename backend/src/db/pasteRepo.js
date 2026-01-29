const db = require('./index');

async function createPaste(paste) {
	const { id, content, created_at, expires_at, max_views } = paste;

	const sql = `
    INSERT INTO pastes (id, content, created_at, expires_at, max_views,views_used)
    VALUES (?, ?, ?, ?, ?,0)
  `;

	await db.run(sql, [id, content, created_at, expires_at, max_views]);
}

async function incrementView(id) {
	await db.run(
		`update pastes set view_used=view_used+1 
		where id=?`,
		id,
	);
}

async function getPasteById(id) {
	return new Promise((resolve, reject) => {
		db.get('SELECT * FROM pastes WHERE id = ?', [id], (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
}

module.exports = { createPaste, getPasteById, incrementView };
