const User = require('../models/User');

exports.addUser = async (req, res) => {
    try {
        const { firstName, lastName, birthdate, email, phone } = req.body;
        const user = new User({ firstName, lastName, birthdate, email, phone });
        await user.save();
        res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
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
