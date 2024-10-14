import express from 'express';
import {
    createFireSuppressant,
    getAllFireSuppressants,
    getFireSuppressantById,
    updateFireSuppressant,
    deleteFireSuppressant
} from '../../controllers/calculators/fireSuppressant.controllers.js';

const router = express.Router();

// Route to create a new fire suppressant entry
router.post('/', createFireSuppressant);

// Route to get all fire suppressants
router.get('/', getAllFireSuppressants);

// Route to get a fire suppressant by ID
router.get('/:id', getFireSuppressantById);

// Route to update a fire suppressant by ID
router.put('/:id', updateFireSuppressant);

// Route to delete a fire suppressant by ID
router.delete('/:id', deleteFireSuppressant);

export default router;
