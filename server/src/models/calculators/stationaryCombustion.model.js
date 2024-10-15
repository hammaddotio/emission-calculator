import mongoose from 'mongoose';

const stationaryCombustionSchema = new mongoose.Schema({
    emissions: [
        {
            amountUsed: { type: Number, required: true },
            fuelType: { type: String, required: true },
            totalCh4Emissions: { type: Number, required: true },
            totalCo2Emissions: { type: Number, required: true },
            totalKgCo2e: { type: Number, required: true },
            totalN2oEmissions: { type: Number, required: true },
        },
    ],
    totalEmissions: {
        totalCh4Emissions: { type: Number, required: true },
        totalCo2Emissions: { type: Number, required: true },
        totalKgCo2e: { type: Number, required: true },
        totalN2oEmissions: { type: Number, required: true },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export const StationaryCombustion = mongoose.model('StationaryCombustion', stationaryCombustionSchema);
