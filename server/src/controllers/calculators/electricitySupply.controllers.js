import { ElectricitySupply } from '../../models/calculators/electricitySupply.model.js';
import { electricitySupplySchema } from '../../validators/electricitySupplyValidator.js';

// Create a new entry
export const createElectricitySupply = async (req, res) => {
    try {
        const { error } = electricitySupplySchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const electricitySupply = new ElectricitySupply({
            ...req.body, // Spread operator to include all other fields
            user: req.user_id // Assign user_id to the user field
        });
        await electricitySupply.save();
        res.status(201).json(electricitySupply);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read all entries
export const getElectricitySupplies = async (req, res) => {
    try {
        const supplies = await ElectricitySupply.find();
        res.json(supplies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read a single entry
export const getElectricitySupply = async (req, res) => {
    try {
        const supply = await ElectricitySupply.findById(req.params.id);
        if (!supply) return res.status(404).json({ message: 'Supply not found' });
        res.json(supply);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an entry
export const updateElectricitySupply = async (req, res) => {
    try {
        const { error } = electricitySupplySchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const supply = await ElectricitySupply.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!supply) return res.status(404).json({ message: 'Supply not found' });
        res.json(supply);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an entry
export const deleteElectricitySupply = async (req, res) => {
    try {
        const supply = await ElectricitySupply.findByIdAndDelete(req.params.id);
        if (!supply) return res.status(404).json({ message: 'Supply not found' });
        res.json({ message: 'Supply deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
