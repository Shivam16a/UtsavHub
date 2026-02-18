const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController.js');
const { isAuthenticated } = require('../middleware/authMiddleware.js');

// Register
router.post('/register', isAuthenticated, registrationController.registerForEvent);

// My registrations
router.get('/my-registrations', isAuthenticated, registrationController.getMyRegistrations);

// Event registrations (admin/organizer)
router.get('/event/:eventId', isAuthenticated, registrationController.getEventRegistrations);

// Cancel registration
router.delete('/cancel/:eventId', isAuthenticated, registrationController.cancelRegistration);

module.exports = router;
