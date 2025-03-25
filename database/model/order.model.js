import { model, Schema, Types } from "mongoose";

const orderSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    orderItems: [{
        product: { type: Types.ObjectId, ref: 'product' },
        quantity: Number,
        price: Number
    }],
    totalOrderPrice: Number,
    shippingAddress: {
        street: String,
        city: String,
        phone: String
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash'
    },
    isPaid: { 
        type: Boolean, 
        default: false 
    },
    paidAt:Date,
    isDrlivered: { 
        type: Boolean, 
        default: false 
    },
    deliveredAt:Date
}, { timestamps: true })

export const orderModel = model('order', orderSchema)