import express from 'express';
import { createOrder, getCustomerOrders, updateOrder } from '../controllers/order.controller';

const router = express.Router();

router.post('/add-order', createOrder);
router.get('/get-my-orders/:customerId', getCustomerOrders);
router.put('/update-order/:orderId', updateOrder);

export default router;