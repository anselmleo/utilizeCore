import { Schema, model, connect } from 'mongoose';
import Joi from 'joi';

interface Order {
  items: string[];
  address: string;
  discount: number;
}

const schema = new Schema<Order>(
  {
    items: [{ type: Schema.Types.ObjectId, ref: 'item' }],
    address: { type: String, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

const Order = model<Order>('Order', schema);

const validateOrderPost = async (order: Order) => {
  const schema = Joi.object({
    items: Joi.array().items(Joi.string()),
    address: Joi.string().required(),
    discount: Joi.number().required()
  });

  try {
    const value = await schema.validateAsync(order);
  } catch (error) {
    return error;
  }
};

export { Order, validateOrderPost };
