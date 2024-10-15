import express from 'express';
import {
    createRefrigerantData,
    getRefrigerantData,
    updateRefrigerantData,
    deleteRefrigerantData,
} from '../../controllers/calculators/refrigerant.controllers.js';
import { auth_middleware } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

// Create new refrigerant data
router.post('/', auth_middleware(['user']), createRefrigerantData);

// Read all refrigerant data
router.get('/', auth_middleware(['admin']), getRefrigerantData);

// Update refrigerant data by ID
router.put('/:id', auth_middleware(['admin']), updateRefrigerantData);

// Delete refrigerant data by ID
router.delete('/:id', auth_middleware(['admin']), deleteRefrigerantData);

export default router;
