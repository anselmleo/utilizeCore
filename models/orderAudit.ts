import { Schema, model, connect } from 'mongoose';

interface OrderAudit {
  orderId: String;
}

const schema = new Schema<OrderAudit>(
  {
    orderId: { type: String }
  },
  { timestamps: true }
);

const OrderAudit = model<OrderAudit>('OrderAudit', schema);

// Other fields can be defined as best fit for audit purposes
async function logCurrentOrderState(order: any) {
  let auditOrder = new OrderAudit({
    orderId: order._id.toString()
  });

  await auditOrder.save();
}

export { OrderAudit, logCurrentOrderState };
