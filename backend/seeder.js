import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
	try {
		// clearing the data in schemas
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);
		console.log('Data Imported');
		process.exit();
	} catch (error) {
		console.log(error, ' In seeding data');
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		// clearing the data in schemas
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log('Data Destroyed');
		process.exit();
	} catch (error) {
		console.log(error, ' In destroy data');
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
