const express = require('express');
const { addUser, updateUser, deleteUser, getAllUsers, subscribeUser, unsubscribeUser } = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/all', getAllUsers);
router.put('/subscribe/:id', subscribeUser);
router.put('/unsubscribe/:id', unsubscribeUser); 

module.exports = router;
