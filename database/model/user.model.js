import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'user name required'],
        trim: true,
        minLength: [2, 'too short user name']
    },
    email: {
        type: String,
        required: [true, 'email required'],
        minLength: 5,
        trim: true,
        unique: [true, 'email must be unique'],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'minlength 6 characters']
    },
    changePasswordAt: Date,
    phone: {
        type: String,
        required: [true, 'user phone required']
    },
    profilePic: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    wishList: [{ type: Types.ObjectId, ref: 'product' }],
    addresses: [{
        city: String,
        street: String,
        phone: String
    }]
}, { timestamps: true })

userSchema.post('init', (doc) => {
    if (doc.profilePic) doc.profilePic = process.env.base_url + 'product/' + doc.profilePic;
})

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, Number(process.env.saltRounds));
})

userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, Number(process.env.saltRounds));
    }
})

export const userModel = model('user', userSchema)