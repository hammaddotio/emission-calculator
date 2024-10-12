import { StationaryCombustion } from '../../models/calculators/stationaryCombustion.model.js';
import { validateStationaryCombustion } from '../../validators/StationaryCombustionValidator.js';

// Create
export const createStationaryCombustionData = async (req, res) => {
    console.log(req.body)
    const { error } = validateStationaryCombustion(req.body);
    if (error) {
        return res.status(400).json({ status: false, message: 'Validation error', details: error.details });
    }

    try {
        const combustionData = new StationaryCombustion(req.body);
        await combustionData.save();
        res.status(201).json({ status: true, data: combustionData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error saving stationary combustion data' });
    }
};

// Read all
export const getAllStationaryCombustionData = async (req, res) => {
    try {
        const data = await StationaryCombustion.find();
        res.status(200).json({ status: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error fetching stationary combustion data' });
    }
};

// Read one
export const getStationaryCombustionDataById = async (req, res) => {
    try {
        const data = await StationaryCombustion.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ status: false, message: 'Data not found' });
        }
        res.status(200).json({ status: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error fetching stationary combustion data' });
    }
};

// Update
export const updateStationaryCombustionData = async (req, res) => {
    const { error } = validateStationaryCombustion(req.body);
    if (error) {
        return res.status(400).json({ status: false, message: 'Validation error', details: error.details });
    }

    try {
        const data = await StationaryCombustion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!data) {
            return res.status(404).json({ status: false, message: 'Data not found' });
        }
        res.status(200).json({ status: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error updating stationary combustion data' });
    }
};

// Delete
export const deleteStationaryCombustionData = async (req, res) => {
    try {
        const data = await StationaryCombustion.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ status: false, message: 'Data not found' });
        }
        res.status(204).json({ status: true, message: 'Data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error deleting stationary combustion data' });
    }
};
