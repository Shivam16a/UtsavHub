const Registration = require("../models/registrationModel.js");
const Event = require("../models/Event.js");
const User = require("../models/users.js");


//  Register for Event
exports.registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id; // assuming auth middleware sets req.user

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check duplicate registration
        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        const registration = await Registration.create({
            user: userId,
            event: eventId
        });

        res.status(201).json({
            message: "Successfully registered",
            registration
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Get All Registrations of Logged-in User
exports.getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user.id;

        const registrations = await Registration.find({ user: userId })
            .populate("event");

        res.status(200).json(registrations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Get All Registrations for an Event (Admin / Organizer)
exports.getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        const registrations = await Registration.find({ event: eventId })
            .populate("user", "-password");

        res.status(200).json(registrations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Cancel Registration
exports.cancelRegistration = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        const registration = await Registration.findOneAndDelete({
            user: userId,
            event: eventId
        });

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json({ message: "Registration cancelled successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
