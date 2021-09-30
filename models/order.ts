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
    address: { type: String },
    discount: { type: Number }
  },
  { timestamps: true }
);

const Order = model<Order>('Order', schema);

const validateOrderPost = async (order: Order) => {
  const schema = Joi.object({
    address: Joi.string(),
    discount: Joi.number()
  });

  try {
    const value = await schema.validateAsync(order);
  } catch (error) {
    return error;
  }
};

export { Order, validateOrderPost };
