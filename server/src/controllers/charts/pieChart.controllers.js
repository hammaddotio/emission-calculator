// controllers/charts/pieChart.controllers.js
import mongoose from 'mongoose';
import { countCalculators, countCalculatorsByUser } from '../../helpers/pieChart.helpers.js';

import ElectricitySupply from '../../models/calculators/electricitySupply.model.js';
import FireSuppressant from '../../models/calculators/fireSuppressant.model.js';
import MobileCombustion from '../../models/calculators/mobileCombustion.model.js';
import PurchasedGases from '../../models/calculators/purchasedGases.model.js';
import Refrigerant from '../../models/calculators/refrigerant.model.js';
import StationaryCombustion from '../../models/calculators/stationaryCombustion.model.js';

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


export const getCalculatorTotals = async (req, res) => {
    console.log('calling')
    try {
        let electricitySupply, fireSuppressant, mobileCombustion, purchasedGases, refrigerant, stationaryCombustion;

        // Fetch aggregate totals for all users
        electricitySupply = await ElectricitySupply.aggregate([{
            $group: {
                _id: null,
                totalEmissions: { $sum: "$totalEmissions" },
            }
        }]);
        purchasedGases = await PurchasedGases.aggregate([{
            $group: {
                _id: null,
                totalEmissions: { $sum: "$totalEmissions" },
            }
        }]);

        fireSuppressant = await FireSuppressant.aggregate([{
            $group: {
                _id: null,
                totalEmissions: { $sum: "$totalCO2Equivalent" },
            }
        }]);

        mobileCombustion = await MobileCombustion.aggregate([{
            $group: {
                _id: null,
                totalEmissions: { $sum: "$totalEmissions" },
            }
        }]);


        refrigerant = await Refrigerant.aggregate([{
            $group: {
                _id: null,
                totalEmissions: { $sum: "$totalEmissions" },
            }
        }]);

        stationaryCombustion = await StationaryCombustion.aggregate([{
            $group: {
                _id: null,
                totalEmissions: { $sum: "$totalKgCo2e" },
            }
        }]);

        // Use totalEmissions if available, otherwise use totalKgCo2e as fallback
        const formatData = (data) => {
            console.log(data)
            return data?.[0]?.totalEmissions || data?.[0]?.totalKgCo2e || data?.[0]?.totalCO2Equivalent || data?.[0]?.totals || 0;
        };

        // Prepare response data
        const responseData = {
            "Electricity Usage": formatData(electricitySupply),
            "fireSuppressant": formatData(fireSuppressant),
            "mobileCombustion": formatData(mobileCombustion),
            "Refrigerant": formatData(refrigerant),
            "Stationary Combustion": formatData(stationaryCombustion),
            "Purchased Gases": formatData(purchasedGases)
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch calculator data" });
    }
}

export const getCalculatorTotalByUser = async (req, res) => {
    console.log('calling');
    try {
        const userId = req.params.id; // Extract user ID from the request parameters

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        let electricitySupply, fireSuppressant, mobileCombustion, purchasedGases, refrigerant, stationaryCombustion;

        // Fetch aggregate totals for the specific user
        electricitySupply = await ElectricitySupply.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: null,
                    totalEmissions: { $sum: "$totalEmissions" },
                }
            }
        ]);

        purchasedGases = await PurchasedGases.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: null,
                    totalEmissions: { $sum: "$totalEmissions" },
                }
            }
        ]);

        fireSuppressant = await FireSuppressant.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: null,
                    totalEmissions: { $sum: "$totalCO2Equivalent" },
                }
            }
        ]);

        mobileCombustion = await MobileCombustion.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: null,
                    totalEmissions: { $sum: "$totalEmissions" },
                }
            }
        ]);

        refrigerant = await Refrigerant.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: null,
                    totalEmissions: { $sum: "$totalEmissions" },
                }
            }
        ]);

        stationaryCombustion = await StationaryCombustion.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: null,
                    totalEmissions: { $sum: "$totalKgCo2e" },
                }
            }
        ]);

        // Use totalEmissions if available; otherwise, use a fallback of 0
        const formatData = (data) => {
            return data?.[0]?.totalEmissions || 0;
        };

        // Prepare response data
        const responseData = {
            "Electricity Usage": formatData(electricitySupply),
            "Fire Suppressant": formatData(fireSuppressant),
            "Mobile Combustion": formatData(mobileCombustion),
            "Refrigerant": formatData(refrigerant),
            "Stationary Combustion": formatData(stationaryCombustion),
            "Purchased Gases": formatData(purchasedGases),
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch calculator data" });
    }
};
