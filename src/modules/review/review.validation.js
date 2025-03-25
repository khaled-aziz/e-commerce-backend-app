import Joi from 'joi';

export const reviewValidationSchema = Joi.object({
    comment: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Review comment is required',
            'any.required': 'Review comment is required',
        }),
    product: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/) 
        .messages({
            'string.empty': 'Product ID is required',
            'string.pattern.base': 'Product ID must be a valid MongoDB ObjectId',
            'any.required': 'Product ID is required',
        }),
    rating: Joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            'number.base': 'Rating must be a number',
            'number.min': 'Rating must be at least 1',
            'number.max': 'Rating must be at most 5',
            'any.required': 'Rating is required',
        }),
});