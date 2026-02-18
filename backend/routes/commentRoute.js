const express = require('express');
const router = express.Router();
const {
  addComment,
  getEventComments,
} = require('../controllers/commentController.js');

router.post('/:eventId', addComment);
router.get('/:eventId', getEventComments);

module.exports = router;