import slugify from "slugify";
import { catchError } from "../../middleware/catchAsyncError.js";
import { subCategoryModel } from "../../../database/model/subCatrgory.model.js";
import { appError } from "../../utils/appError.js";


export const getAllSubCategory = catchError(async (req, res, next) => {
    let filter = {};
    if (req.params.categoryId) filter = { category: req.params.categoryId }
    let result = await subCategoryModel.find(filter);
    res.status(200).json({ message: 'success', result })
});

export const getSpSubCategory = catchError(async (req, res, next) => {
    const { id } = req.params
    let result = await subCategoryModel.findById( id );
    !result && next(new appError('subcatrgory not found', 404));
    result && res.status(200).json({ message: 'success', result });
});

export const creatSubCategory = catchError(async (req, res, next) => {
    const { name, category } = req.body;
    let result = new subCategoryModel({ name, category, slug: slugify(name) });
    await result.save();
    res.status(200).json({ message: 'success', result })
});

export const updateSubCategory = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    let result = await subCategoryModel.findByIdAndUpdate(id, { name, category, slug: slugify(name) }, { new: true });
    !result && next(new appError('subcatrgory not found', 404));
    result && res.status(200).json({ message: 'success', result });

});

export const deleteSubCategory = catchError(async (req, res, next) => {
    const { id } = req.params;
    let result = await subCategoryModel.findByIdAndDelete(id);
    !result && next(new appError('subcatrgory not found', 404));
    result && res.status(200).json({ message: 'success', result });
})