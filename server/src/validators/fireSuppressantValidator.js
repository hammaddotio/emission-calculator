import Joi from 'joi';

// Joi validation schema for fire suppressant data
const fireSuppressantDataSchema = Joi.object({
    key: Joi.string().required().messages({
        'string.base': '"Key" should be a type of string',
        'string.empty': '"Key" cannot be an empty field',
        'any.required': '"Key" is a required field'
    }),
    gas: Joi.string().required().messages({
        'string.base': '"Gas" should be a type of string',
        'string.empty': '"Gas" cannot be an empty field',
        'any.required': '"Gas" is a required field'
    }),
    gwp: Joi.number().required().messages({
        'number.base': '"GWP" should be a type of number',
        'any.required': '"GWP" is a required field'
    }),
    inventoryChange: Joi.number().required().greater(0).messages({
        'number.base': '"Inventory Change" should be a type of number',
        'number.greater': '"Inventory Change" must be greater than 0',
        'any.required': '"Inventory Change" is a required field'
    }),
    transferredAmount: Joi.number().required().greater(0).messages({
        'number.base': '"Transferred Amount" should be a type of number',
        'number.greater': '"Transferred Amount" must be greater than 0',
        'any.required': '"Transferred Amount" is a required field'
    }),
    capacityChange: Joi.number().required().greater(0).messages({
        'number.base': '"Capacity Change" should be a type of number',
        'number.greater': '"Capacity Change" must be greater than 0',
        'any.required': '"Capacity Change" is a required field'
    }),
    co2Equivalent: Joi.number().required().greater(0).messages({
        'number.base': '"CO2 Equivalent" should be a type of number',
        'number.greater': '"CO2 Equivalent" must be greater than 0',
        'any.required': '"CO2 Equivalent" is a required field'
    }),
});

// Joi validation schema for the main FireSuppressant object
const fireSuppressantSchema = Joi.object({
    fireSuppressants: Joi.array().items(fireSuppressantDataSchema).required().messages({
        'array.base': '"Fire Suppressants" should be an array',
        'any.required': '"Fire Suppressants" is a required field'
    }),
    totalCO2Equivalent: Joi.number().required().messages({
        'number.base': '"Total CO2 Equivalent" should be a type of number',
        'any.required': '"Total CO2 Equivalent" is a required field'
    }),
    totalCapacityChange: Joi.number().required().messages({
        'number.base': '"Total Capacity Change" should be a type of number',
        'any.required': '"Total Capacity Change" is a required field'
    }),
    totalInventoryChange: Joi.number().required().messages({
        'number.base': '"Total Inventory Change" should be a type of number',
        'any.required': '"Total Inventory Change" is a required field'
    }),
    totalTransferredAmount: Joi.number().required().messages({
        'number.base': '"Total Transferred Amount" should be a type of number',
        'any.required': '"Total Transferred Amount" is a required field'
    }),
});

// Export the validation schemas
export { fireSuppressantSchema };
