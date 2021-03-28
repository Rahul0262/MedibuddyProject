import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
	registerUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
