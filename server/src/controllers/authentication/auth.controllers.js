import { User } from "../../models/user.models.js"
import Joi from "joi"
import { compare_password, encrypt_password } from "../../utils/bcrypt.js"
import { generate_jwt_token } from "../../utils/jwt.js"

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;

        // Validation schema using Joi
        const user_registration_schema = Joi.object({
            username: Joi.string().required('Username is required'),
            email: Joi.string().email().required('Email is required'),
            password: Joi.string().min(6).max(20).required('Password is required'),
        });

        // Validate the request body against the schema
        const { error } = user_registration_schema.validate(req.body);
        console.log(error)
        if (error) return res.status(400).json({ error: error.message });

        // Check if the user is already registered
        const check_already_registered = await User.findOne({ email });
        if (check_already_registered) return res.status(401).json({ error: 'User already registered' });

        // Encrypt the password
        const encrypted_password = await encrypt_password(password);
        console.log(encrypted_password)

        // Create a new user with the encrypted password
        const user = await User.create({
            username,
            email,
            password: encrypted_password,
        });
        console.log(user)

        // Return the newly created user
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Define validation schema using Joi
        const user_login_schema = Joi.object({
            email: Joi.string().email().required().messages({
                'any.required': 'Email is required',
                'string.email': 'Must be a valid email address'
            }),
            password: Joi.string().min(6).max(20).required().messages({
                'any.required': 'Password is required',
                'string.min': 'Password must be at least 6 characters long',
                'string.max': 'Password must not exceed 20 characters'
            }),
        });

        // Validate the request body
        const { error } = user_login_schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        // Find user by email
        const find_user = await User.findOne({ email });
        if (!find_user) return res.status(401).json({ error: 'User not found' });

        // Compare provided password with the stored hashed password
        const is_password_valid = await compare_password(password, find_user.password);
        if (!is_password_valid) return res.status(401).json({ error: 'Invalid credentials' });

        // Set user session (assuming you have express-session middleware configured)
        req.session.userId = find_user._id; // Store user ID in the session

        // Optionally, set a cookie for session ID (if you're using sessions)
        res.cookie('sessionId', req.session.id, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Only set on HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'Strict' // Adjust as needed (Strict, Lax, None)
        });

        // Return user data (excluding password)
        const { password: _, ...user_data } = find_user._doc; // Exclude password from the response
        res.status(200).json({ user: user_data }); // No token needed, session is handled via cookie
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};

