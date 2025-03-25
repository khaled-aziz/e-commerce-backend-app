import express from "express";
import { addAddress, deleteAddress, getAllUserAddress } from "./address.controller.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { addAddressValidationSchema } from "./address.validation.js";


export const addressRouter = express.Router();


addressRouter
    .route('/')
    .post(verifyToken, allowedTo(['user']), validation(addAddressValidationSchema), addAddress)
    .get(verifyToken, allowedTo(['admin','user']), getAllUserAddress);


addressRouter
    .route('/:id')
    .delete(verifyToken, allowedTo(['user']), deleteAddress)
