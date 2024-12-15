// # Routes for authentication (register, login, etc.)
const { Router } = require("express");
const { User } = require("../config/db");
const { generateAccessToken, generateRefreshToken } = require('../utils/authUtils');
const bcrypt = require('bcryptjs');


const router = Router();

// In-memory storage for refresh tokens (use a database in production)
const refreshTokens = [];

// Routes

// Register route
router.post('/api/register', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // User.create({
        //     username,
        //     password: hashedPassword
        // });

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        res.status(500).json({ message: 'Internal server error.' });
    }

});

// Login route

router.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        refreshTokens.push(refreshToken); // Store refresh token

        res.status(200).json({ 'message': 'success', username, accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' })
    }
});

module.exports = router