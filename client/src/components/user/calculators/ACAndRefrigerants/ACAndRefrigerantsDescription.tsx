import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const ACAndRefrigerantsDescription: React.FC = () => {
    return (
        <Card className="w-full bg-white p-6 rounded-lg shadow-md">
            <Paragraph className="text-gray-900">
                <Text className="font-semibold">Description:</Text> This sheet is designed to systematically calculate and quantify fugitive emissions from various sources within industrial and operational activities. Fugitive emissions are estimated by summing the quantities of gases present in refrigeration systems, purchased gases, gases disposed of in an environmentally responsible manner, and the remaining gases at the end of the reporting period.
            </Paragraph>
            <Paragraph className="text-gray-900 mt-4">
                The final emissions are calculated by applying the Global Warming Potential (GWP) values, as outlined in <Text className="font-semibold">Table 4: Refrigeration Gas CO₂ Equivalent Emissions.</Text>
            </Paragraph>
        </Card>
    );
}

export default ACAndRefrigerantsDescription;
