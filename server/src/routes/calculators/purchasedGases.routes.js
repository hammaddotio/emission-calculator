import express from 'express';
import {
    createPurchasedGasCollection,
    getAllPurchasedGasCollections,
    getPurchasedGasCollectionById,
    updatePurchasedGasCollection,
    deletePurchasedGasCollection,
} from '../../controllers/calculators/purchasedGases.controllers.js';

const router = express.Router();

// Routes for PurchasedGasCollection
router.post('/', createPurchasedGasCollection); // Create
router.get('/', getAllPurchasedGasCollections); // Read all
router.get('/:id', getPurchasedGasCollectionById); // Read by ID
router.put('/:id', updatePurchasedGasCollection); // Update by ID
router.delete('/:id', deletePurchasedGasCollection); // Delete by ID

export default router;
