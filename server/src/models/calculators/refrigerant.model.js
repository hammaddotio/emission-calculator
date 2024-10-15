// models/Refrigerant.js
import mongoose from 'mongoose';

const refrigerantDataSchema = new mongoose.Schema({
    amountBeginning: { type: Number, required: true },
    amountDisposed: { type: Number, required: true },
    amountEnd: { type: Number, required: true },
    amountPurchased: { type: Number, required: true },
    emissions: { type: Number, required: true },
    gwp: { type: Number, required: true },
    refrigerantType: { type: String, required: true },
});

const refrigerantSchema = new mongoose.Schema({
    refrigerants: [refrigerantDataSchema],
    totalEmissions: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

export const Refrigerant = mongoose.model('Refrigerant', refrigerantSchema);
