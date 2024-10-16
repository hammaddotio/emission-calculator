import { User } from "../../models/user.models.js";
import { encrypt_password } from "../../utils/bcrypt.js";
import { validateUser } from "../../validators/userValidator.js";

// Consistent response format helper
const sendResponse = (res, status, message, data = null, error = null) => {
    return res.status(status).json({
        status: status === 200 || status === 201,
        message,
        data,
        error,
    });
};


export const create_user = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return sendResponse(res, 400, "Validation error", null, error.details[0].message);
        }

        const { username, email, password, user_role } = req.body;
        const encryptedPassword = await encrypt_password(password);

        const newUser = new User({
            username,
            email,
            user_role,
            password: encryptedPassword,
        });

        const savedUser = await newUser.save();
        return sendResponse(res, 201, "User created successfully", savedUser);
    } catch (error) {
        return sendResponse(res, 500, "Failed to create user", null, error.message);
    }
};

export const get_all_users = async (req, res) => {
    try {
        const users = await User.find();
        return sendResponse(res, 200, "Users retrieved successfully", users);
    } catch (error) {
        return sendResponse(res, 500, "Failed to retrieve users", null, error.message);
    }
};

export const get_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User retrieved successfully", user);
    } catch (error) {
        return sendResponse(res, 500, "Failed to retrieve user", null, error.message);
    }
};

export const update_user = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return sendResponse(res, 400, "Validation error", null, error.details[0].message);
        }

        const { username, email, password, user_role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return sendResponse(res, 404, "User not found");
        }

        const updatedData = {
            username,
            email,
            user_role,
            password: await encrypt_password(password),
        };

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        return sendResponse(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
        return sendResponse(res, 500, "Failed to update user", null, error.message);
    }
};

export const delete_user = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User deleted successfully", user);
    } catch (error) {
        return sendResponse(res, 500, "Failed to delete user", null, error.message);
    }
};


