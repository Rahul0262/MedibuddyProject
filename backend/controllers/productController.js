import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'; // importing model

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

const addReview = asyncHandler(async (req, res) => {
	const review = req.body;
	const product = await Product.findById(req.body.productId);
	if (
		product.reviews.findIndex(
			(r) => r.user.toString() == req.user._id.toString()
		) == -1
	) {
		try {
			const newReviews = {
				name: review.name,
				rating: Number(review.rating),
				comment: review.comment,
				user: req.user._id,
			};
			product.reviews.push(newReviews);
			product.numReviews = product.reviews.length;
			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;
			const updatedProduct = await product.save();
			if (updatedProduct) {
				res.status(201).json(updatedProduct);
			}
		} catch (error) {
			console.log(error);
			res.status(404).json({ message: 'Unable to add the review' });
		}
	} else {
		res.status(400).json({ message: 'User already reviewed' });
	}
});

const createProduct = asyncHandler(async (req, res) => {
	const product = req.body;
	const data = {
		numReviews: 0,
		rating: 0,
		...product,
		user: req.user._id,
	};
	console.log(data);
	try {
		const createdProduct = await Product.create(data);
		if (createdProduct) {
			res.status(201).json(data);
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: 'Unable to add the product' });
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		product.price = req.body.price || product.price;
		product.countInStock = req.body.countInStock || product.countInStock;
		product.name = req.body.name || product.name;
		product.image = req.body.image;
		product.description = req.body.description || product.description;
		product.brand = req.body.brand || product.brand;
		product.category = req.body.category || product.category;
		product.user = req.user._id;

		const updatedProduct = await product.save();

		if (updatedProduct) {
			res.json(updatedProduct);
		}
	} else {
		res.status(404).json({ message: 'Product not found' });
	}
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) res.json(product);
	else {
		res.status(404).json({ message: 'Product not found' });
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'Product Removed' });
	} else {
		res.status(404).json({ message: 'Product not found' });
	}
});

export {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	addReview,
};
