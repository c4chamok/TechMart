import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true }, 
    description: {type: String, required: true },
    price: {type: Number, required: true }, 
    stock: {type: Number, required: true }, 
    createdAt: {type: Date, default: Date.now() }, 
    updatedAt: {type: Date, default: Date.now() }
})

export const ProductModel = mongoose.model("Product", ProductSchema);
