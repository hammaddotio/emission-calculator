// routes/userRoutes.js
import express from 'express';
import { getOverallCalculatorCounts, getCalculatorCountsByUser } from '../../controllers/charts/pieChart.controllers.js';
import { auth_middleware } from './../../middlewares/auth.middlewares.js';

const router = express.Router();

// Route to get overall calculator counts
router.get('/calculators/count', auth_middleware(['admin']), getOverallCalculatorCounts);

// Route to get calculator counts by user
router.get('/calculators/count/:userId', auth_middleware(['admin']), getCalculatorCountsByUser);

export default router;
