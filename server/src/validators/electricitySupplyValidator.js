import Joi from 'joi';

const monthDataSchema = Joi.object({
    description: Joi.string()
        .required()
        .messages({
            'string.base': '"description" should be a type of string',
            'string.empty': '"description" cannot be an empty field',
            'any.required': '"description" is a required field'
        }),
    electricityPurchased: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': '"electricityPurchased" should be a type of number',
            'number.min': '"electricityPurchased" must be greater than or equal to 0',
            'any.required': '"electricityPurchased" is a required field'
        }),
    emissionFactor: Joi.number()
        .min(0)
        .default(0.7)
        .messages({
            'number.base': '"emissionFactor" should be a type of number',
            'number.min': '"emissionFactor" must be greater than or equal to 0',
        }),
    powerCompanySpecific: Joi.number()
        .min(0)
        .default(0)
        .messages({
            'number.base': '"powerCompanySpecific" should be a type of number',
            'number.min': '"powerCompanySpecific" must be greater than or equal to 0',
        }),
    emissions: Joi.number()
        .min(0)
        .default(0)
        .messages({
            'number.base': '"emissions" should be a type of number',
            'number.min': '"emissions" must be greater than or equal to 0',
        }),
});

const electricitySupplySchema = Joi.object({
    companyName: Joi.string()
        .required()
        .messages({
            'string.base': '"companyName" should be a type of string',
            'string.empty': '"companyName" cannot be an empty field',
            'any.required': '"companyName" is a required field'
        }),
    facilityData: Joi.array()
        .items(monthDataSchema)
        .required()
        .messages({
            'array.base': '"facilityData" should be an array',
            'any.required': '"facilityData" is a required field'
        }),
    totalEmissions: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': '"totalEmissions" should be a type of number',
            'number.min': '"totalEmissions" must be greater than or equal to 0',
            'any.required': '"totalEmissions" is a required field'
        }),
});

export { electricitySupplySchema };
