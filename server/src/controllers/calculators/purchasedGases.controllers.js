import { purchasedGasCollectionValidationSchema } from '../../validators/purchasedGasesValidator.js';
import { PurchasedGasCollection } from '../../models/calculators/purchasedGases.model.js';

// Create a new PurchasedGasCollection
export const createPurchasedGasCollection = async (req, res) => {
    try {
        const { error, value } = purchasedGasCollectionValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                status: false,
                data: null,
                error: error.details.map(err => err.message),
            });
        }

        const newCollection = await PurchasedGasCollection.create({
            ...req.body, // Spread operator to include all other fields
            user: req.user_id // Assign user_id to the user field
        });
        return res.status(201).json({
            message: 'Purchased gas collection created successfully',
            status: true,
            data: newCollection,
            error: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            status: false,
            data: null,
            error: err.message,
        });
    }
};

// Read all PurchasedGasCollections
export const getAllPurchasedGasCollections = async (req, res) => {
    try {
        const collections = await PurchasedGasCollection.find();
        return res.status(200).json({
            message: 'Fetched all purchased gas collections successfully',
            status: true,
            data: collections,
            error: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            status: false,
            data: null,
            error: err.message,
        });
    }
};

// Read a specific PurchasedGasCollection by ID
export const getPurchasedGasCollectionById = async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await PurchasedGasCollection.findById(id);
        if (!collection) {
            return res.status(404).json({
                message: 'Purchased gas collection not found',
                status: false,
                data: null,
                error: null,
            });
        }
        return res.status(200).json({
            message: 'Fetched purchased gas collection successfully',
            status: true,
            data: collection,
            error: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            status: false,
            data: null,
            error: err.message,
        });
    }
};

// Update a PurchasedGasCollection by ID
export const updatePurchasedGasCollection = async (req, res) => {
    const { id } = req.params;
    try {
        const { error, value } = purchasedGasCollectionValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                status: false,
                data: null,
                error: error.details.map(err => err.message),
            });
        }

        const updatedCollection = await PurchasedGasCollection.findByIdAndUpdate(id, value, { new: true });
        if (!updatedCollection) {
            return res.status(404).json({
                message: 'Purchased gas collection not found',
                status: false,
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            message: 'Purchased gas collection updated successfully',
            status: true,
            data: updatedCollection,
            error: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            status: false,
            data: null,
            error: err.message,
        });
    }
};

// Delete a PurchasedGasCollection by ID
export const deletePurchasedGasCollection = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCollection = await PurchasedGasCollection.findByIdAndDelete(id);
        if (!deletedCollection) {
            return res.status(404).json({
                message: 'Purchased gas collection not found',
                status: false,
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            message: 'Purchased gas collection deleted successfully',
            status: true,
            data: deletedCollection,
            error: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            status: false,
            data: null,
            error: err.message,
        });
    }
};

