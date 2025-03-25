import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { userModel } from "../../../database/model/user.model.js";


export const getAllUserAddress = catchError(async (req, res, next) => {
    let result = await userModel.findOne({ _id: req.user.userId }).populate('addresses');
    if (!result) return next(new appError('user not found', 404));
    res.status(200).json({ message: 'success', result });
});

export const addAddress = catchError(async (req, res, next) => {
    let result = await userModel.findByIdAndUpdate(req.user.userId, { $addToSet: { addresses: req.body } }, { new: true })
    if (!result) return next(new appError('user not found', 404));
    res.status(200).json({ message: 'success', result: result.addresses });
});

export const deleteAddress = catchError(async (req, res, next) => {
    const { id } = req.params
    let result = await userModel.findByIdAndUpdate(req.user.userId, { $pull: { addresses : { _id:id } } }, { new: true })
    if (!result) return next(new appError('user not found', 404));
    res.status(200).json({ message: 'success', result: result.addresses });
})