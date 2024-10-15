// backend/routes/stationaryCombustionRoutes.mjs
import express from 'express';
import {
    createStationaryCombustionData,
    getAllStationaryCombustionData,
    getStationaryCombustionDataById,
    updateStationaryCombustionData,
    deleteStationaryCombustionData
} from '../../controllers/calculators/stationaryCombustion.controllers.js';
import { auth_middleware } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

// Create a new StationaryCombustion emission entry
router.post('/', auth_middleware(['user']), createStationaryCombustionData);

// Get all StationaryCombustion emissions
router.get('/', auth_middleware(['admin']), getAllStationaryCombustionData);

// Get a single StationaryCombustion emission by ID
router.get('/:id', auth_middleware(['admin']), getStationaryCombustionDataById);

// Update a StationaryCombustion emission by ID
router.put('/:id', auth_middleware(['admin']), updateStationaryCombustionData);

// Delete a StationaryCombustion emission by ID
router.delete('/:id', auth_middleware(['admin']), deleteStationaryCombustionData);

export default router;
