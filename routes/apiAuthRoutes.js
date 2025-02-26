const express = require("express");
const { signup, login, regenerateApiKey, getApiKey, deleteApiUser, changePassword } = require('../controllers/apiUserController');

const router = express.Router();

router.post('/signup', signup);
router.post("/login", login);
router.post("/regenerate-key", regenerateApiKey);
router.post("/get-key", getApiKey);
router.post("/delete", deleteApiUser);
router.post("/change-password", changePassword);

module.exports = router;