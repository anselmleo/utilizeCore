import { Schema, model, connect } from 'mongoose';
import { Item } from './item';

interface ItemAudit {
  itemId: String;
}

const schema = new Schema<ItemAudit>(
  {
    itemId: { type: String }
  },
  { timestamps: true }
);

const ItemAudit = model<ItemAudit>('ItemAudit', schema);

// Other fields can be defined as best fit for audit purposes
async function logCurrentItemState(item: any) {
  let auditItem = new ItemAudit({
    itemId: item._id.toString()
  });

  await auditItem.save();
}

export { ItemAudit, logCurrentItemState };
