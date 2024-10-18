import React from 'react';
import { Typography, Card } from 'antd';

const { Text } = Typography;

const PurchasedGasDescription: React.FC = () => {
    return (
        <Card className="w-full bg-white p-6 rounded-lg shadow-md">
            <Text className="text-gray-800 font-medium text-lg">
                Guidance: This section is designed to calculate the Scope 2 GHG emissions associated with the consumption of purchased gases used in the organization's operations. Add the gas name, the amount you have purchased during the reporting period, and by applying the emission factor, the organization can estimate its indirect GHG emissions.
            </Text>
            <Text className="block text-gray-600 mt-4">
                Note: Add the amount of natural gas consumed in order to run your organizational operations. This will ultimately calculate the total emissions in the last column.
            </Text>
        </Card>
    );
};

export default PurchasedGasDescription;
