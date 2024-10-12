import Refrigerant from '../../models/calculators/refrigerant.model.js';

// Create multiple refrigerant records
export const createRefrigerant = async (req, res) => {
    const refrigerantData = req.body; // This should be an array of refrigerant objects

    try {
        // Create multiple refrigerant records using Mongoose
        const refrigerants = await Refrigerant.insertMany(refrigerantData);
        res.status(201).json({ success: true, message: 'Refrigerants created successfully', data: refrigerants });
    } catch (error) {
        console.error('Error creating refrigerants:', error);
        res.status(500).json({ success: false, message: 'Error creating refrigerants', error: error.message });
    }
};

// Get all refrigerant records
export const getAllRefrigerants = async (req, res) => {
    try {
        const refrigerants = await Refrigerant.find();
        res.status(200).json({ success: true, message: 'Refrigerants fetched successfully', data: refrigerants });
    } catch (error) {
        console.error('Error fetching refrigerants:', error);
        res.status(500).json({ success: false, message: 'Error fetching refrigerants', error: error.message });
    }
};

// Get a refrigerant record by ID
export const getRefrigerantById = async (req, res) => {
    const { id } = req.params;

    try {
        const refrigerant = await Refrigerant.findById(id);
        if (!refrigerant) {
            return res.status(404).json({ success: false, message: 'Refrigerant not found' });
        }
        res.status(200).json({ success: true, message: 'Refrigerant fetched successfully', data: refrigerant });
    } catch (error) {
        console.error('Error fetching refrigerant:', error);
        res.status(500).json({ success: false, message: 'Error fetching refrigerant', error: error.message });
    }
};

// Update a refrigerant record by ID
export const updateRefrigerant = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const refrigerant = await Refrigerant.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!refrigerant) {
            return res.status(404).json({ success: false, message: 'Refrigerant not found' });
        }
        res.status(200).json({ success: true, message: 'Refrigerant updated successfully', data: refrigerant });
    } catch (error) {
        console.error('Error updating refrigerant:', error);
        res.status(500).json({ success: false, message: 'Error updating refrigerant', error: error.message });
    }
};

// Delete a refrigerant record by ID
export const deleteRefrigerant = async (req, res) => {
    const { id } = req.params;

    try {
        const refrigerant = await Refrigerant.findByIdAndDelete(id);
        if (!refrigerant) {
            return res.status(404).json({ success: false, message: 'Refrigerant not found' });
        }
        res.status(204).json({ success: true, message: 'Refrigerant deleted successfully' }); // No content to send back
    } catch (error) {
        console.error('Error deleting refrigerant:', error);
        res.status(500).json({ success: false, message: 'Error deleting refrigerant', error: error.message });
    }
};
