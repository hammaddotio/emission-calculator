// validations/refrigerantValidation.js
import Joi from 'joi';

const refrigerantSchema = Joi.object({
    amountBeginning: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Amount Beginning must be a number.',
            'number.positive': 'Amount Beginning must be a positive number.',
            'any.required': 'Amount Beginning is required.',
        }),
    amountDisposed: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Amount Disposed must be a number.',
            'number.positive': 'Amount Disposed must be a positive number.',
            'any.required': 'Amount Disposed is required.',
        }),
    amountEnd: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Amount End must be a number.',
            'number.positive': 'Amount End must be a positive number.',
            'any.required': 'Amount End is required.',
        }),
    amountPurchased: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Amount Purchased must be a number.',
            'number.positive': 'Amount Purchased must be a positive number.',
            'any.required': 'Amount Purchased is required.',
        }),
    emissions: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Emissions must be a number.',
            'number.positive': 'Emissions must be a positive number.',
            'any.required': 'Emissions are required.',
        }),
    gwp: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'GWP must be a number.',
            'number.positive': 'GWP must be a positive number.',
            'any.required': 'GWP is required.',
        }),
    refrigerantType: Joi.string()
        .required()
        .messages({
            'any.required': 'Refrigerant Type is required.',
        }),
});

const refrigerantDataSchema = Joi.object({
    refrigerants: Joi.array()
        .items(refrigerantSchema)
        .required()
        .messages({
            'array.base': 'Refrigerants must be an array.',
            'any.required': 'Refrigerants are required.',
        }),
    totalEmissions: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Total Emissions must be a number.',
            'number.positive': 'Total Emissions must be a positive number.',
            'any.required': 'Total Emissions are required.',
        }),
});

export const validateRefrigerantData = (data) => {
    const { error } = refrigerantDataSchema.validate(data, { abortEarly: false });
    return {
        error: error ? error.details.map(err => err.message) : null,
    };
};
