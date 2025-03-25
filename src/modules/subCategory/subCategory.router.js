
import express from "express";
import { creatSubCategory, deleteSubCategory, getAllSubCategory, getSpSubCategory, updateSubCategory } from "./subCategory.controller.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { subCategoryValidationSchema } from "./subCategory.validation.js";


export const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
    .route('/')
    .post(verifyToken, allowedTo(['admin']), validation(subCategoryValidationSchema), creatSubCategory)
    .get(verifyToken, allowedTo(['user', 'admin']), getAllSubCategory);

subCategoryRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['user', 'admin']), getSpSubCategory)
    .put(verifyToken, allowedTo(['admin']), validation(subCategoryValidationSchema), updateSubCategory)
    .delete(verifyToken, allowedTo(['admin']), deleteSubCategory);


