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
router.post('/stationary-combustion', createStationaryCombustionData); // Changed to /stationary-combustion

// Get all StationaryCombustion emissions
router.get('/stationary-combustion', getAllStationaryCombustionData); // Changed to /stationary-combustion

// Get a single StationaryCombustion emission by ID
router.get('/stationary-combustion/:id', getStationaryCombustionDataById); // Changed to /stationary-combustion/:id

// Update a StationaryCombustion emission by ID
router.put('/stationary-combustion/:id', updateStationaryCombustionData); // Changed to /stationary-combustion/:id

// Delete a StationaryCombustion emission by ID
router.delete('/stationary-combustion/:id', deleteStationaryCombustionData); // Changed to /stationary-combustion/:id

export default router;
