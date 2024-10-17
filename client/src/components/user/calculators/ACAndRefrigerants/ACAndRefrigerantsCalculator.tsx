import React, { useState } from 'react';
import { Table, InputNumber, Button, Select, message } from 'antd';
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
        const newRefrigerants: any = [...refrigerants];

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

    const addRefrigerant = (selectedRefrigerants: string[]) => {
        const newRefrigerants = selectedRefrigerants.map((type) => {
            const { gwp } = refrigerantOptions.find(option => option.value === type) || { gwp: 0 };
            return {
                refrigerantType: type,
                amountBeginning: 0,
                amountPurchased: 0,
                amountDisposed: 0,
                amountEnd: 0,
                gwp,
                emissions: 0,
            };
        });
        setRefrigerants(newRefrigerants);
    };

    const callApi = async () => {
        try {
            setLoading(true);
            const payload = {
                refrigerants,
                totalEmissions,
            };
            const response = await axios.post(`${REFRIGERANT_API}`, payload, headers);
            message.success(response.data.message);
        } catch (error: string | any) {
            console.log(error.response.data.error ? error[0] : message)
            message.error(error.response.data.error[0]);
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled = () => {
        return refrigerants.some(record =>
            !record.amountBeginning ||
            !record.amountPurchased ||
            !record.amountDisposed ||
            !record.amountEnd
        );
    };

    const columns = [
        {
            title: 'Type of Refrigerant',
            dataIndex: 'refrigerantType',
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: 'Amount at Beginning (kg)',
            dataIndex: 'amountBeginning',
            render: (_: any, record: RefrigerantRecord, index: number) => (
                <InputNumber
                    value={record.amountBeginning}
                    onChange={(value: any) => handleChange(index, 'amountBeginning', value)}
                    min={0}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Amount Purchased (kg)',
            dataIndex: 'amountPurchased',
            render: (_: any, record: RefrigerantRecord, index: number) => (
                <InputNumber
                    value={record.amountPurchased}
                    onChange={(value: any) => handleChange(index, 'amountPurchased', value)}
                    min={0}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Amount Disposed (kg)',
            dataIndex: 'amountDisposed',
            render: (_: any, record: RefrigerantRecord, index: number) => (
                <InputNumber
                    value={record.amountDisposed}
                    onChange={(value: any) => handleChange(index, 'amountDisposed', value)}
                    min={0}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Amount at End (kg)',
            dataIndex: 'amountEnd',
            render: (_: any, record: RefrigerantRecord, index: number) => (
                <InputNumber
                    value={record.amountEnd}
                    onChange={(value: any) => handleChange(index, 'amountEnd', value)}
                    min={0}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'HFC / PFC Emissions (tonnes CO₂e)',
            dataIndex: 'emissions',
            render: (_: any, record: RefrigerantRecord) => (
                <div>{record.emissions.toFixed(3)}</div>
            ),
        },
    ];

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-center text-2xl font-bold mb-4">Refrigerant Emission Calculator</h1>
            <Select
                mode="multiple"
                placeholder="Select Refrigerants"
                options={refrigerantOptions}
                onChange={addRefrigerant}
                className="w-full mb-4"
            />
            <Table
                dataSource={refrigerants}
                columns={columns}
                rowKey="refrigerantType"
                pagination={false}
                scroll={{ x: true }}
                className="table-auto w-full"
            />
            {refrigerants.length > 0 && (
                <div className="text-right mb-4">
                    <strong>Total Emissions: </strong>
                    {totalEmissions.toFixed(3)} tonnes CO₂e
                </div>
            )}
            {refrigerants.length > 0 && (
                <Button
                    loading={loading}
                    type="primary"
                    onClick={callApi}
                    className="w-full mt-4"
                    disabled={isSubmitDisabled()}
                >
                    Submit
                </Button>
            )}
        </div>
    );
};

export default RefrigerantEmissionCalculator;
