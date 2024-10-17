import React, { useState } from 'react';
import { Table, Button, message, Input } from 'antd';
import axios from 'axios';
import { MOBILE_COMBUSTION_API } from '../../../../utils/api/apis';
import { headers } from './../../../../utils/api/apiHeaders';

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
    const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([
        {
            fuelType: 'Motor Gasoline',
            amount: 0,
            co2EmissionFactor: 2.35,
            ch4EmissionFactor: 50,
            n2oEmissionFactor: 2,
            co2Emissions: 0,
            ch4Emissions: 0,
            n2oEmissions: 0,
            totalEmissions: 0,
        },
    ]);

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (index: number, field: keyof FuelRecord, value: string) => {
        const newRecords: any = [...fuelRecords];
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue)) {
            newRecords[index][field] = parsedValue;

            const co2Emissions = (newRecords[index].amount * newRecords[index].co2EmissionFactor) / 1000;
            const ch4Emissions = (newRecords[index].amount * newRecords[index].ch4EmissionFactor) / (1000 * 1000) * 28;
            const n2oEmissions = (newRecords[index].amount * newRecords[index].n2oEmissionFactor) / (1000 * 1000) * 265;

            newRecords[index].co2Emissions = co2Emissions;
            newRecords[index].ch4Emissions = ch4Emissions;
            newRecords[index].n2oEmissions = n2oEmissions;
            newRecords[index].totalEmissions = co2Emissions + ch4Emissions + n2oEmissions;

            setFuelRecords(newRecords);
        }
    };

    const addFuelRecord = () => {
        setFuelRecords([
            ...fuelRecords,
            {
                fuelType: 'Motor Gasoline',
                amount: 0,
                co2EmissionFactor: 2.35,
                ch4EmissionFactor: 50,
                n2oEmissionFactor: 2,
                co2Emissions: 0,
                ch4Emissions: 0,
                n2oEmissions: 0,
                totalEmissions: 0,
            },
        ]);
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
            {
                co2Emissions: 0,
                ch4Emissions: 0,
                n2oEmissions: 0,
                totalEmissions: 0,
            }
        );
    };

    const totals = calculateTotals();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                fuelRecords,
                ...totals,
            };
            const response = await axios.post(`${MOBILE_COMBUSTION_API}`, payload, headers);
            message.success(response.data.message);
        } catch (error) {
            message.error('Failed to submit data: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled = () => {
        return fuelRecords.some((record) => record.amount <= 0);
    };

    const columns = [
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Amount of Fuel Used (liters)',
            dataIndex: 'amount',
            render: (_: number, record: FuelRecord, index: number) => (
                <Input
                    type="number"
                    value={record.amount || 0}
                    onChange={(e) => handleChange(index, 'amount', e.target.value)}
                    min={0}
                    placeholder="Enter amount"
                    style={{ width: '100%', borderRadius: '4px', borderColor: '#d9d9d9' }}
                />
            ),
        },
        {
            title: 'CO₂ Emission Factor',
            dataIndex: 'co2EmissionFactor',
            render: (_: number, record: FuelRecord) => <div>{record.co2EmissionFactor}</div>,
        },
        {
            title: 'CH₄ Emission Factor',
            dataIndex: 'ch4EmissionFactor',
            render: (_: number, record: FuelRecord) => <div>{record.ch4EmissionFactor}</div>,
        },
        {
            title: 'N₂O Emission Factor',
            dataIndex: 'n2oEmissionFactor',
            render: (_: number, record: FuelRecord) => <div>{record.n2oEmissionFactor}</div>,
        },
        {
            title: 'CO₂ Emissions (tonnes)',
            dataIndex: 'co2Emissions',
            render: (_: number, record: FuelRecord) => <div>{record.co2Emissions.toFixed(3)}</div>,
        },
        {
            title: 'CH₄ Emissions (tonnes)',
            dataIndex: 'ch4Emissions',
            render: (_: number, record: FuelRecord) => <div>{record.ch4Emissions.toFixed(3)}</div>,
        },
        {
            title: 'N₂O Emissions (tonnes)',
            dataIndex: 'n2oEmissions',
            render: (_: number, record: FuelRecord) => <div>{record.n2oEmissions.toFixed(3)}</div>,
        },
        {
            title: 'Total Emissions (tonnes CO₂e)',
            dataIndex: 'totalEmissions',
            render: (_: number, record: FuelRecord) => <div>{record.totalEmissions.toFixed(3)}</div>,
        },
    ];

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-center text-2xl font-bold mb-4">Fuel Emission Calculator</h1>
            <Button onClick={addFuelRecord} type="primary" className="mb-4">
                Add Fuel Record
            </Button>
            <Table
                dataSource={fuelRecords}
                columns={columns}
                pagination={false}
                rowKey={(_, index: any) => index.toString()}
            />
            <div className="mt-8 p-6 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-600">CO₂ Total</span>
                        <span className="text-blue-600 font-semibold">{totals.co2Emissions.toFixed(3)} tonnes</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-600">CH₄ Total</span>
                        <span className="text-blue-600 font-semibold">{totals.ch4Emissions.toFixed(3)} tonnes</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-600">N₂O Total</span>
                        <span className="text-blue-600 font-semibold">{totals.n2oEmissions.toFixed(3)} tonnes</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-600">Total Emissions</span>
                        <span className="text-blue-600 font-semibold">{totals.totalEmissions.toFixed(3)} tonnes CO₂e</span>
                    </div>
                </div>
            </div>
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mt-4"
                loading={loading}
                disabled={isSubmitDisabled()}
            >
                Submit Data
            </Button>
        </div>
    );
};

export default FuelEmissionCalculator;
