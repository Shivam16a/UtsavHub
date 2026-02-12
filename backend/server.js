const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/DB.js');
const session = require('express-session');
const userRoute = require('./routes/userRoute.js');


dotenv.config();
const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/api/users', userRoute);


const PORT = process.env.PORT || 5052;
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
    connectDB();
})