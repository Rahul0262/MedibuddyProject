import express from 'express';
const router = express.Router();
import {
	generatePreSignedUrl,
	deleteImage,
} from '../controllers/awsController.js';
import { isAdmin, protect } from '../middlewares/authMiddleware.js';

router
	.route('/generatePreSignedUrl')
	.post(protect, isAdmin, generatePreSignedUrl);
router.route('/:id').delete(protect, isAdmin, deleteImage);

export default router;
