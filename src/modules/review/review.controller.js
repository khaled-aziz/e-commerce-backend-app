import slugify from "slugify";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { reviewModel } from "../../../database/model/review.model.js";


export const getAllReview = catchError(async (req, res, next) => {
    let result = await reviewModel.find({});
    res.status(200).json({ message: 'success', result })
});

export const getSpReview = catchError(async (req, res, next) => {
    const { id } = req.params
    let result = await reviewModel.findById(id);
    !result && next(new appError('Review not found', 404));
    result && res.status(200).json({ message: 'success', result });
});

export const creatReview = catchError(async (req, res, next) => {
    let isFound = await reviewModel.findOne({ user: req.user.userId, product: req.body.product })
    isFound && next(new appError('you are already review before', 406))
    req.body.user= req.user.userId;
    let result = new reviewModel(req.body);
    await result.save();
    res.status(200).json({ message: 'success', result })
});

export const updateReview = catchError(async (req, res, next) => {
    const { id } = req.params;
    let result = await reviewModel.findOneAndUpdate({ _id: id, user: req.user.userId }, req.body, { new: true });
    !result && next(new appError('Review not found', 404));
    result && res.status(200).json({ message: 'success', result });

});

export const deleteReview = catchError(async (req, res, next) => {
    const { id } = req.params;
    let result = await reviewModel.findOneAndDelete({ _id: id, user: req.user.userId });
    !result && next(new appError('Review not found', 404));
    result && res.status(200).json({ message: 'success', result });
})