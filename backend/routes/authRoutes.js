const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');

// Logout route
router.post('/logout', auth, async (req, res) => {
    try {
        // You might want to handle token invalidation here
        // For now, we'll just send a success response since the frontend handles token removal
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error during logout' 
        });
    }
});

module.exports = router;