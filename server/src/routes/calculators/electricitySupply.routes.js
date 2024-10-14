import { Router } from 'express';
import {
    createElectricitySupply,
    getElectricitySupplies,
    getElectricitySupply,
    updateElectricitySupply,
    deleteElectricitySupply,
} from '../../controllers/calculators/electricitySupply.controllers.js';

const router = Router();

router.post('/', createElectricitySupply);
router.get('/', getElectricitySupplies);
router.get('/:id', getElectricitySupply);
router.put('/:id', updateElectricitySupply);
router.delete('/:id', deleteElectricitySupply);

export default router;


