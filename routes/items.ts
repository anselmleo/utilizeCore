import { ITEM_CONSTANTS } from '../config/constant';
import express from 'express';
import response from '../utils/response';
import { Item, validateItemPost } from '../models/item';
import { any } from 'joi';
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    return response.withDataAndMsg(res, ITEM_CONSTANTS.ITEM_SUCCESS, items);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

// Post or create an item
router.post('/', async (req, res) => {
  const error: any = await validateItemPost(req.body);
  if (error) return response.error(res, error.message);

  const { name, price } = req.body;

  try {
    // check if item exists
    const itemExists = await Item.exists({ name });
    if (itemExists) return response.error(res, ITEM_CONSTANTS.ITEM_EXISTS);

    // create and persist item
    const item = await Item.create({ name, price });

    return response.success(res, ITEM_CONSTANTS.ITEM_SUCCESS);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

export default router;
