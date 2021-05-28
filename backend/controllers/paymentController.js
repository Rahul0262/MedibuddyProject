import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';

const createOrder = asyncHandler(async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});

		const options = {
			amount: req.body.amount, // amount in smallest currency unit
			currency: 'INR',
			receipt: 'receipt_order_1234',
		};

		const order = await instance.orders.create(options);

		if (!order) return res.status(500).send('Some error occured');

		res.json(order);
	} catch (error) {
		res.status(500).send(error);
	}
});

export { createOrder };
