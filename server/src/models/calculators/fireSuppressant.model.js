import mongoose from 'mongoose';

// Schema for individual fire suppressant data
const fireSuppressantDataSchema = new mongoose.Schema({
    key: { type: String, required: true }, // Added the 'key' field to match Joi schema
    gas: { type: String, required: true },
    gwp: { type: Number, required: true },
    inventoryChange: {
        type: Number,
        required: true,
        min: [0, '"Inventory Change" must be greater than 0'] // Matching Joi greater(0) validation
    },
    transferredAmount: {
        type: Number,
        required: true,
        min: [0, '"Transferred Amount" must be greater than 0'] // Matching Joi greater(0) validation
    },
    capacityChange: {
        type: Number,
        required: true,
        min: [0, '"Capacity Change" must be greater than 0'] // Matching Joi greater(0) validation
    },
    co2Equivalent: {
        type: Number,
        required: true,
        min: [0, '"CO2 Equivalent" must be greater than 0'] // Matching Joi greater(0) validation
    },
});

// Main schema for storing fire suppressant data entries
const fireSuppressantDataCollectionSchema = new mongoose.Schema({
    fireSuppressants: [fireSuppressantDataSchema], // Array of individual fire suppressant entries
    totalCO2Equivalent: { type: Number, required: true }, // Matching Joi schema
    totalCapacityChange: { type: Number, required: true }, // Matching Joi schema
    totalInventoryChange: { type: Number, required: true }, // Matching Joi schema
    totalTransferredAmount: { type: Number, required: true }, // Matching Joi schema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the FireSuppressantDataCollection model
const FireSuppressantDataCollection = mongoose.model('FireSuppressantDataCollection', fireSuppressantDataCollectionSchema);
export default FireSuppressantDataCollection;
