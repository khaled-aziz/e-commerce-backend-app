import { model, Schema, Types } from "mongoose";

const subCategotySchema = Schema({
    name: {
        type: String,
        unique: [true, 'name must be unique'],
        trim:true,
        required: [true,'name subCategoty required'],
        minLength: [2, 'too short sub category name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    category:{
        type:Types.ObjectId,
        ref:"category"
    }
}, { timestamps: true })
export const subCategoryModel = model('subCategory', subCategotySchema)