const router=require('express').Router();
const auth=require('../middleware/auth.js');
const authController=require('../controller/authController.js');
const userController=require('../controller/userController.js');
const adminAuth=require('../middleware/adminAuth.js');
const adminController=require('../controller/adminController.js');
const orderController=require('../controller/orderController.js');

//auth routes
router.post('/auth/register',authController.register); //register route
router.post('/auth/login',authController.login); //login route
router.post('/auth/admin/login', authController.adminLogin); //admin login route

//user routes
router.put('/user/address', auth, userController.updateAddress);
router.get('/user/getorders', auth, orderController.getUserOrders);
router.post('/user/placeorder', auth, orderController.createOrder);
router.delete('/user/deleteorders/:orderId', auth, orderController.deleteOrder);


router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });

//admin routes
router.post('/admin/products', adminAuth, adminController.addProduct);
router.put('/admin/products/:id', adminAuth, adminController.updateProduct);
router.delete('/admin/products/:id', adminAuth, adminController.deleteProduct);
router.get('/admin/products', adminAuth, adminController.getAllProducts);
router.get('/admin/getallusers', adminAuth, adminController.getAllUsers);
router.get('/admin/getallorders', adminAuth, adminController.getAllOrders);



module.exports=router; 
