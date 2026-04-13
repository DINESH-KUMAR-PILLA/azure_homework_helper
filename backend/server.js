require('dotenv').config();

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Initialize DB (creates tables on first run)
require('./config/db');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/api/review',    require('./routes/review'));
app.use('/api/articles',  require('./routes/articles'));
app.use('/api/videos',    require('./routes/videos'));
app.use('/api/whatsapp',  require('./routes/whatsapp'));
app.use('/api/history',   require('./routes/history'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Candidate Support API running on http://localhost:${PORT}`);
});
