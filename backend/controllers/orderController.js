import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'; // importing model

const createOrder = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400).json({ message: 'No order items;' });
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);
	if (order) res.json(order);
	else {
		res.status(404).json({ message: 'Order not found' });
	}
});

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

export { createOrder, getOrderById, getMyOrders };
