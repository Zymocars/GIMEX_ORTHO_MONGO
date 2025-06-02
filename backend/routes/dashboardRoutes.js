// ============= routes/dashboardRoutes.js =============
const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/dashboardController');
const { auth, adminMiddleware } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth, adminMiddleware);

// Main dashboard stats route
router.get('/stats', DashboardController.getDashboardStats);

// Recent activities route
router.get('/activities', DashboardController.getRecentActivities);

// Monthly stats route
router.get('/monthly', DashboardController.getMonthlyStats);

// Order status breakdown
router.get('/orders/breakdown', DashboardController.getOrderStatusBreakdown);

// Category statistics
router.get('/categories', DashboardController.getCategoryStats);

// Low stock products
router.get('/products/low-stock', DashboardController.getLowStockProducts);

// Comprehensive dashboard data (all in one)
router.get('/comprehensive', DashboardController.getComprehensiveDashboard);

module.exports = router;

// ============= Alternative: If you prefer using your original auth directly =============
/*
const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth'); // Your original auth

// Custom admin check middleware for your token structure
const adminCheck = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
};

// Apply middleware to all routes
router.use(auth, adminCheck);

// Your routes here...
router.get('/stats', DashboardController.getDashboardStats);
// ... other routes

module.exports = router;
*/