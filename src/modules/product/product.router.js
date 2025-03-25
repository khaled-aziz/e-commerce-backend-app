import express from "express";
import { creatProduct, deleteProduct, getAllProduct, getSpProduct, updateProduct } from "./product.controller.js";
import { validation } from "../../middleware/validation.js";
import { creatProductSchema } from "./product.validation.js";
import { uploadFiles } from "../../middleware/fileUpload.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";


export const productRouter = express.Router();
const fieldsArray = [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]

productRouter
    .route('/')
    .get(verifyToken, allowedTo(['user', 'admin']), getAllProduct)
    .post(verifyToken, allowedTo(['admin', 'vendor']), uploadFiles("many", fieldsArray, "product"), validation(creatProductSchema), creatProduct);

productRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['user', 'admin', 'vendor']), getSpProduct)
    .put(verifyToken, allowedTo(['admin', 'vindor']), uploadFiles("many", fieldsArray, "product"), updateProduct)
    .delete(verifyToken, allowedTo(['admin', 'vindor']),deleteProduct);


