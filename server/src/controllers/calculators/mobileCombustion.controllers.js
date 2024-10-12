import MobileCombustion from '../../models/calculators/mobileCombustion.model.js';

// Create a new mobile combustion record
export const createMobileCombustion = async (req, res) => {
    const { fuelType, amount, co2EmissionFactor, co2Emissions, ch4EmissionFactor, ch4Emissions, n2oEmissionFactor, n2oEmissions, totalEmissions } = req.body;

    // Log the incoming request body
    console.log(req.body);

    // Check for missing fields
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required.'
        });
    }

    try {
        const newCombustion = await MobileCombustion.insertMany(req.body); // Wrap in array for insertMany
        console.log(newCombustion);

        res.status(201).json({
            success: true,
            message: 'Mobile combustion record created successfully',
            emission: newCombustion
        });
    } catch (error) {
        console.error('Error creating mobile combustion record:', error);

        // Check if error is due to validation issues
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error: ' + error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating mobile combustion record',
            error: error.message
        });
    }
};

// Get all mobile combustion records
export const getAllMobileCombustions = async (req, res) => {
    try {
        const combustions = await MobileCombustion.find();
        res.status(200).json({
            success: true,
            combustions
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

// Get a mobile combustion record by ID
export const getMobileCombustionById = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID parameter is required.'
        });
    }

    try {
        const combustion = await MobileCombustion.findById(id);

        if (!combustion) {
            return res.status(404).json({
                success: false,
                message: 'Mobile combustion record not found'
            });
        }

        res.status(200).json({
            success: true,
            combustion
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

// Update a mobile combustion record by ID
export const updateMobileCombustion = async (req, res) => {
    const { id } = req.params;
    const { fuelType, amount, co2EmissionFactor, co2Emissions, ch4EmissionFactor, ch4Emissions, n2oEmissionFactor, n2oEmissions, totalEmissions } = req.body;

    // Check if ID is valid
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID parameter is required.'
        });
    }

    // Check for missing fields
    if (!fuelType || amount == null || co2EmissionFactor == null || co2Emissions == null || ch4EmissionFactor == null || ch4Emissions == null || n2oEmissionFactor == null || n2oEmissions == null || totalEmissions == null) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required.'
        });
    }

    try {
        const updatedCombustion = await MobileCombustion.findByIdAndUpdate(
            id,
            {
                fuelType,
                amount,
                co2EmissionFactor,
                co2Emissions,
                ch4EmissionFactor,
                ch4Emissions,
                n2oEmissionFactor,
                n2oEmissions,
                totalEmissions
            },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedCombustion) {
            return res.status(404).json({
                success: false,
                message: 'Mobile combustion record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Mobile combustion record updated successfully',
            emission: updatedCombustion
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

// Delete a mobile combustion record
export const deleteMobileCombustion = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID parameter is required.'
        });
    }

    try {
        const combustion = await MobileCombustion.findByIdAndDelete(id);

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
