import express from 'express';
import {
    createRefrigerant,
    getAllRefrigerants,
    getRefrigerantById,
    updateRefrigerant,
    deleteRefrigerant
} from '../../controllers/calculators/refrigerant.controllers.js';

const router = express.Router();

// Create a new refrigerant record
router.post('/refrigerant', createRefrigerant);

// Get all refrigerant records
router.get('/refrigerant', getAllRefrigerants);

// Get a refrigerant record by ID
router.get('/refrigerant/:id', getRefrigerantById);

// Update a refrigerant record by ID
router.put('/refrigerant/:id', updateRefrigerant);

// Delete a refrigerant record by ID
router.delete('/refrigerant/:id', deleteRefrigerant);

export default router;
