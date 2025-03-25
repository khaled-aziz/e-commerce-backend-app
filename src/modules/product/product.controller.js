import slugify from "slugify";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { productModel } from "../../../database/model/product.model.js";
import { ApiFeatures } from "../../utils/apiFeature.js";


export const getAllProduct = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(productModel.find({}), req.query).paginate().sort().filter().fields().search()
    let result = await apiFeature.mongooseQuery;
    res.status(200).json({ message: 'success', page: apiFeature.page, result })
});

export const getSpProduct = catchError(async (req, res, next) => {
    const { id } = req.params
    let result = await productModel.findById(id);
    !result && next(new appError('Product not found'), 404);
    result && res.status(200).json({ message: 'success', result });
});

export const creatProduct = catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
    if (req.files.images) req.body.images = req.files.images.map(obj => obj.filename);
    let result = new productModel(req.body);
    await result.save();
    res.status(200).json({ message: 'success', result })
});

export const updateProduct = catchError(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
    if (req.files.images) req.body.images = req.files.images.map(obj => obj.filename);
    let result = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new appError('Product not found', 404));
    result && res.status(200).json({ message: 'success', result });

});

export const deleteProduct = catchError(async (req, res, next) => {
    const { id } = req.params;
    let result = await productModel.findByIdAndDelete(id);
    !result && next(new appError('Product not found', 404));
    result && res.status(200).json({ message: 'success', result });
})