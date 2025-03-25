import { model, Schema } from "mongoose";

const brandSchema = Schema({
    name: {
        type: String,
        unique: [true, 'name must be unique'],
        trim:true,
        required: [true,'name brand required'],
        minLength: [2, 'too short brand name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    logo: String
}, { timestamps: true })
brandSchema.post('init',(doc)=>{
    if (doc.logo) {
        doc.logo= process.env.base_url+'brand/'+doc.logo
    }
})
export const brandModel = model('brand', brandSchema)