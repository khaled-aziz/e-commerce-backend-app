import express from "express";
import { addProductToCart, applyCoupon, getLoggedUserCart, removeProductFromCart, updateQuantity } from "./cart.controller.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { cartValidationSchema } from "./cart.validation.js";



export const cartRouter = express.Router();


cartRouter
    .route('/')
    .post(verifyToken, allowedTo(['user']), validation(cartValidationSchema), addProductToCart)
    .get(verifyToken, allowedTo(['admin', 'user']), getLoggedUserCart)

cartRouter.post('/applyCoupon', verifyToken, allowedTo(['admin', 'user']), applyCoupon)

cartRouter
    .route('/:id')
    .put(verifyToken, allowedTo(['user']), updateQuantity)
    .delete(verifyToken, allowedTo(['admin', 'user']), removeProductFromCart);


