import mongoose from 'mongoose';

// Schema for individual fire suppressant data
const fireSuppressantDataSchema = new mongoose.Schema({
    gas: { type: String, required: true },
    gwp: { type: Number, required: true },
    inventoryChange: { type: Number, required: true },
    transferredAmount: { type: Number, required: true },
    capacityChange: { type: Number, required: true },
    co2Equivalent: { type: Number, required: true },
});

// Main schema for storing only fire suppressant data entries
const fireSuppressantDataCollectionSchema = new mongoose.Schema({
    fireSuppressants: [fireSuppressantDataSchema], // Array of individual fire suppressant entries
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the FireSuppressantData model
export const FireSuppressantDataCollection = mongoose.model('FireSuppressantDataCollection', fireSuppressantDataCollectionSchema);
