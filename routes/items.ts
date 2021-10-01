import { ITEM_CONSTANTS } from '../config/constant';
import express from 'express';
import response from '../utils/response';
import { Item, validateItemPost } from '../models/item';
import { logCurrentItemState } from '../models/itemAudit';
import { any } from 'joi';
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    // paginate
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const items = await Item.find()
      .select('-__v')
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
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

    // add audit trail
    logCurrentItemState(item);

    return response.success(res, ITEM_CONSTANTS.ITEM_SUCCESS);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  const error: any = await validateItemPost(req.body);
  if (error) return response.error(res, error.message);

  const { id } = req.params;
  const { name, price } = req.body;

  try {
    // check if item exists
    const itemExists = await Item.exists({ _id: id });
    if (!itemExists) return response.error(res, ITEM_CONSTANTS.ITEM_NOT_FOUND);

    // update and persist item
    const item = await Item.findOneAndUpdate(
      { _id: id },
      { name, price },
      { new: true }
    );

    // add audit trail
    logCurrentItemState(item);

    return response.success(res, ITEM_CONSTANTS.ITEM_SUCCESS);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id).select('-__v').exec();
    if (!item) return response.error(res, ITEM_CONSTANTS.ITEM_NOT_FOUND);

    return response.withDataAndMsg(res, ITEM_CONSTANTS.ITEM_SUCCESS, item);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // check if item exists
    const itemExists = await Item.exists({ _id: id });
    if (!itemExists) return response.error(res, ITEM_CONSTANTS.ITEM_NOT_FOUND);

    const item = await Item.deleteOne({ _id: id });

    return response.success(res, ITEM_CONSTANTS.ITEM_SUCCESS);
  } catch (error: any) {
    return response.error(res, error.message);
  }
});

export default router;
