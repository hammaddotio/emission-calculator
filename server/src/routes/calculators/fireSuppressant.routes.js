import express from 'express';
import {
    createFireSuppressant,
    getAllFireSuppressants,
    getFireSuppressantById,
    updateFireSuppressant,
    deleteFireSuppressant
} from '../../controllers/calculators/fireSuppressant.controllers.js';
import { auth_middleware } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

// Route to create a new fire suppressant entry
router.post('/', auth_middleware(['user']), createFireSuppressant);

// Route to get all fire suppressants
router.get('/', auth_middleware(['admin']), getAllFireSuppressants);

// Route to get a fire suppressant by ID
router.get('/:id', auth_middleware(['admin']), getFireSuppressantById);

// Route to update a fire suppressant by ID
router.put('/:id', auth_middleware(['admin']), updateFireSuppressant);

// Route to delete a fire suppressant by ID
router.delete('/:id', auth_middleware(['admin']), deleteFireSuppressant);

export default router;
