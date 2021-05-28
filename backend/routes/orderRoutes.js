import express from 'express';
const router = express.Router();
import {
	createOrder,
	getOrderById,
	getMyOrders,
	getOrders,
	deliverOrder,
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, createOrder).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router
	.route('/:id')
	.get(protect, getOrderById)
	.put(protect, isAdmin, deliverOrder);

export default router;
