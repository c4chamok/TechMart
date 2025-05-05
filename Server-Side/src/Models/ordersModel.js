import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: {type: String, required: true }, 
    description: {type: String, required: true },
    price: {type: Number, required: true }, 
    stock: {type: Number, required: true }, 
    createdAt: {type: Date, default: Date.now() }, 
    updatedAt: {type: Date, default: Date.now() }
})

export const OrderModel = mongoose.model("Order", OrderSchema);