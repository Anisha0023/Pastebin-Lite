const express = require('express');
const router = express.Router();
const pasteController = require('../controllers/pasteController');

router.post('/', pasteController.createPaste);
router.get('/:id', pasteController.getPastById);
router.get('/p/:id', pasteController.viewPasteHtml);

module.exports = router;
