import Joi from "joi";

export const creatProductSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/)
        .required(),

    description: Joi.string()
        .trim()
        .min(5)
        .max(200)
        .pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/)
        .required(),

    price: Joi.number()
        .min(0)
        .required(),

    priceAfterDiscount: Joi.number()
        .min(0)
        .optional(),

    ratingAvrg: Joi.number()
        .min(1)
        .max(10)
        .optional(),

    ratingCount: Joi.number()
        .default(0)
        .min(0)
        .optional(),

    quantity: Joi.number()
        .min(0)
        .required(),

    sold: Joi.number()
        .default(0)
        .min(0)
        .optional(),

    imageCover: Joi.string().pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/).optional(),

    images: Joi.array()
        .items(Joi.string().pattern(/^[a-zA-Z0-9\s\-_,.()&]+$/))
        .optional(),

    category: Joi.string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/) 
        .required(),

    subCategory: Joi.string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/) 
        .required(),

    brand: Joi.string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/) 
        .required(),
});