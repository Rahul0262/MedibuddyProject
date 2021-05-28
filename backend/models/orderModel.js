import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: {
					type: String,
					required: true,
				},
				qty: {
					type: Number,
					required: true,
				},
				image: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		paymentInfo: {
			orderCreationId: { type: String, required: true },
			razorpayPaymentId: { type: String, required: true },
			razorpayOrderId: { type: String, required: true },
			razorpaySignature: { type: String, required: true },
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
