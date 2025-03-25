import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { userModel } from "../../../database/model/user.model.js";
import bcrypt from "bcrypt";


export const getAllUser = catchError(async (req, res, next) => {
    let result = await userModel.find({});
    res.status(200).json({ message: 'success', result })
});

export const getSpUser = catchError(async (req, res, next) => {
    const userId = req.user.userId;
    let result = await userModel.findById(userId);
    !result && next(new appError('User not found', 404));
    result && res.status(200).json({ message: 'success', result });
});

export const updateUser = catchError(async (req, res, next) => {
    const userId = req.user.userId;
    if (req.file) req.body.profilePic = req.file.filename;
    let result = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
    !result && next(new appError('User not found', 404));
    result && res.status(200).json({ message: 'success', result });
});

export const changePassword = catchError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;
    const user = await userModel.findById(userId);
    if (!user) return next(new appError('User not found', 404));

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid old password' });
    user.password = newPassword;
    user.changePasswordAt = new Date.now();
    await user.save();
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Password changed successfully. Please log in again.' });
});

export const deleteUser = catchError(async (req, res, next) => {
    const userId = req.user.userId;
    let result = await userModel.findByIdAndDelete(userId);
    !result && next(new appError('User not found', 404));
    result && res.status(200).json({ message: 'success', result });
})