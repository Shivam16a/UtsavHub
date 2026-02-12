const Event = require("../models/Event.js");

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            organizer: req.user.id   // assuming auth middleware
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("organizer", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("organizer", "username email");

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Share Event
exports.shareEvent = async (req, res) => {
    try {
        await Event.findByIdAndUpdate(req.params.id, {
            $inc: { shares: 1 }
        });

        res.status(200).json({ message: "Event shared successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
