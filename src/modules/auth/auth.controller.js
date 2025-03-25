import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { appError } from "../../utils/appError.js"
import { userModel } from "../../../database/model/user.model.js"
import { catchError } from "../../middleware/catchAsyncError.js"





export const signup= catchError(async (req, res ,next)=>{
    let isFound = await userModel.findOne({ email: req.body.email })
    if(isFound) return next(new appError('acount already exist' , 409))
    let user= new userModel(req.body)
    await user.save()
    res.status(200).json({message: "success", user})
})
export const signin= catchError(async (req, res ,next)=>{
    const { email, password} = req.body
    let user = await userModel.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        let accessToken = jwt.sign({userId: user._id, role: user.role},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        return res.status(200).json({message: "success", accessToken})
    }
    next(new appError('incorrect email or password' , 401))
    
})




