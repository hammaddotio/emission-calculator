import React from 'react';
import { Typography, Card } from 'antd';

const { Text, Paragraph } = Typography;

const FireSuppressantsDescription: React.FC = () => {
    return (
        <Card className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
            <Text className="text-gray-900 font-semibold text-lg">
                Guidance:
            </Text>
            <Paragraph className="text-gray-800 mt-2">
                HFC, PFC and CO₂ fire suppressants are required to be included in the GHG inventory. Other fire suppressants such as Halons and HCFCs, aqueous solutions, or inert gases are typically excluded from a GHG inventory.
            </Paragraph>

            <Text className="text-gray-900 font-semibold text-lg mt-4">
                Calculation:
            </Text>
            <Paragraph className="text-gray-800 mt-2">
                To calculate the emissions from fire suppressants, add organization-wide fire suppression gases stored and transferred (by gas) in the following table:
            </Paragraph>
            <ul className="list-disc list-inside text-gray-700 ml-4">
                <li>
                    <Text className="font-semibold">Inventory Change</Text>: The difference of gas stored in inventory from the beginning to the end of the reporting period. (Includes only gas stored on-site, i.e., cylinders, and not gas contained within equipment).
                </li>
                <li className="mt-2">
                    <Text className="font-semibold">Transferred Amount</Text>: The gas purchased minus gas sold/disposed during the reporting period. Purchases include: for inventory, as part of equipment servicing (not from inventory), within purchased equipment, and gas returned to the site after off-site recycling. Sales/disposals include: returns to the supplier, sales or disposals (including within equipment), and gas sent off-site for recycling, reclamation, or destruction.
                </li>
                <li className="mt-2">
                    <Text className="font-semibold">Capacity Change</Text>: The capacity of all units at the beginning minus the capacity of all units at the end of the reporting period. This can be assumed to be the capacity of retired units minus the capacity of new units.
                </li>
            </ul>
            <Paragraph className="text-gray-800 mt-4">
                <Text className="font-semibold">Note:</Text> Add values for gases your organization is using; for gases not in use, simply put a 0.
            </Paragraph>
        </Card>
    );
};

export default FireSuppressantsDescription;
