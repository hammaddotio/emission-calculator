// controllers/refrigerantController.js
import { Refrigerant } from '../../models/calculators/refrigerant.model.js';
import { validateRefrigerantData } from '../../validators/RefrigerantValidator.js'

// Create new refrigerant data
export const createRefrigerantData = async (req, res) => {
    console.log(req.body)
    const { error } = validateRefrigerantData(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            error: error
        });
    }

    try {
        const refrigerantData = new Refrigerant({
            ...req.body, // Spread operator to include all other fields
            user: req.user_id // Assign user_id to the user field
        });
        await refrigerantData.save();
        res.status(201).json({ status: true, message: 'Refrigerant data saved successfully', error: null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error saving refrigerant data', error: error.message });
    }
};

// Read all refrigerant data
export const getRefrigerantData = async (req, res) => {
    try {
        const refrigerantData = await Refrigerant.find();
        res.status(200).json({
            status: true,
            message: 'Refrigerant data fetched successfully',
            error: null,
            data: refrigerantData.length ? refrigerantData : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error fetching refrigerant data', error: error.message });
    }
};

// Update refrigerant data by ID
export const updateRefrigerantData = async (req, res) => {
    const { id } = req.params;

    const { error } = validateRefrigerantData(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            error: error.details.map(err => err.message)
        });
    }

    try {
        const updatedData = await RefrigerantData.Refrigerant(id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).json({ status: false, message: 'Refrigerant data not found', error: null });
        }
        res.status(200).json({ status: true, message: 'Refrigerant data updated successfully', error: null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error updating refrigerant data', error: error.message });
    }
};

// Delete refrigerant data by ID
export const deleteRefrigerantData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedData = await Refrigerant.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ status: false, message: 'Refrigerant data not found', error: null });
        }
        res.status(200).json({ status: true, message: 'Refrigerant data deleted successfully', error: null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error deleting refrigerant data', error: error.message });
    }
};
