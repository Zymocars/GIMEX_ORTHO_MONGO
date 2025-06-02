const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

// Add new product service
const addProduct = async (productData) => {
    try {
        console.log('Adding new product:', productData);
        const product = await Product.create(productData);
        console.log('Product added successfully:', product);
        return product;
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error(error.message);
    }
};

// Update product service
const updateProduct = async (productId, updateData) => {
    try {
        console.log('Updating product:', productId);
        const product = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!product) {
            throw new Error('Product not found');
        }
        console.log('Product updated successfully:', product);
        return product;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error(error.message);
    }
};

// Get product by ID
const getProductById = async (productId) => {
    try {
        console.log('Fetching product by ID:', productId);
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        console.log('Product found:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error(error.message);
    }
};

// Delete product
const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        console.log('Product deleted successfully');
        return product;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(error.message);
    }
};

// Get all products with pagination and filters
const getAllProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error(error.message);
    }
};

// Get all users
const getAllUsers = async () => {
  try {
    console.log('Fetching all users');
    const users = await User.find({ status: 'Active', role: 'User' })
        .select('-password')
        .sort({ createdAt: -1 })
        .then(users => {
          console.log(`Found ${users.length} users`);
          return users;
        });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
};

// Get all orders
const getAllOrders = async (statusFilter) => {
  try {
    console.log('Fetching all orders', statusFilter ? `with status ${statusFilter}` : '');
    let query = Order.find();
    if (statusFilter) {
      if (statusFilter === 'ongoing') {
        query = query.where('status').in(['Processing', "Shipped"]);
      } else if (statusFilter !== 'All') {
        query = query.where('status').equals(statusFilter);
      }
    }
    const orders = await query
        .sort({ orderDate: -1 })
        .populate('userId', 'name email')
        .populate('products.productId', 'name price')
        .then(orders => {
          console.log(`Found ${orders.length} orders`);
          return orders;
        });
    return orders;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw new Error('Error fetching orders');
  }
};

// Methods from dashboardService.js
const getDashboardStats = async () => {
  try {
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      ongoingOrders
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      User.countDocuments({ status: 'Active', role: 'User' }).then(count => {
        console.log('Total Active Users with role User:', count);
        return count;
      }),
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ['Processing', 'Shipped'] } })
    ]);
    return { totalProducts, totalUsers, totalOrders, ongoingOrders };
  } catch (error) {
    throw new Error(`Failed to fetch dashboard stats: ${error.message}`);
  }
};

const getRecentActivities = async (limit = 10) => {
    try {
        const recentOrders = await Order.find()
            .populate('userId', 'name email')
            .populate('products.productId', 'name price')
            .sort({ orderDate: -1 })
            .limit(limit)
            .select('totalAmount status orderDate userId products deliveryAddress');

        const recentUsers = await User.find({ role: 'User' })
            .sort({ joined: -1 })
            .limit(5)
            .select('name email joined status');

        return {
            recentOrders,
            recentUsers
        };
    } catch (error) {
        throw new Error(`Failed to fetch recent activities: ${error.message}`);
    }
};

const getMonthlyStats = async () => {
    try {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        const [
            monthlyOrders,
            monthlyRevenue,
            monthlyUsers,
            deliveredOrders
        ] = await Promise.all([
            Order.countDocuments({
                orderDate: { $gte: startOfMonth },
                status: { $ne: 'Cancelled' }
            }),
            Order.aggregate([
                {
                    $match: {
                        orderDate: { $gte: startOfMonth },
                        status: { $ne: 'Cancelled' }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalAmount' }
                    }
                }
            ]),
            User.countDocuments({
                joined: { $gte: startOfMonth },
                role: 'User'
            }),
            Order.countDocuments({
                orderDate: { $gte: startOfMonth },
                status: 'Delivered'
            })
        ]);

        return {
            monthlyOrders,
            monthlyRevenue: monthlyRevenue[0]?.totalRevenue || 0,
            monthlyUsers,
            deliveredOrders
        };
    } catch (error) {
        throw new Error(`Failed to fetch monthly stats: ${error.message}`);
    }
};

const getOrderStatusBreakdown = async () => {
    try {
        const statusBreakdown = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        return statusBreakdown;
    } catch (error) {
        throw new Error(`Failed to fetch order status breakdown: ${error.message}`);
    }
};

const getCategoryStats = async () => {
    try {
        const categoryStats = await Product.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalStock: { $sum: '$stock' },
                    avgPrice: { $avg: '$price' }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        return categoryStats;
    } catch (error) {
        throw new Error(`Failed to fetch category stats: ${error.message}`);
    }
};

const getLowStockProducts = async (threshold = 10) => {
    try {
        const lowStockProducts = await Product.find({
            isActive: true,
            stock: { $lte: threshold }
        })
            .select('name stock category price')
            .sort({ stock: 1 })
            .limit(10);

        return lowStockProducts;
    } catch (error) {
        throw new Error(`Failed to fetch low stock products: ${error.message}`);
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUsers,
    getAllOrders,
    getProductById,
    getDashboardStats,
    getRecentActivities,
    getMonthlyStats,
    getOrderStatusBreakdown,
    getCategoryStats,
    getLowStockProducts
};