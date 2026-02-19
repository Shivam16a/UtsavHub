const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/DB.js');
const session = require('express-session');
const userRoute = require('./routes/userRoute.js');
const eventRoutes = require('./routes/eventRoute.js');
const commentRoutes = require('./routes/commentRoute.js');
const enentRegisterRoute = require('./routes/registrationRoutes.js');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/api/users', userRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/events', eventRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/eventregister',enentRegisterRoute);



const PORT = process.env.PORT || 5650;
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
    connectDB();
});