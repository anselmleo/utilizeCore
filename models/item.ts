import { Schema, model, connect } from 'mongoose';
import Joi from 'joi';

interface Item {
  name: string;
  price: number;
}

const schema = new Schema<Item>(
  {
    name: { type: String },
    price: { type: Number }
  },
  { timestamps: true }
);

const Item = model<Item>('Item', schema);

const validateItemPost = async (item: Item) => {
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.number()
  });

  try {
    const value = await schema.validateAsync(item);
  } catch (error) {
    return error;
  }
};

export { Item, validateItemPost };
