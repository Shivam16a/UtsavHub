const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware.js');
const upload = require("../middleware/multer.js");

// Register
// userRoute.js
router.post("/register", upload.single("profilepic"), userController.registerUser);


// Login
router.post('/login', userController.loginUser);

// Update Profile
router.put('/update', isAuthenticated, userController.updateProfile);

// Get My Profile
router.get('/me', isAuthenticated, userController.getMyProfile);

// Admin: Get All Users
router.get('/all', isAuthenticated, isAdmin, userController.getAllUsers);

// Admin: Delete User
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;
