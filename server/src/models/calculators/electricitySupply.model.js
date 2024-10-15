import mongoose from 'mongoose';

const monthDataSchema = new mongoose.Schema({
    description: { type: String, required: true },
    electricityPurchased: { type: Number, required: true },
    emissionFactor: { type: Number, default: 0.7 },
    powerCompanySpecific: { type: Number, default: 0 },
    emissions: { type: Number, default: 0 },
});

const electricitySupplySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    facilityData: { type: [monthDataSchema], required: true },
    totalEmissions: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const ElectricitySupply = mongoose.model('ElectricitySupply', electricitySupplySchema);

export default ElectricitySupply;
