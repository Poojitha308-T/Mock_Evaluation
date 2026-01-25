import express from 'express';
import { createOrder, getCustomerOrders } from '../controllers/order.controller';

const router = express.Router();

router.post('/add-order', createOrder);
router.get('/get-my-orders/:customerId', getCustomerOrders)

export default router;