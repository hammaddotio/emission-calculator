import Joi from 'joi';

export const validateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': 'Username must be a string.',
                'string.empty': 'Username cannot be empty.',
                'string.min': 'Username must be at least 3 characters long.',
                'string.max': 'Username must be at most 30 characters long.',
                'any.required': 'Username is required.',
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string.',
                'string.empty': 'Email cannot be empty.',
                'string.email': 'Email must be a valid email address.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string(),
        user_role: Joi.string()
            .required()
            .messages({
                'string.base': 'User role must be a string.',
                'string.empty': 'User role cannot be empty.',
                'any.required': 'User role is required.',
            }),
    });

    return schema.validate(data);
};
