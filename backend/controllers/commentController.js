const Comment = require("../routes/commentRoute.js");

// Add Comment
exports.addComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            event: req.params.eventId,
            user: req.user.id,
            text: req.body.text
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Comments of an Event
exports.getEventComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            event: req.params.eventId
        })
            .populate("user", "username profilepic")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
