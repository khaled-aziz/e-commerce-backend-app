import express from "express";
import { creatReview, deleteReview, getAllReview, getSpReview, updateReview } from "./review.controller.js";
import { validation } from "../../middleware/validation.js";
import { reviewValidationSchema } from "./review.validation.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";


export const reviewRouter = express.Router();


reviewRouter
    .route('/')
    .post(verifyToken, allowedTo(['user']), validation(reviewValidationSchema), creatReview)
    .get(verifyToken, allowedTo(['admin']), getAllReview);

reviewRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['user', 'admin']),getSpReview)
    .put(verifyToken, allowedTo(['user']), updateReview)
    .delete(verifyToken, allowedTo(['user', 'admin']),deleteReview);



