const AdminService = require('../service/adminService');

class DashboardController {
  static async getDashboardStats(req, res) {
    try {
      const stats = await AdminService.getDashboardStats();
      res.status(200).json({
        success: true,
        data: stats,
        message: 'Dashboard stats fetched successfully'
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch dashboard statistics'
      });
    }
  }

  static async getRecentActivities(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const activities = await AdminService.getRecentActivities(limit);
      res.status(200).json({
        success: true,
        data: activities,
        message: 'Recent activities fetched successfully'
      });
    } catch (error) {
      console.error('Recent activities error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch recent activities'
      });
    }
  }

  static async getMonthlyStats(req, res) {
    try {
      const stats = await AdminService.getMonthlyStats();
      res.status(200).json({
        success: true,
        data: stats,
        message: 'Monthly stats fetched successfully'
      });
    } catch (error) {
      console.error('Monthly stats error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch monthly statistics'
      });
    }
  }

  static async getOrderStatusBreakdown(req, res) {
    try {
      const breakdown = await AdminService.getOrderStatusBreakdown();
      res.status(200).json({
        success: true,
        data: breakdown,
        message: 'Order status breakdown fetched successfully'
      });
    } catch (error) {
      console.error('Order status breakdown error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch order status breakdown'
      });
    }
  }

  static async getCategoryStats(req, res) {
    try {
      const stats = await AdminService.getCategoryStats();
      res.status(200).json({
        success: true,
        data: stats,
        message: 'Category stats fetched successfully'
      });
    } catch (error) {
      console.error('Category stats error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch category statistics'
      });
    }
  }

  static async getLowStockProducts(req, res) {
    try {
      const threshold = parseInt(req.query.threshold) || 10;
      const products = await AdminService.getLowStockProducts(threshold);
      res.status(200).json({
        success: true,
        data: products,
        message: 'Low stock products fetched successfully'
      });
    } catch (error) {
      console.error('Low stock products error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch low stock products'
      });
    }
  }

  static async getComprehensiveDashboard(req, res) {
    try {
      const [
        stats,
        monthlyStats,
        orderBreakdown,
        categoryStats,
        lowStockProducts,
        recentActivities
      ] = await Promise.all([
        AdminService.getDashboardStats(),
        AdminService.getMonthlyStats(),
        AdminService.getOrderStatusBreakdown(),
        AdminService.getCategoryStats(),
        AdminService.getLowStockProducts(5),
        AdminService.getRecentActivities(5)
      ]);

      res.status(200).json({
        success: true,
        data: {
          overview: stats,
          monthly: monthlyStats,
          orderBreakdown,
          categoryStats,
          lowStockProducts,
          recentActivities
        },
        message: 'Comprehensive dashboard data fetched successfully'
      });
    } catch (error) {
      console.error('Comprehensive dashboard error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch comprehensive dashboard data'
      });
    }
  }
}

module.exports = DashboardController;