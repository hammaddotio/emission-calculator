import express from 'express';
import {
    createRefrigerantData,
    getRefrigerantData,
    updateRefrigerantData,
    deleteRefrigerantData,
} from '../../controllers/calculators/refrigerant.controllers.js';

const router = express.Router();

// Create new refrigerant data
router.post('/', createRefrigerantData);

// Read all refrigerant data
router.get('/', getRefrigerantData);

// Update refrigerant data by ID
router.put('/:id', updateRefrigerantData);

// Delete refrigerant data by ID
router.delete('/:id', deleteRefrigerantData);

export default router;
