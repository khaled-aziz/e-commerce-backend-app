import { model, Schema } from "mongoose";

const couponSchema = Schema({
    code: {
        type: String,
        required: [true, 'copun code required'],
        trim: true,
    },
    discount: {
        type: Number,
        required: [true, 'copun discount required'],
        min: 0
    },
    expires: {
        type: Date,
        required: [true, 'copun expires required'],
    }
}, { timestamps: true })
export const couponModel = model('coupon', couponSchema)