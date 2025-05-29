const router = require('express').Router(); 
const auth = require('../middleware/auth.js'); 
const authController = require('../controller/authController.js'); 
const userController = require('../controller/userController.js'); 
const adminAuth = require('../middleware/adminAuth.js'); 
const adminController = require('../controller/adminController.js'); 
const orderController = require('../controller/orderController.js');

// Import your service functions (you'll need to create this service file)
const {
    getProductById,
    getAllProducts
} = require('../service/adminService.js'); // Adjust path as needed

//auth routes
router.post('/auth/register', authController.register); //register route
router.post('/auth/login', authController.login); //login route
router.post('/auth/admin/login', authController.adminLogin); //admin login route

//user routes
router.put('/user/address', auth, userController.updateAddress);
router.get('/user/getorders', auth, orderController.getUserOrders);
router.post('/user/placeorder', auth, orderController.createOrder);
router.delete('/user/deleteorders/:orderId', auth, orderController.deleteOrder);
router.post('/user/forgotpassword', userController.forgotPassword);
router.post('/user/resetpassword/:token', userController.resetPassword);

router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// PUBLIC PRODUCT ROUTES (No authentication required)
// Get single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error in get product route:', error);
        
        if (error.message === 'Product not found') {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await getAllProducts();
        
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error in get all products route:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

//admin routes
router.post('/admin/products', adminAuth, adminController.addProduct);
router.put('/admin/products/:id', adminAuth, adminController.updateProduct);
router.delete('/admin/products/:id', adminAuth, adminController.deleteProduct);
router.get('/admin/products', adminAuth, adminController.getAllProducts);
router.get('/admin/getallusers', adminAuth, adminController.getAllUsers);
router.get('/admin/getallorders', adminAuth, adminController.getAllOrders);

module.exports = router;