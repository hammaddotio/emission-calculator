import mongoose from 'mongoose';

// Schema for individual emissions
const emissionSchema = new mongoose.Schema({
    amountUsed: { type: Number, required: true },
    fuelType: { type: String, required: true },
    totalCh4Emissions: { type: Number, required: true },
    totalCo2Emissions: { type: Number, required: true },
    totalKgCo2e: { type: Number, required: true },
    totalN2oEmissions: { type: Number, required: true },
}); // Prevent automatic creation of an _id field for each entry


const stationaryCombustionSchema = new mongoose.Schema({
    emissions: [emissionSchema], // Reference to the Emission schema
    totalCh4Emissions: { type: Number, required: true },
    totalCo2Emissions: { type: Number, required: true },
    totalN2oEmissions: { type: Number, required: true },
    totalKgCo2e: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const StationaryCombustion = mongoose.model('StationaryCombustion', stationaryCombustionSchema);
export default StationaryCombustion;
