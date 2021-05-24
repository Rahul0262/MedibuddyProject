import express from 'express';
const router = express.Router();
import { createOrder, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderById);

export default router;
