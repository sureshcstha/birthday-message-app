const express = require('express');
const { addUser, updateUser, deleteUser, getAllUsers, subscribeUser, unsubscribeUser } = require('../controllers/userController');

const router = express.Router();
const authenticateApiKey = require("../middleware/authenticateApiKey");
const authorize = require("../middleware/authorize");

// Apply authentication middleware to all routes
router.post("/add", authenticateApiKey, authorize(["admin", "superadmin"]), addUser);
router.put("/update/:id", authenticateApiKey, authorize(["superadmin"]), updateUser);
router.delete("/delete/:id", authenticateApiKey, authorize(["superadmin"]), deleteUser);
router.get("/all", authenticateApiKey, authorize(["superadmin"]), getAllUsers);
router.put("/subscribe/:id", authenticateApiKey, authorize(["admin", "superadmin"]), subscribeUser);
router.put("/unsubscribe/:id", authenticateApiKey, authorize(["admin", "superadmin"]), unsubscribeUser);

// Public route
router.get("/unsubscribe/:id", unsubscribeUser); 

module.exports = router;
