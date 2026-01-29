//imports
const express = require('express');
const cors = require('cors');
require('./db');

//route
const healthRoute = require('./routes/health');
const pasteRoute = require('./routes/pastes');

const app = express();

app.use(cors());
app.use(express.json());

//api
app.use('/api/healthz', healthRoute);
app.use('/api/pastes', pasteRoute);

module.exports = app;
