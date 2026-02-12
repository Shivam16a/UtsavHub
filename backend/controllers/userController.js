const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// ================= REGISTER =================
// Register user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, prn, phone, password, gender, description } = req.body;

        let profilepic = null;
        if (req.file) {
            profilepic = req.file.filename; // ya req.file.path
        }

        const existingUser = await User.findOne({ prn });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this PRN" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            prn,
            phone,
            gender,
            description,
            profilepic,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= LOGIN =================
exports.loginUser = async (req, res) => {
    try {
        const { prn, password } = req.body;

        const user = await User.findOne({ prn }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Save user in session
        req.session.userId = user._id;
        req.session.isAdmin = user.role === "admin";

        const userObj = user.toObject();
        delete userObj.password;

        res.json({
            message: "Login successful",
            user: userObj
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.session.userId;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        );

        res.json({
            message: "Profile updated successfully",
            updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET PERSONAL USER =================
exports.getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select("-password");

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET ALL USERS (ADMIN) =================
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= DELETE USER (ADMIN) =================
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
