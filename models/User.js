const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
