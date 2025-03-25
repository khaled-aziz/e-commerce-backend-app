import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/)
        .required()
        .messages({
            'string.empty': 'Category name is required',
            'string.min': 'Category name must be at least {#limit} characters long',
            'string.max': 'Category name must be at most {#limit} characters long',
            'any.required': 'Category name is required',
        }),
    image: Joi.string()
        .trim()
        .optional()
        .messages({
            'string.empty': 'Image must be a valid string',
        }),
});