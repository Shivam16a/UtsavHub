const Comment = require('../models/Comment.js');

// Add comment
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      event: req.params.eventId,
      user: req.session.userId,
      text: req.body.text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments of event
exports.getEventComments = async (req, res) => {
  try {
    const comments = await Comment.find({ event: req.params.eventId })
      .populate('user', 'username profilepic')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};