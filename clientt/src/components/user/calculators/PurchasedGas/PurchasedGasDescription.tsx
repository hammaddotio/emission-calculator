import React from 'react';
import { Typography, Card } from 'antd';

const { Text } = Typography;

const PurchasedGasDescription: React.FC = () => {
    return (
        <Card className="w-full max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg shadow-md">
            <Text className="text-blue-600 font-medium text-lg">
                <span className="text-blue-800 font-bold">Guidance:</span> This section is designed to calculate the Scope 2 GHG emissions associated with the consumption of purchased gases used in the organization's operations. Add the gas name, the amount you have purchased during the reporting period, and by applying the emission factor, the organization can estimate its indirect GHG emissions.
            </Text>

            <Text className="block text-blue-600 mt-4 leading-relaxed">
                <span className="font-semibold">Note:</span> Add the amount of natural gas consumed in order to run your organizational operations. This will ultimately calculate the total emissions in the last column.
            </Text>
        </Card>

    );
};

export default PurchasedGasDescription;
