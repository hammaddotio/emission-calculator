import MobileCombustion from '../../models/calculators/mobileCombustion.model.js';
import { mobileCombustionSchema } from '../../validators/mobileCombustionValidator.js'; // Import the validation schema

// Create Mobile Combustion Record
export const createMobileCombustion = async (req, res) => {
    // Validate the request body using Joi
    const { error, value } = mobileCombustionSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message // Send the validation error message
        });
    }

    try {
        // Create a new mobile combustion record
        const newCombustion = new MobileCombustion({
            ...value, // Validated data
            user: req.user_id // Assign user_id from authenticated user
        });

        await newCombustion.save();

        res.status(201).json({
            success: true,
            message: 'Mobile combustion record created successfully',
            emission: newCombustion
        });
    } catch (error) {
        console.error('Error creating mobile combustion record:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating mobile combustion record',
            error: error.message
        });
    }
};

// Get all Mobile Combustion Records
export const getAllMobileCombustions = async (req, res) => {
    try {
        const combustions = await MobileCombustion.find().populate('user', 'name email'); // Assuming user has name and email
        res.status(200).json({
            success: true,
            emissions: combustions
        });
    } catch (error) {
        console.error('Error fetching mobile combustion records:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mobile combustion records',
            error: error.message
        });
    }
};

// Get a single Mobile Combustion Record by ID
export const getMobileCombustionById = async (req, res) => {
    try {
        const combustion = await MobileCombustion.findById(req.params.id).populate('user', 'name email');
        if (!combustion) {
            return res.status(404).json({
                success: false,
                message: 'Mobile combustion record not found'
            });
        }
        res.status(200).json({
            success: true,
            emission: combustion
        });
    } catch (error) {
        console.error('Error fetching mobile combustion record:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mobile combustion record',
            error: error.message
        });
    }
};

// Update Mobile Combustion Record
export const updateMobileCombustion = async (req, res) => {
    // Validate the request body using Joi
    const { error, value } = mobileCombustionSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message // Send the validation error message
        });
    }

    try {
        const combustion = await MobileCombustion.findByIdAndUpdate(
            req.params.id,
            { ...value }, // Updated values
            { new: true, runValidators: true }
        );

        if (!combustion) {
            return res.status(404).json({
                success: false,
                message: 'Mobile combustion record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Mobile combustion record updated successfully',
            emission: combustion
        });
    } catch (error) {
        console.error('Error updating mobile combustion record:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating mobile combustion record',
            error: error.message
        });
    }
};

// Delete Mobile Combustion Record
export const deleteMobileCombustion = async (req, res) => {
    try {
        const combustion = await MobileCombustion.findByIdAndDelete(req.params.id);

        if (!combustion) {
            return res.status(404).json({
                success: false,
                message: 'Mobile combustion record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Mobile combustion record deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting mobile combustion record:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting mobile combustion record',
            error: error.message
        });
    }
};
