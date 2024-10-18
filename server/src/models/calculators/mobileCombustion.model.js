import mongoose from 'mongoose';

// Define the Fuel Record Schema (Subdocument Schema)
const fuelRecordSchema = new mongoose.Schema({
    fuelType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    co2EmissionFactor: {
        type: Number,
        required: true
    },
    co2Emissions: {
        type: Number,
        required: true
    },
    ch4EmissionFactor: {
        type: Number,
        required: true
    },
    ch4Emissions: {
        type: Number,
        required: true
    },
    n2oEmissionFactor: {
        type: Number,
        required: true
    },
    n2oEmissions: {
        type: Number,
        required: true
    },
    totalEmissions: {
        type: Number,
        required: true
    },
    // description: {
    //     type: String,
    //     required: true
    // }
});

// Define the Mobile Combustion Schema (Parent Schema)
const mobileCombustionSchema = new mongoose.Schema({
    fuelRecords: [fuelRecordSchema], // Array of fuel records
    co2Emissions: { type: Number, required: true },
    ch4Emissions: { type: Number, required: true },
    n2oEmissions: { type: Number, required: true },
    totalEmissions: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Create a single model using the parent schema
const MobileCombustion = mongoose.model('MobileCombustion', mobileCombustionSchema);

export default MobileCombustion;
