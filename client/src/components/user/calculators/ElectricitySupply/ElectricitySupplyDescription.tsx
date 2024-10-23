import React from 'react';
import { Card, Typography } from 'antd';

const ElectricitySupplyDescription: React.FC = () => {
    return (
        <Card className="w-full max-w-full mx-auto my-4 bg-blue-50 p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
            <Typography.Text className="text-blue-900">
                <strong className="text-blue-600">Description:</strong>
                {' '}This sheet is designed to calculate and quantify Scope 2 GHG emissions resulting from electricity consumption within an organization.
            </Typography.Text>

            <Typography.Text className="block text-blue-900 mt-4">
                Start by adding the company name and electricity units consumed. The calculation involves multiplying the total electricity consumption by the territory-wide default emission factor (expressed in kg CO₂e/kWh), which reflects the average emissions per unit of electricity in the region.
            </Typography.Text>

            <Typography.Text className="block text-blue-900 mt-4">
                <strong className="text-blue-600">Note:</strong>
                {' '}Add in the units consumed per month for the reporting year to calculate the emissions.
            </Typography.Text>
        </Card>
    );
}

export default ElectricitySupplyDescription;
