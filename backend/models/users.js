const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    prn:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    profilepic:{
        type:String
    },
    gender:{
        type:String,
        enum:["male","female"],
    },
    discriptin:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
},{timeseries:true});

module.exports = mongoose.model('User',userSchema);

