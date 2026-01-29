const service = require('../services/pasteService');

async function createPaste(req, res) {
	const { content, max_views, ttl_seconds } = req.body;

	if (!content || typeof content !== 'string' || content.trim().length === 0) {
		return res.status(400).json({ error: 'Content is required' });
	}
	if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
		return res.status(400).json({ error: 'ttl_seconds must be >= 1' });
	}
	if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
		return res.status(400).json({ error: 'max_views must be >= 1' });
	}
	try {
		const { id } = await service.createPaste({
			content,
			ttl_seconds,
			max_views,
		});

		const url = `${req.protocol}://${req.get('host')}/p/${id}`;
		res.status(201).json({ id, url });
	} catch (ex) {
		res.status(500).json({ error: 'Server error' }, ex);
		console.log(ex);
	}
}

function escapeHtml(str) {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function getPastById(req, res) {
	try {
		const { id } = req.params;
		const getData = await service.getPasteById(id);
		if (!getData) {
			return res.status(400).json({ error: 'Data is not found' });
		}
		res.status(200).json(getData);
	} catch (err) {
		res.status(500).json({ error: 'error while fetching the data by id' });
	}
}

async function viewPasteHtml(req, res) {
	const { id } = req.params;
	try {
		const pastesData = await service.getPasteById(id, req);
		if (!pastesData) {
			return res.status(404).send('Not found');
		}
		res.status(200).send(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<title>PasteBin</title>
			</head>
			<body>
			<prev>${escapeHtml(pastesData.content)}</prev>
			</body>
			</html>
			`);
	} catch (ex) {
		res.status(500).send('Server Error');
		console.log(ex);
	}
}

module.exports = { createPaste, getPastById, viewPasteHtml };
