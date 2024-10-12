import express from 'express';
import {
    createMobileCombustion,
    getAllMobileCombustions,
    getMobileCombustionById,
    updateMobileCombustion,
    deleteMobileCombustion,
} from '../../controllers/calculators/mobileCombustion.controllers.js';
import { auth_middleware } from './../../middlewares/auth.middlewares.js';

const router = express.Router();

// Route to create a new mobile combustion record
router.post('/mobile-combustion', createMobileCombustion);

// Route to get all mobile combustion records
router.get('/mobile-combustion', auth_middleware(['admin']), getAllMobileCombustions);

// Route to get a specific mobile combustion record by ID
router.get('/mobile-combustion/:id', auth_middleware(['admin']), getMobileCombustionById);

// Route to update a mobile combustion record by ID
router.put('/mobile-combustion/:id', auth_middleware(['admin']), updateMobileCombustion);

// Route to delete a mobile combustion record by ID
router.delete('/mobile-combustion/:id', auth_middleware(['admin']), deleteMobileCombustion);

export default router;
