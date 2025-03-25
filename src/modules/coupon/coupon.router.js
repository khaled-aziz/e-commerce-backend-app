import express from "express";
import { creatCoupon, deleteCoupon, getAllCoupon, getSpCoupon, updateCoupon } from "./coupon.controller.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { couponValidationSchema } from "./coupon.validation.js";


export const couponRouter = express.Router();


couponRouter
    .route('/')
    .post(verifyToken, allowedTo(['admin']), validation(couponValidationSchema), creatCoupon)
    .get(verifyToken, allowedTo(['admin']),getAllCoupon);

couponRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['user','admin']),getSpCoupon)
    .put(verifyToken, allowedTo(['admin']), updateCoupon)
    .delete(verifyToken, allowedTo(['admin']),deleteCoupon);
    


