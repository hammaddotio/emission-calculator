import FireSuppressantDataCollection from '../../models/calculators/fireSuppressant.model.js';
import { fireSuppressantSchema } from '../../validators/fireSuppressantValidator.js';

// Create a new fire suppressant entry
export const createFireSuppressant = async (req, res) => {
    const { error } = fireSuppressantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const fireSuppressant = await FireSuppressantDataCollection.create({
            ...req.body, // Spread operator to include all other fields
            user: req.user_id // Assign user_id to the user field
        });
        await fireSuppressant.save();
        res.status(201).json(fireSuppressant);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all fire suppressants
export const getAllFireSuppressants = async (req, res) => {
    try {
        const fireSuppressants = await FireSuppressantDataCollection.find();
        res.status(200).json(fireSuppressants);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get a fire suppressant by ID
export const getFireSuppressantById = async (req, res) => {
    try {
        const fireSuppressant = await FireSuppressantDataCollection.findById(req.params.id);
        if (!fireSuppressant) return res.status(404).json({ message: 'Fire suppressant not found' });
        res.status(200).json(fireSuppressant);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update a fire suppressant by ID
export const updateFireSuppressant = async (req, res) => {
    const { error } = fireSuppressantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const fireSuppressant = await FireSuppressantDataCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fireSuppressant) return res.status(404).json({ message: 'Fire suppressant not found' });
        res.status(200).json(fireSuppressant);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete a fire suppressant by ID
export const deleteFireSuppressant = async (req, res) => {
    try {
        const fireSuppressant = await FireSuppressantDataCollection.findByIdAndDelete(req.params.id);
        if (!fireSuppressant) return res.status(404).json({ message: 'Fire suppressant not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
