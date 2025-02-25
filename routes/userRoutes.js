const express = require('express');
const { addUser, updateUser, deleteUser, getAllUsers, subscribeUser, unsubscribeUser } = require('../controllers/userController');

const router = express.Router();
const authenticateApiKey = require("../middleware/authenticateApiKey");

// Apply authentication middleware to all routes
// router.use(authenticateApiKey);

router.post('/add', authenticateApiKey, addUser);
router.put('/update/:id', authenticateApiKey, updateUser);
router.delete('/delete/:id', authenticateApiKey, deleteUser);
router.get('/all', authenticateApiKey, getAllUsers);
router.put('/subscribe/:id', authenticateApiKey, subscribeUser);
router.put('/unsubscribe/:id', authenticateApiKey, unsubscribeUser); 
router.get('/unsubscribe/:id', unsubscribeUser); 

module.exports = router;
