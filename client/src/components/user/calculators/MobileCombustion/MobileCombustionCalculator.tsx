import React, { useState } from 'react';
import { Table, Button, message, Input, Select } from 'antd';
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
    description: string; // Description for the fuel record
}

const FuelEmissionCalculator: React.FC = () => {
    const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([]);
    const [selectedFuelType, setSelectedFuelType] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const fuelOptions = [
        {
            label: 'Motor Gasoline',
            value: 'Motor Gasoline',
            co2EmissionFactor: 2.35,
            ch4EmissionFactor: 50,
            n2oEmissionFactor: 2
        }
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
                amount: 0,
                co2EmissionFactor: selectedFuel.co2EmissionFactor,
                ch4EmissionFactor: selectedFuel.ch4EmissionFactor,
                n2oEmissionFactor: selectedFuel.n2oEmissionFactor,
                co2Emissions: 0,
                ch4Emissions: 0,
                n2oEmissions: 0,
                totalEmissions: 0,
                description: '',
            };
            setFuelRecords([...fuelRecords, newRecord]);
            setSelectedFuelType(undefined);
        }
    };

    const handleChange = (index: number, field: keyof FuelRecord, value: string) => {
        const newRecords: any = [...fuelRecords];
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue) || field === 'description') {
            newRecords[index][field] = field === 'description' ? value : parsedValue;

            if (field !== 'description') {
                const co2Emissions = (newRecords[index].amount * newRecords[index].co2EmissionFactor) / 1000;
                const ch4Emissions = (newRecords[index].amount * newRecords[index].ch4EmissionFactor) / (1000 * 1000) * 28;
                const n2oEmissions = (newRecords[index].amount * newRecords[index].n2oEmissionFactor) / (1000 * 1000) * 265;

                newRecords[index].co2Emissions = co2Emissions;
                newRecords[index].ch4Emissions = ch4Emissions;
                newRecords[index].n2oEmissions = n2oEmissions;
                newRecords[index].totalEmissions = co2Emissions + ch4Emissions + n2oEmissions;
            }

            setFuelRecords(newRecords);
        }
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
            // setFuelRecords([]);
        } catch (error) {
            message.error('Failed to submit data: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            render: (_: string, record: FuelRecord) => <div>{record.fuelType}</div>,
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
            title: 'Description',
            dataIndex: 'description',
            render: (_: string, record: FuelRecord, index: number) => (
                <Input
                    type="text"
                    value={record.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Enter description"
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
            title: 'CO₂ Emissions (kg)',
            dataIndex: 'co2Emissions',
            render: (_: number, record: FuelRecord) => <div>{record.co2Emissions.toFixed(3)}</div>,
        },
        {
            title: 'CH₄ Emissions (kg)',
            dataIndex: 'ch4Emissions',
            render: (_: number, record: FuelRecord) => <div>{record.ch4Emissions.toFixed(3)}</div>,
        },
        {
            title: 'N₂O Emissions (kg)',
            dataIndex: 'n2oEmissions',
            render: (_: number, record: FuelRecord) => <div>{record.n2oEmissions.toFixed(3)}</div>,
        },
        {
            title: 'Total Emissions (kg CO₂e)',
            dataIndex: 'totalEmissions',
            render: (_: number, record: FuelRecord) => <div>{record.totalEmissions.toFixed(3)}</div>,
        },
    ];

    const isAnyInputEmpty = fuelRecords.some(record => record.amount === 0 || record.description.trim() === '');

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-center text-2xl font-bold mb-4">Fuel Emission Calculator</h1>
            <Select
                value={selectedFuelType}
                onChange={handleFuelTypeChange}
                placeholder="Select fuel type"
                style={{ width: '100%', marginBottom: '16px' }}
            >
                {fuelOptions.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                        {option.label}
                    </Select.Option>
                ))}
            </Select>
            <Table
                dataSource={fuelRecords}
                columns={columns}
                pagination={false}
                rowKey={(record) => record.fuelType + record.amount}
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={6}>Total</Table.Summary.Cell> {/* Index Cell */}
                        <Table.Summary.Cell index={5}>{totals.co2Emissions.toFixed(3)}</Table.Summary.Cell>
                        <Table.Summary.Cell index={6}>{totals.ch4Emissions.toFixed(3)}</Table.Summary.Cell>
                        <Table.Summary.Cell index={7}>{totals.n2oEmissions.toFixed(3)}</Table.Summary.Cell>
                        <Table.Summary.Cell index={8}>{totals.totalEmissions.toFixed(3)}</Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
            <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                disabled={isAnyInputEmpty}
                className="mt-4
                w-full"
            >
                Submit
            </Button>
        </div>
    );
};

export default FuelEmissionCalculator;
