import { ORDER_CONSTANTS } from '../config/constant';
import express from 'express';
import response from '../utils/response';
import axios from 'axios';
import { Order } from '../models/order';
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const order = await Order.find();
    return response.success(res, ORDER_CONSTANTS.ORDER_SUCCESS);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

export default router;
