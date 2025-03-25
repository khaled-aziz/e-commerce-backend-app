import { model, Schema, Types } from "mongoose";

const reviewSchema = Schema({
    comment: {
        type: String,
        required: [true,'review comment required'],
        trim:true,
    },
    product: {
        type: Types.ObjectId,
        required: true,
        ref:'product'
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref:'user'
    },
    rating:Number
}, { timestamps: true })
export const reviewModel = model('review', reviewSchema)