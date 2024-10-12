import mongoose, { Schema, Document } from 'mongoose';

const MobileCombustionSchema = new Schema({
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
    }
}, {
    timestamps: true
});

export default mongoose.model('MobileCombustion', MobileCombustionSchema);
