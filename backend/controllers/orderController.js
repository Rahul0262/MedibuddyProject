import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'; // importing model

const createOrder = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, totalPrice, paymentInfo } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400).json({ message: 'No order items;' });
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			totalPrice,
			paymentInfo,
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

const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');
	res.json(orders);
});

const deliverOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404).json({ message: 'Order not found' });
	}
});

export { createOrder, getOrderById, getMyOrders, getOrders, deliverOrder };
