import express from 'express'
import { auth_middleware } from '../../middlewares/auth.middlewares.js'
import { allCalculators } from '../../controllers/calculators/allCalculators.controllers.js'
import { getCalculatorTotals, getCalculatorTotalByUser } from '../../controllers/charts/pieChart.controllers.js';

const router = express.Router()

// router.get('/calculators', auth_middleware(['admin']), allCalculators)


// GET /api/calculators/totals
router.get('/calculators/totals', auth_middleware(['admin']), getCalculatorTotals);
router.get('/calculators/totals/:id', auth_middleware(['admin']), getCalculatorTotalByUser);




export default router