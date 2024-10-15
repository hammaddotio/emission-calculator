import React, { useState } from 'react';
import { Table, Input, Button, message, Typography, Card } from 'antd';
import axios from 'axios';
import { STATIONARY_COMBUSTION_API } from '../../../../utils/api/apis';
import { headers } from '../../../../utils/api/apiHeaders';
import { FaCloud } from 'react-icons/fa'

const { Title } = Typography;

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
};

const StationaryCombustion: React.FC = () => {
    const [formData, setFormData] = useState<EmissionData[]>([
        { key: '1', fuelType: 'Diesel', amountUsed: 0, totalCo2Emissions: 0, totalCh4Emissions: 0, totalN2oEmissions: 0, totalKgCo2e: 0 },
        { key: '2', fuelType: 'Gas', amountUsed: 0, totalCo2Emissions: 0, totalCh4Emissions: 0, totalN2oEmissions: 0, totalKgCo2e: 0 },
    ]);
    const [error, setError] = useState<string>('');

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

    const updateEmissionsData = (updatedData: EmissionData[]) => {
        const newData = updatedData.map(data => calculateEmissionsData(data.amountUsed, data.fuelType));
        setFormData(newData);
    };

    const handleInputChange = (key: string, field: string, value: string) => {
        const updatedData: any = [...formData];
        const index = updatedData.findIndex((item: any) => item.key === key);

        if (index > -1) {
            updatedData[index][field] = field === 'amountUsed' ? (value ? parseFloat(value) : 0) : value;

            // Update emissions data
            if (field === 'amountUsed') {
                updateEmissionsData(updatedData);
            } else {
                setFormData(updatedData);
            }
        }
    };

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

    const calculateEmissions = async () => {
        setError('');
        const totalEmissions = getTotalEmissions(formData);

        const payload = {
            emissions: formData,
            totalEmissions: {
                totalCo2Emissions: totalEmissions.co2,
                totalCh4Emissions: totalEmissions.ch4,
                totalN2oEmissions: totalEmissions.n2o,
                totalKgCo2e: totalEmissions.kgCo2e,
            },
        };

        await saveEmissionsData(payload);
    };

    const saveEmissionsData = async (payload: any) => {
        try {
            const response = await axios.post(`${STATIONARY_COMBUSTION_API}`, payload, headers);
            if (response.data.status) {
                message.success('Emissions data saved successfully');
            } else {
                message.error(response.data.message);
            }
        } catch (error: any) {
            message.error(error.response ? error.response.data.message : error);
        }
    };

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
            title: 'Total CO2 Emissions (tonnes)',
            dataIndex: 'totalCo2Emissions',
            render: (text: any) => text.toFixed(6),
        },
        {
            title: 'Total CH4 Emissions (tonnes)',
            dataIndex: 'totalCh4Emissions',
            render: (text: any) => text.toFixed(6),
        },
        {
            title: 'Total N2O Emissions (tonnes)',
            dataIndex: 'totalN2oEmissions',
            render: (text: any) => text.toFixed(6),
        },
        {
            title: 'Total kg CO2e',
            dataIndex: 'totalKgCo2e',
            render: (text: any) => text.toFixed(6),
        },
    ];

    return (
        <div className="flex justify-center items-center h-screen ">
            <Card className="max-w-4xl w-full p-6 shadow-lg rounded-lg mt-60">
                <Title level={2} className="text-center text-gray-800 mb-6">Stationary Combustion Calculator</Title>

                <Table
                    dataSource={formData}
                    columns={columns}
                    pagination={false}
                    rowKey="key"
                    style={{ width: '100%', marginBottom: '16px' }}
                    bordered
                    summary={() => (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={3}>
                                    <strong>Total Emissions</strong>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <strong>{totalEmissions.co2.toFixed(6)} tonnes CO₂</strong>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <strong>{totalEmissions.ch4.toFixed(6)} tonnes CH₄</strong>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <strong>{totalEmissions.n2o.toFixed(6)} tonnes N₂O</strong>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />

                <div className="mt-8 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Total Emissions Summary</h2>
                        <div className="bg-blue-100 text-blue-600 rounded-full p-2 shadow-sm">
                            <FaCloud className="text-2xl" /> {/* Emission icon */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { label: 'Total CO₂ Emissions', value: totalEmissions.co2.toFixed(6) },
                            { label: 'Total CH₄ Emissions', value: totalEmissions.ch4.toFixed(6) },
                            { label: 'Total N₂O Emissions', value: totalEmissions.n2o.toFixed(6) },
                            { label: 'Total kg CO₂e', value: totalEmissions.kgCo2e.toFixed(6) },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                                <span className="text-sm font-medium text-gray-600">{item.label}</span>
                                <span className="text-blue-600 font-semibold">{item.value} tonnes</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="primary" onClick={calculateEmissions} className="mt-4 w-full" size="large">
                    Submit
                </Button>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </Card>
        </div>
    );
};

export default StationaryCombustion;
