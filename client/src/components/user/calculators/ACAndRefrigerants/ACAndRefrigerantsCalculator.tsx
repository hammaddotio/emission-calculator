import React, { useState } from 'react';
import { Table, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import { REFRIGERANT_API } from '../../../../utils/api/apis';
import { headers } from '../../../../utils/api/apiHeaders';

// Define the data type for refrigerant records
interface RefrigerantRecord {
    refrigerantType: string;
    amountBeginning: number;
    amountPurchased: number;
    amountDisposed: number;
    amountEnd: number;
    gwp: number;
    emissions: number;
}

const refrigerantOptions = [
    { value: 'CO2', description: 'CO2', gwp: 1 },
    { value: 'HFC-23', description: 'HFC-23', gwp: 28 },
    { value: 'HFC-32', description: 'HFC-32', gwp: 265 },
    { value: 'HFC-125', description: 'HFC-125', gwp: 12400 },
    { value: 'HFC-134a', description: 'HFC-134a', gwp: 677 },
    { value: 'HFC-143a', description: 'HFC-143a', gwp: 116 },
    { value: 'HFC-152a', description: 'HFC-152a', gwp: 3170 },
    { value: 'HFC-236fa', description: 'HFC-236fa', gwp: 1120 },
    { value: 'CF4', description: 'CF4', gwp: 1300 },
    { value: 'C2F6', description: 'C2F6', gwp: 328 },
    { value: 'SF6', description: 'SF6', gwp: 4800 },
    { value: 'R-401A', description: '53% HCFC-22, 34% HCFC-124, 13% HFC-152a', gwp: 18 },
    { value: 'R-401B', description: '61% HCFC-22, 28% HCFC-124, 11% HFC-152a', gwp: 15 },
    { value: 'R-401C', description: '33% HCFC-22, 52% HCFC-124, 15% HFC-152a', gwp: 21 },
    { value: 'R-402A', description: '38% HCFC-22, 60% HFC-125, 2% propane', gwp: 1902 },
    { value: 'R-402B', description: '60% HCFC-22, 38% HFC-125, 2% propane', gwp: 1205 },
    { value: 'R-403B', description: '56% HCFC-22, 39% PFC-218, 5% propane', gwp: 3471 },
    { value: 'R-404A', description: '44% HFC-125, 4% HFC-134a, 52% HFC-143a', gwp: 3943 },
    { value: 'R-406A', description: '55% HCFC-22, 41% HCFC-142b, 4% isobutane', gwp: 0 },
    { value: 'R-407A', description: '20% HFC-32, 40% HFC-125, 40% HFC-134a', gwp: 1923 },
    { value: 'R-407B', description: '10% HFC-32, 70% HFC-125, 20% HFC-134a', gwp: 2547 },
    { value: 'R-407C', description: '23% HFC-32, 25% HFC-125, 52% HFC-134a', gwp: 1624 },
    { value: 'R-407D', description: '15% HFC-32, 15% HFC-125, 70% HFC-134a', gwp: 1487 },
    { value: 'R-408A', description: '47% HCFC-22, 7% HFC-125, 46% HFC-143a', gwp: 2430 },
    { value: 'R-409A', description: '60% HCFC-22, 25% HCFC-124, 15% HCFC-142b', gwp: 0 },
    { value: 'R-410A', description: '50% HFC-32, 50% HFC-125', gwp: 1924 },
    { value: 'R-410B', description: '45% HFC-32, 55% HFC-125', gwp: 2048 },
    { value: 'R-411A', description: '87.5% HCFC-22, 11% HFC-152a, 1.5% propylene', gwp: 15 },
    { value: 'R-411B', description: '94% HCFC-22, 3% HFC-152a, 3% propylene', gwp: 4 },
    { value: 'R-414A', description: '51% HCFC-22, 28.5% HCFC-124, 16.5% HCFC-142b, 4% isobutane', gwp: 0 },
    { value: 'R-414B', description: '50% HCFC-22, 39% HCFC-124, 9.5% HCFC-142b, 1.5% isobutane', gwp: 0 },
    { value: 'R-417A', description: '46.6% HFC-125, 50% HFC-134a, 3.4% butane', gwp: 2127 },
    { value: 'R-422A', description: '85.1% HFC-125, 11.5% HFC-134a, 3.4% isobutane', gwp: 2847 },
    { value: 'R-422D', description: '65.1% HFC-125, 31.5% HFC-134a, 3.4% isobutane', gwp: 2473 },
    { value: 'R-424A', description: '50.5% HFC-125, 47% HFC-134a, 1% butane, 0.9% isobutane, 0.6% isopentane', gwp: 3104 },
    { value: 'R-426A', description: '5.1% HFC-125, 93% HFC-134a, 1.3% butane, 0.6% isobutane', gwp: 1371 },
    { value: 'R-428A', description: '77.5% HFC-125, 20% HFC-143a, 1.9% isobutane, 0.6% propane', gwp: 3417 },
    { value: 'R-434A', description: '63.2% HFC-125, 16% HFC-134a, 18% HFC-143a, 2.8% isobutane', gwp: 3075 },
    { value: 'R-507A', description: '50% HFC-125, 50% HFC-143a', gwp: 3985 },
    { value: 'R-508A', description: '39% HFC-23, 61% PFC-116', gwp: 11607 },
    { value: 'R-508B', description: '46% HFC-23, 54% PFC-116', gwp: 11698 },
];

const RefrigerantEmissionCalculator: React.FC = () => {
    const [refrigerants, setRefrigerants] = useState<RefrigerantRecord[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (index: number, field: keyof RefrigerantRecord, value?: number) => {
        const newRefrigerants: RefrigerantRecord[] | any = [...refrigerants];

        // Set to 0 if value is undefined or null
        newRefrigerants[index][field] = value !== undefined && value !== null ? value : 0;

        // Update emissions after changing any value
        const { amountBeginning, amountPurchased, amountDisposed, amountEnd, gwp } = newRefrigerants[index];
        const emissions = ((amountBeginning + amountPurchased - amountDisposed - amountEnd) * gwp) / 1000 || 0;

        // Set the updated emissions
        newRefrigerants[index].emissions = emissions;
        setRefrigerants(newRefrigerants);
    };

    const totalEmissions = refrigerants.reduce((total, record) => total + record.emissions, 0);

    const addRefrigerant = (selectedValue: string) => {
        const selectedOption = refrigerantOptions.find(option => option.value === selectedValue);
        if (selectedOption) {
            setRefrigerants(prev => [
                ...prev,
                {
                    refrigerantType: selectedOption.value,
                    amountBeginning: 0,
                    amountPurchased: 0,
                    amountDisposed: 0,
                    amountEnd: 0,
                    gwp: selectedOption.gwp,
                    emissions: 0,
                },
            ]);
        } else {
            message.error('Invalid refrigerant type selected.');
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(REFRIGERANT_API, refrigerants, headers);
            message.success('Data submitted successfully.');
            setRefrigerants([]);
        } catch (error) {
            console.error(error);
            message.error('Failed to submit data.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Refrigerant Type',
            dataIndex: 'refrigerantType',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Amount Beginning',
            dataIndex: 'amountBeginning',
            render: (text: number, record: RefrigerantRecord, index: number) => {
                console.log(record)
                return (
                    <Input
                        type="number"
                        value={text}
                        onChange={(e) => handleChange(index, 'amountBeginning', Number(e.target.value))}
                    />
                )
            },
        },
        {
            title: 'Amount Purchased',
            dataIndex: 'amountPurchased',
            render: (text: number, record: RefrigerantRecord, index: number) => {
                console.log(record)
                return (
                    <Input
                        type="number"
                        value={text}
                        onChange={(e) => handleChange(index, 'amountPurchased', Number(e.target.value))}
                    />
                )
            },
        },
        {
            title: 'Amount Disposed',
            dataIndex: 'amountDisposed',
            render: (text: number, record: RefrigerantRecord, index: number) => {
                console.log(record)
                return (
                    <Input
                        type="number"
                        value={text}
                        onChange={(e) => handleChange(index, 'amountDisposed', Number(e.target.value))}
                    />
                )
            },
        },
        {
            title: 'Amount End',
            dataIndex: 'amountEnd',
            render: (text: number, record: RefrigerantRecord, index: number) => {
                console.log(record)
                return (
                    <Input
                        type="number"
                        value={text}
                        onChange={(e) => handleChange(index, 'amountEnd', Number(e.target.value))}
                    />
                )
            },
        },
        {
            title: 'GWP',
            dataIndex: 'gwp',
            render: (text: number) => <span>{text}</span>,
        },
        {
            title: 'Emissions (tonnes CO2e)',
            dataIndex: 'emissions',
            render: (text: number) => <span>{text.toFixed(2)}</span>,
        },
    ];

    return (
        <div>
            <Select
                placeholder="Select refrigerant type"
                onChange={addRefrigerant}
                style={{ width: 200, marginBottom: 16 }}
            >
                {refrigerantOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                        {option.description}
                    </Select.Option>
                ))}
            </Select>
            <Table
                dataSource={refrigerants}
                columns={columns}
                pagination={false}
                rowKey="refrigerantType"
            />
            <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{ marginTop: 16 }}
            >
                Submit
            </Button>
            <h3>Total Emissions: {totalEmissions.toFixed(2)} tonnes CO2e</h3>
        </div>
    );
};

export default RefrigerantEmissionCalculator;
