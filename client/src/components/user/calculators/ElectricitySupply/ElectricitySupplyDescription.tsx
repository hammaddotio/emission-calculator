import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const ElectricitySupplyDescription: React.FC = () => {
    return (
        <Card className="w-full bg-white p-6 rounded-lg shadow-md">
            <Paragraph className="text-gray-900">
                <Text className="font-semibold">Description:</Text> This sheet is designed to calculate and quantify Scope 2 GHG emissions resulting from electricity consumption within an organization.
            </Paragraph>
            <Paragraph className="text-gray-900 mt-4">
                Start by adding the company name and electricity units consumed. The calculation involves multiplying the total electricity consumption by the territory-wide default emission factor (expressed in kg CO₂e/kWh), which reflects the average emissions per unit of electricity in the region.
            </Paragraph>
            <Paragraph className="text-gray-900 mt-4">
                <Text className="font-semibold">Note:</Text> Add in the units consumed per month for the reporting year to calculate the emissions.
            </Paragraph>
        </Card>
    );
}

export default ElectricitySupplyDescription;
