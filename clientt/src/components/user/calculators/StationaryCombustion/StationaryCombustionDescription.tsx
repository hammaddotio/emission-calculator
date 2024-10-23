import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const StationaryCombustionDescription: React.FC = () => {
    return (
        <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow-lg">
            <Paragraph className="text-gray-800">
                <Text className="font-semibold text-blue-600 underline">Note:</Text>
                <span className="text-gray-700">
                    It includes fuel combustion sources used to produce electricity, steam, heat, and power. The onsite boilers, ovens, furnaces, and generators are typically classified under stationary combustion sources and fall under the category of Scope-1 GHG emissions.
                </span>
            </Paragraph>

            <Paragraph className="text-gray-800 mt-4">
                <span className="text-blue-600 font-bold">Calculation Guide:</span>
                <span className="text-gray-700">
                    By adding the amount of fuel consumed and applying the given emission factors, the organization can calculate its GHG emissions from its stationary sources.
                </span>
            </Paragraph>

            <Paragraph className="text-gray-800 mt-4">
                <Text className="font-semibold text-blue-600">Instruction:</Text>
                <span className="text-gray-700">
                    Add the amount of fuel used, select fuel and vehicle type, and the total kg CO₂e will be calculated at the end.
                </span>
            </Paragraph>
        </Card>
    );
}

export default StationaryCombustionDescription;
