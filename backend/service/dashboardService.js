const Product = require('../models/Product'); // Adjust path based on your structure
const Order = require('../models/Order');
const User = require('../models/User');

class DashboardService {
  // Get total products count
  async getTotalProducts() {
    try {
      const count = await Product.countDocuments();
      return count;
    } catch (error) {
      throw new Error(`Error fetching products count: ${error.message}`);
    }
  }

  // Get total orders count
  async getTotalOrders() {
    try {
      const count = await Order.countDocuments();
      return count;
    } catch (error) {
      throw new Error(`Error fetching orders count: ${error.message}`);
    }
  }

  // Get total users count
  async getTotalUsers() {
    try {
      const count = await User.countDocuments();
      return count;
    } catch (error) {
      throw new Error(`Error fetching users count: ${error.message}`);
    }
  }

  // Get ongoing orders count
  async getOngoingOrders() {
    try {
      // Assuming you have status field in Order model
      // Adjust the status values based on your database schema
      const count = await Order.countDocuments({
        status: { $in: ['pending', 'processing', 'shipped', 'ongoing'] }
      });
      return count;
    } catch (error) {
      throw new Error(`Error fetching ongoing orders count: ${error.message}`);
    }
  }

  // Get all dashboard stats in one call
  async getAllDashboardStats() {
    try {
      const [totalProducts, totalOrders, totalUsers, ongoingOrders] = await Promise.all([
        this.getTotalProducts(),
        this.getTotalOrders(),
        this.getTotalUsers(),
        this.getOngoingOrders()
      ]);

      return {
        totalProducts,
        totalOrders,
        totalUsers,
        ongoingOrders,
        lastUpdated: new Date()
      };
    } catch (error) {
      throw new Error(`Error fetching dashboard stats: ${error.message}`);
    }
  }

  // Get recent activities (optional)
  async getRecentActivities(limit = 10) {
    try {
      const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('user', 'name email')
        .select('_id status total createdAt');

      const recentUsers = await User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email createdAt');

      return {
        recentOrders,
        recentUsers
      };
    } catch (error) {
      throw new Error(`Error fetching recent activities: ${error.message}`);
    }
  }

  // Get sales analytics (optional)
  async getSalesAnalytics() {
    try {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      
      const salesThisMonth = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: lastMonth },
            status: { $in: ['completed', 'delivered'] }
          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$total' },
            orderCount: { $sum: 1 }
          }
        }
      ]);

      return salesThisMonth[0] || { totalSales: 0, orderCount: 0 };
    } catch (error) {
      throw new Error(`Error fetching sales analytics: ${error.message}`);
    }
  }
}

module.exports = new DashboardService();