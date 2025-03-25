import Joi from 'joi';

export const orderValidationSchema = Joi.object({
    shippingAddress: Joi.object({
        street: Joi.string()
            .trim()
            .required()
            .messages({
                'string.empty': 'Street is required',
                'any.required': 'Street is required',
            }),
        city: Joi.string()
            .trim()
            .required()
            .messages({
                'string.empty': 'City is required',
                'any.required': 'City is required',
            }),
        phone: Joi.string()
            .trim()
            .required()
            .messages({
                'string.empty': 'Phone is required',
                'any.required': 'Phone is required',
            }),
    })
        .required()
        .messages({
            'object.base': 'Shipping address must be an object',
            'any.required': 'Shipping address is required',
        })
})