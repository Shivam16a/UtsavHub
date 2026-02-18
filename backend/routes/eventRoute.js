const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');
const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getUserEvents,
  deleteEvent,
  searchEvents,
} = require('../controllers/eventController.js');

router.get('/my', getUserEvents); // GET /api/events/my

router.get('/search',searchEvents);
router.post('/create', upload.single('banner'), createEvent);
router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);
router.delete('/delete/:id', deleteEvent);


module.exports = router;