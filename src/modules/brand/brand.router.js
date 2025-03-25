import express from "express";
import { creatBrand, deleteBrand, getAllBrand, getSpBrand, updateBrand } from "./brand.controller.js";
import { uploadFiles } from "../../middleware/fileUpload.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { brandValidationSchema } from "./brand.validation.js";


export const brandRouter = express.Router();


brandRouter
    .route('/')
    .post(verifyToken, allowedTo(['admin']), uploadFiles('single', 'logo', 'brand'), validation(brandValidationSchema), creatBrand)
    .get(verifyToken, allowedTo(['admin', 'user']), getAllBrand);

brandRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['admin', 'user']), getSpBrand)
    .put(verifyToken, allowedTo(['admin']), uploadFiles('single', 'logo', 'brand'), updateBrand)
    .delete(verifyToken, allowedTo(['admin']), deleteBrand);


