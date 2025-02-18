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

app.listen(5000, () => console.log('Server running on port 5000'));
