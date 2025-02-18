require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('./cron/birthdayCron'); // Start cron job

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', userRoutes);

// New route to manually trigger birthday messages
app.get('/run-birthday-check', checkAndSendBirthdayMessages);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
