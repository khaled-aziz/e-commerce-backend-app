import express from "express";
import { creatCategory, deleteCategory, getAllCategory, getSpCategory, updateCategory } from "./category.controller.js";
import { subCategoryRouter } from "../subCategory/subCategory.router.js";
import { uploadFiles } from "../../middleware/fileUpload.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { categoryValidationSchema } from "./category.validation.js";

export const categoryRouter = express.Router();

categoryRouter.use('/:categoryId/subCategory', verifyToken, allowedTo(['user', 'admin']), subCategoryRouter)
categoryRouter
    .route('/')
    .post(verifyToken, allowedTo(['admin']), uploadFiles('single', 'image', 'brand'), validation(categoryValidationSchema), creatCategory)
    .get(verifyToken, allowedTo(['user', 'admin']), getAllCategory);

categoryRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['user']), getSpCategory)
    .put(verifyToken, allowedTo(['admin']), uploadFiles('single', 'image', 'brand'), validation(categoryValidationSchema), updateCategory)
    .delete(verifyToken, allowedTo(['admin']), deleteCategory);


