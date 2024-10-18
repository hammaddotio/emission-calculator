import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const MobileCombustionDescription: React.FC = () => {
    return (
        <Card className="w-full bg-white p-6 rounded-lg shadow-md">
            <Paragraph className="text-gray-900">
                <Text className="font-semibold">Note:</Text> It includes fuel combustion sources that are used to produce electricity, steam, heat, and power. The onsite boilers, ovens, furnaces, and generators are typically classified under stationary combustion sources, and they fall under the category of Scope-1 GHG emissions.
            </Paragraph>
            <Paragraph className="text-gray-900 mt-4">
                By adding the amount of fuel consumed and applying the given emission factors, the organization can calculate its GHG emissions from its stationary sources.
            </Paragraph>
            <Paragraph className="text-gray-900 mt-4">
                <Text className="font-semibold">Instruction:</Text> Add the amount of fuel used, fuel and vehicle type, and the total kg CO₂e will be calculated at the end.
            </Paragraph>
        </Card>
    );
};

export default MobileCombustionDescription;
