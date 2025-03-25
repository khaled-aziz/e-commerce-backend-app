import Joi from 'joi';

export const brandValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/)
        .required(),
    logo: Joi.string()
        .trim()
        .pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/)
        .optional()
});