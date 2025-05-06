import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customerId'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

export const UserModel = mongoose.model("User", userSchema);
