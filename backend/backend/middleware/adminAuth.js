const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        // Check if token exists
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided'
            });
        }

        // Verify token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log('Admin check for user:', decoded);

        // Check if user is admin
        if (!decoded.isAdmin) {
            console.log('Non-admin access attempt:', decoded.id);
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        // Set admin user in request
        req.user = {
            id: decoded.id,
            isAdmin: decoded.isAdmin
        };

        console.log('Admin access granted for:', decoded.id);
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = adminAuth;