import Joi from 'joi';

export const subCategoryValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Subcategory name is required',
            'string.min': 'Subcategory name must be at least {#limit} characters long',
            'string.max': 'Subcategory name must be at most {#limit} characters long',
            'any.required': 'Subcategory name is required',
        }),
    category: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.empty': 'Category ID is required',
            'string.pattern.base': 'Category ID must be a valid MongoDB ObjectId',
            'any.required': 'Category ID is required',
        }),
});