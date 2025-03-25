import { model, Schema, Types } from "mongoose";

const cartSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    cartItems: [{
        product: { type: Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 },
        price: Number,
        totalProductDiscount: Number
    }],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number
}, { timestamps: true })


export const cartModel = model('cart', cartSchema)