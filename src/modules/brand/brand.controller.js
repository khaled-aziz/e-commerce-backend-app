import slugify from "slugify";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { brandModel } from "../../../database/model/brand.model.js";
import { ApiFeatures } from "../../utils/apiFeature.js";


export const getAllBrand = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(brandModel.find({}), req.query).paginate().sort().filter().fields().search()
        let result = await apiFeature.mongooseQuery;
        res.status(200).json({ message: 'success', page: apiFeature.page, result })
});

export const getSpBrand = catchError(async (req, res, next) => {
    const { id } = req.params
    let result = await brandModel.findById(id);
    !result && next(new appError('brand not found', 404));
    result && res.status(200).json({ message: 'success', result });
});

export const creatBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename;
    let result = new brandModel(req.body);
    await result.save();
    res.status(200).json({ message: 'success', result })
});

export const updateBrand = catchError(async (req, res, next) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let result = await brandModel.findByIdAndUpdate(id, req.body, { new: true });
    !result && next(new appError('brand not found', 404));
    result && res.status(200).json({ message: 'success', result });

});

export const deleteBrand = catchError(async (req, res, next) => {
    const { id } = req.params;
    let result = await brandModel.findByIdAndDelete(id);
    !result && next(new appError('brand not found', 404));
    result && res.status(200).json({ message: 'success', result });
})