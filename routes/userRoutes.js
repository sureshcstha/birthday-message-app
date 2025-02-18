const express = require('express');
const { addUser, updateUser, deleteUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/all', getAllUsers);

module.exports = router;
