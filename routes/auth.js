// # Routes for authentication (register, login, etc.)
const { Router } = require("express");
const { User } = require("../config/db");
const bcrypt = require('bcryptjs');

const router = Router();

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
    try { } catch (err) {
        res.status(500).json({ message: 'Internal server error.' })
    }
});

module.exports = router