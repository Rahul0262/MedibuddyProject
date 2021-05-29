import express from 'express';
const router = express.Router();
import {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	addReview,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id/review').post(protect, addReview);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct)
	.put(protect, isAdmin, updateProduct);

export default router;
