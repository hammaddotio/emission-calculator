import React, { useState } from 'react';
import axios from 'axios';
import { MOBILE_COMBUSTION_API } from '../../../../utils/api/apis';
import { headers } from './../../../../utils/api/apiHeaders';
import { Select, Table, Button, Typography, InputNumber, message } from 'antd';
import { Option } from 'antd/lib/mentions';

interface FuelRecord {
    fuelType: string;
    amount: number; // Amount of fuel used in liters
    co2EmissionFactor: number; // CO₂ Emission Factor
    ch4EmissionFactor: number; // CH₄ Emission Factor
    n2oEmissionFactor: number; // N₂O Emission Factor
    co2Emissions: number; // CO₂ Emissions
    ch4Emissions: number; // CH₄ Emissions
    n2oEmissions: number; // N₂O Emissions
    totalEmissions: number; // Total emissions
}

const FuelEmissionCalculator: React.FC = () => {
    const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([]);
    const [selectedFuelType, setSelectedFuelType] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const fuelOptions = [
        { label: 'Motor Gasoline', value: 'Motor Gasoline', co2EmissionFactor: 2.35, ch4EmissionFactor: 50, n2oEmissionFactor: 2 },
        { label: 'Gas/Diesel oil', value: 'Gas/Diesel oil', co2EmissionFactor: 2.775, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Bio diesel (100%)', value: 'Bio diesel', co2EmissionFactor: 1.928, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Natural Gas Liquid', value: 'Natural Gas Liquid', co2EmissionFactor: 1.574, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Ethanol (100%)', value: 'Ethanol (100%)', co2EmissionFactor: 2.776, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Liquefied Petroleum Gasses (LPG)', value: 'Liquefied Petroleum Gasses (LPG)', co2EmissionFactor: 1.653, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Aviation Gasoline', value: 'Aviation Gasoline', co2EmissionFactor: 2.224, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Kerosene type jet fuel', value: 'Kerosene type jet fuel', co2EmissionFactor: 2.538, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'CNG', value: 'CNG', co2EmissionFactor: 2.78, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
    ];

    const handleFuelTypeChange = (value: string) => {
        setSelectedFuelType(value);
        addNewRow(value);
    };

    const addNewRow = (fuelType: string) => {
        const selectedFuel = fuelOptions.find(option => option.value === fuelType);
        if (selectedFuel) {
            const newRecord: FuelRecord = {
                fuelType,
                amount: 0, // default amount is 0
                co2EmissionFactor: selectedFuel.co2EmissionFactor,
                ch4EmissionFactor: selectedFuel.ch4EmissionFactor,
                n2oEmissionFactor: selectedFuel.n2oEmissionFactor,
                co2Emissions: 0,
                ch4Emissions: 0,
                n2oEmissions: 0,
                totalEmissions: 0,
            };
            setFuelRecords([...fuelRecords, newRecord]); // Add new row
            setSelectedFuelType(undefined); // Clear selection after adding
        }
    };

    const handleChange = (index: number, field: keyof FuelRecord, value: string | number | null) => {
        const newRecords: FuelRecord[] | any = [...fuelRecords];
        const parsedValue = value === null ? 0 : parseFloat(value.toString());

        newRecords[index][field] = parsedValue;

        if (field === 'amount') {
            const co2Emissions = (newRecords[index].amount * newRecords[index].co2EmissionFactor) / 1000;
            const ch4Emissions = (newRecords[index].amount * newRecords[index].ch4EmissionFactor) / (1000 * 1000) * 28;
            const n2oEmissions = (newRecords[index].amount * newRecords[index].n2oEmissionFactor) / (1000 * 1000) * 265;

            newRecords[index].co2Emissions = co2Emissions;
            newRecords[index].ch4Emissions = ch4Emissions;
            newRecords[index].n2oEmissions = n2oEmissions;
            newRecords[index].totalEmissions = co2Emissions + ch4Emissions + n2oEmissions;
        }

        setFuelRecords(newRecords);
    };

    const calculateTotals = () => {
        return fuelRecords.reduce(
            (totals, record) => {
                totals.co2Emissions += record.co2Emissions;
                totals.ch4Emissions += record.ch4Emissions;
                totals.n2oEmissions += record.n2oEmissions;
                totals.totalEmissions += record.totalEmissions;
                return totals;
            },
            { co2Emissions: 0, ch4Emissions: 0, n2oEmissions: 0, totalEmissions: 0 }
        );
    };

    const totals = calculateTotals();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = { fuelRecords, ...totals };
            const response = await axios.post(`${MOBILE_COMBUSTION_API}`, payload, headers);
            console.log(response);

            // Show success message
            message.success('Fuel records submitted successfully!');

            // Reset all state variables after successful submission
            setFuelRecords([]); // Reset fuel records to an empty array
            setSelectedFuelType(undefined); // Clear selected fuel type
        } catch (error: any) {
            // Show error message
            message.error('Failed to submit fuel records. Please try again.');
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    const isButtonDisabled = fuelRecords.length === 0 || fuelRecords.some(record => record.amount === 0);

    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            key: 'fuelType',
        },
        {
            title: 'Amount (Liters)',
            dataIndex: 'amount',
            key: 'amount',
            render: (_: number, record: FuelRecord, index: number) => (
                <InputNumber
                    min={0}
                    value={record.amount}
                    onChange={(value) => handleChange(index, 'amount', value)}
                    placeholder="Enter amount"
                    className="w-full" // Make InputNumber full width
                />
            ),
        },
        {
            title: 'CO₂ Emissions (kg)',
            dataIndex: 'co2Emissions',
            key: 'co2Emissions',
            render: (text: number) => text.toFixed(3),
        },
        {
            title: 'CH₄ Emissions (kg)',
            dataIndex: 'ch4Emissions',
            key: 'ch4Emissions',
            render: (text: number) => text.toFixed(3),
        },
        {
            title: 'N₂O Emissions (kg)',
            dataIndex: 'n2oEmissions',
            key: 'n2oEmissions',
            render: (text: number) => text.toFixed(3),
        },
        {
            title: 'Total Emissions (kg)',
            dataIndex: 'totalEmissions',
            key: 'totalEmissions',
            render: (text: number) => text.toFixed(3),
        },
    ];

    return (
        <div className="p-6 mx-auto max-w-full bg-white rounded-lg shadow-lg border border-gray-300">
            <Typography.Title level={3} className="text-center mb-4 text-blue-600 font-semibold text-lg sm:text-2xl">
                Fuel Emission Calculator
            </Typography.Title>

            <Select
                value={selectedFuelType || 'Select a fuel type'}
                // mode="multiple"
                onChange={handleFuelTypeChange}
                placeholder="Select a fuel type"
                className="mb-4 w-full"
                allowClear
                size='large'
                style={{ width: '100%' }}
            >
                {fuelOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>

            <div className="overflow-x-auto">
                <Table
                    dataSource={fuelRecords}
                    columns={columns}
                    pagination={false}
                    rowKey={(record) => record.fuelType + Math.random()}
                    bordered
                    summary={() => (
                        <Table.Summary>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={2} className="font-bold text-gray-800">Total</Table.Summary.Cell>
                                <Table.Summary.Cell index={4} className="text-green-600 font-semibold">
                                    {totals.co2Emissions.toFixed(3)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={5} className="text-red-600 font-semibold">
                                    {totals.ch4Emissions.toFixed(3)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={6} className="text-yellow-600 font-semibold">
                                    {totals.n2oEmissions.toFixed(3)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={7} className="text-blue-800 font-semibold">
                                    {totals.totalEmissions.toFixed(3)}
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </div>

            <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                disabled={isButtonDisabled}
                className=" mt-4 px-8"
            // size='large'
            >
                Submit
            </Button>

        </div>
    );
};

export default FuelEmissionCalculator;
