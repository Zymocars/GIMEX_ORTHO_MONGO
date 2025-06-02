// ============= middleware/auth.js =============
const jwt = require('jsonwebtoken');
const User = require('../model/user.js'); // Using your path
const dotenv = require('dotenv');
dotenv.config();
const { defineSecret } = require("firebase-functions/params");
const jwtSecret = process.env.JWT_SECRET || defineSecret("JWT_SECRET").value();

const auth = async (req, res, next) => {
    let token;
    let decoded;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Bearer token

            // Verify token
            decoded = jwt.verify(token, jwtSecret); // verify token using secret key
            console.log('Decoded token:', decoded);
            
            // Set user info from token
            req.user = {
                id: decoded.id,
                isAdmin: decoded.isAdmin
            };
            console.log('user from jwt', req.user);

            next(); // Move next() inside try block
        }
        catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }
    else {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }
};

// Admin middleware that works with your token structure
const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
};

module.exports = { auth, adminMiddleware };

// Alternative: If you want to keep your original export style
// module.exports = auth;