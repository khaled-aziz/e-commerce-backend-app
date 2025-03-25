import Joi from 'joi';

export const couponValidationSchema = Joi.object({
    code: Joi.string()
        .trim()
        .required()
        .pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/)
        .messages({
            'string.empty': 'Coupon code is required',
            'any.required': 'Coupon code is required',
        }),
    discount: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Discount must be a number',
            'number.min': 'Discount must be a positive number',
            'any.required': 'Discount is required',
        }),
    expires: Joi.date()
        .required()
        .messages({
            'date.base': 'Expiry date must be a valid date',
            'any.required': 'Expiry date is required',
        }),
});