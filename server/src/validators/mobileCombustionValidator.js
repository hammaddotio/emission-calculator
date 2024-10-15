import Joi from 'joi';

// Define the Joi schema for each fuel record
const fuelRecordSchema = Joi.object({
    fuelType: Joi.string()
        // .valid('Gasoline', 'Diesel', 'Propane', 'Natural Gas', 'Other')
        .required()
        .messages({
            'any.required': 'Fuel type is required',
            'string.base': 'Fuel type must be a string',
            'any.only': 'Fuel type must be one of Gasoline, Diesel, Propane, Natural Gas, or Other'
        }),
    amount: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'Amount is required',
            'number.base': 'Amount must be a number',
            'number.min': 'Amount must be a positive number'
        }),
    co2EmissionFactor: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'CO2 emission factor is required',
            'number.base': 'CO2 emission factor must be a number',
            'number.min': 'CO2 emission factor must be a positive number'
        }),
    co2Emissions: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'CO2 emissions are required',
            'number.base': 'CO2 emissions must be a number',
            'number.min': 'CO2 emissions must be a positive number'
        }),
    ch4EmissionFactor: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'CH4 emission factor is required',
            'number.base': 'CH4 emission factor must be a number',
            'number.min': 'CH4 emission factor must be a positive number'
        }),
    ch4Emissions: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'CH4 emissions are required',
            'number.base': 'CH4 emissions must be a number',
            'number.min': 'CH4 emissions must be a positive number'
        }),
    n2oEmissionFactor: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'N2O emission factor is required',
            'number.base': 'N2O emission factor must be a number',
            'number.min': 'N2O emission factor must be a positive number'
        }),
    n2oEmissions: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'N2O emissions are required',
            'number.base': 'N2O emissions must be a number',
            'number.min': 'N2O emissions must be a positive number'
        }),
    totalEmissions: Joi.number()
        .min(0)
        .required()
        .messages({
            'any.required': 'Total emissions are required',
            'number.base': 'Total emissions must be a number',
            'number.min': 'Total emissions must be a positive number'
        })
});

// Define the Joi schema for the overall mobile combustion
export const mobileCombustionSchema = Joi.object({
    fuelRecords: Joi.array().items(fuelRecordSchema).min(1).required(),
    totals: Joi.object({
        co2Emissions: Joi.number().min(0).required().messages({
            'any.required': 'Total CO2 is required',
            'number.base': 'Total CO2 must be a number',
            'number.min': 'Total CO2 must be a positive number'
        }),
        ch4Emissions: Joi.number().min(0).required().messages({
            'any.required': 'Total CH4 is required',
            'number.base': 'Total CH4 must be a number',
            'number.min': 'Total CH4 must be a positive number'
        }),
        n2oEmissions: Joi.number().min(0).required().messages({
            'any.required': 'Total N2O is required',
            'number.base': 'Total N2O must be a number',
            'number.min': 'Total N2O must be a positive number'
        }),
        totalEmissions: Joi.number().min(0).required().messages({
            'any.required': 'Total emissions are required',
            'number.base': 'Total emissions must be a number',
            'number.min': 'Total emissions must be a positive number'
        })
    }).required()
});
