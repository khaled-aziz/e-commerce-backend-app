import Joi from 'joi';

export const cartValidationSchema = Joi.object({
    product: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/),
    quantity: Joi.number()
        .integer()
        .min(1)
        .default(1),
});