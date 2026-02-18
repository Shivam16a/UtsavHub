const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Databse connected successfully');
    } catch (error) {
        console.log('Database connected Faile:',error);
        process.exit(1);
    }
};

module.exports = connectDB;