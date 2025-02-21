const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, maxlength: 50 },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    phone: { type: String, unique: true, maxlength: 15 },
    subscribed: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
