import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/paymentController.js';

router.route('/order').post(createOrder);

export default router;
