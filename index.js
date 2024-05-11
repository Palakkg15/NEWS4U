require('dotenv').config()
// Require necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to your application!');
});

// Route to handle saving user's location
app.post('/signup', async (req, res) => {
    const { fullName, email, password, dob, gender } = req.body;

    try {
        // Create a new user object
        const newUser = new User({
            fullName,
            email,
            password, // Remember to hash the password before saving to the database for security
            dob,
            gender
        });

        // Save the user to MongoDB
        const savedUser = await newUser.save();

        // Redirect the user to the new page upon successful signup
        res.redirect('location.html');
    } catch (error) {
        console.error('Error in user signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
