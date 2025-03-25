import express from "express";
import { deleteUser, getAllUser, getSpUser, updateUser } from "./user.controller.js";
import { uploadFiles } from "../../middleware/fileUpload.js";
import { allowedTo, verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { userValidationSchema } from "./user.validation.js";


export const userRouter = express.Router();


userRouter
    .route('/')
    .get(verifyToken, allowedTo(['admin']), getAllUser);

userRouter
    .route('/:id')
    .get(verifyToken, allowedTo(['admin']), getSpUser)
    .put(verifyToken, allowedTo(['user', 'admin', 'vendor']), uploadFiles('single', 'profilePic', 'user'),validation(userValidationSchema), updateUser)
    .delete(verifyToken, allowedTo(['user', 'admin', 'vendor']), deleteUser);


