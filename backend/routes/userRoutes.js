import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserDetailsByAdmin,
	updateUserProfileByAdmin,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/profile').put(protect, updateUserProfile);
router.route('/profile').get(protect, getUserProfile);
router.route('/allusers').get(protect, isAdmin, getAllUsers);
router
	.route('/:id')
	.delete(protect, isAdmin, deleteUser)
	.get(protect, isAdmin, getUserDetailsByAdmin)
	.put(protect, isAdmin, updateUserProfileByAdmin);

export default router;
