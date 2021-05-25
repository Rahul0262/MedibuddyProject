import express from 'express';
const router = express.Router();
import {
	createOrder,
	getOrderById,
	getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
