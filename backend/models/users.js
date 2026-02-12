const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    prn: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    profilepic: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    description: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
    ,
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

