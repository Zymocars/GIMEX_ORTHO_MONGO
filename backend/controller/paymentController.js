const paymentConfig = require("../config/razorpay.js");
const crypto = require("crypto");

const createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount || !currency) {
      return res.status(400).json({
        success: false,
        message: "Amount and currency are required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: `receipt_${Math.random() * 100000}`, // Unique receipt ID
      payment_capture: 1,
    };

    const razorpay = paymentConfig.getRazorpayInstance();
    const response = await razorpay.orders.create(options);
    if (!response) {
      return res.status(500).json({
        success: false,
        message: "Failed to create payment order",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    const hmac = crypto.createHmac("sha256", paymentConfig.getRazorpaySecret());
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
