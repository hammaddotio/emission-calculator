import { Router } from 'express';
import { auth_middleware } from './../../middlewares/auth.middlewares.js';
import {
    createElectricitySupply,
    getElectricitySupplies,
    getElectricitySupply,
    updateElectricitySupply,
    deleteElectricitySupply,
} from '../../controllers/calculators/electricitySupply.controllers.js';

const router = Router();

router.post('/', auth_middleware(['user']), createElectricitySupply);
router.get('/', auth_middleware(['admin']), getElectricitySupplies);
router.get('/:id', auth_middleware(['admin']), getElectricitySupply);
router.put('/:id', auth_middleware(['admin']), updateElectricitySupply);
router.delete('/:id', auth_middleware(['admin']), deleteElectricitySupply);

export default router;


