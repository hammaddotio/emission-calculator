import React from 'react';
import { Typography, Card } from 'antd';

const { Paragraph, Text } = Typography;

const PurchasedGasDescription: React.FC = () => {
    return (
        <Card className="w-full max-w-full mx-auto bg-blue-50 p-6 rounded-lg shadow-md my-4">
            <Paragraph className="text-blue-900">
                <Text className="font-semibold text-blue-700">Guidance:</Text>
                This section is designed to calculate the Scope 2 GHG emissions associated with the consumption of purchased gases used in the organization's operations.
                Add the gas name, the amount you have purchased during the reporting period, and by applying the emission factor, the organization can estimate its indirect GHG emissions.
            </Paragraph>

            <Paragraph className="text-blue-900 mt-4">
                <Text className="font-semibold">Note:</Text>
                Add the amount of natural gas consumed in order to run your organizational operations. This will ultimately calculate the total emissions in the last column.
            </Paragraph>
        </Card>
    );
};

export default PurchasedGasDescription;
