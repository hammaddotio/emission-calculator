import express from 'express';
import mongoose from 'mongoose';
import ElectricitySupply from '../../models/calculators/electricitySupply.model.js';
import MobileCombustion from '../../models/calculators/mobileCombustion.model.js';
import PurchasedGasCollection from '../../models/calculators/purchasedGases.model.js';
import Refrigerant from '../../models/calculators/refrigerant.model.js';
import StationaryCombustion from '../../models/calculators/stationaryCombustion.model.js';
import { User } from '../../models/user.models.js';

const router = express.Router();

// Endpoint to get all calculators data with users
export const allCalculators = async (req, res) => {
    try {
        // Fetch all calculator data along with user information
        const electricitySupplies = await ElectricitySupply.find();
        const mobileCombs = await MobileCombustion.find();
        const purchasedGases = await PurchasedGasCollection.find();
        const refrigerants = await Refrigerant.find();
        const stationaryCombs = await StationaryCombustion.find();

        // Combine all results
        const allCalculators = {
            electricitySupplies,
            mobileCombs,
            purchasedGases,
            refrigerants,
            stationaryCombs,
        };

        res.status(200).json(allCalculators);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving calculators data' });
    }
}

export const calculators = async (req, res) => {
    try {
        // Fetch all calculator data along with user information
        const electricitySupplies = await ElectricitySupply.find();
        const mobileCombs = await MobileCombustion.find();
        const purchasedGases = await PurchasedGasCollection.find();
        const refrigerants = await Refrigerant.find();
        const stationaryCombs = await StationaryCombustion.find();

        // Combine all results
        const allCalculators = {
            electricitySupplies,
            mobileCombs,
            purchasedGases,
            refrigerants,
            stationaryCombs,
        };

        res.status(200).json(allCalculators);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving calculators data' });
    }
}
