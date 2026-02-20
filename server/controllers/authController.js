const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1) Check if username and password exist
        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Please provide username and password' });
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ username }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({ success: false, error: 'Incorrect username or password' });
        }

        // 3) If everything ok, send token to client
        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            token,
            data: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, error: 'You are not logged in' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ success: false, error: 'The user no longer exists' });
        }

        // Grant access
        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};
