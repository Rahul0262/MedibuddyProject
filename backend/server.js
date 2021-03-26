import express from 'express';
import dotenv from 'dotenv';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	next();
});
//middlewares
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
	res.send('APi is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started running on port ${PORT}`));
