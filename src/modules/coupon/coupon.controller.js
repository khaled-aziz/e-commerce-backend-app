import QRCode  from "qrcode";
import { catchError } from "../../middleware/catchAsyncError.js";
import { appError } from "../../utils/appError.js";
import { couponModel } from "../../../database/model/coupon.model.js";


export const getAllCoupon = catchError(async (req, res, next) => {
    let coupons = await couponModel.find({});
    let couponsWithQR = await Promise.all(coupons.map(async (coupon) => {
        let qrUrl = await QRCode.toDataURL(coupon.code);
        return { ...coupon.toObject(), qrUrl }; // Ensure proper object conversion
    }));
    res.status(200).json({ message: 'success', couponsWithQR })
});

export const getSpCoupon = catchError(async (req, res, next) => {
    const { id } = req.params
    let coupon = await couponModel.findById(id);
    !coupon && next(new appError('Coupon not found', 404));
    let url = await QRCode.toDataURL(coupon.code)
    coupon && res.status(200).json({ message: 'success', coupon, url });
});

export const creatCoupon = catchError(async (req, res, next) => {
    let coupon = new couponModel(req.body);
    await coupon.save();
    res.status(200).json({ message: 'success', coupon });
});

export const updateCoupon = catchError(async (req, res, next) => {
    const { id } = req.params;
    let coupon = await couponModel.findByIdAndUpdate(id, req.body, { new: true });
    !coupon && next(new appError('Coupon not found', 404));
    let url = await QRCode.toDataURL(coupon.code)
    coupon && res.status(200).json({ message: 'success', coupon, url });
});

export const deleteCoupon = catchError(async (req, res, next) => {
    const { id } = req.params;
    let coupon = await couponModel.findByIdAndDelete(id);
    !coupon && next(new appError('Coupon not found', 404));
    coupon && res.status(200).json({ message: 'success', coupon });
})