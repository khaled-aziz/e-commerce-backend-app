import slugify from "slugify";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { userModel } from "../../../database/model/user.model.js";


export const getAllUserWishList = catchError(async (req, res, next) => {
    let result = await userModel.findOne({ _id: req.user.userId }).populate('wishList');
    !result && next(new appError('user not found', 404));
    result && res.status(200).json({ message: 'success', result: result.wishList });
});

export const addToWishList = catchError(async (req, res, next) => {
    const { product } = req.body;
    let result = await userModel.findByIdAndUpdate(req.user.userId, { $addToSet: { wishList: product } }, { new: true }).populate('wishList')
    !result && next(new appError('user not found', 404));
    result && res.status(200).json({ message: 'success', result: result.wishList });
});

export const deleteFromWishList = catchError(async (req, res, next) => {
    const { product } = req.body;
    let result = await userModel.findByIdAndUpdate(req.user.userId, { $pull: { wishList: product } }, { new: true }).populate('wishList')
    !result && next(new appError('user not found', 404));
    result && res.status(200).json({ message: 'success', result: result.wishList });
})
