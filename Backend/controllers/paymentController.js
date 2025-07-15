import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
};
