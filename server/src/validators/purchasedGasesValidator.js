import Joi from 'joi';

// Joi validation schema for individual purchased gas data
const purchasedGasDataValidationSchema = Joi.object({
    facilityDescription: Joi.string().required().messages({
        'string.base': 'Facility description must be a string',
        'any.required': 'Facility description is required',
    }),
    amountConsumed: Joi.number().required().messages({
        'number.base': 'Amount consumed must be a number',
        'any.required': 'Amount consumed is required',
    }),
    co2EmissionFactor: Joi.number().required().messages({
        'number.base': 'CO2 emission factor must be a number',
        'any.required': 'CO2 emission factor is required',
    }),
    ch4EmissionFactor: Joi.number().required().messages({
        'number.base': 'CH4 emission factor must be a number',
        'any.required': 'CH4 emission factor is required',
    }),
    n2oEmissionFactor: Joi.number().required().messages({
        'number.base': 'N2O emission factor must be a number',
        'any.required': 'N2O emission factor is required',
    }),
    indirectGHG: Joi.number().required().messages({
        'number.base': 'Indirect GHG must be a number',
        'any.required': 'Indirect GHG is required',
    }),
});

// Joi validation schema for collection of purchased gas data
const purchasedGasCollectionValidationSchema = Joi.object({
    PurchasedGas: Joi.array().items(purchasedGasDataValidationSchema).required().messages({
        'array.base': 'Purchased gas data must be an array',
        'any.required': 'Purchased gas data is required',
    }),
    totalEmissions: Joi.number().required().messages({
        'number.base': 'Total emissions must be a number',
        'any.required': 'Total emissions is required',
    }),
});

// Export the validation schemas
export { purchasedGasCollectionValidationSchema };
