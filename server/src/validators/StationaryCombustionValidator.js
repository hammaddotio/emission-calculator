import Joi from 'joi';

const emissionSchema = Joi.object({
    key: Joi.string().required().messages({
        'string.empty': 'Key is required',
        'any.required': 'Key is required',
    }),
    amountUsed: Joi.number().positive().required().messages({
        'number.base': 'Amount used must be a number',
        'number.positive': 'Amount used must be a positive number',
        'any.required': 'Amount used is required',
    }),
    fuelType: Joi.string().valid('Diesel', 'Gas').required().messages({
        'string.empty': 'Fuel type is required',
        'any.required': 'Fuel type is required',
        'any.only': 'Fuel type must be either Diesel or Gas',
    }),
    totalCh4Emissions: Joi.number().allow(null).messages({
        'number.base': 'Total CH4 emissions must be a number',
    }),
    totalCo2Emissions: Joi.number().allow(null).messages({
        'number.base': 'Total CO2 emissions must be a number',
    }),
    totalKgCo2e: Joi.number().allow(null).messages({
        'number.base': 'Total kg CO2e must be a number',
    }),
    totalN2oEmissions: Joi.number().allow(null).messages({
        'number.base': 'Total N2O emissions must be a number',
    }),
});


const stationaryCombustionSchema = Joi.object({
    emissions: Joi.array().items(emissionSchema).required().messages({
        'array.base': 'Emissions must be an array',
        'any.required': 'Emissions are required',
    }),
    totalCh4Emissions: Joi.number().allow(null).messages({
        'number.base': 'Total CH4 emissions must be a number',
    }),
    totalCo2Emissions: Joi.number().allow(null).messages({
        'number.base': 'Total CO2 emissions must be a number',
    }),
    totalN2oEmissions: Joi.number().allow(null).messages({
        'number.base': 'Total N2O emissions must be a number',
    }),
    totalKgCo2e: Joi.number().allow(null).messages({
        'number.base': 'Total kg CO2e must be a number',
    }),
});

export const validateStationaryCombustion = (data) => {
    return stationaryCombustionSchema.validate(data, { abortEarly: false });
};
