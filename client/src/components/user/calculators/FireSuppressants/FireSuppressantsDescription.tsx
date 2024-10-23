import React from 'react';
import { Typography } from 'antd';

// FireSuppressantsDescription component
const FireSuppressantsDescription: React.FC = () => {
    return (
        <div className="max-w-full mx-auto my-4 bg-blue-50 p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
            <Typography.Title level={5} className="text-blue-600 font-bold">
                Guidance:
            </Typography.Title>
            <Typography.Paragraph className="text-blue-900 mt-1 mb-2">
                HFC, PFC, and CO₂ fire suppressants are required to be included in the GHG inventory. Other fire suppressants such as Halons and HCFCs, aqueous solutions, or inert gases are typically excluded from a GHG inventory.
            </Typography.Paragraph>

            <Typography.Title level={5} className="text-blue-600 font-bold mt-2">
                Calculation:
            </Typography.Title>
            <Typography.Paragraph className="text-blue-900 mt-1 mb-2">
                To calculate the emissions from fire suppressants, add organization-wide fire suppression gases stored and transferred (by gas) in the following table:
            </Typography.Paragraph>

            <ul className="list-disc pl-4 text-blue-800">
                <li className="mb-1">
                    <Typography.Text strong>Inventory Change:</Typography.Text> The difference of gas stored in inventory from the beginning to the end of the reporting period. (Includes only gas stored on-site, i.e., cylinders, and not gas contained within equipment).
                </li>
                <li className="mb-1">
                    <Typography.Text strong>Transferred Amount:</Typography.Text> The gas purchased minus gas sold/disposed during the reporting period. Purchases include: for inventory, as part of equipment servicing (not from inventory), within purchased equipment, and gas returned to the site after off-site recycling. Sales/disposals include: returns to the supplier, sales or disposals (including within equipment), and gas sent off-site for recycling, reclamation, or destruction.
                </li>
                <li className="mb-1">
                    <Typography.Text strong>Capacity Change:</Typography.Text> The capacity of all units at the beginning minus the capacity of all units at the end of the reporting period. This can be assumed to be the capacity of retired units minus the capacity of new units.
                </li>
            </ul>

            <Typography.Paragraph className="text-blue-900 mt-2">
                <span className="font-bold">Note:</span> Add values for gases your organization is using; for gases not in use, simply put a 0.
            </Typography.Paragraph>
        </div>
    );
};

export default FireSuppressantsDescription;
