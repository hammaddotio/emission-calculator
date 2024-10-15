import mongoose from 'mongoose';

// Schema for individual purchased gas data
const purchasedGasDataSchema = new mongoose.Schema({
    facilityDescription: { type: String, required: true }, // Description of the facility
    amountConsumed: { type: Number, required: true }, // Amount of natural gas consumed
    co2EmissionFactor: { type: Number, required: true }, // CO2 Emission factor
    ch4EmissionFactor: { type: Number, required: true }, // CH4 Emission factor
    n2oEmissionFactor: { type: Number, required: true }, // N2O Emission factor
    indirectGHG: { type: Number, required: true }, // Indirect GHG emissions
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Schema for total emissions and collection of purchased gas data
const purchasedGasCollectionSchema = new mongoose.Schema({
    PurchasedGas: [purchasedGasDataSchema], // Array of purchased gas data entries
    totalEmissions: { type: Number, required: true }, // Total emissions calculated from the array
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create and export the models
export const PurchasedGasCollection = mongoose.model('PurchasedGasCollection', purchasedGasCollectionSchema);

