import { model, Schema } from "mongoose";

const categotySchema = Schema({
    name: {
        type: String,
        unique: [true, 'name must be unique'],
        required: [true,'name categoty required'],
        trim:true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    image: String
}, { timestamps: true })
categotySchema.post('init',(doc)=>{
    doc.image= process.env.base_url+'category/'+doc.image
})
export const categoryModel = model('category', categotySchema)