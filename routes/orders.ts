import { ORDER_CONSTANTS } from '../config/constant';
import express from 'express';
import response from '../utils/response';
import { Order, validateOrderPost } from '../models/order';
import { logCurrentOrderState } from '../models/orderAudit';
import { Item } from '../models/item';
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    // paginate
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const orders = await Order.find()
      .select('-__v')
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    return response.withDataAndMsg(res, ORDER_CONSTANTS.ORDER_SUCCESS, orders);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

// Post an order
router.post('/', async (req, res) => {
  const error: any = await validateOrderPost(req.body);
  if (error) return response.error(res, error.message);

  // retrieve items
  const { items, address, discount } = req.body;

  try {
    // fetch items
    const orderedItems = await Item.find({
      _id: { $in: items }
    });

    // get total
    const itemTotal = orderedItems.reduce((sum, item) => {
      const updatedsum = sum + item.price;
      return updatedsum;
    }, 0);

    // compute discount
    const amountDiscount = Number(discount * itemTotal);

    // compute total amount payable
    const payableTotal = Number(itemTotal - amountDiscount);

    // persist order
    const newOrder = await Order.create({
      items: items,
      address: address,
      discount: discount,
      total: payableTotal
    });

    // add audit trail
    logCurrentOrderState(newOrder);

    // TODO: push notifications

    // format response
    // const result = { ...newOrder.toObject(), Total: payableTotal };

    return response.success(res, ORDER_CONSTANTS.ORDER_SUCCESS);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).select('-__v');
    if (!order) return response.error(res, ORDER_CONSTANTS.ORDER_NOT_FOUND);

    return response.withDataAndMsg(res, ORDER_CONSTANTS.ORDER_SUCCESS, order);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

/* Update Order: Ideally, orders should not be allowed to be updated
   except for special use cases like a Point of Sale etc. */

/* Delete Order: Ideally, orders should not be deletable as well, maybe a soft delete. */

export default router;
