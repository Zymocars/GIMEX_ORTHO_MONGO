const orderService = require('../service/orderService');

//create new order
const createOrder = async (req, res) => {
    try {
        console.log('Create order request received');
        const userId = req.user.id;
        const order = await orderService.createOrder(userId, req.body);
        
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        console.log('Get user orders request received');
        const userId = req.user.id;
        const orders = await orderService.getUserOrders(userId);

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        console.log('Delete order request received for:', orderId);
        
        await orderService.deleteOrder(orderId);
        
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        console.error('Delete order error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    deleteOrder
};