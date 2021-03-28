import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decodedToken);
			const user = await User.findById(decodedToken.id).select('-password');
			console.log(user);
			req.user = user;
			next();
		} catch (error) {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
});

export { protect };
