import { ElectricitySupply } from '../models/calculators/electricitySupply.model.js';
import { FireSuppressantDataCollection } from '../models/calculators/fireSuppressant.model.js';
import MobileCombustion from '../models/calculators/mobileCombustion.model.js';
import { PurchasedGasCollection } from '../models/calculators/purchasedGases.model.js';
import { Refrigerant } from '../models/calculators/refrigerant.model.js';
import { StationaryCombustion } from '../models/calculators/stationaryCombustion.model.js';

export const countCalculators = async () => {
    const electricityCount = await ElectricitySupply.countDocuments();
    const fireSuppressantCount = await FireSuppressantDataCollection.countDocuments();
    const mobileCombustionCount = await MobileCombustion.countDocuments();
    const purchasedGasCount = await PurchasedGasCollection.countDocuments();
    const refrigerantCount = await Refrigerant.countDocuments();
    const stationaryCombustionCount = await StationaryCombustion.countDocuments();

    return {
        electricityCount,
        fireSuppressantCount,
        mobileCombustionCount,
        purchasedGasCount,
        refrigerantCount,
        stationaryCombustionCount,
    };
};


export const countCalculatorsByUser = async (userId) => {
    const electricityCount = await ElectricitySupply.countDocuments({ user: userId });
    const fireSuppressantCount = await FireSuppressantDataCollection.countDocuments({ user: userId });
    const mobileCombustionCount = await MobileCombustion.countDocuments({ user: userId });
    const purchasedGasCount = await PurchasedGasCollection.countDocuments({ user: userId });
    const refrigerantCount = await Refrigerant.countDocuments({ user: userId });
    const stationaryCombustionCount = await StationaryCombustion.countDocuments({ user: userId });

    return {
        electricityCount,
        fireSuppressantCount,
        mobileCombustionCount,
        purchasedGasCount,
        refrigerantCount,
        stationaryCombustionCount,
    };
};
