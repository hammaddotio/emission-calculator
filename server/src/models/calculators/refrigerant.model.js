import mongoose from 'mongoose';

const refrigerantSchema = new mongoose.Schema({
    refrigerantType: {
        type: String,
        required: true,
    },
    amountBeginning: {
        type: Number,
        required: true,
    },
    amountPurchased: {
        type: Number,
        required: true,
    },
    amountDisposed: {
        type: Number,
        required: true,
    },
    amountEnd: {
        type: Number,
        required: true,
    },
    gwp: {
        type: Number,
        required: true,
    },
    // emissions: {
    //     type: Number,
    //     required: true,
    // },
});

const Refrigerant = mongoose.model('Refrigerant', refrigerantSchema);

export default Refrigerant;
