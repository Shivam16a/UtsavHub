const Event = require("../models/Event");

// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    console.log("Req.body:", req.body);
    console.log("Req.file:", req.file);
    console.log("UserId:", req.session.userId);

    const { title, description, date, time, venue } = req.body;

    if (!title || !description || !date || !time || !venue) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (!req.session.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      venue,
      organizer: req.session.userId,
      bannerImage: req.file ? req.file.filename : undefined,
      shares: 0,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET ALL EVENTS
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "username profilepic") // correct field
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    console.error("Get All Events Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE EVENT
exports.getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "username profilepic");

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Add views only if you want to track, else remove
    const eventData = {
      ...event.toObject(),
      views: 0 // temporary
    };

    res.json(eventData);
  } catch (error) {
    console.error("Get Single Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET USER'S EVENTS =================
exports.getUserEvents = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const events = await Event.find({ organizer: req.session.userId }).sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE EVENT =================
exports.deleteEvent = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      organizer: req.session.userId,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found or not authorized" });
    }

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};
