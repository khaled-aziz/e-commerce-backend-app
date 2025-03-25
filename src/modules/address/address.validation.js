import Joi from 'joi';

export const addAddressValidationSchema  = Joi.object({
    city: Joi.string()
        .trim()
        .required(),
    street: Joi.string()
        .trim()
        .required(),
    phone: Joi.string()
        .trim()
        .required()
});