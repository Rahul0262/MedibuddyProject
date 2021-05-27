import express from 'express';
const router = express.Router();
import {
	getProductById,
	getProducts,
	deleteProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

router.route('/').get(getProducts);

router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct);

export default router;
