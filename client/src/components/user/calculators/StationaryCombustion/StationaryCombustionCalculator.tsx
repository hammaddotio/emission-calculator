import React, { useState } from 'react';
import { Table, Input, Button, message, Typography, Select } from 'antd';
import axios from 'axios';
import { STATIONARY_COMBUSTION_API } from '../../../../utils/api/apis';
import { headers } from '../../../../utils/api/apiHeaders';

const { Option } = Select;

// Define the emission factors type
interface EmissionFactors {
    [key: string]: {
        co2: number;
        ch4: number;
        n2o: number;
    };
}

// Define the state types
interface EmissionData {
    key: string;
    fuelType: string;
    amountUsed: number;
    totalCo2Emissions: number;
    totalCh4Emissions: number;
    totalN2oEmissions: number;
    totalKgCo2e: number;
}

const emissionFactors: EmissionFactors = {
    Diesel: { co2: 2.77, ch4: 4.15, n2o: 28.6 },
    Gas: { co2: 2.77, ch4: 4.15, n2o: 28.6 },
    // Add other fuel types as needed
};

const StationaryCombustion: React.FC = () => {
    const [formData, setFormData] = useState<EmissionData[]>([]);
    const [selectedFuels, setSelectedFuels] = useState<string[]>([]); // Track selected fuels

    // Function to calculate emissions
    const calculateEmissionsData = (amountUsed: number, fuelType: string): EmissionData => {
        const { co2, ch4, n2o } = emissionFactors[fuelType];

        // CO2 Emissions in tonnes
        const totalCo2Emissions = (co2 * amountUsed) / 1000; // in tonnes

        // CH4 Emissions in tonnes
        const totalCh4Emissions = (ch4 * amountUsed) / (1000 * 1000) * 28; // in tonnes

        // N2O Emissions in tonnes
        const totalN2oEmissions = (n2o * amountUsed) / (1000 * 1000) * 265; // in tonnes

        // Total kg CO2e
        const totalKgCo2e = totalCo2Emissions + totalCh4Emissions + totalN2oEmissions; // in kg CO2e

        return {
            key: fuelType,
            fuelType,
            amountUsed,
            totalCo2Emissions,
            totalCh4Emissions,
            totalN2oEmissions,
            totalKgCo2e,
        };
    };

    // Update emission data for all rows
    const updateEmissionsData = (updatedData: EmissionData[]) => {
        const newData = updatedData.map(data => calculateEmissionsData(data.amountUsed, data.fuelType));
        setFormData(newData);
    };

    const handleInputChange = (key: string, field: string, value: string) => {
        const updatedData: any = [...formData];
        const index = updatedData.findIndex((item: any) => item.key === key);

        if (index > -1) {
            updatedData[index][field] = field === 'amountUsed' ? (value ? parseFloat(value) : 0) : value;

            // Update emissions data when the amount used changes
            if (field === 'amountUsed') {
                updateEmissionsData(updatedData);
            } else {
                setFormData(updatedData);
            }
        }
    };

    // Calculate total emissions
    const getTotalEmissions = (data: EmissionData[]) => {
        const totalEmissions = data.reduce((totals, item) => {
            return {
                co2: totals.co2 + item.totalCo2Emissions,
                ch4: totals.ch4 + item.totalCh4Emissions,
                n2o: totals.n2o + item.totalN2oEmissions,
                kgCo2e: totals.kgCo2e + item.totalKgCo2e,
            };
        }, { co2: 0, ch4: 0, n2o: 0, kgCo2e: 0 });

        return totalEmissions;
    };

    const totalEmissions = getTotalEmissions(formData);

    // Handle fuel selection and add a row for each selected fuel
    const handleFuelSelection = (value: string[]) => {
        const updatedData = value.map(fuelType => {
            // Check if this fuelType is already in formData
            const existingData = formData.find(item => item.fuelType === fuelType);

            if (existingData) {
                return existingData; // If fuel type is already in the formData, return the existing row
            }

            // Otherwise, create a new row with default values
            return {
                key: fuelType, // Ensure the key is unique
                fuelType,
                amountUsed: 0, // Default value
                totalCo2Emissions: 0,
                totalCh4Emissions: 0,
                totalN2oEmissions: 0,
                totalKgCo2e: 0,
            };
        });

        setSelectedFuels(value);
        setFormData(updatedData); // Update the formData with new rows
    };

    // Submit and save emissions data
    const calculateEmissions = async () => {
        const payload = {
            emissions: formData,
            totalCo2Emissions: totalEmissions.co2,
            totalCh4Emissions: totalEmissions.ch4,
            totalN2oEmissions: totalEmissions.n2o,
            totalKgCo2e: totalEmissions.kgCo2e,
        };

        await saveEmissionsData(payload);
    };

    const saveEmissionsData = async (payload: any) => {
        try {
            const response = await axios.post(`${STATIONARY_COMBUSTION_API}`, payload, headers);
            if (response.data.status) {
                message.success('Emissions data saved successfully');
                setFormData([]);
                setSelectedFuels([]);
            } else {
                message.error(response.data.message);
            }
        } catch (error: any) {
            message.error(error.response ? error.response.data.message : error);
        }
    };

    // Table columns
    const columns = [
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Amount Used (liters)',
            dataIndex: 'amountUsed',
            render: (_: any, record: any) => (
                <Input
                    type="number"
                    value={record.amountUsed || 0}
                    onChange={(e) => handleInputChange(record.key, 'amountUsed', e.target.value)}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Total CO₂ Emissions (kg)',
            dataIndex: 'totalCo2Emissions',
            render: (text: any) => text.toFixed(3),
        },
        {
            title: 'Total CH₄ Emissions (kg)',
            dataIndex: 'totalCh4Emissions',
            render: (text: any) => text.toFixed(3),
        },
        {
            title: 'Total N₂O Emissions (kg)',
            dataIndex: 'totalN2oEmissions',
            render: (text: any) => text.toFixed(3),
        },
        {
            title: 'Total kg CO2e',
            dataIndex: 'totalKgCo2e',
            render: (text: any) => text.toFixed(3),
        },
    ];

    return (
        <div className="p-6 mx-auto max-w-full bg-white rounded-lg shadow-lg border border-gray-300">
            <Typography.Title level={3} className="text-center">
                Stationary Combustion Emissions
            </Typography.Title>

            <Select
                mode="multiple"
                style={{ width: '100%' }}
                className='mb-4 w-full'
                placeholder="Select Fuel Types"
                onChange={handleFuelSelection}
                value={selectedFuels}
                size='large'
            >
                {Object.keys(emissionFactors).map((fuelType) => (
                    <Option key={fuelType} value={fuelType}>
                        {fuelType}
                    </Option>
                ))}
            </Select>

            <Table
                dataSource={formData}
                columns={columns}
                pagination={false}
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={2} className=" text-green-600">
                            <strong>Total</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} className=" text-blue-600">
                            <strong>{totalEmissions.co2.toFixed(3)} </strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3} className=" text-orange-600">
                            <strong>{totalEmissions.ch4.toFixed(3)} </strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4} className=" text-red-600">
                            <strong>{totalEmissions.n2o.toFixed(3)} </strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5} className=" text-purple-600">
                            <strong>{totalEmissions.kgCo2e.toFixed(3)} </strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />

            <div className="">
                <Button type="primary" className="mt-4 px-8" onClick={calculateEmissions}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default StationaryCombustion;
