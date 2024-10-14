// backend/routes/stationaryCombustionRoutes.mjs
import express from 'express';
import {
    createStationaryCombustionData,
    getAllStationaryCombustionData,
    getStationaryCombustionDataById,
    updateStationaryCombustionData,
    deleteStationaryCombustionData
} from '../../controllers/calculators/stationaryCombustion.controllers.js';

const router = express.Router();

// Create a new StationaryCombustion emission entry
router.post('/', createStationaryCombustionData);

// Get all StationaryCombustion emissions
router.get('/', getAllStationaryCombustionData);

// Get a single StationaryCombustion emission by ID
router.get('/:id', getStationaryCombustionDataById);

// Update a StationaryCombustion emission by ID
router.put('/:id', updateStationaryCombustionData);

// Delete a StationaryCombustion emission by ID
router.delete('/:id', deleteStationaryCombustionData);

export default router;
