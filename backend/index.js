require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Load database connection
require('./conn');

const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));

// Routes
const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.use('/api/user', UserRoutes);
app.use('/api/resume', ResumeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
    console.log(`✅ Backend is running on port ${PORT}`);
});
