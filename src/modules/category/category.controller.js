import slugify from "slugify";
import { categoryModel } from "../../../database/model/category.model.js"
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";


export const getAllCategory = catchError(async (req, res, next) => {
    let result = await categoryModel.find({});
    res.status(200).json({ message: 'success', result })
});

export const getSpCategory = catchError(async (req, res, next) => {
    const { id } = req.params
    let result = await categoryModel.findById(id);
    !result && next(new appError('catrgory not found', 404));
    result && res.status(200).json({ message: 'success', result });
});

export const creatCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename;
    let result = new categoryModel(req.body);
    await result.save();
    res.status(200).json({ message: 'success', result })
});

export const updateCategory = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let result = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new appError('catrgory not found', 404));
    result && res.status(200).json({ message: 'success', result });

});

export const deleteCategory = catchError(async (req, res, next) => {
    const { id } = req.params;
    let result = await categoryModel.findByIdAndDelete(id);
    !result && next(new appError('catrgory not found', 404));
    result && res.status(200).json({ message: 'success', result });
})