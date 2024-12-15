const jwt = require('jsonwebtoken');

// Helper functions
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

module.exports = { generateAccessToken, generateRefreshToken };