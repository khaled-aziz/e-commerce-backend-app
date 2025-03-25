import express from "express";
import { creatCashOrder, getAllOrder, getSpecificOrder } from "./order.controller.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { orderValidationSchema } from "./order.validation.js";



export const orderRouter = express.Router();


orderRouter
    .route('/')
    .get(verifyToken, allowedTo(['user', "admin"]), getSpecificOrder)

orderRouter.get('/all', verifyToken, allowedTo(['admin']), getAllOrder)

orderRouter
    .route('/:id')
    .post(verifyToken, allowedTo(['user']), validation(orderValidationSchema), creatCashOrder)

