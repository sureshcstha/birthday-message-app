const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

exports.addUser = async (req, res) => {
    try {
        const { firstName, lastName, birthdate, email, phone } = req.body;

        // Check if email or phone number already exists
        const existingUser = await User.findOne({ 
            $or: [
                { email }, 
                { phone: { $ne: null, $ne: "", $eq: phone } } // Ignore null and empty phone values
            ] 
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email is already in use. Please use a different email.' });
            }
            if (existingUser.phone === phone) {
                return res.status(400).json({ error: 'Phone number is already in use. Please use a different phone number.' });
            }
        }

        const user = new User({ firstName, lastName, birthdate, email, phone });
        await user.save();

        // Send welcome email asynchronously
        sendWelcomeEmail(email, firstName);

        res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate entry detected. Please check your email and phone number.' });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, birthdate, email, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { firstName, lastName, birthdate, email, phone }, 
            { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.subscribeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { subscribed: true }, { new: true });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User subscribed successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unsubscribeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { subscribed: false }, { new: true });

        if (!user) {
            return res.redirect(`${process.env.REDIRECT_URL}/unsubscribe?status=not_found`);
        }

        res.redirect(`${process.env.REDIRECT_URL}/unsubscribe?status=success&id=${id}`);
    } catch (error) {
        res.redirect(`${process.env.REDIRECT_URL}/unsubscribe?status=error`);
    }
};
