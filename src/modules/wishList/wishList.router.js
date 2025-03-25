import express from "express";
import { addToWishList, deleteFromWishList, getAllUserWishList } from "./wishList.controller.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { addToWishlistValidationSchema } from "./wishlist.validation.js";


export const wishListRouter = express.Router();


wishListRouter
    .route('/')
    .post(verifyToken, allowedTo(['user']), validation(addToWishlistValidationSchema), addToWishList)
    .get(verifyToken, allowedTo(['user', 'admin']), getAllUserWishList)
    .delete(verifyToken, allowedTo(['user', 'admin']), deleteFromWishList)


