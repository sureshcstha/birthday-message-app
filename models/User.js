const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

// Function to sanitize inputs
const sanitizeInput = (input) => sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxlength: 50, set: sanitizeInput },
    lastName: { type: String, maxlength: 50, set: sanitizeInput },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true, unique: true, maxlength: 100, set: sanitizeInput },
    phone: { type: String, required: true, unique: true, maxlength: 15, set: sanitizeInput },
    subscribed: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
