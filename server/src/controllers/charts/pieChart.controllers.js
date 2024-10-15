// controllers/charts/pieChart.controllers.js
import { countCalculators, countCalculatorsByUser } from '../../helpers/pieChart.helpers.js';

// Endpoint to get overall calculator counts
export const getOverallCalculatorCounts = async (req, res) => {
    try {
        const counts = await countCalculators();
        res.status(200).json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Endpoint to get calculator counts by user
export const getCalculatorCountsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const counts = await countCalculatorsByUser(userId);
        res.status(200).json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
