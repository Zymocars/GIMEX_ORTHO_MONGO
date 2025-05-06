const User= require('../model/user.js')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
//get user by id service
const getUserById=async(userId) => {
    return await User.findById(userId).select('-password'); 
};

//Update address service
const updateUserAddress= async(userId,shippingDetails)=>{
    return await User.findByIdAndUpdate(
        userId,
        { shippingDetails },
        { new: true, runValidators: true }
      ).select('-password');
}

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetLink = `http://localhost:5000/resetpassword/${token}`; // Replace with your frontend URL that opens the reset password page
    console.log("RESET LINK (DEV):", resetLink);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {                                     
      user: process.env.EMAIL_USER, //add your from email address and password in the environment variables
      pass: process.env.EMAIL_PASS,
    },
  });                                     

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });


    return { message: 'Password reset link sent to your email' };
}
const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new Error('Token is invalid or has expired');
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return { message: 'Password has been reset successfully' };
};
    





module.exports = {
    getUserById,
    updateUserAddress,
    forgotPassword,
    resetPassword
  };
 