import express from 'express';
import dotenv from 'dotenv';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

//middleware
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
	res.send('APi is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started running on port ${PORT}`));
