import Joi from 'joi';

export const addToWishlistValidationSchema = Joi.object({
    product: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/) 
        .messages({
            'string.empty': 'Product ID is required',
            'string.pattern.base': 'Product ID must be a valid MongoDB ObjectId',
            'any.required': 'Product ID is required',
        }),
});