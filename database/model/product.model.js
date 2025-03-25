import { model, Schema, Types } from "mongoose";

const productSchema = Schema({
    title: {
        type: String,
        required: [true, 'title product required'],
        trim: true,
        minLength: [2, 'too short product title']
    },
    description: {
        type: String,
        required: [true, 'description product required'],
        minLength: [5, 'too short product description'],
        trim: true,
        maxLength: [200, 'too long product description'],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'price product required'],
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    ratingAvrg: {
        type: Number,
        min: [1, 'rating avarage must be greater than 1'],
        max: [10, 'rating avarage must be greater than 10'],
    },
    ratingCount: {
        type: Number,
        default: 0,
        main: 0,
    },
    quantity: {
        type: Number,
        default: 0,
        main: 0,
        required: [true, 'quantity product required']
    },
    sold: {
        type: Number,
        default: 0,
        main: 0,
    },
    imageCover: String,
    images: [String],
    category: {
        type: Types.ObjectId,
        ref: 'category',
        required: [true, 'product category required']
    },
    subCategory: {
        type: Types.ObjectId,
        ref: 'subCategory',
        required: [true, 'product subCategory required']
    },
    brand: {
        type: Types.ObjectId,
        ref: 'brand',
        required: [true, 'product brand required']
    }
}, { timestamps: true })
productSchema.virtual('imageCoverUrl').get(function () {
    if (this.imageCover) return process.env.base_url + 'product/' + this.imageCover;
    return null;
});
productSchema.virtual('imagesUrls').get(function () {
    if (this.images) return this.images.map(path => 'http://localhost:3000/product/' + path);
    return [];
});
productSchema.virtual('reviews', {
    ref: 'review',
    localField: "_id",
    foreignField: "product"
})
productSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.imageCover;
        delete ret.images;
        return ret;
    }
});
productSchema.pre(/^find/, function () {
    this.populate('reviews')
})
productSchema.set('toObject', { virtuals: true });
export const productModel = model('product', productSchema)