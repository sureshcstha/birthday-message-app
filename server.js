require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const apiAuthRoutes = require('./routes/apiAuthRoutes'); 
// require('./cron/birthdayCron'); // Start cron job
const { checkAndSendBirthdayMessages } = require('./cron/birthdayCron');

const app = express();

const allowedOrigins = ["https://birthdaymails.netlify.app"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("Hi, I am live.")
});

// Routes
app.use('/users', userRoutes);
app.use("/api/auth", apiAuthRoutes);

// New route to manually trigger birthday messages
app.get('/run-birthday-check', checkAndSendBirthdayMessages);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
