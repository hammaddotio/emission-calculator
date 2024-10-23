import React from 'react';
import { Card, Typography } from 'antd'; // Import Ant Design components

const MobileCombustionDescription: React.FC = () => {
    return (
        <Card className="w-full max-w-full mx-auto my-4 bg-blue-50 p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
            <Typography.Title level={4} className="text-blue-600">
                Mobile Combustion Overview
            </Typography.Title>
            <Typography.Paragraph className="text-blue-900">
                <strong className="text-blue-600">Note:</strong> It includes fuel combustion sources that are used to produce electricity, steam, heat, and power. The onsite boilers, ovens, furnaces, and generators are typically classified under stationary combustion sources, and they fall under the category of Scope-1 GHG emissions.
            </Typography.Paragraph>
            <Typography.Paragraph className="text-blue-900">
                By adding the amount of fuel consumed and applying the given emission factors, the organization can calculate its GHG emissions from its stationary sources.
            </Typography.Paragraph>
            <Typography.Paragraph className="text-blue-900">
                <strong className="text-blue-600">Instruction:</strong> Add the amount of fuel used, fuel and vehicle type, and the total kg CO₂e will be calculated at the end.
            </Typography.Paragraph>
        </Card>
    );
};

export default MobileCombustionDescription;
