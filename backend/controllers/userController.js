import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'; // importing model
import generateToken from '../utils/generateJWT.js';
import bcrypt from 'bcryptjs';

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });
	if (user && (await user.matchPswd(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({ message: 'Invalid email or password' });
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;
	const existUser = await User.findOne({ email: email });
	if (!existUser) {
		try {
			const user = await User.create({
				email,
				name,
				password,
			});
			if (user) {
				res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user._id),
				});
			}
		} catch (error) {
			console.log(error);
			res.status(404).json({ message: 'Unable to add the user' });
		}
	} else {
		res.status(400).json({ message: 'User already exists' });
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404).json({ message: 'User not found' });
	}
});

export { authUser, getUserProfile, registerUser };