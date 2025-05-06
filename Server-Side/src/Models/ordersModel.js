import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: "PENDING" },
    total: { type: Number },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

OrderSchema.virtual('items', {
    ref: 'OrderItem',
    localField: '_id',
    foreignField: 'orderId'
});
OrderSchema.virtual('customer', {
    ref: 'User',
    localField: 'customerId',
    foreignField: '_id'
});

OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });

export const OrderModel = mongoose.model("Order", OrderSchema);


const OrderItemsSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number },
    unitPrice: { type: Number },
    subTotal: { type: Number }
})

export const OrderItemsModel = mongoose.model("OrderItem", OrderItemsSchema);

