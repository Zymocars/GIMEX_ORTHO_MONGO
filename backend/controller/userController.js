const userService = require('../service/userService');
const multer = require('multer');
const upload = multer();

const updateAddress = async (req, res) => {
    console.log('Update address started...');
    try {
        const userId=req.user.id;
        console.log('User ID:', userId);
        
        const shippingDetails ={
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode
        };
        console.log('Shipping details:', shippingDetails);
        if (!shippingDetails) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }
        console.log('Attempting to update address...');
        const result = await userService.updateUserAddress(userId, shippingDetails);
        console.log('Address updated successfully:', result);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.log('Error updating address:', error.stack);
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
        
};
const forgotPassword = async (req, res) => {
    console.log('Forgot password started...');
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }
        console.log('Attempting to send password reset link...');
        const result = await userService.forgotPassword(email);
        console.log('Password reset link sent successfully:', result);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.log('Error sending password reset link:', error.stack);
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
        
};
const resetPassword = async (req, res) => {
    console.log('Reset password started...');
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }
        console.log('Attempting to reset password...');
        const result = await userService.resetPassword(token, newPassword);
        console.log('Password reset successfully:', result);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.log('Error resetting password:', error.stack);
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
        
}

module.exports = {
    updateAddress: [upload.none(), updateAddress],
    forgotPassword,
    resetPassword,
};
