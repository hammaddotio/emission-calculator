import express from 'express'
import { auth_middleware } from '../../middlewares/auth.middlewares.js'
import { allCalculators } from '../../controllers/calculators/allCalculaters.controllers.js'

const router = express.Router()

router.get('/calculators', auth_middleware(['admin']), allCalculators)

export default router