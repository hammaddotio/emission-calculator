import express from 'express';
import {
    createPurchasedGasCollection,
    getAllPurchasedGasCollections,
    getPurchasedGasCollectionById,
    updatePurchasedGasCollection,
    deletePurchasedGasCollection,
} from '../../controllers/calculators/purchasedGases.controllers.js';
import { auth_middleware } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

// Routes for PurchasedGasCollection
router.post('/', auth_middleware(['user']), createPurchasedGasCollection); // Create
router.get('/', auth_middleware(['admin']), getAllPurchasedGasCollections); // Read all
router.get('/:id', auth_middleware(['admin']), getPurchasedGasCollectionById); // Read by ID
router.put('/:id', auth_middleware(['admin']), updatePurchasedGasCollection); // Update by ID
router.delete('/:id', auth_middleware(['admin']), deletePurchasedGasCollection); // Delete by ID

export default router;
