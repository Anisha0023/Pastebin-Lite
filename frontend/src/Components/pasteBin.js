import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

function Pastebin() {
	const [pasteContent, setPasteContent] = useState({
		content: '',
		ttl_seconds: null,
		max_views: null,
	});
	const [pasteId, setPasteId] = useState('');
	const [pasteData, setPasteData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleCreatePaste = async () => {
		if (!pasteContent.content.trim()) return;

		setLoading(true);
		setError('');

		try {
			const res = await axios.post(`${API_BASE}/pastes`, {
				content: pasteContent.content,
				ttl_seconds: Number(pasteContent.ttl_seconds),
				max_views: pasteContent.max_views
					? Number(pasteContent.max_views)
					: null,
			});

			setPasteId(res.data.id);
			setPasteData(null);
			setPasteContent({ content: '', ttl_seconds: null, max_views: null });
		} catch (err) {
			setError(err.response?.data?.errors || 'Failed to create paste.');
		}

		setLoading(false);
	};

	const handleFetchPaste = async () => {
		if (!pasteId.trim()) return;

		setLoading(true);
		setError('');

		try {
			const res = await axios.get(`${API_BASE}/pastes/${pasteId}`);
			setPasteData(res.data);
		} catch (err) {
			setPasteData(null);
			setError(err.response?.data?.error || 'Paste not found or expired.');
		}

		setLoading(false);
	};

	return (
		<div style={styles.container}>
			<h1>Pastebin Lite</h1>

			<div style={styles.box}>
				<h2>Create a Paste</h2>
				<textarea
					style={styles.textarea}
					value={pasteContent.content}
					onChange={(e) =>
						setPasteContent((prev) => ({ ...prev, content: e.target.value }))
					}
					placeholder="Enter your text here..."
				/>

				<div style={styles.inputGroup}>
					<input
						type="number"
						min="1"
						style={styles.input}
						value={pasteContent.ttl_seconds}
						onChange={(e) =>
							setPasteContent((prev) => ({
								...prev,
								ttl_seconds: e.target.value,
							}))
						}
						placeholder="TTL (seconds)"
					/>
					<input
						type="number"
						min="1"
						style={styles.input}
						value={pasteContent.max_views}
						onChange={(e) =>
							setPasteContent((prev) => ({
								...prev,
								max_views: e.target.value,
							}))
						}
						placeholder="Max Views"
					/>
				</div>

				<button
					style={styles.button}
					onClick={handleCreatePaste}
					disabled={loading}>
					{loading ? 'Creating...' : 'Create Paste'}
				</button>

				{pasteId && (
					<p>
						Your Paste ID: <strong>{pasteId}</strong>
					</p>
				)}
			</div>

			<div style={styles.box}>
				<h2>View a Paste</h2>
				<input
					style={styles.input}
					value={pasteId}
					onChange={(e) => setPasteId(e.target.value)}
					placeholder="Enter Paste ID"
				/>
				<button
					style={styles.button}
					onClick={handleFetchPaste}
					disabled={loading}>
					{loading ? 'Loading...' : 'Fetch Paste'}
				</button>

				{error && <p style={{ color: 'red' }}>{error}</p>}

				{pasteData && (
					<div style={styles.pasteBox}>
						<p>{pasteData.content}</p>
						{pasteData.remaining_views !== null && (
							<p>Remaining Views: {pasteData.remaining_views}</p>
						)}
						{pasteData.expires_at && (
							<p>
								Expires At: {new Date(pasteData.expires_at).toLocaleString()}
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

const styles = {
	container: {
		maxWidth: '600px',
		margin: '2rem auto',
		fontFamily: 'Arial, sans-serif',
	},
	box: {
		background: '#fff',
		padding: '1rem',
		marginBottom: '2rem',
		borderRadius: '8px',
		boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
	},
	textarea: {
		width: '100%',
		height: '100px',
		padding: '8px',
		marginBottom: '8px',
		borderRadius: '4px',
		border: '1px solid #ccc',
		fontFamily: 'inherit',
	},
	inputGroup: {
		display: 'flex',
		gap: '8px',
		marginBottom: '8px',
	},
	input: {
		flex: 1,
		padding: '8px',
		borderRadius: '4px',
		border: '1px solid #ccc',
	},
	button: {
		padding: '8px 16px',
		borderRadius: '4px',
		border: 'none',
		background: '#007bff',
		color: '#fff',
		cursor: 'pointer',
	},
	pasteBox: {
		marginTop: '1rem',
		background: '#f8f9fa',
		padding: '10px',
		borderRadius: '4px',
	},
};

export default Pastebin;
